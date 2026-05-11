import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const LOGO_URL = 'https://axia.apexio.com.br/logo-header.png';

const FORMATOS = {
  quadrado: { width: 1080, height: 1080 },
  retrato:  { width: 1080, height: 1350 },
  stories:  { width: 1080, height: 1920 },
};

function getFonts() {
  return [
    { name: 'Montserrat', data: readFileSync(join(ROOT, 'Montserrat-Regular.ttf')), weight: 400, style: 'normal' },
    { name: 'Montserrat', data: readFileSync(join(ROOT, 'Montserrat-Bold.ttf')),    weight: 700, style: 'normal' },
    { name: 'Montserrat', data: readFileSync(join(ROOT, 'Montserrat-Black.ttf')),   weight: 900, style: 'normal' },
  ];
}

async function getLogoDataUrl() {
  const res = await fetch(LOGO_URL);
  const buf = await res.arrayBuffer();
  const b64 = Buffer.from(buf).toString('base64');
  return `data:image/png;base64,${b64}`;
}

// ── Template A — Conversão ────────────────────────────────────
function templateA({ headline, subtexto, cta, logoDataUrl, width, height }) {
  const isRetrato  = height === 1350;
  const isStories  = height === 1920;
  const headlineSize = isStories ? 96  : isRetrato ? 90  : 86;
  const subtextoSize = isStories ? 34  : isRetrato ? 32  : 30;
  const ctaSize      = isStories ? 30  : isRetrato ? 28  : 26;
  const padding      = isStories ? 96  : 72;
  const logoW        = isStories ? 300 : 260;
  const extraSpace   = isStories ? 200 : isRetrato ? 80 : 0;

  return {
    type: 'div',
    props: {
      style: { width, height, background: '#000000', fontFamily: 'Montserrat', display: 'flex', flexDirection: 'column', padding: `${padding}px`, position: 'relative' },
      children: [
        { type: 'div', props: { style: { position: 'absolute', top: -150, right: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,188,212,0.2) 0%, transparent 70%)' } } },
        { type: 'div', props: { style: { position: 'absolute', bottom: -200, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,42,108,0.5) 0%, transparent 70%)' } } },
        { type: 'img', props: { src: logoDataUrl, style: { width: logoW, marginBottom: extraSpace || 'auto' } } },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', marginTop: extraSpace ? 0 : 'auto' },
            children: [
              { type: 'div', props: { style: { color: '#00bcd4', fontSize: 22, fontWeight: 700, letterSpacing: 4, marginBottom: 28 }, children: 'GESTAO DE CLINICAS' } },
              { type: 'div', props: { style: { color: '#ffffff', fontSize: headlineSize, fontWeight: 900, lineHeight: 1.0, marginBottom: 36 }, children: headline } },
              { type: 'div', props: { style: { color: 'rgba(255,255,255,0.65)', fontSize: subtextoSize, lineHeight: 1.5, marginBottom: 56, maxWidth: 820 }, children: subtexto } },
              { type: 'div', props: { style: { background: 'linear-gradient(135deg, #00bcd4, #1a2a6c)', color: '#fff', fontSize: ctaSize, fontWeight: 700, padding: '20px 48px', borderRadius: 60, alignSelf: 'flex-start' }, children: cta } },
            ]
          }
        },
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: padding, color: 'rgba(255,255,255,0.2)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

// ── Template B — Educação ─────────────────────────────────────
function templateB({ headline, subtexto, cta, logoDataUrl, width, height }) {
  const isRetrato  = height === 1350;
  const isStories  = height === 1920;
  const headlineSize = isStories ? 88 : isRetrato ? 82 : 78;
  const subtextoSize = isStories ? 32 : isRetrato ? 30 : 28;
  const ctaSize      = isStories ? 28 : isRetrato ? 26 : 24;
  const padding      = isStories ? 96 : 72;
  const logoW        = isStories ? 280 : 240;
  const extraSpace   = isStories ? 220 : isRetrato ? 100 : 0;

  return {
    type: 'div',
    props: {
      style: { width, height, background: '#050d1a', fontFamily: 'Montserrat', display: 'flex', flexDirection: 'row', position: 'relative' },
      children: [
        { type: 'div', props: { style: { width: 18, height, background: 'linear-gradient(180deg, #00bcd4 0%, #1a2a6c 100%)', flexShrink: 0 } } },
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: `${padding}px ${padding}px ${padding}px 64px` },
            children: [
              { type: 'img', props: { src: logoDataUrl, style: { width: logoW, marginBottom: extraSpace || 'auto' } } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', marginTop: extraSpace ? 0 : 'auto' },
                  children: [
                    { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }, children: [{ type: 'div', props: { style: { width: 12, height: 12, borderRadius: '50%', background: '#00bcd4' } } }, { type: 'div', props: { style: { color: '#00bcd4', fontSize: 20, fontWeight: 700, letterSpacing: 3 }, children: 'DICA PARA CLINICAS' } }] } },
                    { type: 'div', props: { style: { color: '#fff', fontSize: headlineSize, fontWeight: 900, lineHeight: 1.05, marginBottom: 36 }, children: headline } },
                    { type: 'div', props: { style: { color: 'rgba(255,255,255,0.6)', fontSize: subtextoSize, lineHeight: 1.6, marginBottom: 56, maxWidth: 780 }, children: subtexto } },
                    { type: 'div', props: { style: { border: '2px solid #00bcd4', color: '#00bcd4', fontSize: ctaSize, fontWeight: 700, padding: '18px 44px', borderRadius: 8, alignSelf: 'flex-start' }, children: cta } },
                  ]
                }
              }
            ]
          }
        },
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: padding, color: 'rgba(255,255,255,0.18)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

// ── Template C — Autoridade / Bastidores ──────────────────────
function templateC({ headline, subtexto, cta, logoDataUrl, width, height }) {
  const isRetrato  = height === 1350;
  const isStories  = height === 1920;
  const headlineSize = isStories ? 92 : isRetrato ? 86 : 80;
  const subtextoSize = isStories ? 32 : isRetrato ? 30 : 28;
  const ctaSize      = isStories ? 26 : isRetrato ? 24 : 22;
  const padding      = isStories ? 96 : 72;
  const logoW        = isStories ? 260 : 220;
  const extraSpace   = isStories ? 240 : isRetrato ? 120 : 0;

  return {
    type: 'div',
    props: {
      style: { width, height, background: 'linear-gradient(135deg, #000000 0%, #0a1628 50%, #001a20 100%)', fontFamily: 'Montserrat', display: 'flex', flexDirection: 'column', position: 'relative' },
      children: [
        { type: 'div', props: { style: { height: 6, background: 'linear-gradient(90deg, #1a2a6c, #00bcd4, #1a2a6c)', width } } },
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: `64px ${padding}px ${padding}px`, position: 'relative' },
            children: [
              { type: 'img', props: { src: logoDataUrl, style: { width: logoW, marginBottom: extraSpace || 'auto' } } },
              { type: 'div', props: { style: { position: 'absolute', right: 40, top: '35%', fontSize: 380, fontWeight: 900, color: 'rgba(0,188,212,0.05)', lineHeight: 1 }, children: 'A' } },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', position: 'relative', marginTop: extraSpace ? 0 : 'auto' },
                  children: [
                    { type: 'div', props: { style: { color: 'rgba(0,188,212,0.8)', fontSize: 18, fontWeight: 700, letterSpacing: 5, marginBottom: 24 }, children: 'AXIA HEALTH · INSIGHTS' } },
                    { type: 'div', props: { style: { color: '#fff', fontSize: headlineSize, fontWeight: 900, lineHeight: 1.05, marginBottom: 36 }, children: headline } },
                    { type: 'div', props: { style: { color: 'rgba(255,255,255,0.55)', fontSize: subtextoSize, lineHeight: 1.65, marginBottom: 56, maxWidth: 740 }, children: subtexto } },
                    { type: 'div', props: { style: { background: '#00bcd4', color: '#000', fontSize: ctaSize, fontWeight: 900, padding: '18px 42px', borderRadius: 60, alignSelf: 'flex-start' }, children: cta } },
                  ]
                }
              },
              { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: padding, color: 'rgba(255,255,255,0.15)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
            ]
          }
        }
      ]
    }
  };
}

