// Paste into Extensions > Apps Script in the owner's Google account.
const SPREADSHEET_ID = '1VhsA5h1Qu6Tsk2kTy0MN6pHga7jJO5MpBbM8dEjUhlU';
const TAB_NAME = 'Website Enquiries';
const HEADERS = ['Received At', 'Name', 'Phone / WhatsApp', 'Email', 'Destination',
  'Travel Date', 'Travellers', 'Notes', 'Source', 'Enquiry ID'];

// Run once from the editor. Copy the generated secret into the private PHP config.
function setup() {
  const properties = PropertiesService.getScriptProperties();
  let secret = properties.getProperty('ENQUIRY_SECRET');
  if (!secret) {
    secret = Utilities.getUuid() + Utilities.getUuid();
    properties.setProperty('ENQUIRY_SECRET', secret);
  }
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = book.getSheetByName(TAB_NAME) || book.insertSheet(TAB_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  console.log('Private shared_secret (copy only into your private PHP config): ' + secret);
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 16384) return jsonResponse({ ok: false });
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('ENQUIRY_SECRET');
    if (!secret || data.secret !== secret) return jsonResponse({ ok: false });
    const limits = { name: 120, phone: 30, email: 254, destination: 80, travelDate: 10, travellers: 80, notes: 2000, requestId: 36 };
    for (const key of Object.keys(limits)) {
      if (typeof data[key] !== 'string' || data[key].length > limits[key] || (key !== 'notes' && !data[key].trim())) {
        return jsonResponse({ ok: false });
      }
    }
    if (!/^[a-f0-9-]{36}$/i.test(data.requestId)) return jsonResponse({ ok: false });
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TAB_NAME);
    if (!sheet) return jsonResponse({ ok: false });
    const existingHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (!HEADERS.every((value, i) => value === existingHeaders[i])) return jsonResponse({ ok: false });
    const lastRow = sheet.getLastRow();
    if (lastRow > 1 && sheet.getRange(2, 10, lastRow - 1, 1).createTextFinder(data.requestId).matchEntireCell(true).findNext()) {
      return jsonResponse({ ok: true, requestId: data.requestId });
    }
    // Prefix spreadsheet formula characters so submitted text cannot execute formulas.
    const safe = value => /^[\s]*[=+@-]/.test(value) ? "'" + value : value;
    const row = [new Date(), data.name, data.phone, data.email, data.destination,
      data.travelDate, data.travellers, data.notes, 'Dream Hawai Adda Website', data.requestId];
    sheet.appendRow(row.map(value => typeof value === 'string' ? safe(value) : value));
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, requestId: data.requestId });
  } catch (_) {
    return jsonResponse({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
