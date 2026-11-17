// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、地球とチェックの印（国連のSDGsのアイコン・輪は使わない）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="46" cy="52" r="30" fill="#2f6fae" stroke="#fffdf7" stroke-width="3"/>
      <g fill="none" stroke="#fffdf7" stroke-opacity=".55" stroke-width="2"><ellipse cx="46" cy="52" rx="13" ry="30"/><line x1="16" y1="52" x2="76" y2="52"/><path d="M20 37 Q46 44 72 37"/><path d="M20 67 Q46 60 72 67"/></g>
      <polyline points="56,30 66,42 88,14" fill="none" stroke="#f6d77a" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
