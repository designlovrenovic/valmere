/* Maison Valmère: page logic. Rendered by js/dc-runtime.js into <template id="app-tpl">. */
const IMG = {
  steelBlue: 'assets/watch-steel-blue.svg',
  steelChrono: 'assets/watch-steel-chrono.svg',
  steelGreen: 'assets/watch-steel-green.svg',
  steelMoon: 'assets/watch-steel-moon.svg',
  roseChrono: 'assets/watch-rose-chrono.svg',
  roseBrown: 'assets/watch-rose-brown.svg'
};

const WH = {};
WH[IMG.steelBlue] = WH[IMG.steelGreen] = WH[IMG.steelMoon] = { hd: 'url(#whS)', sc: '#e9edf0', dk: '#2b3036' };
WH[IMG.steelChrono] = { hd: 'url(#whS)', sc: '#d8b07a', dk: '#2b3036' };
WH[IMG.roseChrono] = { hd: 'url(#whR)', sc: '#ffffff', dk: '#3d2116' };
WH[IMG.roseBrown] = { hd: 'url(#whR)', sc: '#f6d9c3', dk: '#3d2116' };
const dated = (img) => img !== IMG.steelChrono && img !== IMG.roseChrono;

const NEW = [
  { ref: '352A', name: 'Sillage', specs: '35.2 mm · Steel · Date', price: '$8,000', img: IMG.steelBlue },
  { ref: '405A', name: 'Sillage Chronograph', specs: '40.5 mm · Steel · Two counters', price: 'Price on request', img: IMG.steelChrono },
  { ref: '400G', name: 'Sillage', specs: '40 mm · Steel · Green dial', price: 'Price on request', img: IMG.steelGreen },
  { ref: '400R', name: 'Sillage', specs: '40 mm · Rose gold · Chocolate dial', price: 'Price on request', img: IMG.roseBrown },
  { ref: '412A', name: 'Sillage Moon Phase', specs: '40 mm · Steel · Moon phase', price: 'Price on request', img: IMG.steelMoon }
];

const COL = [
  { ref: '405R', model: 'Sillage', size: '40.5 mm', price: '$8,000', img: IMG.roseChrono, tint: '#9A8574' },
  { ref: '400A', model: 'Sillage', size: '40 mm', price: 'Price on request', img: IMG.steelBlue, tint: '#577193' },
  { ref: '412A', model: 'Sillage', size: '40 mm', price: 'Price on request', img: IMG.steelMoon, tint: '#6B7C92' },
  { ref: '405A', model: 'Sillage', size: '40.5 mm', price: 'Price on request', img: IMG.steelChrono, tint: '#56657A' },
  { ref: '400R', model: 'Sillage', size: '40 mm', price: 'Price on request', img: IMG.roseBrown, tint: '#8E7462' },
  { ref: '400G', model: 'Sillage', size: '40 mm', price: 'Price on request', img: IMG.steelGreen, tint: '#5F7D72' }
];

const HERO_SPOTS = [
  { label: 'Dial', x: 812, y: 430, lines: ['Blue gradient dial, applied markers', 'Luminescent baton hands', 'Date window at 3 o’clock'] },
  { label: 'Case', x: 698, y: 629, lines: ['Case diameter (10-4 o’clock): 35.2 mm', 'Height: 8.62 mm', 'Sapphire crystal case back'] },
  { label: 'Movement', x: 985, y: 380, lines: ['Self-winding mechanical movement', 'Visible through the sapphire case back'] }
];

const mix = (hex, to, t) => {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(to.slice(1), 16);
  const ch = (x, sh) => (x >> sh) & 255;
  const m = (sh) => Math.round(ch(a, sh) + (ch(b, sh) - ch(a, sh)) * t);
  return 'rgb(' + m(16) + ',' + m(8) + ',' + m(0) + ')';
};
const bgOf = (tint) => 'radial-gradient(circle at 50% 42%, ' + mix(tint, '#ffffff', 0.22) + ' 0%, ' + tint + ' 52%, ' + mix(tint, '#101820', 0.45) + ' 100%)';

