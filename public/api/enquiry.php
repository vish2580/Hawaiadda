<?php
// Requires PHP 7.4+ with cURL. Secrets live outside public_html.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok): void {
    http_response_code($status);
    echo json_encode(['ok' => $ok]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://dreamhawaiadda.com', 'https://www.dreamhawaiadda.com'], true)) {
    respond(403, false);
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) respond(415, false);
$raw = file_get_contents('php://input', false, null, 0, 16385);
if ($raw === false || strlen($raw) > 16384) respond(413, false);
$data = json_decode($raw, true);
if (!is_array($data) || !empty($data['website'])) respond(400, false);

$limits = ['name' => 120, 'phone' => 30, 'email' => 254, 'destination' => 80,
    'travelDate' => 10, 'travellers' => 80, 'notes' => 2000, 'requestId' => 36];
$payload = [];
foreach ($limits as $key => $limit) {
    if (!isset($data[$key]) || !is_string($data[$key])) respond(400, false);
    $value = trim($data[$key]);
    // UTF-8 fields may use up to four bytes per character.
    if (strlen($value) > $limit * 4 || ($key !== 'notes' && $value === '')) respond(400, false);
    $payload[$key] = $value;
}
if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL) ||
    !preg_match('/^[+0-9() .-]{7,30}$/', $payload['phone']) ||
    !preg_match('/^[a-f0-9-]{36}$/i', $payload['requestId'])) respond(400, false);
$date = DateTimeImmutable::createFromFormat('!Y-m-d', $payload['travelDate']);
if (!$date || $date->format('Y-m-d') !== $payload['travelDate']) respond(400, false);
$destinations = ['Sikkim', 'Darjeeling', 'Bhutan', 'Nepal', 'Kashmir', 'Thailand', 'Vietnam', 'Bali', 'Maldives', 'Dubai', 'Other Destination'];
$travellers = ['1 Traveller (Solo)', '2 Travellers (Couple / Duo)', '3-5 Travellers (Family)', '6-10 Travellers (Group)', '10+ Travellers (Corporate)'];
if (!in_array($payload['destination'], $destinations, true) || !in_array($payload['travellers'], $travellers, true)) respond(400, false);

$configPath = dirname(__DIR__, 2) . '/hawaiadda-enquiry-config.php';
if (!is_file($configPath) || !function_exists('curl_init')) respond(503, false);
$config = require $configPath;
$url = $config['web_app_url'] ?? '';
$token = $config['shared_secret'] ?? '';
if (!preg_match('~^https://script\.google\.com/macros/s/[A-Za-z0-9_-]+/exec$~', $url) || strlen($token) < 32) respond(503, false);

// Bound submissions per source IP, using a salted hash and temporary counter only.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ratePath = sys_get_temp_dir() . '/dha-enquiry-' . hash_hmac('sha256', $ip, $token);
$rate = @fopen($ratePath, 'c+');
if (!$rate || !flock($rate, LOCK_EX)) respond(503, false);
$counter = json_decode(stream_get_contents($rate), true);
if (!is_array($counter) || ($counter['until'] ?? 0) <= time()) $counter = ['until' => time() + 600, 'count' => 0];
if ($counter['count'] >= 10) {
    flock($rate, LOCK_UN);
    fclose($rate);
    header('Retry-After: 600');
    respond(429, false);
}
$counter['count']++;
ftruncate($rate, 0);
rewind($rate);
fwrite($rate, json_encode($counter));
flock($rate, LOCK_UN);
fclose($rate);

$payload['secret'] = $token;
$curl = curl_init($url);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS => 3,
    CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
    CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 25,
]);
$body = curl_exec($curl);
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);
$result = is_string($body) ? json_decode($body, true) : null;
if ($status !== 200 || !is_array($result) || ($result['ok'] ?? false) !== true ||
    ($result['requestId'] ?? '') !== $payload['requestId']) respond(502, false);
respond(200, true);
