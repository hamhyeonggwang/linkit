/**
 * 링키월드 관리자용 Google Apps Script
 *
 * 사용 순서
 * 1. Google 스프레드시트에서 확장 프로그램 > Apps Script를 엽니다.
 * 2. 이 파일 내용을 Code.gs에 붙여넣고 setup()을 한 번 실행합니다.
 * 3. 필요하면 setApiToken('원하는비밀번호')를 한 번 실행합니다.
 * 4. 배포 > 새 배포 > 웹 앱으로 배포합니다.
 */

const CONFIG = {
  DATA_SHEET_NAME: '관리데이터',
  TOKEN_PROPERTY: 'LINKIT_ADMIN_API_TOKEN',
  HEADERS: [
    'id',
    'createdAt',
    'updatedAt',
    'studentName',
    'program',
    'sessionDate',
    'score',
    'memo',
    'status'
  ]
};

function setup() {
  const sheet = getOrCreateDataSheet_();
  ensureHeaders_(sheet);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, CONFIG.HEADERS.length);

  return {
    ok: true,
    message: '관리데이터 시트 준비가 완료되었습니다.',
    sheetName: CONFIG.DATA_SHEET_NAME
  };
}

function setApiToken(token) {
  if (!token || String(token).trim().length < 4) {
    throw new Error('토큰은 4자 이상으로 입력해 주세요.');
  }

  PropertiesService
    .getScriptProperties()
    .setProperty(CONFIG.TOKEN_PROPERTY, String(token).trim());

  return {
    ok: true,
    message: 'API 토큰이 저장되었습니다.'
  };
}

function clearApiToken() {
  PropertiesService
    .getScriptProperties()
    .deleteProperty(CONFIG.TOKEN_PROPERTY);

  return {
    ok: true,
    message: 'API 토큰이 삭제되었습니다.'
  };
}

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    const action = params.action || 'list';

    if (action === 'health') {
      return output_(params, {
        ok: true,
        service: 'linkit-admin-sheet',
        timestamp: new Date().toISOString()
      });
    }

    requireToken_(params.token);

    if (action === 'setup') {
      return output_(params, setup());
    }

    if (action === 'get') {
      return output_(params, {
        ok: true,
        data: getRecord_(params.id)
      });
    }

    return output_(params, {
      ok: true,
      data: listRecords_()
    });
  } catch (error) {
    return output_((e && e.parameter) || {}, errorResponse_(error));
  }
}

function doPost(e) {
  try {
    const body = parseBody_(e);
    const action = body.action || 'append';

    requireToken_(body.token);

    if (action === 'append') {
      return output_(body, {
        ok: true,
        data: appendRecord_(body.data || body)
      });
    }

    if (action === 'update') {
      return output_(body, {
        ok: true,
        data: updateRecord_(body.id || (body.data && body.data.id), body.data || body)
      });
    }

    if (action === 'delete') {
      return output_(body, {
        ok: true,
        data: deleteRecord_(body.id)
      });
    }

    throw new Error('지원하지 않는 action입니다: ' + action);
  } catch (error) {
    return output_({}, errorResponse_(error));
  }
}

function listRecords_() {
  const sheet = getOrCreateDataSheet_();
  ensureHeaders_(sheet);

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.length).getValues();
  return values
    .filter(row => row.some(value => value !== ''))
    .map(row => rowToObject_(row));
}

function getRecord_(id) {
  if (!id) throw new Error('id가 필요합니다.');

  const records = listRecords_();
  const record = records.find(item => String(item.id) === String(id));
  if (!record) throw new Error('해당 id의 데이터를 찾을 수 없습니다.');

  return record;
}

function appendRecord_(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateDataSheet_();
    ensureHeaders_(sheet);

    const now = new Date().toISOString();
    const record = normalizeRecord_({
      ...data,
      id: data.id || Utilities.getUuid(),
      createdAt: data.createdAt || now,
      updatedAt: now
    });

    sheet.appendRow(CONFIG.HEADERS.map(header => record[header] || ''));
    return record;
  } finally {
    lock.releaseLock();
  }
}

function updateRecord_(id, data) {
  if (!id) throw new Error('id가 필요합니다.');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateDataSheet_();
    ensureHeaders_(sheet);

    const rowNumber = findRowById_(sheet, id);
    if (!rowNumber) throw new Error('해당 id의 데이터를 찾을 수 없습니다.');

    const current = rowToObject_(sheet.getRange(rowNumber, 1, 1, CONFIG.HEADERS.length).getValues()[0]);
    const record = normalizeRecord_({
      ...current,
      ...data,
      id: current.id,
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString()
    });

    sheet.getRange(rowNumber, 1, 1, CONFIG.HEADERS.length)
      .setValues([CONFIG.HEADERS.map(header => record[header] || '')]);

    return record;
  } finally {
    lock.releaseLock();
  }
}

function deleteRecord_(id) {
  if (!id) throw new Error('id가 필요합니다.');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateDataSheet_();
    const rowNumber = findRowById_(sheet, id);
    if (!rowNumber) throw new Error('해당 id의 데이터를 찾을 수 없습니다.');

    sheet.deleteRow(rowNumber);
    return { id: id };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateDataSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(CONFIG.DATA_SHEET_NAME)
    || spreadsheet.insertSheet(CONFIG.DATA_SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const currentHeaders = sheet
    .getRange(1, 1, 1, CONFIG.HEADERS.length)
    .getValues()[0];

  const hasValidHeaders = CONFIG.HEADERS.every((header, index) => currentHeaders[index] === header);
  if (!hasValidHeaders) {
    sheet.getRange(1, 1, 1, CONFIG.HEADERS.length).setValues([CONFIG.HEADERS]);
  }
}

function findRowById_(sheet, id) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const index = ids.findIndex(row => String(row[0]) === String(id));
  return index === -1 ? null : index + 2;
}

function rowToObject_(row) {
  return CONFIG.HEADERS.reduce((result, header, index) => {
    const value = row[index];
    result[header] = value instanceof Date ? value.toISOString() : value;
    return result;
  }, {});
}

function normalizeRecord_(data) {
  return CONFIG.HEADERS.reduce((record, header) => {
    record[header] = data[header] == null ? '' : data[header];
    return record;
  }, {});
}

function parseBody_(e) {
  if (!e) return {};

  if (e.postData && e.postData.contents) {
    const contents = e.postData.contents;
    const type = e.postData.type || '';

    if (type.indexOf('application/json') !== -1) {
      return JSON.parse(contents);
    }
  }

  return e.parameter || {};
}

function requireToken_(token) {
  const savedToken = PropertiesService
    .getScriptProperties()
    .getProperty(CONFIG.TOKEN_PROPERTY);

  if (!savedToken) return;
  if (String(token || '') !== savedToken) {
    throw new Error('관리자 토큰이 올바르지 않습니다.');
  }
}

function output_(params, payload) {
  const json = JSON.stringify(payload);

  if (params && params.callback) {
    return ContentService
      .createTextOutput(params.callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse_(error) {
  return {
    ok: false,
    error: error && error.message ? error.message : String(error)
  };
}