const PARTS = [
  { label: 'Strap', opts: [
    { label: 'Brown', color: '#552A17' },
    { label: 'Green', color: '#1D7C68' },
    { label: 'Blue', color: '#20697A' },
    { label: 'Black', color: '#343434' }
  ] },
  { label: 'Dial', opts: [
    { label: 'Slate', color: '#6E7378', ink: '#FFFFFF' },
    { label: 'Ivory', color: '#EFE8DA', ink: '#203248' },
    { label: 'Navy', color: '#1E3A64', ink: '#FFFFFF' },
    { label: 'Onyx', color: '#1B1B1D', ink: '#FFFFFF' }
  ] },
  { label: 'Mechanism', opts: [
    { label: 'World Time', color: '#203248', icon: 'globe' },
    { label: 'Moon Phase', color: '#203248', icon: 'moon' },
    { label: 'Chronograph', color: '#203248', icon: 'chrono' },
    { label: 'Skeleton', color: '#203248', icon: 'gear' }
  ] }
];

const PRESETS = [
  [3, 3, 2],
  [1, 1, 1],
  [0, 0, 0],
  [2, 2, 1],
  [0, 3, 3]
];

const CRAFT = [
  { title: 'Drawn at Full Size', text: 'Every Sillage starts as a pencil drawing at full size. We settle the proportions on paper before any metal is cut.', img: 'assets/process-1-drawing.svg', alt: 'Pencil sketches of watch designs' },
  { title: 'Assembled by One Hand', text: 'A single watchmaker assembles each movement, from the first wheel to the last screw, and signs the work card when it is done.', img: 'assets/process-2-movement.svg', alt: 'Exploded sketch of movement gears' },
  { title: 'Finished by Hand', text: 'Cases are brushed and polished by hand. Bracelet links are fitted one at a time, so the bracelet sits close with no play.', img: 'assets/process-3-finishing.svg', alt: 'Technical drawing of a case profile and bracelet links' },
  { title: 'Timed in Six Positions', text: 'Each watch is timed in six positions over several days. If it runs outside our tolerance, it goes back to the bench.', img: 'assets/process-4-timing.svg', alt: 'Sketch of a movement with balance wheel and gears' },
  { title: 'Signed and Delivered', text: 'It ships fully insured and is signed for on arrival. The timing report and your watchmaker’s name come in the box.', img: 'assets/process-5-delivery.svg', alt: 'Shaded sketch of a finished watch' }
];

const JOUR = [
  { label: 'Moon phase', cat: 'Complications', title: 'How a Moon Phase Works', text: 'A moon phase disc follows the moon’s 29.5-day cycle. A standard one drifts by a full day about every 32 months. Here’s how to read it and how to set it back.', img: 'assets/journal-1-moon-phase.svg', alt: 'Close-up of a watch movement with balance wheel' },
  { label: 'The workshop', cat: 'Our process', title: 'Inside the Workshop', text: 'Parts laid out on the bench, cases brushed by hand, every movement timed before it is cased. Here is how a Sillage comes together, with photos from the bench.', img: 'assets/journal-2-workshop.svg', alt: 'Macro view of gears, jewels and Geneva stripes' },
  { label: 'History', cat: 'History', title: 'From Pocket to Wrist', text: 'Most men carried pocket watches until the First World War, when soldiers needed both hands free. Here’s how the wristwatch went from novelty to normal in about ten years.', img: 'assets/journal-3-history.svg', alt: 'Antique pocket watch with Roman numerals and chain' },
  { label: 'The bench', cat: 'Craft', title: 'On the Watchmaker’s Bench', text: 'Tweezers, loupes and screwdrivers thinner than a hair. A look at the tools on a watchmaker’s bench and what each one is for.', img: 'assets/journal-4-bench.svg', alt: 'Watchmaker tools laid out on a bench mat' },
  { label: 'Buying guide', cat: 'Buying guide', title: '400A or 412A?', text: 'Same case, same bracelet, different dials. The 400A keeps it simple with a date. The 412A adds a moon phase at six o’clock. Here’s how to pick the one you’ll wear more.', img: 'assets/journal-5-buying-guide.svg', alt: 'Close-up of a sunburst dial with baton hands' },
  { label: 'Servicing', cat: 'Care', title: 'When to Service Your Watch', text: 'Most automatic watches need a service every 5 to 10 years. These are the signs yours is due, and this is what happens to it on the bench.', img: 'assets/journal-6-servicing.svg', alt: 'Watch displayed on a cushion under a spotlight' }
];

