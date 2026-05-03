import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

const LOGO_URL = 'https://axia.apexio.com.br/logo-header.png';

// ── Templates ────────────────────────────────────────────────
function templateA({ headline, subtexto, cta }) {
  // Dark luxury — fundo preto, acento ciano, headline grande
  return `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width:1080px; height:1080px; overflow:hidden;
      background:#000;
      font-family:'Montserrat', sans-serif;
      display:flex; flex-direction:column;
    }
    .bg-glow {
      position:absolute; top:-200px; right:-200px;
      width:700px; height:700px; border-radius:50%;
      background: radial-gradient(circle, rgba(0,188,212,0.18) 0%, transparent 70%);
      pointer-events:none;
    }
    .bg-glow2 {
      position:absolute; bottom:-300px; left:-100px;
      width:600px; height:600px; border-radius:50%;
      background: radial-gradient(circle, rgba(26,42,108,0.4) 0%, transparent 70%);
      pointer-events:none;
    }
    .container {
      position:relative; z-index:2;
      display:flex; flex-direction:column;
      height:100%; padding:72px;
    }
    .logo { width:280px; margin-bottom:auto; }
    .tag {
      display:inline-block;
      color:#00bcd4; font-size:22px; font-weight:600;
      letter-spacing:4px; text-transform:uppercase;
      margin-bottom:28px;
    }
    .headline {
      font-size:88px; font-weight:900; line-height:1.0;
      color:#fff;
      margin-bottom:36px;
    }
    .headline span { color:#00bcd4; }
    .subtexto {
      font-size:32px; font-weight:400; color:rgba(255,255,255,0.65);
      line-height:1.5; max-width:820px;
      margin-bottom:56px;
    }
    .cta-bar {
      display:flex; align-items:center; gap:24px;
    }
    .cta {
      background: linear-gradient(135deg, #00bcd4, #1a2a6c);
      color:#fff; font-size:26px; font-weight:700;
      padding:20px 48px; border-radius:60px;
      letter-spacing:1px;
    }
    .line {
      flex:1; height:2px;
      background: linear-gradient(90deg, rgba(0,188,212,0.6), transparent);
    }
    .corner {
      position:absolute; bottom:72px; right:72px;
      font-size:20px; color:rgba(255,255,255,0.2);
      font-weight:600; letter-spacing:2px;
    }
  </style>
  <div class="bg-glow"></div>
  <div class="bg-glow2"></div>
  <div class="container">
    <img class="logo" src="${LOGO_URL}" />
    <div>
      <div class="tag">Gestão de Clínicas</div>
      <div class="headline">${headline}</div>
      <div class="subtexto">${subtexto}</div>
      <div class="cta-bar">
        <div class="cta">${cta}</div>
        <div class="line"></div>
      </div>
    </div>
  </div>
  <div class="corner">axia.apexio.com.br</div>
  `;
}

function templateB({ headline, subtexto, cta }) {
  // Split layout — barra lateral ciano, conteúdo branco sobre escuro
  return `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width:1080px; height:1080px; overflow:hidden;
      background:#050d1a;
      font-family:'Montserrat', sans-serif;
      display:flex;
    }
    .sidebar {
      width:18px;
      background: linear-gradient(180deg, #00bcd4 0%, #1a2a6c 100%);
      flex-shrink:0;
    }
    .main {
      flex:1; display:flex; flex-direction:column;
      padding:72px 72px 72px 64px;
    }
    .logo { width:260px; margin-bottom:auto; }
    .badge {
      display:inline-flex; align-items:center; gap:12px;
      margin-bottom:32px;
    }
    .badge-dot {
      width:12px; height:12px; border-radius:50%;
      background:#00bcd4;
    }
    .badge-text {
      color:#00bcd4; font-size:20px; font-weight:600;
      letter-spacing:3px; text-transform:uppercase;
    }
    .headline {
      font-size:80px; font-weight:900; line-height:1.05;
      color:#ffffff; margin-bottom:40px;
    }
    .headline em { font-style:normal; color:#00bcd4; }
    .subtexto {
      font-size:30px; color:rgba(255,255,255,0.6);
      line-height:1.6; margin-bottom:60px; max-width:780px;
    }
    .cta {
      display:inline-block;
      border:2px solid #00bcd4;
      color:#00bcd4; font-size:24px; font-weight:700;
      padding:18px 44px; border-radius:8px;
      letter-spacing:1px;
    }
    .grid-bg {
      position:absolute; top:0; left:18px; right:0; bottom:0;
      background-image:
        linear-gradient(rgba(0,188,212,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,188,212,0.04) 1px, transparent 1px);
      background-size:60px 60px;
      pointer-events:none;
    }
    .corner {
      position:absolute; bottom:48px; right:72px;
      font-size:18px; color:rgba(255,255,255,0.18);
      font-weight:600; letter-spacing:2px;
    }
  </style>
  <div class="sidebar"></div>
  <div class="grid-bg"></div>
  <div class="main">
    <img class="logo" src="${LOGO_URL}" />
    <div>
      <div class="badge">
        <div class="badge-dot"></div>
        <div class="badge-text">Dica para clínicas</div>
      </div>
      <div class="headline">${headline}</div>
      <div class="subtexto">${subtexto}</div>
      <div class="cta">${cta}</div>
    </div>
  </div>
  <div class="corner">axia.apexio.com.br</div>
  `;
}

