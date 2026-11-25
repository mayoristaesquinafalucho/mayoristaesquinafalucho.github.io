// Vista simple del catálogo: filas por tipo, tarjetas chicas y solo productos a la vista.
// Usa las funciones del catálogo (app-*.js), que se carga antes que este archivo.
(() => {
  if (typeof renderCatalog !== 'function' || typeof card !== 'function') return;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const fmt = n => (typeof money === 'function' ? money(n) : '$ ' + Number(n).toLocaleString('es-AR'));
  const qtyOf = k => Number((basket || {})[k] || 0);
  const boxLabel = p => (typeof boxTitle === 'function' ? boxTitle(p) : 'Caja' + (p.boxQuantity ? ' x' + p.boxQuantity : ''));

  const qtyHtml = (k, label) => {
    const n = qtyOf(k);
    return n
      ? `<div class="miniQty"><button type="button" data-card-quantity="${k}" data-d="-1" aria-label="Restar ${esc(label)}">−</button><span>${n}</span><button type="button" data-card-quantity="${k}" data-d="1" aria-label="Sumar ${esc(label)}">+</button></div>`
      : `<button class="miniAdd" type="button" data-card-quantity="${k}" data-d="1" aria-label="Agregar ${esc(label)}">+</button>`;
  };
  // Una línea por forma de compra: unidad y/o caja, cada una con su precio y su botón.
  const lines = p => {
    const out = [];
    if (!p.boxOnly && p.price) out.push({ k: `${p.id}:unit`, label: 'Unidad', price: p.price, old: p.regularPrice && p.regularPrice > p.price ? p.regularPrice : 0 });
    if (p.boxPrice) {
      const each = p.boxUnitPrice || (p.boxQuantity ? Math.round(p.boxPrice / p.boxQuantity) : 0);
      out.push({ k: `${p.id}:box`, label: boxLabel(p), price: p.boxPrice, each: each && p.price && each < p.price ? each : 0, box: true });
    }
    return out;
  };
  const lineHtml = (p, l, many) => `<div class="miniLine${l.box ? ' isBox' : ''}" data-line="${l.k}">
      <div class="miniPrice">${many || l.box ? `<small class="miniLabel">${esc(l.label)}</small>` : ''}${l.old ? `<s>${fmt(l.old)}</s>` : ''}<strong>${fmt(l.price)}</strong>${l.each ? `<small class="miniEach">${fmt(l.each)} c/u</small>` : ''}</div>
      <span class="miniCtl">${qtyHtml(l.k, p.name + ' ' + l.label)}</span></div>`;

  const originalCard = card;
  const miniCard = p => {
    if (p.cat === 'Combos') return originalCard(p);
    const ls = lines(p);
    return `<article class="card mini" data-mini="${esc(p.id)}">
      <button class="miniImg" type="button" data-product-detail="${esc(p.id)}" aria-label="Ver ${esc(p.name)}"><img loading="lazy" src="${esc(p.img)}" alt="">${p.featuredOffer ? '<em>Oferta</em>' : ''}</button>
      <button class="miniName" type="button" data-product-detail="${esc(p.id)}">${esc(p.name)}</button>
      <div class="miniFoot">${ls.map(l => lineHtml(p, l, ls.length > 1)).join('')}</div>
    </article>`;
  };
  card = miniCard;

  // Bebidas que antes caían en "Vinos" por no tener un grupo propio.
  if (typeof beverageGroup === 'function') {
    const originalBeverage = beverageGroup;
    const plain = p => String((p.name || '') + ' ' + (p.brand || '')).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    beverageGroup = function (p) {
      const g = originalBeverage(p);
      if (g !== 'Vinos') return g;
      const t = plain(p);
      if (/\bron\b|cachaca|\bcana\b/.test(t)) return 'Ron, caña y cachaça';
      if (/vermouth|vermut|granadina/.test(t)) return 'Aperitivos';
      return g;
    };
  }

  // Lácteos y quesos en filas separadas.
  if (typeof foodGroup === 'function') {
    const originalFood = foodGroup;
    const plainF = p => String((p.name || '') + ' ' + (p.brand || '')).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    foodGroup = function (p) {
      const g = originalFood(p);
      if (g !== 'Lácteos y quesos') return g;
      return /queso|tybo|mozzarella|muzzarella|cremoso|reggianito|sardo|provolone|vacremita|gandacrem|port salut|fontina|rallado/.test(plainF(p)) ? 'Quesos' : 'Lácteos';
    };
  }

  const unfiltered = () => !query && activeSubcategory === 'all' && activeDetail === 'all' && activeBrand === 'all' && !buyerMode && !businessSelection;
  const ROW_MAX = 12;
  // "Más vendidos": los marcados con SI en la columna mas_vendido de la planilla.
  // Si en esa categoría no hay ninguno marcado, usa los destacados que ya tenía la página.
  const FALLBACK_TOP = ['fideos-mostachol-sol-pampeano-x500gr','vodka-skyy-cosmic-x700ml','speed-xl-x-unidad','azucar-gury-x1kg','aceite-girasol-el-paisano-x900cc','leche-larga-vida-gandara-x1lt','alfajor-super-triple-fantoche-x100gr','cajon-dulce-de-membrillo-7-dias-x5kg','queso-cremoso-4-hermanos-x-horma','aperitivo-fernet-branca-x750ml','aperitivo-fernet-branca-x750ml'];
  const topSellers = list => {
    const marked = list.filter(p => p.bestSeller);
    if (marked.length) return marked;
    return FALLBACK_TOP.map(slug => list.find(p => p.slug === slug)).filter((p, i, a) => p && a.indexOf(p) === i);
  };

  const originalRender = renderCatalog;
  renderCatalog = function () {
    originalRender.apply(this, arguments);
    const grid = productGrid;
    grid.classList.remove('rows');
    document.querySelector('.miniBack')?.remove();
    if (unfiltered() && activeView !== 'Combos') {
      const list = filteredProducts();
      const groups = new Map();
      for (const p of list) { const g = subcategoryGroup(p) || 'Otros'; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(p); }
      if (groups.size > 1) {
        grid.classList.add('rows');
        const top = topSellers(list).filter(p => p.cat !== 'Combos');
        const topHtml = top.length >= 2 ? `<section class="miniRow topRow"><div class="miniRowHead"><h2>⭐ Más vendidos</h2></div><div class="miniRail">${top.slice(0, ROW_MAX).map(miniCard).join('')}</div></section>` : '';
        grid.innerHTML = topHtml + [...groups].map(([g, items]) => `<section class="miniRow">
          <div class="miniRowHead"><h2>${esc(g)}</h2><button type="button" data-subcategory="${esc(g)}">Ver todos (${items.length})</button></div>
          <div class="miniRail">${items.slice(0, ROW_MAX).map(miniCard).join('')}${items.length > ROW_MAX ? `<button class="miniMore" type="button" data-subcategory="${esc(g)}">Ver los ${items.length}<br>→</button>` : ''}</div>
        </section>`).join('');
        loadMore.hidden = true;
      }
    } else if (!query && activeSubcategory !== 'all') {
      const back = document.createElement('button');
      back.type = 'button'; back.className = 'miniBack'; back.dataset.subcategory = 'all';
      back.textContent = `← ${activeSubcategory}`;
      back.title = 'Volver a todas las categorías';
      grid.before(back);
    }
    document.querySelectorAll('.subCategoryTabs [data-subcategory]').forEach(b => b.classList.toggle('active', b.dataset.subcategory === activeSubcategory));
  };

  // Al sumar o restar, actualiza el contador de cada tarjeta chica.
  const originalSave = save;
  save = function () {
    originalSave.apply(this, arguments);
    document.querySelectorAll('.miniLine[data-line]').forEach(el => {
      const label = el.querySelector('.miniLabel')?.textContent || '';
      el.querySelector('.miniCtl').innerHTML = qtyHtml(el.dataset.line, label);
    });
  };

  // Después de elegir en la pantalla inicial: solo productos (sin combos, videos, marcas, etc.).
  const simple = () => document.body.classList.add('simpleMode');
  document.addEventListener('click', e => { if (e.target.closest('[data-choose]')) simple(); }, true);
  if (new URLSearchParams(location.search).get('ver') || document.querySelector('.chooser')?.hidden === false || document.body.dataset.chose) simple();

  const css = document.createElement('style');
  css.textContent = `
  body.simpleMode .heroBanner,body.simpleMode .servicePromises,body.simpleMode #como-comprar,body.simpleMode #combos,body.simpleMode #destacados,body.simpleMode #combos-en-video,body.simpleMode #marcas,body.simpleMode #informacion,body.simpleMode #mayoristas,body.simpleMode .catalogFootnote{display:none!important}
  body.simpleMode #catalogo{padding-top:16px}
  body.simpleMode #catalogo .catalogTools{position:sticky;top:var(--hdr,74px);z-index:15;margin:0 -2px 10px;padding:10px 2px;background:#fff;border:0;box-shadow:none;grid-template-columns:1fr}
  body.simpleMode #catalogo .catalogTools #repeatOrderShortcut{display:none}
  #catalogo .catalogGrid.rows{display:block}
  #catalogo .catalogGrid.rows ~ .loadMore,#catalogo .loadMore[hidden]{display:none!important}
  .miniRow{margin:0 0 26px}
  .miniRowHead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:0 0 10px}
  .miniRowHead h2{margin:0;font-size:19px;color:var(--blue);font-family:'DM Sans',sans-serif;font-weight:700}
  .miniRowHead button,.miniBack{background:none;border:0;color:var(--blue);font:inherit;font-size:14px;font-weight:600;cursor:pointer;padding:4px 0;white-space:nowrap}
  .miniBack{display:inline-block;margin:0 0 12px;font-size:17px}
  .miniRail{display:grid;grid-auto-flow:column;grid-auto-columns:clamp(140px,38vw,180px);gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding:2px 2px 10px;scrollbar-width:thin}
  .miniRail>*{scroll-snap-align:start}
  #catalogo .catalogGrid:not(.rows){display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
  #catalogo .card.mini{display:flex;flex-direction:column;border:1px solid #e8ecf3;border-radius:16px;background:#fff;overflow:hidden;box-shadow:none;transform:none}
  #catalogo .card.mini:hover{box-shadow:0 6px 18px #061d4914;transform:none}
  .miniImg{position:relative;display:block;width:100%;aspect-ratio:1/1;padding:10px;border:0;border-bottom:1px solid #f0f2f6;background:#fff;cursor:pointer}
  .miniImg img{width:100%;height:100%;object-fit:contain}
  .miniImg em{position:absolute;left:8px;top:8px;font-style:normal;font-size:10px;font-weight:700;background:var(--blue);color:#fff;border-radius:999px;padding:3px 8px}
  .miniName{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.6em;margin:10px 10px 6px;padding:0;border:0;background:none;text-align:left;font:600 13px/1.3 'DM Sans',sans-serif;color:var(--ink);cursor:pointer}
  .miniFoot{display:flex;flex-direction:column;gap:6px;margin:auto 10px 10px}
  .miniLine{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:6px}
  .miniLine.isBox{padding-top:6px;border-top:1px dashed #e3e8f1}
  .miniCtl{margin-left:auto}
  .miniLabel{font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#6b7280}
  .miniEach{color:var(--blue)!important;font-weight:600}
  .miniPrice{display:flex;flex-direction:column;min-width:0}
  .miniPrice strong{font-size:15px;color:var(--blue);white-space:nowrap}
  .miniPrice s{font-size:11px;color:#9ca3af}
  .miniPrice small{font-size:10.5px;color:#6b7280;line-height:1.25}
  .miniAdd{flex:none;width:36px;height:36px;border:0;border-radius:50%;background:var(--blue);color:#fff;font-size:22px;line-height:1;cursor:pointer}
  .miniQty{display:flex;align-items:center;gap:2px;background:var(--blue);border-radius:999px;color:#fff}
  .miniQty button{width:30px;height:34px;border:0;background:none;color:#fff;font-size:18px;cursor:pointer}
  .miniQty span{min-width:14px;text-align:center;font-weight:700;font-size:14px}
  .miniMore{border:1px dashed #c9d2e3;border-radius:16px;background:#f7f9fc;color:var(--blue);font:600 14px 'DM Sans',sans-serif;cursor:pointer}
  @media(min-width:900px){.miniRail{grid-auto-columns:190px}}`;
  document.head.appendChild(css);

  const setHdr = () => { const h = document.querySelector('header'); if (h) document.documentElement.style.setProperty('--hdr', h.offsetHeight + 'px'); };
  setHdr(); window.addEventListener('resize', setHdr);
  const sInput = document.getElementById('search'); if (sInput) sInput.placeholder = 'Buscar: fernet, aceite, yerba…';

  renderCatalog();
})();
