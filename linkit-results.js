/* ====================================================
   linkit-results.js
   Link IT 2.0 공용 수행결과 저장 모듈

   게임이 완료될 때 호출하면 결과를 브라우저(localStorage)에
   누적 저장합니다. results.html 이 같은 키를 읽어 표시합니다.

   사용:
     LinkitResults.save({
       game: '모양 찾기',     // 훈련 이름 (필수)
       emoji: '🔺',           // 카드 이모지 (선택)
       area: 'a',             // 영역 a|b|c|d (선택)
       score: 87,             // 정확도/점수 0~100 (필수)
       durationSec: 312       // 소요 시간(초) (선택)
     });
   ==================================================== */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'linkit_results';
  var STUDENTS_KEY = 'linkit_students';
  var ACTIVE_KEY = 'linkit_active_student';
  var MAX_ENTRIES = 100; // 최근 100건만 보관

  // 활성 학생을 localStorage 에서 직접 읽는다.
  // (게임 페이지가 linkit-students.js 를 따로 포함하지 않아도 동작하도록)
  function activeStudent() {
    try {
      var id = localStorage.getItem(ACTIVE_KEY);
      var raw = localStorage.getItem(STUDENTS_KEY);
      var list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list) || list.length === 0) return null;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
      }
      return list[0];
    } catch (e) {
      return null;
    }
  }

  function readAll() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function writeAll(rows) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
      return true;
    } catch (e) {
      return false;
    }
  }

  function fmtDate(d) {
    function p(n) { return String(n).padStart(2, '0'); }
    return (
      d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes())
    );
  }

  function clampScore(v) {
    var n = Number(v);
    if (!isFinite(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  /**
   * 수행 결과 1건을 저장합니다.
   * @param {Object} entry { game, emoji, area, score, durationSec }
   * @returns {Object|null} 저장된 레코드 (실패 시 null)
   */
  function save(entry) {
    if (!entry || typeof entry !== 'object') return null;
    if (entry.game == null || String(entry.game).trim() === '') return null;

    var active = activeStudent();
    var record = {
      date: entry.date || fmtDate(new Date()),
      game: String(entry.game),
      emoji: entry.emoji || '🎮',
      area: entry.area || '',
      score: clampScore(entry.score),
      durationSec: entry.durationSec != null ? Math.max(0, Math.round(Number(entry.durationSec) || 0)) : null,
      studentId: entry.studentId || (active ? active.id : ''),
      studentName: entry.studentName || (active ? active.name : '')
    };

    var rows = readAll();
    rows.push(record);
    if (rows.length > MAX_ENTRIES) {
      rows = rows.slice(rows.length - MAX_ENTRIES);
    }
    writeAll(rows);
    return record;
  }

  function getAll() {
    return readAll();
  }

  // 특정 학생의 결과만 반환. studentId 가 없는 레거시 기록은
  // includeLegacy=true 일 때 함께 포함한다.
  function getForStudent(studentId, includeLegacy) {
    return readAll().filter(function (r) {
      if (r.studentId === studentId) return true;
      if (includeLegacy && (!r.studentId || r.studentId === '')) return true;
      return false;
    });
  }

  function clear() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  global.LinkitResults = {
    save: save,
    getAll: getAll,
    getForStudent: getForStudent,
    clear: clear,
    STORAGE_KEY: STORAGE_KEY
  };
})(window);