// ── Template D — Dor ──────────────────────────────────────────
// Fundo escuro quase preto com toque vinho. Headline enorme e
// emocional. Linha vermelha no topo. Subtexto como diagnóstico.
// CTA sutil — não é hora de vender, é hora de identificar.
function templateD({ headline, subtexto, cta, logoDataUrl, width, height }) {
  const isRetrato  = height === 1350;
  const isStories  = height === 1920;
  const headlineSize = isStories ? 100 : isRetrato ? 94 : 88;
  const subtextoSize = isStories ? 34  : isRetrato ? 32 : 30;
  const ctaSize      = isStories ? 26  : isRetrato ? 24 : 22;
  const padding      = isStories ? 96  : 72;
  const logoW        = isStories ? 260 : 220;
  const extraSpace   = isStories ? 220 : isRetrato ? 100 : 0;

  return {
    type: 'div',
    props: {
      style: {
        width, height,
        background: 'linear-gradient(160deg, #0a0000 0%, #120008 50%, #000000 100%)',
        fontFamily: 'Montserrat',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // barra topo vermelha
        { type: 'div', props: { style: { height: 6, background: 'linear-gradient(90deg, #7f0000, #c62828, #7f0000)', width, flexShrink: 0 } } },

        // mancha de luz vermelha no canto superior direito
        { type: 'div', props: { style: { position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,0,0,0.18) 0%, transparent 65%)' } } },

        // mancha de luz ciano apagado no canto inferior esquerdo
        { type: 'div', props: { style: { position: 'absolute', bottom: -200, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,188,212,0.06) 0%, transparent 70%)' } } },

        // conteúdo principal
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: `56px ${padding}px ${padding}px` },
            children: [
              // logo
              { type: 'img', props: { src: logoDataUrl, style: { width: logoW, marginBottom: extraSpace || 'auto' } } },

              // bloco de texto
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', marginTop: extraSpace ? 0 : 'auto' },
                  children: [
                    // tag categoria
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 },
                        children: [
                          { type: 'div', props: { style: { width: 32, height: 3, background: '#c62828' } } },
                          { type: 'div', props: { style: { color: '#c62828', fontSize: 18, fontWeight: 700, letterSpacing: 4 }, children: 'REALIDADE DAS CLINICAS' } },
                        ]
                      }
                    },

                    // headline
                    { type: 'div', props: { style: { color: '#ffffff', fontSize: headlineSize, fontWeight: 900, lineHeight: 1.0, marginBottom: 40 }, children: headline } },

                    // subtexto
                    { type: 'div', props: { style: { color: 'rgba(255,255,255,0.58)', fontSize: subtextoSize, lineHeight: 1.6, marginBottom: 60, maxWidth: 820 }, children: subtexto } },

                    // CTA — borda fina vermelha
                    {
                      type: 'div',
                      props: {
                        style: { border: '1px solid rgba(198,40,40,0.6)', color: 'rgba(255,255,255,0.75)', fontSize: ctaSize, fontWeight: 700, padding: '16px 40px', borderRadius: 6, alignSelf: 'flex-start' },
                        children: cta
                      }
                    },
                  ]
                }
              }
            ]
          }
        },

        // rodapé
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: padding, color: 'rgba(255,255,255,0.15)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

