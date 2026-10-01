# Connect website enquiries to your Google Sheet

The website update removes the public configuration button. Visitors submit their details, receive confirmation only after Google confirms the save, and can then open WhatsApp with those details addressed to +91 99338 40222. They must press Send in WhatsApp; messages are not sent automatically.

**The connection is not live until you complete the Google deployment and private hosting configuration below.** The spreadsheet sharing URL alone cannot accept website submissions.

## 1. Set up Google (once)

1. Sign in as an owner/editor of [your spreadsheet](https://docs.google.com/spreadsheets/d/1VhsA5h1Qu6Tsk2kTy0MN6pHga7jJO5MpBbM8dEjUhlU/edit).
2. Choose **Extensions → Apps Script**. In a new script project, replace the starter `Code.gs` with the supplied `Code.gs`. If you already have automation code, preserve it and avoid duplicate `doPost` functions.
3. Save. Choose **setup** from the function dropdown and click **Run**. Complete Google's authorization yourself. It creates a **Website Enquiries** tab without altering existing tabs.
4. The execution log prints a private secret. Copy it into the `shared_secret` value in the supplied `hawaiadda-enquiry-config.php`. Keep it private; do not send it in chat or paste it into website HTML.
5. Choose **Deploy → New deployment → Web app**, **Execute as: Me**, **Who has access: Anyone**. Deploy and complete authorization. The script rejects requests without the secret and does not provide an endpoint for reading sheet data. You do not need to make the spreadsheet publicly editable.
6. Copy the deployed Web app URL ending in **/exec** into the `web_app_url` value in `hawaiadda-enquiry-config.php`. Do not use the Sheet sharing URL or the development `/dev` URL.

Example config structure (replace the empty values, keeping the quotes):

```php
<?php
return [
    'web_app_url' => '',
    'shared_secret' => '',
];
```

## 2. Upload to hosting

This package requires **PHP 7.4 or newer with cURL enabled**, available on typical cPanel PHP hosting. It cannot run on static-only hosting or Vite's local preview server.

1. Back up your current website files in File Manager.
2. Upload the completed `hawaiadda-enquiry-config.php` **one folder above `public_html`**, not inside it. For example:

```text
account-home/
  hawaiadda-enquiry-config.php
  public_html/
    index.html
    .htaccess
    api/enquiry.php
    assets/...
    images/...
    favicon-v2.png
```

3. Upload `website-upload.zip` into **public_html** and extract it there, replacing files of the same name. The archive contains the contents of `dist`, not a surrounding dist folder. Keep older hashed assets until the CDN cache is purged so visitors with old HTML do not get broken pages. If you have custom rules in `.htaccess`, merge the included routing rules instead of overwriting yours.
4. Clear/purge **Sucuri / Website Security CDN cache**, especially the homepage. Exclude `/api/*` from caching if you have custom caching rules; the endpoint also sends `Cache-Control: no-store`.
5. Open the website in a fresh tab. The Google Sheet Config button should be gone.

**Upload all updated assets and index.html together. Replacing only index.html will not deliver this change.**

## 3. Verify the connection

1. Submit one clearly labelled TEST enquiry using contact details you control.
2. Confirm one row appears in **Website Enquiries** in your Google Sheet, containing the name, phone, email, destination, travel date, traveller count, notes, source, timestamp, and enquiry ID.
3. Confirm the website displays **Enquiry received** only after the row is saved.
4. Click **Chat on WhatsApp with Expert**. Check the recipient and prefilled details. Sending is a separate action performed in WhatsApp.
5. If saving fails, the form retains its details and offers a WhatsApp fallback. It does not claim that a failed save succeeded.

For a failed connection: check the private config location, `/exec` URL, matching secret, Google deployment access, PHP/cURL availability, and the Apps Script Executions page. Do not rename the Website Enquiries tab or its headers. Duplicate retries with the same enquiry ID are recorded only once.

Local verification covers the production build, lint, and mocked Apps Script validation/save/retry behavior. PHP and the live Google connection require the hosting test above; neither is confirmed by a local Vite build.

Google reference: https://developers.google.com/apps-script/guides/web