const N_STEP = 485;
const K_STEP = 320;
const K_DEG = 360 / 22;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mod = (a, n) => ((a % n) + n) % n;
const pad2 = (n) => (n < 10 ? '0' : '') + n;

class Component extends DCLogic {
  st() { return this.state || {}; }

  componentDidMount() {
    this._alive = true;
    this._onResize = () => this.measure();
    window.addEventListener('resize', this._onResize);
    if (typeof ResizeObserver !== 'undefined' && this._root) {
      this._ro = new ResizeObserver(this._onResize);
      this._ro.observe(this._root);
    }
    this.measure();
    this.observeK();
    this.introHands();
  }

  introHands() {
    const root = this._root;
    if (!root || this._handsSet) return;
    this._handsSet = true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const svg = root.querySelector('.hero-watch .w-hands');
    const hands = svg ? svg.querySelectorAll('.wh-i') : [];
    if (hands.length < 3) return;
    const ease = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);
    const now = new Date();
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60;
    const hr = (now.getHours() % 12) + min / 60;
    const from = [-hr * 30 - 360, -min * 6 - 360, -sec * 6 - 360];
    const set = (k) => {
      for (let i = 0; i < 3; i++) hands[i].setAttribute('transform', 'rotate(' + (from[i] * k).toFixed(2) + ' 172 272)');
    };
    set(1);
    const delay = 500;
    const dur = 2600;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, Math.max(0, (t - t0 - delay) / dur));
      if (p < 1) { set(1 - ease(p)); requestAnimationFrame(step); return; }
      for (let i = 0; i < 3; i++) hands[i].removeAttribute('transform');
    };
    requestAnimationFrame(step);
  }

  componentWillUnmount() {
    this._alive = false;
    if (this._io) this._io.disconnect();
    if (this._hio) this._hio.disconnect();
    window.removeEventListener('resize', this._onResize);
    if (this._ro) this._ro.disconnect();
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  observeK() {
    const el = this._kSec;
    if (!el || this._ioEl === el) return;
    if (this._io) { this._io.disconnect(); this._io = null; }
    this._ioEl = el;
    if (typeof IntersectionObserver === 'undefined') { this.setState({ kSeen: true, kVis: true }); return; }
    const io = new IntersectionObserver((entries) => {
      const en = entries[entries.length - 1];
      const vis = en.isIntersecting && en.intersectionRatio >= 0.35;
      const s = this.st();
      if (vis && !s.kSeen) this.setState({ kSeen: true, kVis: true, kIdx: 0, kCycle: (s.kCycle || 0) + 1, kResume: 0 });
      else if (vis !== !!s.kVis) this.setState({ kVis: vis });
    }, { threshold: [0, 0.35, 0.6] });
    io.observe(el);
    this._io = io;
  }

  measure() {
    const el = this._root;
    if (!el) return;
    const w = el.offsetWidth || 1440;
    const mobile = w < 820;
    const z = mobile ? 1 : Math.min(1, Math.round((w / 1440) * 10000) / 10000);
    const s = this.st();
    if (s.w !== w || s.z !== z || s.mobile !== mobile) this.setState({ w: w, z: z, mobile: mobile });
  }

  push(patch) {
    this._pend = Object.assign(this._pend || {}, patch);
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      const p = this._pend;
      this._pend = null;
      if (p && this._alive !== false) this.setState(p);
    });
  }

  local(el, e) {
    const r = el.getBoundingClientRect();
    const sc = r.width / 1440 || 1;
    return { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
  }

  drag(key, getEl, step, onEnd, onStart) {
    const curKey = key + 'Cur';
    const dragKey = key + 'Drag';
    const dragging = key + 'Dragging';
    const hoverKey = key + 'Hover';
    const fine = (e) => e.pointerType !== 'touch';
    const ref = '_' + key + 'd';
    return {
      enter: (e) => {
        const el = getEl();
        if (!el || !fine(e)) return;
        const p = this.local(el, e);
        this.push({ [curKey]: { x: p.x, y: p.y }, [hoverKey]: true });
      },
      move: (e) => {
        const el = getEl();
        if (!el) return;
        const p = this.local(el, e);
        const patch = {};
        if (fine(e)) { patch[curKey] = { x: p.x, y: p.y }; patch[hoverKey] = true; }
        const d = this[ref];
        if (d) {
          const now = performance.now();
          const ndx = p.x - d.x0;
          const dt = now - d.t;
          if (dt > 0) d.v = d.v * 0.5 + ((ndx - d.dx) / dt) * 0.5;
          d.t = now;
          d.dx = ndx;
          patch[dragKey] = d.dx;
        }
        this.push(patch);
      },
      leave: () => {
        if (this[ref]) return;
        this.push({ [curKey]: null, [hoverKey]: false });
      },
      down: (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        if (e.target && e.target.closest && e.target.closest('button, a')) return;
        const el = getEl();
        if (!el) return;
        const p = this.local(el, e);
        this[ref] = { x0: p.x, dx: 0, v: 0, t: performance.now() };
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { }
        this.setState(Object.assign({ [dragging]: true, [dragKey]: 0 }, onStart ? onStart() : {}));
      },
      up: (e) => {
        const d = this[ref];
        if (!d) return;
        this[ref] = null;
        if (this._pend) delete this._pend[dragKey];
        let steps = 0;
        if (Math.abs(d.dx) > 50) steps = -Math.sign(d.dx) * Math.max(1, Math.round(Math.abs(d.dx) / step));
        if (performance.now() - d.t > 120) d.v = 0;
        if (!steps && Math.abs(d.v) > 0.5 && Math.abs(d.dx) > 12) steps = -Math.sign(d.v);
        const patch = Object.assign({ [dragging]: false, [dragKey]: 0 }, onEnd(steps, d.dx, d));
        if (!fine(e)) { patch[curKey] = null; patch[hoverKey] = false; }
        this.setState(patch);
      }
    };
  }

  kFillCalc(base, frac) {
    if (frac >= 0) return clamp(base + frac * (1 - base), 0, 1);
    return clamp(base * (1 + frac), 0, 1);
  }

  readProg() {
    const el = this._kProg;
    if (!el || typeof getComputedStyle === 'undefined') return 0;
    const v = parseFloat(getComputedStyle(el).strokeDashoffset);
    return isNaN(v) ? 0 : clamp(1 - v / 100, 0, 1);
  }

  goNew(delta) {
    const s = this.st();
    const n = NEW.length;
    this.setState({ nIdx: ((((s.nIdx || 0) + delta) % n) + n) % n, nCycle: (s.nCycle || 0) + 1 });
  }

  goCraft(idx) {
    const s = this.st();
    this.setState({ kIdx: idx, kCycle: (s.kCycle || 0) + 1, kResume: 0 });
  }

  handlers() {
    if (this._h) return this._h;
    const H = {};
    H.setRoot = (el) => { this._root = el; if (el && this._alive) this.measure(); };
    H.setNArt = (el) => { this._nArt = el; };
    H.setKArt = (el) => { this._kArt = el; };
    H.setKProg = (el) => { this._kProg = el; };
    H.setKSec = (el) => { this._kSec = el; if (el && this._alive) this.observeK(); };
    H.n = this.drag('n', () => this._nArt, N_STEP, (steps, dx, d) => {
      if (!steps && d && Math.abs(dx || 0) < 6) {
        if (d.x0 < 470) steps = -1;
        else if (d.x0 > 970) steps = 1;
      }
      if (!steps) return {};
      const s = this.st();
      const n = NEW.length;
      return { nIdx: ((((s.nIdx || 0) + steps) % n) + n) % n, nCycle: (s.nCycle || 0) + 1 };
    });
    H.k = this.drag('k', () => this._kArt, K_STEP, (steps, dx) => {
      const s = this.st();
      const n = CRAFT.length;
      const i = s.kIdx || 0;
      if (steps) return { kIdx: i + steps, kCycle: (s.kCycle || 0) + 1, kResume: 0 };
      const fill = this.kFillCalc(s.kBase || 0, -(dx || 0) / K_STEP);
      if (fill >= 0.985) return { kIdx: i + 1, kCycle: (s.kCycle || 0) + 1, kResume: 0 };
      return { kCycle: (s.kCycle || 0) + 1, kResume: fill };
    }, () => ({ kBase: this.readProg() }));
    H.nPrev = () => this.goNew(-1);
    H.nNext = () => this.goNew(1);
    H.nUiOn = () => this.push({ nUi: true });
    H.nUiOff = () => this.push({ nUi: false });
    H.kPrev = () => this.goCraft((this.st().kIdx || 0) - 1);
    H.kNext = () => this.goCraft((this.st().kIdx || 0) + 1);
    H.ringDone = (e) => {
      if (e && e.animationName && String(e.animationName).indexOf('ltRing') !== 0) return;
      if (this.st().nDragging) return;
      this.goNew(1);
    };
    H.progDone = (e) => {
      if (e && e.animationName && String(e.animationName).indexOf('ltProg') !== 0) return;
      const s = this.st();
      if (s.kDragging) return;
      this.goCraft((s.kIdx || 0) + 1);
    };
    H.cPrev = () => { const s = this.st(); this.setState({ cIdx: mod((s.cIdx || 0) - 1, COL.length), cCycle: (s.cCycle || 0) + 1 }); };
    H.cNext = () => { const s = this.st(); this.setState({ cIdx: mod((s.cIdx || 0) + 1, COL.length), cCycle: (s.cCycle || 0) + 1 }); };
    H.fSubmit = (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ fDone: true }); };
    this._h = H;
    return H;
  }

  clock() {
    if (!this._clk) {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;
      const utc = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + sec;
      const lun = (now.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000 / 29.530588853;
      const phase = lun - Math.floor(lun);
      this._clk = { s: (-sec).toFixed(3) + 's', m: (-min * 60).toFixed(2) + 's', h: (-hr * 3600).toFixed(1) + 's', d: (-utc).toFixed(1) + 's', moon: ((phase - 0.5) * 180).toFixed(2) };
    }
    return this._clk;
  }

  renderVals() {
    const s = this.st();
    const H = this.handlers();
    const P = this.props || {};
    const auto = P.autoplay !== false;
    const secs = Number(P.slideSeconds) > 0 ? Number(P.slideSeconds) : 6.5;
    const mobile = !!s.mobile;
    const w = s.w || 1440;
    const z = s.z || 1;

    /* ---- new collection carousel ---- */
    const nN = NEW.length;
    const nIdx = s.nIdx || 0;
    const nDragging = !!s.nDragging;
    const nPos = nIdx - (nDragging ? (s.nDrag || 0) / N_STEP : 0);
    if (!this._day) this._day = new Date().getDate();
    const wDay = String(this._day);
    const clk = this.clock();
    const nItems = NEW.map((it, i) => {
      let rel = (((i - nPos) % nN) + nN) % nN;
      if (rel >= nN / 2) rel -= nN;
      const a = Math.abs(rel);
      const sc = 1 - 0.21 * Math.min(1, a);
      const op = a <= 1 ? 1 - 0.78 * a : Math.max(0, 0.22 * (2 - a));
      const tilt = a < 0.5 && !nDragging && s.nCur;
      return {
        name: it.name + ' ' + it.ref,
        img: it.img,
        hasDate: it.img !== IMG.steelChrono && it.img !== IMG.roseChrono,
        day: wDay,
        wh: WH[it.img],
        ck: clk,
        tf: 'translateX(' + (rel * N_STEP).toFixed(2) + 'px) scale(' + sc.toFixed(4) + ')',
        op: op.toFixed(3),
        zi: String(10 - Math.round(a * 2)),
        ry: tilt ? (clamp((s.nCur.x - 720) / 700, -1, 1) * 7).toFixed(2) : 0,
        rx: tilt ? (clamp(-(s.nCur.y - 640) / 520, -1, 1) * 5).toFixed(2) : 0
      };
    });
    const nCycle = s.nCycle || 0;
    const nCur = s.nCur
      ? { x: s.nCur.x.toFixed(1), y: s.nCur.y.toFixed(1), s: nDragging ? 0.84 : 1, cls: 'is-follow' + (s.nUi ? ' is-ui' : '') }
      : { x: 300, y: 1039, s: 1, cls: 'is-rest' };
    const nPages = NEW.map((it, i) => ({
      num: pad2(i + 1),
      on: i === nIdx,
      cls: i === nIdx ? 'is-on' : '',
      aria: 'Show ' + it.name + ' ' + it.ref,
      anim: i === nIdx && !nDragging && auto ? (nCycle % 2 ? 'ltBarB' : 'ltBarA') : 'none',
      dur: secs + 's',
      pick: () => { const st = this.st(); if ((st.nIdx || 0) !== i) this.setState({ nIdx: i, nCycle: (st.nCycle || 0) + 1 }); }
    }));

    /* ---- collection ---- */
    const cIdx = s.cIdx || 0;
    const cCyc = s.cCycle || 0;
    const cC = COL[cIdx];
    const cA = { ref: cC.ref, model: cC.model, size: cC.size, price: cC.price, img: cC.img, bg: bgOf(cC.tint), short: cC.ref.slice(0, 3), wh: WH[cC.img], hasDate: dated(cC.img) };
    const cPeeks = [1, 2, 3].map((k) => {
      const j = (cIdx + k) % COL.length;
      const p = COL[j];
      return {
        ref: p.ref, model: p.model, price: p.price, img: p.img, bg: bgOf(p.tint), wh: WH[p.img], ck: clk, hasDate: dated(p.img), day: wDay,
        aria: 'Show ' + p.ref + ' ' + p.model,
        cls: cCyc % 2 ? 'p-b' : 'p-a',
        pick: () => { const st = this.st(); this.setState({ cIdx: j, cCycle: (st.cCycle || 0) + 1 }); }
      };
    });
    const cSegs = COL.map((x, i) => ({ cls: i === cIdx ? 'is-on' : (i < cIdx ? 'is-past' : '') }));

    /* ---- tailor ---- */
    const tPart = s.tPart || 0;
    const sel = s.tSel || [0, 0, 0];
    const tParts = PARTS.map((pt, i) => {
      const th = 198.5 - i * 18;
      return {
        label: pt.label,
        cls: i === tPart ? 'is-on' : '',
        pressed: i === tPart,
        tf: 'rotate(' + th + 'deg) translateX(490px) rotate(' + (-th) + 'deg)',
        isStrap: i === 0, isDial: i === 1, isMech: i === 2,
        pick: () => { const st = this.st(); if ((st.tPart || 0) !== i) this.setState({ tPart: i, tPartCycle: (st.tPartCycle || 0) + 1 }); }
      };
    });
    const curPart = PARTS[tPart];
    const b = sel[tPart];
    const tOpts = curPart.opts.map((o, j) => {
      const th = -27 + j * 18;
      const on = j === b;
      return {
        label: o.label,
        color: o.color,
        cls: on ? 'is-on' : '',
        pressed: on,
        tf: 'rotate(' + th + 'deg) translateX(490px) rotate(' + (-th) + 'deg)',
        icGlobe: on && o.icon === 'globe',
        icMoon: on && o.icon === 'moon',
        icChrono: on && o.icon === 'chrono',
        icGear: on && o.icon === 'gear',
        pick: () => {
          const st = this.st();
          const cur = (st.tSel || [0, 0, 0]).slice();
          const p = st.tPart || 0;
          if (cur[p] === j) return;
          cur[p] = j;
          this.setState({ tSel: cur, tCycle: (st.tCycle || 0) + 1 });
        }
      };
    });
    this.clock();
    const dOpt = PARTS[1].opts[sel[1]];
    const mech = sel[2];
    const tw = {
      strap: PARTS[0].opts[sel[0]].color,
      dial: dOpt.color,
      ink: dOpt.ink,
      mWorld: mech === 0 ? 1 : 0,
      mMoon: mech === 1 ? 1 : 0,
      mChrono: mech === 2 ? 1 : 0,
      mSkel: mech === 3 ? 1 : 0
    };
    const twAria = 'Rose gold watch, ' + PARTS[0].opts[sel[0]].label.toLowerCase() + ' strap, ' + dOpt.label.toLowerCase() + ' dial, ' + PARTS[2].opts[mech].label.toLowerCase();
    const tSummary = 'Rose gold · ' + PARTS[0].opts[sel[0]].label + ' strap · ' + dOpt.label + ' dial · ' + PARTS[2].opts[mech].label;
    const tNote = mech === 1 ? 'Set to your local time, and tonight’s moon' : (mech === 0 ? 'Set to your local time, and the hour in 24 cities' : 'Set to your local time');
    const activePreset = PRESETS.findIndex((pr) => pr[0] === sel[0] && pr[1] === sel[1] && pr[2] === sel[2]);
    const tDots = PRESETS.map((pr, k) => ({
      cls: k === activePreset ? 'is-on' : '',
      aria: 'Signature combination ' + (k + 1),
      pick: () => { const st = this.st(); this.setState({ tSel: pr.slice(), tCycle: (st.tCycle || 0) + 1 }); }
    }));

    /* ---- crafting wheel ---- */
    const kN = CRAFT.length;
    const kIdx = s.kIdx || 0;
    const kDragging = !!s.kDragging;
    const kPos = kIdx - (kDragging ? (s.kDrag || 0) / K_STEP : 0);
    const kBaseN = Math.round(kPos) - 3;
    const num = (m) => {
      const k = kBaseN + mod(m - kBaseN, 7);
      const rel = k - kPos;
      const a = Math.min(1, Math.abs(rel));
      const fade = rel < 0 ? Math.max(0, 1 - Math.abs(rel) * 1.5) : 1;
      const fs = 168 - 90 * a;
      return { label: pad2(mod(k, kN) + 1), rot: (k * K_DEG).toFixed(4), fs: fs.toFixed(1), bt: (874 - 0.134 * fs).toFixed(1), fw: Math.round(700 - 300 * a), op: ((1 - 0.8 * a) * fade).toFixed(3) };
    };
    const kSlides = CRAFT.map((c, k) => {
      let rel = mod(k - kPos, kN);
      if (rel >= kN / 2) rel -= kN;
      const a = Math.abs(rel);
      const phi = rel * 46.8;
      const ahead = Math.min(1, Math.max(0, rel));
      const behind = Math.min(1, Math.max(0, -rel));
      return {
        title: c.title, text: c.text, img: c.img, alt: c.alt,
        cls: rel < -0.02 ? 'is-past' : (rel > 0.5 ? 'is-next' : ''),
        tf: 'rotate(' + phi.toFixed(3) + 'deg) translateY(-808px) rotate(' + (-phi).toFixed(3) + 'deg)',
        veil: (0.42 * ahead).toFixed(3),
        blur: (2.4 * ahead + 3 * behind).toFixed(2),
        zoom: (1 + 0.12 * ahead).toFixed(3),
        txt: Math.max(0, 1 - a * 1.6).toFixed(3),
        vis: rel < 0 ? Math.max(0, 1 - behind * 2.6).toFixed(3) : (rel < 1.7 ? 1 : 0),
        hidden: k !== mod(kIdx, kN)
      };
    });
    const kCycle = s.kCycle || 0;
    const kFill = kDragging ? this.kFillCalc(s.kBase || 0, kPos - kIdx) : 0;
    const kCur = s.kCur
      ? { x: s.kCur.x.toFixed(1), y: s.kCur.y.toFixed(1), s: kDragging ? 0.84 : 1, cls: 'is-follow' }
      : { x: 1261, y: 243, s: 1, cls: 'is-rest' };

    /* ---- journal ---- */
    const jOpen = s.jOpen === undefined ? 0 : s.jOpen;
    const jPanels = JOUR.map((p, i) => ({
      num: pad2(i + 1),
      label: p.label, cat: p.cat, title: p.title, text: p.text, img: p.img, alt: p.alt,
      cls: i === jOpen ? 'is-open' : '',
      isOpen: i === jOpen,
      hidden: i !== jOpen,
      aria: 'Open article ' + (i + 1) + ': ' + p.title,
      open: () => { const cur = this.st().jOpen === undefined ? 0 : this.st().jOpen; if (cur !== i) this.setState({ jOpen: i }); }
    }));

    /* ---- hero hotspots ---- */
    const hAct = s.hSpot === undefined ? 0 : s.hSpot;
    const hSpots = HERO_SPOTS.map((p, i) => ({
      label: p.label,
      x: p.x,
      y: p.y,
      on: i === hAct,
      cls: i === hAct ? 'is-on' : '',
      aria: 'Show ' + p.label.toLowerCase() + ' details',
      delay: (0.9 + i * 0.15).toFixed(2) + 's',
      pick: () => {
        const st = this.st();
        const cur = st.hSpot === undefined ? 0 : st.hSpot;
        if (cur !== i) this.setState({ hSpot: i, hCyc: (st.hCyc || 0) + 1 });
      }
    }));

    return {
      h: H,
      z: z,
      rootCls: 'lt' + (mobile ? ' is-m' : ''),
      nItems: nItems,
      nCls: nDragging ? 'is-drag' : '',
      nMeta: NEW[nIdx],
      nMetaCls: nCycle % 2 ? 'meta-b' : 'meta-a',
      ringAnim: nDragging || !auto ? 'none' : (nCycle % 2 ? 'ltRingB' : 'ltRingA'),
      ringDur: secs + 's',
      nCur: nCur,
      nPages: nPages,
      nGhostCls: nCycle % 2 ? 'gh-b' : 'gh-a',
      wDay: wDay,
      hSpots: hSpots,
      hLines: HERO_SPOTS[hAct].lines.map((t) => ({ text: t })),
      hSpecCls: (s.hCyc || 0) % 2 ? 'sp-b' : 'sp-a',
      cA: cA,
      cPeeks: cPeeks,
      cSegs: cSegs,
      cCount: pad2(cIdx + 1),
      cTotal: pad2(COL.length),
      cInCls: cCyc % 2 ? 'in-b' : 'in-a',
      cWCls: cCyc % 2 ? 'w-b' : 'w-a',
      fDone: !!s.fDone,
      fShowForm: !s.fDone,
      tParts: tParts,
      tOpts: tOpts,
      tOptsCls: (s.tPartCycle || 0) === 0 ? '' : ((s.tPartCycle || 0) % 2 ? 'opts-b' : 'opts-a'),
      tw: tw,
      twAria: twAria,
      tSummary: tSummary,
      tNote: tNote,
      clk: this._clk,
      twCls: (s.tCycle || 0) === 0 ? '' : ((s.tCycle || 0) % 2 ? 'tw-b' : 'tw-a'),
      tDots: tDots,
      kCls: kDragging ? 'is-drag' : '',
      kWheel: (-kPos * K_DEG).toFixed(3),
      n0: num(0), n1: num(1), n2: num(2), n3: num(3), n4: num(4), n5: num(5), n6: num(6),
      kProgRot: (kIdx * K_DEG).toFixed(4),
      kPulseCls: s.kIdx === undefined ? '' : (mod(kIdx, 2) ? 'pulse-b' : 'pulse-a'),
      kProgOff: (100 - kFill * 100).toFixed(2),
      kProgAnim: kDragging || !auto || !s.kSeen ? 'none' : (kCycle % 2 ? 'ltProgB' : 'ltProgA'),
      kProgDur: ((secs + 1) * 0.7).toFixed(2) + 's',
      kProgDelay: (-(s.kResume || 0) * (secs + 1) * 0.7).toFixed(2) + 's',
      kProgPlay: s.kVis ? 'running' : 'paused',
      kSlides: kSlides,
      kCur: kCur,
      jPanels: jPanels
    };
  }
}

DC.mount(Component, document.getElementById('app-tpl'), document.getElementById('app'), {
  autoplay: true,     // carousels and the process wheel advance on their own
  slideSeconds: 6.5   // seconds per slide
});
