/* =========================================================
   Portfólio — Kelverly Santos
   1. Dados dos projetos
   2. Ilustrações SVG dos projetos
   3. Grid, filtro e modal
   4. Gráfico interativo do hero
   5. Formulário (e-mail via FormSubmit + WhatsApp)
   6. Utilidades (toast, copiar, nav)
   ========================================================= */

const CONTATO = {
  email: "kelverlysantos09@gmail.com",
  whatsapp: "5511934743681",
};

/* ---------- 1. Projetos ---------- */
const PROJETOS = [
  {
    id: "tradelab",
    nome: "TradeLab",
    destaque: true,
    badge: "104 testes automatizados",
    tags: ["financas", "api"],
    resumo: "Laboratório quantitativo para criar, simular e avaliar estratégias de investimento com custos, stop-loss e métricas de desempenho.",
    descricao: "Plataforma de simulação de estratégias: os dados de mercado passam por validação OHLCV, as estratégias geram sinais, o módulo de risco aplica stop-loss e o motor de backtest calcula posição, custos e patrimônio. Não opera dinheiro real — o foco é medir com rigor.",
    destaques: [
      "Motor de backtest próprio com custos, slippage e turnover",
      "Stop-loss auditável, com registro de cada evento de risco",
      "Comparação de cenários com várias seeds",
      "API REST em FastAPI com Swagger e deploy na Vercel",
      "104 testes com pytest e roadmap público",
    ],
    stack: ["Python", "FastAPI", "pandas", "NumPy", "Plotly", "pytest"],
    github: "https://github.com/kelverlysant/TradeLab",
    art: "tradelab",
  },
  {
    id: "comparador",
    nome: "Comparador de Ativos",
    badge: "Publicado",
    tags: ["financas", "dados"],
    resumo: "Dashboard que compara ações da B3, moedas e criptomoedas em retorno, risco e correlação.",
    descricao: "Escolha qualquer combinação de tickers (PETR4.SA, USDBRL=X, BTC-USD…) e o dashboard coloca todos na mesma escala, calcula risco e mostra como os ativos se movem juntos — com dados do Yahoo Finance.",
    destaques: [
      "Performance normalizada em base 100",
      "Volatilidade anualizada e drawdown máximo",
      "Matriz de correlação e médias móveis (20, 50, 200)",
      "Tratamento de tickers inválidos e períodos curtos",
    ],
    stack: ["Python", "Streamlit", "yfinance", "pandas", "Plotly"],
    github: "https://github.com/kelverlysant/comparador-de-ativos",
    demo: "https://comparador-de-ativos.streamlit.app/",
    art: "comparador",
  },
  {
    id: "health",
    nome: "API Health Monitor",
    badge: "Monitoramento",
    tags: ["api", "dados"],
    resumo: "Verifica periodicamente disponibilidade, latência e formato da resposta de várias APIs, com histórico e dashboard.",
    descricao: "Integrações falham de três jeitos: ficam fora do ar, ficam lentas ou mudam o formato da resposta. O monitor detecta os três cenários e centraliza o histórico em um painel.",
    destaques: [
      "Checagens agendadas com timeout configurável",
      "Validação de schema dos campos esperados",
      "Três estados: operacional, resposta inválida, indisponível",
      "Uptime de 24h e latência ao longo do tempo",
    ],
    stack: ["Python", "requests", "APScheduler", "SQLite", "Streamlit", "Plotly"],
    github: "https://github.com/kelverlysant/API-Health-Monitor",
    art: "health",
  },
  {
    id: "autoreport",
    nome: "AutoReport",
    badge: "Nasceu no trabalho",
    tags: ["dados"],
    resumo: "Recebe um relatório bruto de call center (CSV ou Excel) e gera em segundos um dashboard com SLA, TMA, abandono e ranking.",
    descricao: "Criado a partir de um problema real da minha rotina: montar indicadores de atendimento à mão. O AutoReport mapeia as colunas automaticamente, limpa e valida a base e entrega os KPIs prontos.",
    destaques: [
      "Upload de CSV, XLSX, XLS e XLSM com mapeamento automático",
      "Pipeline de qualidade com relatório de linhas removidas",
      "SLA vs. meta, TMA, abandono e ranking de operadores",
      "Visão por hora, filas e ocupação",
    ],
    stack: ["Python", "Streamlit", "pandas", "Plotly"],
    github: "https://github.com/kelverlysant/Auto-Report",
    art: "autoreport",
  },
  {
    id: "deventuras",
    nome: "DEVenturas",
    badge: "React",
    tags: ["front"],
    resumo: "Quiz de programação com tema de RPG: o jogador escolhe uma categoria e enfrenta perguntas para subir de nível.",
    descricao: "Aplicação em React com estado global via Context API, fluxo de boas-vindas, escolha de categoria, perguntas e tela de fim de jogo.",
    destaques: [
      "Estado do jogo com Context API e reducer",
      "Componentes reutilizáveis para perguntas e opções",
      "Build com Vite e lint com ESLint",
    ],
    stack: ["React", "JavaScript", "Vite", "CSS"],
    github: "https://github.com/kelverlysant/DEVenturasApp",
    art: "deventuras",
  },
];

