// Lee los precios de la planilla de Google y después arranca el catálogo.
// Para cambiar un precio: editá la planilla. No hace falta tocar este archivo.
(() => {
  const SHEET_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vToC-r3Lqc13RFxeMYNEcmiExgNXzlzSp0PfbhgnjFuKScG7sxdV-r0fEjRV4l04Yhpy_uzD4bjV3K8/pub?output=csv';
  const APP = 'app-20261113d.js?v=8';

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
        p = { id: id || 'n' + products.length, slug: (name || id).toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, price: null, regularPrice: null, cat: get('categoria') || 'Alimentos', categories: [], brand: get('marca'), sku: '', img: get('imagen'), featuredOffer: false };
        products.push(p); byId.set(String(p.id), p);
      }
      if (name) p.name = name;
      if (get('categoria')) p.cat = get('categoria');
      if (get('marca')) p.brand = get('marca');
      if (get('imagen')) p.img = get('imagen');
      const unit = num(get('precio_unidad')), box = num(get('precio_caja')), qty = num(get('unidades_caja'));
      if (unit) p.price = unit;
      if (qty) p.boxQuantity = qty;
      if (box) { p.boxPrice = box; if (p.boxQuantity) p.boxUnitPrice = Math.round(box / p.boxQuantity); }
      else if (col('precio_caja') >= 0) { delete p.boxPrice; delete p.boxUnitPrice; }
      if (col('oferta') >= 0) p.featuredOffer = yes(get('oferta'));
      if (no(get('activo'))) hidden.add(p);
    }
    window.PRODUCTS = products.filter(p => !hidden.has(p) && (p.price || p.boxPrice));
  };

  const start = () => { const s = document.createElement('script'); s.src = APP; document.body.appendChild(s); };
  let done = false;
  const go = () => { if (!done) { done = true; start(); } };
  setTimeout(go, 6000); // si la planilla tarda, muestra los precios guardados
  fetch(SHEET_CSV, { cache: 'no-store' })
    .then(r => (r.ok ? r.text() : Promise.reject(r.status)))
    .then(t => { if (!done) apply(parseCSV(t)); })
    .catch(e => console.warn('No se pudo leer la planilla de precios', e))
    .finally(go);
})();