// ── Template E — Prova Social ─────────────────────────────────
// Quote grande em destaque. Badge de resultado numérico.
// Tom: confiança, prova concreta, humanidade.
function templateE({ headline, subtexto, cta, logoDataUrl, width, height }) {
  const isRetrato  = height === 1350;
  const isStories  = height === 1920;
  const quoteSize    = isStories ? 52  : isRetrato ? 48 : 44;
  const nameSize     = isStories ? 28  : isRetrato ? 26 : 24;
  const ctaSize      = isStories ? 26  : isRetrato ? 24 : 22;
  const padding      = isStories ? 96  : 72;
  const logoW        = isStories ? 240 : 200;
  const extraSpace   = isStories ? 200 : isRetrato ? 80 : 0;
  const aspasSize    = isStories ? 260 : isRetrato ? 220 : 200;

  return {
    type: 'div',
    props: {
      style: {
        width, height,
        background: 'linear-gradient(150deg, #000d1a 0%, #001a14 60%, #000000 100%)',
        fontFamily: 'Montserrat',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // barra topo ciano
        { type: 'div', props: { style: { height: 5, background: 'linear-gradient(90deg, #00bcd4, #00838f, #00bcd4)', width, flexShrink: 0 } } },

        // aspas decorativas de fundo
        { type: 'div', props: { style: { position: 'absolute', top: isStories ? 200 : 120, left: padding - 20, fontSize: aspasSize, fontWeight: 900, color: 'rgba(0,188,212,0.07)', lineHeight: 1, fontFamily: 'Montserrat' }, children: '\u201C' } },

        // brilho ciano fundo
        { type: 'div', props: { style: { position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,188,212,0.08) 0%, transparent 70%)' } } },

        // conteúdo
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: `56px ${padding}px ${padding}px` },
            children: [
              // logo
              { type: 'img', props: { src: logoDataUrl, style: { width: logoW, marginBottom: extraSpace || 'auto' } } },

              // bloco central
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', marginTop: extraSpace ? 0 : 'auto' },
                  children: [
                    // tag
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 },
                        children: [
                          { type: 'div', props: { style: { width: 8, height: 8, borderRadius: '50%', background: '#00bcd4' } } },
                          { type: 'div', props: { style: { color: '#00bcd4', fontSize: 18, fontWeight: 700, letterSpacing: 4 }, children: 'QUEM USA, APROVA' } },
                        ]
                      }
                    },

                    // quote — headline é o depoimento
                    { type: 'div', props: { style: { color: '#ffffff', fontSize: quoteSize, fontWeight: 700, lineHeight: 1.3, marginBottom: 44, maxWidth: 880 }, children: '\u201C' + headline + '\u201D' } },

                    // linha separadora + nome da clinica — subtexto é "Nome · Cargo · Cidade"
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 56 },
                        children: [
                          { type: 'div', props: { style: { width: 48, height: 2, background: '#00bcd4' } } },
                          { type: 'div', props: { style: { color: 'rgba(255,255,255,0.65)', fontSize: nameSize, fontWeight: 600, lineHeight: 1.4 }, children: subtexto } },
                        ]
                      }
                    },

                    // CTA
                    { type: 'div', props: { style: { background: 'linear-gradient(135deg, #00bcd4, #006064)', color: '#000', fontSize: ctaSize, fontWeight: 900, padding: '18px 44px', borderRadius: 60, alignSelf: 'flex-start' }, children: cta } },
                  ]
                }
              }
            ]
          }
        },

        // rodapé
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: padding, color: 'rgba(255,255,255,0.15)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