function templateC({ headline, subtexto, cta }) {
  // Gradient mesh — fundo gradiente profundo, número grande como decoração
  return `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width:1080px; height:1080px; overflow:hidden;
      background: linear-gradient(135deg, #000 0%, #0a1628 50%, #001a20 100%);
      font-family:'Montserrat', sans-serif;
      display:flex; flex-direction:column;
    }
    .top-bar {
      height:6px;
      background: linear-gradient(90deg, #1a2a6c, #00bcd4, #1a2a6c);
    }
    .container {
      flex:1; display:flex; flex-direction:column;
      padding:64px 72px 72px;
      position:relative;
    }
    .logo { width:240px; margin-bottom:auto; }
    .big-number {
      position:absolute; right:48px; top:50%;
      transform:translateY(-60%);
      font-size:420px; font-weight:900;
      color:rgba(0,188,212,0.04);
      line-height:1; pointer-events:none;
      user-select:none;
    }
    .content { position:relative; z-index:2; }
    .label {
      font-size:18px; font-weight:600; letter-spacing:5px;
      text-transform:uppercase;
      color:rgba(0,188,212,0.8);
      margin-bottom:24px;
    }
    .headline {
      font-size:82px; font-weight:900; line-height:1.05;
      color:#fff; margin-bottom:36px;
    }
    .headline strong {
      background: linear-gradient(90deg, #00bcd4, #7ee8f5);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    }
    .subtexto {
      font-size:28px; color:rgba(255,255,255,0.55);
      line-height:1.65; margin-bottom:56px; max-width:740px;
    }
    .cta-wrap { display:flex; align-items:center; gap:20px; }
    .cta {
      background:#00bcd4; color:#000;
      font-size:22px; font-weight:800;
      padding:18px 42px; border-radius:60px;
      letter-spacing:0.5px;
    }
    .dots {
      display:flex; gap:8px;
    }
    .dot {
      width:8px; height:8px; border-radius:50%;
      background:rgba(0,188,212,0.3);
    }
    .dot:first-child { background:#00bcd4; }
    .corner {
      position:absolute; bottom:48px; right:72px;
      font-size:18px; color:rgba(255,255,255,0.15);
      font-weight:600; letter-spacing:2px;
    }
  </style>
  <div class="top-bar"></div>
  <div class="container">
    <img class="logo" src="${LOGO_URL}" />
    <div class="big-number">A</div>
    <div class="content">
      <div class="label">Axia Health · Insights</div>
      <div class="headline">${headline}</div>
      <div class="subtexto">${subtexto}</div>
      <div class="cta-wrap">
        <div class="cta">${cta}</div>
        <div class="dots">
          <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="corner">axia.apexio.com.br</div>
  `;
}

const TEMPLATES = { A: templateA, B: templateB, C: templateC };

// ── Handler ──────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    headline = 'Sua clínica mais organizada',
    subtexto = 'Gerencie agendamentos, pacientes e finanças em um só lugar.',
    cta = 'Saiba mais',
    template = 'A',   // A | B | C
  } = req.body;

  const templateFn = TEMPLATES[template.toUpperCase()] || templateA;
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body>${templateFn({ headline, subtexto, cta })}</body>
    </html>
  `;

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1080, height: 1080 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Aguarda fonte carregar
    await page.waitForTimeout(800);

    const screenshot = await page.screenshot({ type: 'png' });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).send(screenshot);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
}
