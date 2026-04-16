/**
 * 웹게임·정보 카드용 썸네일 — 별도 PNG/SVG 파일 없이 data URI(SVG)만 사용.
 */
(function (global) {
  function svgDataUri(svg) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace(/\s+/g, ' ').trim());
  }

  var T = {};

  T.paikKiosk = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs><linearGradient id="pb" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#152a4a"/><stop offset="100%" stop-color="#0a1428"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#pb)"/>' +
      '<rect x="72" y="48" width="256" height="120" rx="16" fill="#fff" stroke="rgba(255,255,255,.12)"/>' +
      '<text x="200" y="98" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="28" font-weight="800" fill="#0f2847">빽다방</text>' +
      '<text x="200" y="132" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="800" fill="#d4a012">PAIK\'S COFFEE</text>' +
      '<text x="200" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#e8eef8">싸다, 크다, 맛있다!</text>' +
      '<rect x="88" y="218" width="224" height="40" rx="10" fill="#f5c542"/>' +
      '<text x="200" y="244" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#0f2847">터치하여 주문 시작</text>' +
    '</svg>'
  );

  T.mungguKiosk = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#c2410c"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#mg)"/>' +
      '<text x="200" y="88" text-anchor="middle" font-size="52">🖍️</text>' +
      '<text x="200" y="148" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#fff">문구야놀자</text>' +
      '<text x="200" y="182" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="rgba(255,255,255,.92)">키오스크 훈련</text>' +
      '<rect x="100" y="210" width="200" height="44" rx="12" fill="#fff" opacity=".95"/>' +
      '<text x="200" y="239" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#9a3412">주문 연습하기</text>' +
    '</svg>'
  );

  T.cuKiosk = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#652D90"/>' +
      '<rect x="150" y="52" width="100" height="56" rx="14" fill="#fff"/>' +
      '<text x="200" y="94" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="900" fill="#652D90">CU</text>' +
      '<text x="200" y="160" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#fff">셀프계산대에 오신 것을</text>' +
      '<text x="200" y="188" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#fff">환영합니다!</text>' +
      '<text x="200" y="236" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="rgba(255,255,255,.85)">스캔부터 결제까지 쉽고 빠르게</text>' +
    '</svg>'
  );

  T.maratangKiosk = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs><linearGradient id="mr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#dc2626"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#mr)"/>' +
      '<circle cx="80" cy="240" r="36" fill="rgba(255,255,255,.08)"/><circle cx="340" cy="64" r="48" fill="rgba(255,255,255,.06)"/>' +
      '<text x="200" y="96" text-anchor="middle" font-size="48">🌶️</text>' +
      '<text x="200" y="152" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#fff">마라탕 하우스</text>' +
      '<text x="200" y="186" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="rgba(255,255,255,.9)">재료를 담아 무게로 계산</text>' +
      '<rect x="110" y="214" width="180" height="44" rx="12" fill="#fff"/>' +
      '<text x="200" y="243" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="800" fill="#b91c1c">주문 시작하기</text>' +
    '</svg>'
  );

  T.haruFilmKiosk = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#ff5c8d"/>' +
      '<rect x="48" y="40" width="304" height="96" rx="18" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.45)" stroke-width="2"/>' +
      '<text x="72" y="98" font-size="36">📷</text>' +
      '<text x="200" y="88" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" font-weight="800" fill="#fff">하루필름</text>' +
      '<text x="200" y="116" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="rgba(255,255,255,.92)">HARU FILM · 실제 촬영 가능</text>' +
      '<g font-size="22">' +
      '<rect x="56" y="156" width="64" height="56" rx="10" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)"/><text x="88" y="194" text-anchor="middle">😊</text>' +
      '<rect x="128" y="156" width="64" height="56" rx="10" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)"/><text x="160" y="194" text-anchor="middle">✌️</text>' +
      '<rect x="200" y="156" width="64" height="56" rx="10" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)"/><text x="232" y="194" text-anchor="middle">🫶</text>' +
      '<rect x="272" y="156" width="64" height="56" rx="10" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)"/><text x="304" y="194" text-anchor="middle">😁</text>' +
      '</g>' +
      '<text x="200" y="262" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#fff">네컷 포즈 따라하기 📸</text>' +
    '</svg>'
  );

  T.homeplusKiosk = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs><linearGradient id="hp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#EE1C23"/><stop offset="100%" stop-color="#0057A8"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#hp)"/>' +
      '<rect x="64" y="56" width="272" height="188" rx="18" fill="rgba(255,255,255,.95)" stroke="rgba(0,0,0,.08)"/>' +
      '<text x="200" y="108" text-anchor="middle" font-family="system-ui,sans-serif" font-size="26" font-weight="900" fill="#EE1C23">홈플러스</text>' +
      '<text x="200" y="142" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#0057A8">푸드코트 키오스크</text>' +
      '<text x="200" y="178" text-anchor="middle" font-size="28">🍱</text>' +
      '<text x="200" y="218" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#333">주문 · 픽업존 연습</text>' +
    '</svg>'
  );

  T.balloonAdventure = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs>' +
      '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient>' +
      '<linearGradient id="btn" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fb923c"/><stop offset="100%" stop-color="#fbbf24"/></linearGradient>' +
      '<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".35"/></filter>' +
      '</defs>' +
      '<rect width="400" height="300" fill="url(#sky)"/>' +
      '<ellipse cx="200" cy="78" rx="42" ry="52" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>' +
      '<path d="M200 130 L200 168" stroke="#334155" stroke-width="2"/>' +
      '<text x="200" y="210" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#fff" filter="url(#sh)">풍선 탐험대</text>' +
      '<text x="200" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="rgba(255,255,255,.9)">색깔 폭풍 전에 제자리를 찾아요</text>' +
      '<rect x="96" y="252" width="208" height="36" rx="10" fill="url(#btn)"/>' +
      '<text x="200" y="276" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#fff">탐험 시작 🚀</text>' +
    '</svg>'
  );

  T.colorTray = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs>' +
      '<linearGradient id="ctbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>' +
      '<linearGradient id="rb" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ef4444"/><stop offset="20%" stop-color="#f97316"/><stop offset="40%" stop-color="#eab308"/><stop offset="60%" stop-color="#22c55e"/><stop offset="80%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient>' +
      '</defs>' +
      '<rect width="400" height="300" fill="url(#ctbg)"/>' +
      '<path d="M60 72 Q200 8 340 72" fill="none" stroke="url(#rb)" stroke-width="10" stroke-linecap="round"/>' +
      '<text x="200" y="130" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#fff">색깔 공 받기!</text>' +
      '<text x="200" y="158" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">양손으로 트레이 · 무지개 공 피버</text>' +
      '<rect x="56" y="188" width="132" height="44" rx="12" fill="#facc15"/>' +
      '<text x="122" y="217" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="800" fill="#0f172a">👤 1인</text>' +
      '<rect x="212" y="188" width="132" height="44" rx="12" fill="#7c3aed"/>' +
      '<text x="278" y="217" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="800" fill="#fff">👥 2인</text>' +
      '<text x="200" y="268" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#64748b">3분 최고 점수 도전</text>' +
    '</svg>'
  );

  T.writingGame = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#B8E4F7"/><stop offset="100%" stop-color="#2E86DE"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#wg)"/>' +
      '<text x="200" y="86" text-anchor="middle" font-size="48">✏️</text>' +
      '<text x="200" y="142" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#fff">누구나 쓰기게임</text>' +
      '<text x="200" y="174" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="rgba(255,255,255,.92)">자음·모음·숫자 글자 색칠</text>' +
      '<rect x="120" y="200" width="160" height="48" rx="14" fill="rgba(255,255,255,.95)" stroke="rgba(46,134,222,.35)" stroke-width="2"/>' +
      '<text x="152" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="800" fill="#E84040">ㄱ</text>' +
      '<text x="184" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="800" fill="#2E86DE">ㅏ</text>' +
      '<text x="216" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="800" fill="#26de81">1</text>' +
      '<text x="248" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="800" fill="#FF9F43">A</text>' +
      '<text x="200" y="276" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="rgba(255,255,255,.85)">터치로 따라 그리기</text>' +
    '</svg>'
  );

  T.ksotcsSite = svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<defs><linearGradient id="ks" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#0369a1"/></linearGradient></defs>' +
      '<rect width="400" height="300" fill="url(#ks)"/>' +
      '<rect x="88" y="64" width="224" height="100" rx="14" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.35)"/>' +
      '<text x="200" y="108" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="800" fill="#fff">대한아동학교</text>' +
      '<text x="200" y="134" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="800" fill="#fff">작업치료학회</text>' +
      '<text x="200" y="188" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="rgba(255,255,255,.92)">ksotcs.kr</text>' +
      '<text x="200" y="230" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="rgba(255,255,255,.8)">학회 · 정보 · 교육</text>' +
    '</svg>'
  );

  global.OT_HUB_THUMB = T;
})(typeof window !== 'undefined' ? window : this);
