// Gera os SVGs do README (topo, números e botões de contato) nas versões clara e escura.
// Uso: node assets/gerar.mjs
//
// As fontes (Geist e Geist Mono, licença OFL) vão embutidas em cada SVG, porque imagem
// no GitHub não carrega fonte externa. Todas as cores saem dos tokens abaixo.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));

// Tokens em OKLCH [L, C, H]. Neutros frios, acento âmbar.
const temas = {
  dark: {
    paper: [0.195, 0.012, 255],
    node: [0.225, 0.013, 255],
    grid: [0.34, 0.012, 255],
    rule: [0.36, 0.014, 255],
    muted: [0.7, 0.015, 255],
    ink: [0.95, 0.005, 255],
    accent: [0.8, 0.15, 70],
  },
  light: {
    paper: [0.985, 0.003, 255],
    node: [0.965, 0.005, 255],
    grid: [0.86, 0.008, 255],
    rule: [0.86, 0.01, 255],
    muted: [0.5, 0.02, 255],
    ink: [0.23, 0.015, 255],
    accent: [0.6, 0.155, 55],
  },
};

const faces = {
  sans400: ['Geist', 400, 'geist-latin-400-normal.woff2'],
  sans600: ['Geist', 600, 'geist-latin-600-normal.woff2'],
  mono400: ['Geist Mono', 400, 'geist-mono-latin-400-normal.woff2'],
  mono500: ['Geist Mono', 500, 'geist-mono-latin-500-normal.woff2'],
};

const EASE = 'cubic-bezier(.16,1,.3,1)';
const MONO_ADVANCE = 0.6; // Geist Mono: todo glifo tem 600/1000 em

