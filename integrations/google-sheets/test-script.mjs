import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const rows = [];
const secret = 'test-only-shared-secret-at-least-32-characters';
let storedSecret;
let held = false;
const sheet = {
  getLastRow: () => rows.length,
  appendRow: row => rows.push(row),
  setFrozenRows() {},
  getRange: (start, column) => ({
    setFontWeight() {},
    getValues: () => [rows[start - 1]],
    createTextFinder: value => ({
      matchEntireCell: () => ({ findNext: () => rows.slice(start - 1).some(row => row[column - 1] === value) }),
    }),
  }),
};
const context = vm.createContext({
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => storedSecret, setProperty: (_, value) => { storedSecret = value; } }) },
  Utilities: { getUuid: () => secret },
  SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
  LockService: { getScriptLock: () => ({ waitLock: () => { held = true; }, hasLock: () => held, releaseLock: () => { held = false; } }) },
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput: content => ({ setMimeType: () => content }) },
  console: { log() {} },
});
vm.runInContext(fs.readFileSync(new URL('./Code.gs', import.meta.url), 'utf8'), context);
context.setup();
const payload = { secret: storedSecret, name: 'Test traveller', phone: '+919000000000', email: 'test@example.com', destination: 'Sikkim', travelDate: '2026-12-01', travellers: '2 Travellers (Couple / Duo)', notes: '=IMPORTXML("bad")', requestId: '12345678-1234-1234-1234-123456789abc' };
const submit = data => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(data) } }));
assert.equal(submit({ ...payload, secret: 'wrong' }).ok, false);
assert.equal(rows.length, 1);
assert.equal(submit({ ...payload, email: '' }).ok, false);
assert.equal(submit({ ...payload, notes: 'x'.repeat(2001) }).ok, false);
assert.equal(submit(payload).ok, true);
assert.equal(rows.length, 2);
assert.equal(rows[1][7], "'" + payload.notes);
assert.equal(rows[1][2], "'" + payload.phone);
assert.equal(submit(payload).ok, true);
assert.equal(rows.length, 2, 'Retries must not append duplicate enquiries');
assert.equal(held, false, 'Lock must release after each request');
const originalAppend = sheet.appendRow;
sheet.appendRow = () => { throw new Error('Simulated write failure'); };
assert.equal(submit({ ...payload, requestId: '22345678-1234-1234-1234-123456789abc' }).ok, false);
assert.equal(held, false);
sheet.appendRow = originalAppend;
assert.equal(JSON.parse(context.doPost({ postData: { contents: '{broken' } })).ok, false);
console.log('Passed: authorization, required fields, length limits, save, formula safety, retry deduplication, write failure, malformed JSON, lock release.');
