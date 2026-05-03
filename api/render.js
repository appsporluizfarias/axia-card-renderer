import satori from 'satori';
import sharp from 'sharp';

const LOGO_URL = 'https://axia.apexio.com.br/logo-header.png';

async function getFonts() {
  // Satori só aceita TTF — usando GitHub como CDN de fontes
  const [regular, bold, black] = await Promise.all([
    fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf').then(r => r.arrayBuffer()),
    fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf').then(r => r.arrayBuffer()),
    fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf').then(r => r.arrayBuffer()),
  ]);
  return [
    { name: 'Montserrat', data: regular, weight: 400, style: 'normal' },
    { name: 'Montserrat', data: bold,    weight: 700, style: 'normal' },
    { name: 'Montserrat', data: black,   weight: 900, style: 'normal' },
  ];
}

async function getLogoDataUrl() {
  const res = await fetch(LOGO_URL);
  const buf = await res.arrayBuffer();
  const b64 = Buffer.from(buf).toString('base64');
  return `data:image/png;base64,${b64}`;
}

function templateA({ headline, subtexto, cta, logoDataUrl }) {
  return {
    type: 'div',
    props: {
      style: { width: 1080, height: 1080, background: '#000000', fontFamily: 'Montserrat', display: 'flex', flexDirection: 'column', padding: '72px', position: 'relative' },
      children: [
        { type: 'div', props: { style: { position: 'absolute', top: -150, right: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,188,212,0.2) 0%, transparent 70%)' } } },
        { type: 'div', props: { style: { position: 'absolute', bottom: -200, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,42,108,0.5) 0%, transparent 70%)' } } },
        { type: 'img', props: { src: logoDataUrl, style: { width: 260, marginBottom: 'auto' } } },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' },
            children: [
              { type: 'div', props: { style: { color: '#00bcd4', fontSize: 22, fontWeight: 700, letterSpacing: 4, marginBottom: 28 }, children: 'GESTAO DE CLINICAS' } },
              { type: 'div', props: { style: { color: '#ffffff', fontSize: 86, fontWeight: 900, lineHeight: 1.0, marginBottom: 36 }, children: headline } },
              { type: 'div', props: { style: { color: 'rgba(255,255,255,0.65)', fontSize: 30, lineHeight: 1.5, marginBottom: 56, maxWidth: 820 }, children: subtexto } },
              { type: 'div', props: { style: { background: 'linear-gradient(135deg, #00bcd4, #1a2a6c)', color: '#fff', fontSize: 26, fontWeight: 700, padding: '20px 48px', borderRadius: 60, alignSelf: 'flex-start' }, children: cta } },
            ]
          }
        },
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: 72, color: 'rgba(255,255,255,0.2)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

function templateB({ headline, subtexto, cta, logoDataUrl }) {
  return {
    type: 'div',
    props: {
      style: { width: 1080, height: 1080, background: '#050d1a', fontFamily: 'Montserrat', display: 'flex', flexDirection: 'row', position: 'relative' },
      children: [
        { type: 'div', props: { style: { width: 18, height: 1080, background: 'linear-gradient(180deg, #00bcd4 0%, #1a2a6c 100%)', flexShrink: 0 } } },
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: '72px 72px 72px 64px' },
            children: [
              { type: 'img', props: { src: logoDataUrl, style: { width: 240, marginBottom: 'auto' } } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }, children: [{ type: 'div', props: { style: { width: 12, height: 12, borderRadius: '50%', background: '#00bcd4' } } }, { type: 'div', props: { style: { color: '#00bcd4', fontSize: 20, fontWeight: 700, letterSpacing: 3 }, children: 'DICA PARA CLINICAS' } }] } },
                    { type: 'div', props: { style: { color: '#fff', fontSize: 78, fontWeight: 900, lineHeight: 1.05, marginBottom: 36 }, children: headline } },
                    { type: 'div', props: { style: { color: 'rgba(255,255,255,0.6)', fontSize: 28, lineHeight: 1.6, marginBottom: 56, maxWidth: 780 }, children: subtexto } },
                    { type: 'div', props: { style: { border: '2px solid #00bcd4', color: '#00bcd4', fontSize: 24, fontWeight: 700, padding: '18px 44px', borderRadius: 8, alignSelf: 'flex-start' }, children: cta } },
                  ]
                }
              }
            ]
          }
        },
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: 72, color: 'rgba(255,255,255,0.18)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

function templateC({ headline, subtexto, cta, logoDataUrl }) {
  return {
    type: 'div',
    props: {
      style: { width: 1080, height: 1080, background: 'linear-gradient(135deg, #000000 0%, #0a1628 50%, #001a20 100%)', fontFamily: 'Montserrat', display: 'flex', flexDirection: 'column', position: 'relative' },
      children: [
        { type: 'div', props: { style: { height: 6, background: 'linear-gradient(90deg, #1a2a6c, #00bcd4, #1a2a6c)', width: 1080 } } },
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: '64px 72px 72px', position: 'relative' },
            children: [
              { type: 'img', props: { src: logoDataUrl, style: { width: 220, marginBottom: 'auto' } } },
              { type: 'div', props: { style: { position: 'absolute', right: 40, top: '35%', fontSize: 380, fontWeight: 900, color: 'rgba(0,188,212,0.05)', lineHeight: 1 }, children: 'A' } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', position: 'relative' },
                  children: [
                    { type: 'div', props: { style: { color: 'rgba(0,188,212,0.8)', fontSize: 18, fontWeight: 700, letterSpacing: 5, marginBottom: 24 }, children: 'AXIA HEALTH · INSIGHTS' } },
                    { type: 'div', props: { style: { color: '#fff', fontSize: 80, fontWeight: 900, lineHeight: 1.05, marginBottom: 36 }, children: headline } },
                    { type: 'div', props: { style: { color: 'rgba(255,255,255,0.55)', fontSize: 28, lineHeight: 1.65, marginBottom: 56, maxWidth: 740 }, children: subtexto } },
                    { type: 'div', props: { style: { background: '#00bcd4', color: '#000', fontSize: 22, fontWeight: 900, padding: '18px 42px', borderRadius: 60, alignSelf: 'flex-start' }, children: cta } },
                  ]
                }
              },
              { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: 72, color: 'rgba(255,255,255,0.15)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
            ]
          }
        }
      ]
    }
  };
}

const TEMPLATES = { A: templateA, B: templateB, C: templateC };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    headline = 'Sua clinica mais organizada',
    subtexto = 'Gerencie agendamentos, pacientes e financas em um so lugar.',
    cta = 'Saiba mais',
    template = 'A',
  } = req.body;

  try {
    const [fonts, logoDataUrl] = await Promise.all([getFonts(), getLogoDataUrl()]);
    const templateFn = TEMPLATES[template.toUpperCase()] || templateA;
    const element = templateFn({ headline, subtexto, cta, logoDataUrl });

    const svg = await satori(element, { width: 1080, height: 1080, fonts });
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).send(png);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