// ── Template F — Engajamento ──────────────────────────────────
// Pergunta enorme centralizada. Layout mais ousado, com número
// decorativo de fundo e divisor visual. Convida à interação.
function templateF({ headline, subtexto, cta, logoDataUrl, width, height }) {
  const isRetrato  = height === 1350;
  const isStories  = height === 1920;
  const headlineSize = isStories ? 96  : isRetrato ? 88 : 82;
  const subtextoSize = isStories ? 32  : isRetrato ? 30 : 28;
  const ctaSize      = isStories ? 26  : isRetrato ? 24 : 22;
  const padding      = isStories ? 96  : 72;
  const logoW        = isStories ? 240 : 200;
  const extraSpace   = isStories ? 220 : isRetrato ? 100 : 0;

  return {
    type: 'div',
    props: {
      style: {
        width, height,
        background: '#000000',
        fontFamily: 'Montserrat',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // barra lateral direita — acento visual
        { type: 'div', props: { style: { position: 'absolute', right: 0, top: 0, width: 8, height, background: 'linear-gradient(180deg, #00bcd4 0%, rgba(0,188,212,0.1) 100%)' } } },

        // "?" decorativo de fundo
        { type: 'div', props: { style: { position: 'absolute', right: isStories ? 60 : 40, bottom: isStories ? 180 : 120, fontSize: isStories ? 560 : 460, fontWeight: 900, color: 'rgba(0,188,212,0.04)', lineHeight: 1 }, children: '?' } },

        // brilho ciano superior esquerdo
        { type: 'div', props: { style: { position: 'absolute', top: -150, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,188,212,0.1) 0%, transparent 65%)' } } },

        // conteúdo
        {
          type: 'div',
          props: {
            style: { flex: 1, display: 'flex', flexDirection: 'column', padding: `56px ${padding}px ${padding}px` },
            children: [
              // logo
              { type: 'img', props: { src: logoDataUrl, style: { width: logoW, marginBottom: extraSpace || 'auto' } } },

              // bloco texto
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', marginTop: extraSpace ? 0 : 'auto' },
                  children: [
                    // tag
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 },
                        children: [
                          { type: 'div', props: { style: { width: 32, height: 3, background: '#00bcd4' } } },
                          { type: 'div', props: { style: { color: '#00bcd4', fontSize: 18, fontWeight: 700, letterSpacing: 4 }, children: 'RESPONDE NOS COMENTARIOS' } },
                        ]
                      }
                    },

                    // headline = a pergunta
                    { type: 'div', props: { style: { color: '#ffffff', fontSize: headlineSize, fontWeight: 900, lineHeight: 1.0, marginBottom: 40 }, children: headline } },

                    // divisor ciano
                    { type: 'div', props: { style: { width: 80, height: 3, background: '#00bcd4', marginBottom: 36 } } },

                    // subtexto = contexto da pergunta
                    { type: 'div', props: { style: { color: 'rgba(255,255,255,0.55)', fontSize: subtextoSize, lineHeight: 1.6, marginBottom: 56, maxWidth: 820 }, children: subtexto } },

                    // CTA — tom de participação
                    {
                      type: 'div',
                      props: {
                        style: { border: '2px solid #00bcd4', color: '#00bcd4', fontSize: ctaSize, fontWeight: 700, padding: '18px 44px', borderRadius: 8, alignSelf: 'flex-start' },
                        children: cta
                      }
                    },
                  ]
                }
              }
            ]
          }
        },

        // rodapé
        { type: 'div', props: { style: { position: 'absolute', bottom: 48, right: padding + 16, color: 'rgba(255,255,255,0.15)', fontSize: 18, fontWeight: 600, letterSpacing: 2 }, children: 'axia.apexio.com.br' } }
      ]
    }
  };
}

const TEMPLATES = {
  A: templateA,  // Conversão
  B: templateB,  // Educação
  C: templateC,  // Autoridade / Bastidores
  D: templateD,  // Dor
  E: templateE,  // Prova Social
  F: templateF,  // Engajamento
};

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
    formato = 'quadrado',
  } = req.body;

  const { width, height } = FORMATOS[formato] || FORMATOS.quadrado;

  try {
    const fonts = getFonts();
    const logoDataUrl = await getLogoDataUrl();
    const templateFn = TEMPLATES[template.toUpperCase()] || templateA;
    const element = templateFn({ headline, subtexto, cta, logoDataUrl, width, height });

    const svg = await satori(element, { width, height, fonts });
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).send(png);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}