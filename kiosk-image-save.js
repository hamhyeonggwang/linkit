/* ====================================================
   kiosk-image-save.js
   키오스크 트레이너 공용 "결과 화면 저장" 모듈

   사용처: paik / cu / munggu / maratang 키오스크 트레이너
   호출:  kioskSaveResultScreen(kioskId, toastFn)
     - kioskId : 파일명 접두사 ('paik', 'cu', ...)
     - toastFn : 사용자 피드백용 토스트 함수 (선택)

   html2canvas 를 CDN 에서 지연 로드하여 캡처하므로
   각 HTML 페이지에 별도 의존성을 추가할 필요가 없습니다.
   ==================================================== */
(function () {
  'use strict';

  var HTML2CANVAS_SRC =
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

  // 키오스크 화면 컨테이너 후보 (우선순위 순)
  var CONTAINER_SELECTORS = [
    '#kiosk-frame',
    '#kframe',
    '#kiosk-wrap',
    '#kwrap'
  ];

  var _loadPromise = null;

  function noop() {}

  // toastFn 이 없거나 함수가 아닐 때를 대비한 안전 래퍼
  function makeToast(toastFn) {
    if (typeof toastFn === 'function') return toastFn;
    return function (msg) {
      try {
        console.log('[kiosk-save]', msg);
      } catch (e) {
        noop();
      }
    };
  }

  function findContainer() {
    for (var i = 0; i < CONTAINER_SELECTORS.length; i++) {
      var el = document.querySelector(CONTAINER_SELECTORS[i]);
      if (el) return el;
    }
    return null;
  }

  function loadHtml2Canvas() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    if (_loadPromise) return _loadPromise;

    _loadPromise = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = HTML2CANVAS_SRC;
      script.async = true;
      script.onload = function () {
        if (window.html2canvas) resolve(window.html2canvas);
        else reject(new Error('html2canvas 로드 실패'));
      };
      script.onerror = function () {
        _loadPromise = null; // 재시도 허용
        reject(new Error('html2canvas 스크립트를 불러올 수 없습니다.'));
      };
      document.head.appendChild(script);
    });
    return _loadPromise;
  }

  function timestamp() {
    var d = new Date();
    function p(n) {
      return String(n).padStart(2, '0');
    }
    return (
      d.getFullYear() +
      p(d.getMonth() + 1) +
      p(d.getDate()) +
      '_' +
      p(d.getHours()) +
      p(d.getMinutes()) +
      p(d.getSeconds())
    );
  }

  function downloadCanvas(canvas, fileName) {
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /**
   * 결과(키오스크) 화면을 PNG 이미지로 캡처하여 다운로드합니다.
   * @param {string} kioskId  파일명 접두사
   * @param {Function} [toastFn]  사용자 피드백 토스트 함수
   * @returns {Promise<void>}
   */
  function kioskSaveResultScreen(kioskId, toastFn) {
    var toast = makeToast(toastFn);
    var id = String(kioskId || 'kiosk');

    var target = findContainer();
    if (!target) {
      toast('⚠️ 저장할 화면을 찾지 못했어요.');
      return Promise.resolve();
    }

    toast('📷 결과 화면을 저장하는 중...');

    return loadHtml2Canvas()
      .then(function (html2canvas) {
        return html2canvas(target, {
          backgroundColor: '#ffffff',
          scale: window.devicePixelRatio > 1 ? 2 : 1,
          useCORS: true,
          logging: false
        });
      })
      .then(function (canvas) {
        downloadCanvas(canvas, id + '_결과_' + timestamp() + '.png');
        toast('✅ 결과 화면을 저장했어요!');
      })
      .catch(function (err) {
        try {
          console.error('[kiosk-save]', err);
        } catch (e) {
          noop();
        }
        toast('⚠️ 저장에 실패했어요. 다시 시도해 주세요.');
      });
  }

  window.kioskSaveResultScreen = kioskSaveResultScreen;
})();