function oklchToHex([L, C, H]) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const encode = (x) => {
    const c = Math.min(1, Math.max(0, x));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  };
  return '#' + rgb.map((x) => Math.round(encode(x) * 255).toString(16).padStart(2, '0')).join('');
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function style(tema, usadas, extra = '') {
  const vars = Object.entries(temas[tema])
    .map(([nome, cor]) => `--${nome}:${oklchToHex(cor)}`)
    .join(';');
  const fontes = usadas
    .map((k) => {
      const [family, weight, arquivo] = faces[k];
      const b64 = readFileSync(join(dir, 'fonts', arquivo)).toString('base64');
      return `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
    })
    .join('');
  return `<style>${fontes}
:root{${vars}}
.sans{font-family:'Geist',ui-sans-serif,system-ui,sans-serif}
.mono{font-family:'Geist Mono',ui-monospace,monospace}
.w4{font-weight:400}.w5{font-weight:500}.w6{font-weight:600}
.ink{fill:var(--ink)}.muted{fill:var(--muted)}.accent{fill:var(--accent)}
.panel{fill:var(--paper);stroke:var(--rule)}
.rule{stroke:var(--rule);fill:none}
${extra}</style>`;
}

function svg(w, h, titulo, corpo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(titulo)}">
<title>${esc(titulo)}</title>
${corpo}
</svg>
`;
}

// Topo: nome, frase e o fluxo de trabalho como uma máquina de estados que termina no deploy.
function hero(tema) {
  const W = 960;
  const H = 336;
  const P = 48;
  const etapas = [
    ['domínio', 'Prisma', 'PostgreSQL'],
    ['api', 'NestJS', 'Fastify'],
    ['web', 'React', 'Next.js'],
    ['app', 'React Native', 'Expo'],
    ['integrações', 'pagamentos', 'mapas · push'],
    ['deploy', 'Docker', 'Actions'],
  ];
  const nodeW = 116;
  const nodeH = 44;
  const nodeY = 204;
  const gap = (W - 2 * P - etapas.length * nodeW) / (etapas.length - 1);
  const midY = nodeY + nodeH / 2;
  const t0 = 0.4;
  const passo = 0.6;
  const ultimo = etapas.length - 1;

  let anim = `
.grid{fill:var(--grid)}
.box{fill:var(--node);stroke:var(--rule)}
.on{fill:none;stroke:var(--accent);stroke-width:1.5;opacity:0}
.on.fim{opacity:1}
.flow{stroke:var(--accent);stroke-width:1.5;opacity:0;transform-box:fill-box;transform-origin:left center}
@keyframes passa{0%{opacity:0}20%{opacity:1}70%{opacity:1}100%{opacity:0}}
@keyframes chega{from{opacity:0}to{opacity:1}}
@keyframes flui{0%{transform:scaleX(0);opacity:1}45%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}`;

  let nodes = '';
  etapas.forEach(([rotulo, a, b], i) => {
    const x = P + i * (nodeW + gap);
    const cx = x + nodeW / 2;
    const atraso = (t0 + i * passo).toFixed(2);
    anim +=
      i === ultimo
        ? `\n.on${i}{animation:chega .4s ${EASE} ${atraso}s both}`
        : `\n.on${i}{animation:passa .9s ${EASE} ${atraso}s both}`;
    nodes += `
<rect class="box" x="${x + 0.5}" y="${nodeY + 0.5}" width="${nodeW - 1}" height="${nodeH - 1}" rx="8"/>
<rect class="on on${i}${i === ultimo ? ' fim' : ''}" x="${x + 0.75}" y="${nodeY + 0.75}" width="${nodeW - 1.5}" height="${nodeH - 1.5}" rx="8"/>
<text class="mono w5 ink" x="${cx}" y="${midY + 5}" font-size="14" text-anchor="middle">${esc(rotulo)}</text>
<text class="mono w4 muted" x="${cx}" y="${nodeY + nodeH + 28}" font-size="13" text-anchor="middle">${esc(a)}</text>
<text class="mono w4 muted" x="${cx}" y="${nodeY + nodeH + 47}" font-size="13" text-anchor="middle">${esc(b)}</text>`;
    if (i < ultimo) {
      const x1 = x + nodeW + 5;
      const x2 = x + nodeW + gap - 5;
      anim += `\n.f${i}{animation:flui .8s ${EASE} ${(t0 + i * passo + 0.3).toFixed(2)}s both}`;
      nodes += `
<path class="rule" d="M${x1} ${midY}H${x2}M${x2 - 4} ${midY - 4}L${x2} ${midY}L${x2 - 4} ${midY + 4}"/>
<path class="flow f${i}" d="M${x1} ${midY}H${x2}"/>`;
    }
  });
  anim += `\n@media (prefers-reduced-motion:reduce){.on,.flow{animation:none}}`;

  const corpo = `${style(tema, ['sans400', 'sans600', 'mono400', 'mono500'], anim)}
<defs>
<pattern id="pontos" width="24" height="24" patternUnits="userSpaceOnUse"><circle class="grid" cx="12" cy="12" r="1"/></pattern>
<linearGradient id="esmaece" x1="0" x2="1" y1="0" y2="0"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient>
<mask id="mascara"><rect width="${W}" height="${H}" fill="url(#esmaece)"/></mask>
<clipPath id="recorte"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="12"/></clipPath>
</defs>
<rect class="panel" x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="12"/>
<rect width="${W}" height="${H}" fill="url(#pontos)" mask="url(#mascara)" clip-path="url(#recorte)"/>
<text class="sans w6 ink" x="${P - 3}" y="106" font-size="64" letter-spacing="-1.9">Luis Seibt</text>
<text class="sans w4 muted" x="${P}" y="148" font-size="21">Desenvolvedor full stack. Do modelo de dados ao deploy.</text>
<text class="mono w4 muted" x="${W - P}" y="72" font-size="13" text-anchor="end">commandix · software house</text>
<text class="mono w4 muted" x="${W - P}" y="94" font-size="13" text-anchor="end">pucpr · engenharia de software</text>
${nodes}`;
  return svg(W, H, 'Luis Seibt, desenvolvedor full stack', corpo);
}

// Faixa de números: só dado real, o mesmo que está no texto do README.
function numeros(tema) {
  const W = 960;
  const H = 160;
  const itens = [
    ['5', 'plataformas full stack', 'API + web'],
    ['3', 'apps iOS e Android', 'com Expo'],
    ['2.500+', 'testes automatizados', 'nos meus projetos'],
    ['180+', 'endpoints REST', 'numa única API'],
  ];
  const col = W / itens.length;
  let corpo = `${style(tema, ['sans600', 'mono400'])}
<rect class="panel" x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="12"/>`;
  itens.forEach(([valor, l1, l2], i) => {
    const x = i * col + 32;
    if (i > 0) corpo += `\n<path class="rule" d="M${i * col} 28V${H - 28}"/>`;
    corpo += `
<rect class="accent" x="${x}" y="30" width="16" height="2"/>
<text class="sans w6 ink" x="${x - 2}" y="88" font-size="52" letter-spacing="-1.6">${esc(valor)}</text>
<text class="mono w4 muted" x="${x}" y="116" font-size="13">${esc(l1)}</text>
<text class="mono w4 muted" x="${x}" y="134" font-size="13">${esc(l2)}</text>`;
  });
  return svg(W, H, 'Em números', corpo);
}

function botao(tema, rotulo) {
  const H = 40;
  const fonte = 14;
  const larguraTexto = rotulo.length * fonte * MONO_ADVANCE;
  const W = Math.ceil(16 + larguraTexto + 12 + 9 + 16);
  const ax = 16 + larguraTexto + 12;
  const extra = `.seta{fill:none;stroke:var(--accent);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}`;
  const corpo = `${style(tema, ['mono500'], extra)}
<rect class="panel" x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="8"/>
<text class="mono w5 ink" x="16" y="${H / 2 + 5}" font-size="${fonte}">${esc(rotulo)}</text>
<path class="seta" d="M${ax} ${H / 2 + 4.5}L${ax + 9} ${H / 2 - 4.5}M${ax + 2} ${H / 2 - 4.5}H${ax + 9}V${H / 2 + 2.5}"/>`;
  return svg(W, H, rotulo, corpo);
}

const saidas = {
  hero,
  numeros,
  'link-linkedin': (t) => botao(t, 'LinkedIn'),
  'link-email': (t) => botao(t, 'luisseibt12@gmail.com'),
  'link-commandix': (t) => botao(t, 'commandix.tech'),
};

for (const tema of Object.keys(temas)) {
  for (const [nome, gerar] of Object.entries(saidas)) {
    writeFileSync(join(dir, `${nome}-${tema}.svg`), gerar(tema));
  }
}

// Cores em hex para os cards externos (streak-stats) que recebem cor por parâmetro.
for (const [tema, tokens] of Object.entries(temas)) {
  const hex = Object.fromEntries(Object.entries(tokens).map(([k, v]) => [k, oklchToHex(v).slice(1)]));
  console.log(tema, JSON.stringify(hex));
}
