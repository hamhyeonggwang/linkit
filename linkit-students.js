/* ====================================================
   linkit-students.js
   Link IT 2.0 학생(세션) 관리 모듈

   학생 목록과 "활성 학생"을 브라우저(localStorage)에 관리합니다.
   - 학생 목록 :  linkit_students        (배열)
   - 활성 학생 :  linkit_active_student  (id)

   결과 저장(linkit-results.js)은 활성 학생을 자동으로 태깅하며,
   results.html / hub.html 이 학생별로 데이터를 분리해 보여줍니다.

   사용:
     LinkitStudents.getStudents();         // 전체 학생 (없으면 기본 학생 1명 시드)
     LinkitStudents.getActive();           // 활성 학생 객체
     LinkitStudents.setActiveId(id);       // 활성 학생 변경
     LinkitStudents.addStudent(name, age); // 추가 후 활성으로 지정
     LinkitStudents.removeStudent(id);     // 삭제
     LinkitStudents.label(student);        // "이름 (n세)" 표기
   ==================================================== */
(function (global) {
  'use strict';

  var SKEY = 'linkit_students';
  var AKEY = 'linkit_active_student';

  function read() {
    try {
      var raw = localStorage.getItem(SKEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function write(list) {
    try { localStorage.setItem(SKEY, JSON.stringify(list)); } catch (e) {}
  }

  function genId() {
    return 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  // 학생이 한 명도 없으면 기본 학생을 시드한다.
  function ensureSeed() {
    var list = read();
    if (list.length === 0) {
      var s = { id: genId(), name: '김은총', age: 9, createdAt: Date.now() };
      list = [s];
      write(list);
      setActiveId(s.id);
    }
    return list;
  }

  function getStudents() {
    return ensureSeed();
  }

  function getActiveId() {
    try { return localStorage.getItem(AKEY) || null; } catch (e) { return null; }
  }

  function setActiveId(id) {
    try {
      if (id == null) localStorage.removeItem(AKEY);
      else localStorage.setItem(AKEY, id);
    } catch (e) {}
  }

  function getActive() {
    var list = ensureSeed();
    var id = getActiveId();
    var found = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { found = list[i]; break; }
    }
    if (!found) {
      found = list[0] || null;
      if (found) setActiveId(found.id);
    }
    return found;
  }

  function addStudent(name, age) {
    name = String(name || '').trim();
    if (!name) return null;
    var list = read();
    var ageNum = (age != null && String(age).trim() !== '') ? Number(age) : null;
    if (ageNum != null && (!isFinite(ageNum) || ageNum < 0)) ageNum = null;
    var s = { id: genId(), name: name, age: ageNum, createdAt: Date.now() };
    list.push(s);
    write(list);
    setActiveId(s.id);
    return s;
  }

  function removeStudent(id) {
    var list = read().filter(function (s) { return s.id !== id; });
    write(list);
    if (getActiveId() === id) {
      setActiveId(list.length ? list[0].id : null);
    }
    return list;
  }

  function label(s) {
    if (!s) return '학생 미선택';
    return s.name + (s.age != null ? ' (' + s.age + '세)' : '');
  }

  global.LinkitStudents = {
    getStudents: getStudents,
    getActive: getActive,
    getActiveId: getActiveId,
    setActiveId: setActiveId,
    addStudent: addStudent,
    removeStudent: removeStudent,
    label: label,
    STORAGE_KEY: SKEY,
    ACTIVE_KEY: AKEY
  };
})(window);