const MINI = [
  { nome: "Gerador de box-shadow", desc: "Ferramenta visual em JavaScript", url: "https://github.com/kelverlysant/boxshadow-gerador" },
  { nome: "Gerador de QR Code", desc: "JavaScript", url: "https://github.com/kelverlysant/projet-geradorDeQr" },
  { nome: "Gerador de senhas", desc: "JavaScript puro", url: "https://github.com/kelverlysant/projetsenha" },
];

const TAG_NOMES = { financas: "Finanças", dados: "Dados", api: "APIs", front: "Front-end" };

/* ---------- 2. Ilustrações ---------- */
// Gerador pseudoaleatório com seed (mesmos desenhos a cada visita)
function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}
function walk(n, seed, drift = 0.002, vol = 0.02, start = 100) {
  const r = rng(seed);
  const out = [start];
  for (let i = 1; i < n; i++) {
    const z = (r() + r() + r() - 1.5) * 2; // aproximação de normal
    out.push(out[i - 1] * (1 + drift + vol * z));
  }
  return out;
}
function pathFrom(values, x0, y0, w, h, min, max) {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  return values
    .map((v, i) => {
      const x = x0 + (i / (values.length - 1)) * w;
      const y = y0 + h - ((v - lo) / (hi - lo || 1)) * h;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

const ART = {
  tradelab() {
    const a = walk(90, 7, 0.004, 0.018);
    const b = walk(90, 11, 0.002, 0.022);
    const all = [...a, ...b];
    const lo = Math.min(...all), hi = Math.max(...all);
    return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#201D26"/>
      <g stroke="#34303D" stroke-width="1">${[80, 150, 220, 290].map(y => `<line x1="40" x2="600" y1="${y}" y2="${y}"/>`).join("")}</g>
      <path d="${pathFrom(b, 40, 80, 560, 210, lo, hi)}" fill="none" stroke="#8E889B" stroke-width="2"/>
      <path d="${pathFrom(a, 40, 80, 560, 210, lo, hi)}" fill="none" stroke="#12A36B" stroke-width="3"/>
      <g font-family="Schibsted Grotesk, sans-serif" fill="#fff" font-size="14">
        ${[["Custos e slippage",40,150],["Stop-loss",202,100],["104 testes",314,96]].map(([t,x,w]) => `<rect x="${x}" y="24" width="${w}" height="40" rx="10" fill="#2E2A36"/><text x="${x + w / 2}" y="49" text-anchor="middle" fill="#C9C5D3">${t}</text>`).join("")}
      </g>
      <g font-family="Schibsted Grotesk, sans-serif" font-size="13">
        <circle cx="48" cy="326" r="5" fill="#12A36B"/><text x="60" y="331" fill="#C9C5D3">SMA Crossover</text>
        <circle cx="178" cy="326" r="5" fill="#8E889B"/><text x="190" y="331" fill="#C9C5D3">Buy and Hold</text>
      </g>
    </svg>`;
  },
  comparador() {
    const cores = ["#201D26", "#12A36B", "#8E1B33", "#A39FAD"];
    const series = [3, 5, 9, 13].map((s, i) => walk(70, s, 0.003 - i * 0.001, 0.015 + i * 0.006));
    const all = series.flat(), lo = Math.min(...all), hi = Math.max(...all);
    const nomes = ["PETR4", "VALE3", "BTC", "USD"];
    return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#F1F0F3"/>
      <rect x="28" y="28" width="584" height="304" rx="16" fill="#fff" stroke="#E2E0E6"/>
      <line x1="56" x2="584" y1="${(80 + 220 - ((100 - lo) / (hi - lo)) * 220).toFixed(0)}" y2="${(80 + 220 - ((100 - lo) / (hi - lo)) * 220).toFixed(0)}" stroke="#C9C5D1" stroke-dasharray="4 6"/>
      ${series.map((s, i) => `<path d="${pathFrom(s, 56, 80, 528, 220, lo, hi)}" fill="none" stroke="${cores[i]}" stroke-width="2.5"/>`).join("")}
      <g font-family="Schibsted Grotesk, sans-serif" font-size="13" fill="#5F5B68">
        ${nomes.map((n, i) => `<rect x="${56 + i * 82}" y="46" width="10" height="10" rx="3" fill="${cores[i]}"/><text x="${72 + i * 82}" y="56">${n}</text>`).join("")}
        <text x="584" y="56" text-anchor="end">base 100</text>
      </g>
    </svg>`;
  },
  health() {
    const r = rng(21);
    const apis = ["/users", "/orders", "/quotes", "/auth"];
    let bars = "";
    apis.forEach((api, row) => {
      for (let i = 0; i < 36; i++) {
        const v = r();
        const c = v > 0.96 ? "#D14343" : v > 0.92 ? "#E0A100" : "#12A36B";
        bars += `<rect x="${150 + i * 12.6}" y="${70 + row * 44}" width="8" height="26" rx="2" fill="${c}"/>`;
      }
    });
    const lat = walk(60, 4, 0, 0.12, 120);
    return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#F1F0F3"/>
      <rect x="28" y="28" width="584" height="304" rx="16" fill="#fff" stroke="#E2E0E6"/>
      <g font-family="Schibsted Grotesk, sans-serif" font-size="14" fill="#18171C">
        ${apis.map((a, i) => `<text x="56" y="${89 + i * 44}">${a}</text>`).join("")}
      </g>
      ${bars}
      <path d="${pathFrom(lat, 56, 262, 528, 50)}" fill="none" stroke="#201D26" stroke-width="2"/>
      <text x="56" y="252" font-family="Schibsted Grotesk, sans-serif" font-size="12" fill="#5F5B68">latência (ms)</text>
    </svg>`;
  },
  autoreport() {
    const r = rng(5);
    const kpis = [["SLA", "87%"], ["TMA", "4m12s"], ["Abandono", "3,1%"]];
    let bars = "";
    for (let i = 0; i < 14; i++) {
      const h = 30 + Math.sin(i / 2.2) * 40 + 50 + r() * 30;
      bars += `<rect x="${60 + i * 37}" y="${308 - h}" width="24" height="${h.toFixed(0)}" rx="4" fill="${i === 9 ? "#8E1B33" : "#201D26"}"/>`;
    }
    return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#F1F0F3"/>
      <g font-family="Schibsted Grotesk, sans-serif">
      ${kpis.map(([k, v], i) => `<rect x="${32 + i * 196}" y="28" width="180" height="76" rx="14" fill="#fff" stroke="#E2E0E6"/>
        <text x="${50 + i * 196}" y="56" font-size="13" fill="#5F5B68">${k}</text>
        <text x="${50 + i * 196}" y="88" font-size="26" font-weight="700" fill="#18171C">${v}</text>`).join("")}
      </g>
      <rect x="32" y="120" width="572" height="212" rx="14" fill="#fff" stroke="#E2E0E6"/>
      ${bars}
    </svg>`;
  },
  deventuras() {
    return `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#2E2A36"/>
      <circle cx="540" cy="70" r="120" fill="#201D26"/>
      <g font-family="Bricolage Grotesque, sans-serif">
        <text x="56" y="88" font-size="30" font-weight="800" fill="#fff">Qual hook guarda estado?</text>
      </g>
      <g font-family="Schibsted Grotesk, sans-serif" font-size="17">
        ${["useEffect", "useState", "useMemo"].map((o, i) => `<rect x="56" y="${120 + i * 62}" width="360" height="48" rx="12" fill="${i === 1 ? "#8E1B33" : "#fff"}"/>
        <text x="78" y="${150 + i * 62}" fill="${i === 1 ? "#fff" : "#18171C"}">${o}</text>`).join("")}
      </g>
      <g font-family="Schibsted Grotesk, sans-serif" font-size="14" fill="#C9C5D3"><text x="460" y="300">Nível 3, Elfa</text></g>
    </svg>`;
  },
};

/* ---------- 3. Grid, filtro e modal ---------- */
const grid = document.getElementById("projectGrid");

function renderGrid() {
  grid.innerHTML = PROJETOS.map(p => `
    <button class="card ${p.destaque ? "card--featured" : ""}" data-id="${p.id}" data-tags="${p.tags.join(" ")}" id="p-${p.id}" aria-haspopup="dialog">
      <div class="card__art">${ART[p.art]()}</div>
      <div class="card__body">
        <span class="card__badge">${p.badge}</span>
        <h3>${p.nome}</h3>
        <p class="card__desc">${p.resumo}</p>
        <div class="card__tags">${p.stack.slice(0, 4).map(s => `<span>${s}</span>`).join("")}</div>
        <span class="card__more">Ver detalhes</span>
      </div>
    </button>`).join("") +
    `<div class="mini" data-tags="front">${MINI.map(m => `<a href="${m.url}" target="_blank" rel="noopener"><strong>${m.nome}</strong><span>${m.desc}</span></a>`).join("")}</div>`;
}
renderGrid();

// Filtro
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const f = chip.dataset.filter;
    document.querySelectorAll(".chip").forEach(c => {
      c.classList.toggle("is-active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    grid.querySelectorAll("[data-tags]").forEach(el => {
      const show = f === "all" || el.dataset.tags.split(" ").includes(f);
      el.classList.toggle("is-hidden", !show);
    });
  });
});

// Modal
const modal = document.getElementById("projectModal");
function abrirProjeto(id) {
  const p = PROJETOS.find(x => x.id === id);
  if (!p) return;
  document.getElementById("modalArt").innerHTML = ART[p.art]();
  document.getElementById("modalTitle").textContent = p.nome;
  document.getElementById("modalDesc").textContent = p.descricao;
  document.getElementById("modalList").innerHTML = p.destaques.map(d => `<li>${d}</li>`).join("");
  document.getElementById("modalStack").textContent = "Tecnologias: " + p.stack.join(", ");
  document.getElementById("modalActions").innerHTML =
    (p.demo ? `<a class="btn btn--solid" href="${p.demo}" target="_blank" rel="noopener">Abrir versão ao vivo</a>` : "") +
    `<a class="btn ${p.demo ? "btn--line" : "btn--solid"}" href="${p.github}" target="_blank" rel="noopener">Ver código no GitHub</a>`;
  modal.showModal();
}
grid.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) abrirProjeto(card.dataset.id);
});
document.querySelectorAll("[data-open]").forEach(a =>
  a.addEventListener("click", e => { e.preventDefault(); abrirProjeto(a.dataset.open); })
);
modal.querySelector(".modal__close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

/* ---------- 4. Gráfico do hero ---------- */
(function curva() {
  const N = 260;
  // Procura uma seed em que a estratégia com SMA supera o Buy and Hold
  let preco, estrat, bh;
  for (let seed = 1; seed < 400; seed++) {
    preco = walk(N, seed * 31, 0.0006, 0.016);
    const sma = (i, w) => i < w ? null : preco.slice(i - w, i).reduce((a, b) => a + b) / w;
    estrat = [100];
    let pico = 100;
    for (let i = 1; i < N; i++) {
      const s = sma(i, 15), l = sma(i, 50);
      const dentro = s && l && s > l;
      const ret = preco[i] / preco[i - 1] - 1;
      estrat.push(estrat[i - 1] * (1 + (dentro ? ret : 0)));
      pico = Math.max(pico, estrat[i]);
    }
    bh = preco.map(p => (p / preco[0]) * 100);
    const minBh = Math.min(...bh);
    if (estrat[N - 1] > bh[N - 1] + 8 && bh[N - 1] > 102 && minBh < 92) break;
  }

  const fig = document.getElementById("curve");
  const svg = document.getElementById("curveSvg");
  const readout = document.getElementById("curveReadout");
  const W = 1000, H = 240, PAD = 16;
  const all = [...estrat, ...bh];
  const lo = Math.min(...all) - 2, hi = Math.max(...all) + 2;
  const x = i => (i / (N - 1)) * W;
  const y = v => PAD + (H - 2 * PAD) * (1 - (v - lo) / (hi - lo));
  const d = arr => arr.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = `
    <defs><linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#12A36B" stop-opacity=".18"/><stop offset="1" stop-color="#12A36B" stop-opacity="0"/>
    </linearGradient></defs>
    <line class="base" x1="0" x2="${W}" y1="${y(100)}" y2="${y(100)}"/>
    <path class="area" d="${d(estrat)} L${W} ${H} L0 ${H} Z"/>
    <path class="bh" d="${d(bh)}" pathLength="1"/>
    <path class="strat" d="${d(estrat)}" pathLength="1"/>
    <line class="cross" x1="0" x2="0" y1="0" y2="${H}"/>`;

  // Animação de entrada: a linha se desenha uma única vez
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduz) {
    svg.querySelectorAll(".strat,.bh").forEach((p, k) => {
      p.style.strokeDasharray = "1";
      p.style.strokeDashoffset = "1";
      p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1800, delay: 300 + k * 150, easing: "cubic-bezier(.3,.7,.2,1)", fill: "forwards" })
        .onfinish = () => { p.style.strokeDasharray = "none"; };
    });
    svg.querySelector(".area").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 1600, fill: "both" });
  }

  const dot = document.createElement("span");
  dot.className = "curve__dot";
  fig.appendChild(dot);
  const cross = svg.querySelector(".cross");
  const brl = v => (v * 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const pct = v => (v >= 100 ? "+" : "") + (v - 100).toFixed(1).replace(".", ",") + "%";

  function mostrar(clientX) {
    const r = svg.getBoundingClientRect();
    const t = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    const i = Math.round(t * (N - 1));
    cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i));
    const figR = fig.getBoundingClientRect();
    dot.style.left = (r.left - figR.left + (x(i) / W) * r.width) + "px";
    dot.style.top = (r.top - figR.top + (y(estrat[i]) / H) * r.height) + "px";
    readout.textContent = `Dia ${i + 1}: estratégia ${brl(estrat[i])} (${pct(estrat[i])}), buy and hold ${brl(bh[i])} (${pct(bh[i])})`;
    svg.classList.add("is-hover"); fig.classList.add("is-hover");
  }
  function esconder() {
    svg.classList.remove("is-hover"); fig.classList.remove("is-hover");
    readout.textContent = `R$ 10.000 viraram ${brl(estrat[N - 1])} na estratégia e ${brl(bh[N - 1])} no buy and hold`;
  }
  svg.addEventListener("pointermove", e => mostrar(e.clientX));
  svg.addEventListener("pointerleave", esconder);
  esconder();
})();


/* ---------- Esfera de dados do topo (reage ao cursor) ---------- */
(function esfera() {
  const canvas = document.getElementById("dataSphere");
  const ctx = canvas.getContext("2d");
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = 260;
  const pts = [];
  // Distribui os pontos uniformemente na esfera (espiral de Fibonacci)
  const ouro = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    pts.push({ x: Math.cos(i * ouro) * r, y, z: Math.sin(i * ouro) * r });
  }
  // Alguns pontos viram "nós" ligados entre si, como um grafo de dados
  const nos = [12, 47, 88, 131, 176, 203, 239, 64, 150];

  let size = 0, dpr = 1;
  function redimensionar() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    size = canvas.clientWidth;
    canvas.width = canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  redimensionar();
  addEventListener("resize", redimensionar);

  let alvoX = 0, alvoY = 0, rotX = 0, rotY = 0, giro = 0;
  let mouse = null; // posição do cursor dentro do círculo
  addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    alvoY = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth / 2))) * 1.1;
    alvoX = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight / 2))) * -0.9;
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    mouse = mx >= 0 && my >= 0 && mx <= r.width && my <= r.height ? { x: mx, y: my } : null;
  }, { passive: true });

  function quadro() {
    rotX += (alvoX - rotX) * 0.06;
    rotY += (alvoY - rotY) * 0.06;
    if (!reduz) giro += mouse ? 0.0015 : 0.004;
    const ay = rotY + giro, ax = rotX;
    const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
    const R = size * 0.36, c = size / 2;
    ctx.clearRect(0, 0, size, size);

    const proj = pts.map(p => {
      const x1 = p.x * cy + p.z * sy;
      const z1 = -p.x * sy + p.z * cy;
      const y1 = p.y * cx - z1 * sx;
      const z2 = p.y * sx + z1 * cx;
      const persp = 1 / (1.9 - z2 * 0.5);
      let X = c + x1 * R * persp * 1.6, Y = c + y1 * R * persp * 1.6;
      let perto = 0;
      if (mouse) {
        const dx = X - mouse.x, dy = Y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 46) {
          perto = 1 - d / 46;
          X += (dx / (d || 1)) * perto * 12;
          Y += (dy / (d || 1)) * perto * 12;
        }
      }
      return { X, Y, z: z2, perto };
    });

    // Ligações entre os nós
    ctx.lineWidth = 1;
    for (let i = 0; i < nos.length; i++) {
      const a = proj[nos[i]], b = proj[nos[(i + 1) % nos.length]];
      const alfa = Math.max(0, (a.z + b.z) / 2 + 0.4) * 0.35;
      ctx.strokeStyle = `rgba(217,86,111,${alfa.toFixed(3)})`;
      ctx.beginPath(); ctx.moveTo(a.X, a.Y); ctx.lineTo(b.X, b.Y); ctx.stroke();
    }

    // Pontos (os de trás primeiro)
    proj.map((p, i) => ({ ...p, i })).sort((a, b) => a.z - b.z).forEach(p => {
      const prof = (p.z + 1) / 2; // 0 = fundo, 1 = frente
      const no = nos.includes(p.i);
      const raio = 0.7 + prof * 1.5 + p.perto * 2.4 + (no ? 1.2 : 0);
      if (no || p.perto > 0.15) {
        ctx.fillStyle = `rgba(217,86,111,${(0.45 + prof * 0.55).toFixed(3)})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${(0.12 + prof * 0.75).toFixed(3)})`;
      }
      ctx.beginPath(); ctx.arc(p.X, p.Y, raio, 0, Math.PI * 2); ctx.fill();
    });
    rodando && requestAnimationFrame(quadro);
  }

  // Só anima quando o círculo está visível
  let rodando = false;
  new IntersectionObserver(([e]) => {
    const antes = rodando;
    rodando = e.isIntersecting;
    if (rodando && !antes) requestAnimationFrame(quadro);
  }).observe(canvas);
  quadro();
})();

/* ---------- 5. Formulário ---------- */
const form = document.getElementById("contactForm");
const erro = document.getElementById("formError");

function validar() {
  let ok = true;
  ["nome", "email", "mensagem"].forEach(n => {
    const el = form.elements[n];
    const valido = el.value.trim() && (n !== "email" || /^\S+@\S+\.\S+$/.test(el.value));
    el.closest(".field").classList.toggle("is-invalid", !valido);
    if (!valido) ok = false;
  });
  erro.textContent = ok ? "" : "Preencha nome, um e-mail válido e a mensagem.";
  return ok;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (form.elements._honey.value) return; // bot
  if (!validar()) return;

  const via = e.submitter?.dataset.via || "email";
  const { nome, email, empresa, mensagem } = Object.fromEntries(new FormData(form));

  if (via === "whatsapp") {
    const texto = `Olá, Kelverly! Sou ${nome}${empresa ? ` da ${empresa}` : ""} (${email}).\n\n${mensagem}`;
    window.open(`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    toast("Abrindo o WhatsApp com sua mensagem.");
    return;
  }

  const btn = e.submitter;
  const rotulo = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Enviando…";
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTATO.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Portfólio: mensagem de ${nome}${empresa ? ` (${empresa})` : ""}`,
        _template: "table",
        _captcha: "false",
        nome, email, empresa: empresa || "-", mensagem,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false") throw new Error();
    form.reset();
    toast("Mensagem enviada. Respondo em até um dia útil.");
  } catch {
    // Plano B: abre o app de e-mail com tudo preenchido
    const corpo = `${mensagem}\n\n${nome}${empresa ? ` — ${empresa}` : ""}\n${email}`;
    location.href = `mailto:${CONTATO.email}?subject=${encodeURIComponent("Contato pelo portfólio")}&body=${encodeURIComponent(corpo)}`;
    toast("Não foi possível enviar daqui. Abrindo seu app de e-mail.");
  } finally {
    btn.disabled = false;
    btn.textContent = rotulo;
  }
});
form.addEventListener("input", e => {
  const f = e.target.closest(".field");
  if (f?.classList.contains("is-invalid")) validar();
});

/* ---------- 6. Utilidades ---------- */
const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 3600);
}

document.querySelectorAll("[data-copy]").forEach(b =>
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); toast("E-mail copiado."); }
    catch { toast(b.dataset.copy); }
  })
);

// Tema claro / escuro
document.getElementById("themeToggle").addEventListener("click", () => {
  const novo = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novo);
  try { localStorage.setItem("tema", novo); } catch (e) {}
});

const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 10), { passive: true });
document.getElementById("year").textContent = new Date().getFullYear();
