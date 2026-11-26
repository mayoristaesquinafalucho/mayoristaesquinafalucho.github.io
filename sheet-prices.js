// Lee los precios de la planilla de Google y después arranca el catálogo.
// Para cambiar un precio: editá la planilla. No hace falta tocar este archivo.
(() => {
  const SHEET_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToC-r3Lqc13RFxeMYNEcmiExgNXzlzSp0PfbhgnjFuKScG7sxdV-r0fEjRV4l04Yhpy_uzD4bjV3K8/pub?output=csv';
  const APP = 'app-20261113d.js?v=8';
  // Pestaña "Combos" de la misma planilla (si no existe o falla, quedan los combos de siempre).
  const COMBOS_GID = '588497962';
  const COMBOS_CSV = COMBOS_GID ? SHEET_CSV.replace('pub?output=csv', 'pub?gid=' + COMBOS_GID + '&single=true&output=csv') : '';

  const parseCSV = text => {
    const rows = []; let row = [], cell = '', q = false;
    text = text.replace(/^﻿/, '');
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(r => r.some(v => v.trim()));
  };
  // Acepta 7499, 7.499, $7.499, 7499,50
  const num = v => {
    v = String(v || '').replace(/[$\s]/g, '');
    if (!v) return null;
    if (/,\d{1,2}$/.test(v)) v = v.replace(/\./g, '').replace(',', '.'); else v = v.replace(/[.,]/g, '');
    const n = Number(v); return Number.isFinite(n) && n > 0 ? n : null;
  };
  const yes = v => /^(si|sí|s|x|true|1)$/i.test(String(v || '').trim());
  const no = v => /^(no|n|false|0)$/i.test(String(v || '').trim());

  const apply = rows => {
    const head = rows[0].map(h => h.trim().toLowerCase());
    const col = name => head.indexOf(name);
    const products = window.PRODUCTS || [];
    const byId = new Map(products.map(p => [String(p.id), p]));
    const hidden = new Set();
    for (const r of rows.slice(1)) {
      const get = name => (col(name) >= 0 ? (r[col(name)] || '').trim() : '');
      const id = get('id'), name = get('nombre');
      if (!id && !name) continue;
      let p = byId.get(id);
      if (!p) { // producto nuevo cargado en la planilla
        p = { id: id || 'n' + products.length, slug: (name || id).toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, price: null, regularPrice: null, cat: get('categoria') || 'Alimentos', categories: [get('categoria') || 'Alimentos'], brand: get('marca'), sku: '', img: imgUrl(get('imagen')), featuredOffer: false };
        products.push(p); byId.set(String(p.id), p);
      }
      if (name) p.name = name;
      if (get('categoria')) p.cat = get('categoria');
      if (get('marca')) p.brand = get('marca');
      if (get('imagen')) p.img = imgUrl(get('imagen'));
      const unit = num(get('precio_unidad')), box = num(get('precio_caja')), qty = num(get('unidades_caja'));
      if (unit) p.price = unit;
      if (qty) p.boxQuantity = qty;
      if (box) { p.boxPrice = box; if (p.boxQuantity) p.boxUnitPrice = Math.round(box / p.boxQuantity); }
      else if (col('precio_caja') >= 0) { delete p.boxPrice; delete p.boxUnitPrice; }
      if (col('oferta') >= 0) p.featuredOffer = yes(get('oferta'));
      if (col('mas_vendido') >= 0) p.bestSeller = yes(get('mas_vendido'));
      if (col('fiestas') >= 0) p.fiestas = yes(get('fiestas'));
      if (no(get('activo'))) hidden.add(p);
    }
    window.PRODUCTS = products.filter(p => !hidden.has(p) && (p.price || p.boxPrice));
  };

  // Link de Google Drive -> imagen que se puede mostrar en la página.
  const imgUrl = v => {
    v = String(v || '').trim();
    const m = v.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{20,})/);
    return m ? 'https://lh3.googleusercontent.com/d/' + m[1] : v;
  };
  const slug = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const applyCombos = rows => {
    if (!rows || rows.length < 2) return;
    const head = rows[0].map(h => h.trim().toLowerCase());
    const at = re => head.findIndex(h => re.test(h));
    const ci = { activo: at(/^activo/), nombre: at(/^nombre/), precio: at(/^precio/), incluye: at(/^incluye/), foto: at(/^foto/), ig: at(/^instagram/) };
    if (ci.nombre < 0 || ci.precio < 0) return;
    const combos = [];
    rows.slice(1).forEach((r, i) => {
      const g = k => (ci[k] >= 0 ? (r[ci[k]] || '').trim() : '');
      const name = g('nombre'), price = num(g('precio'));
      if (!name || !price || no(g('activo'))) return;
      combos.push({ id: 'cmb-' + slug(name), slug: 'combo-' + slug(name), name, price, regularPrice: null, cat: 'Combos', categories: ['Combos'], brand: 'Falucho', sku: 'COMBO', description: '', img: imgUrl(g('foto')) || 'assets/banner-combos.png', packLabel: 'COMBO', comboItems: g('incluye').split(/\s*[;\n]\s*/).filter(Boolean), instagram: g('ig'), fromSheet: true, order: i });
    });
    if (!combos.length) return;
    window.PRODUCTS = (window.PRODUCTS || []).filter(p => p.cat !== 'Combos').concat(combos);
    window.__sheetCombos = true;
  };

  const start = () => { const s = document.createElement('script'); s.src = APP; s.onload = () => { const t = document.createElement('script'); t.src = 'simple.js?v=6'; document.body.appendChild(t); }; document.body.appendChild(s); };
  let done = false;
  const go = () => { if (!done) { done = true; start(); } };
  setTimeout(go, 6000); // si la planilla tarda, muestra los precios guardados
  const get = url => fetch(url, { cache: 'no-store' }).then(r => (r.ok ? r.text() : Promise.reject(r.status))).then(parseCSV);
  Promise.allSettled([get(SHEET_CSV), COMBOS_CSV ? get(COMBOS_CSV) : Promise.resolve(null)])
    .then(([p, c]) => {
      if (done) return;
      if (p.status === 'fulfilled') apply(p.value); else console.warn('No se pudo leer la planilla de precios', p.reason);
      if (c.status === 'fulfilled') applyCombos(c.value); else console.warn('No se pudo leer la pestaña Combos', c.reason);
    })
    .finally(go);
})();
