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

  // Si los combos vienen de la planilla, saca los que estaban escritos en el código.
  if (window.__sheetCombos && Array.isArray(products)) {
    for (let i = products.length - 1; i >= 0; i--) if (products[i].cat === 'Combos' && !products[i].fromSheet) products.splice(i, 1);
    try { renderHomeCombos(); } catch (e) {}
  }

  const originalCard = card;
  const miniCard = p => {
    if (p.cat === 'Combos') return comboCard(p);
    const ls = lines(p);
    return `<article class="card mini" data-mini="${esc(p.id)}">
      <button class="miniImg" type="button" data-product-detail="${esc(p.id)}" aria-label="Ver ${esc(p.name)}"><img loading="lazy" src="${esc(p.img)}" alt="">${p.featuredOffer ? '<em>Oferta</em>' : ''}</button>
      <button class="miniName" type="button" data-product-detail="${esc(p.id)}">${esc(p.name)}</button>
      ${(p.incluye || []).length ? `<details class="miniItems"><summary>Qué trae (${p.incluye.length})</summary><ul>${p.incluye.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>` : ''}
      <div class="miniFoot">${ls.map(l => lineHtml(p, l, ls.length > 1)).join('')}</div>
    </article>`;
  };
  const igCode = u => { const m = String(u || '').match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reels?|tv)\/([A-Za-z0-9_-]+)/); return m ? m[1] : ''; };
  const abrirVideo = code => {
    const v = document.createElement('div'); v.className = 'igModal';
    v.innerHTML = `<div class="igBox"><button class="igClose" type="button" aria-label="Cerrar">×</button><iframe src="https://www.instagram.com/p/${code}/embed/" allowfullscreen allow="autoplay; encrypted-media" title="Video de Instagram"></iframe><a href="https://www.instagram.com/p/${code}/" target="_blank" rel="noopener">Abrir en Instagram</a></div>`;
    const cerrar = () => { v.remove(); document.removeEventListener('keydown', esc_); };
    const esc_ = e => { if (e.key === 'Escape') cerrar(); };
    v.addEventListener('click', e => { if (e.target === v || e.target.closest('.igClose')) cerrar(); });
    document.addEventListener('keydown', esc_);
    document.body.appendChild(v);
  };
  document.addEventListener('click', e => { const b = e.target.closest('[data-ig]'); if (b) { e.preventDefault(); abrirVideo(b.dataset.ig); } });
  const comboCard = p => {
    const items = p.comboItems || [];
    const k = `${p.id}:unit`;
    return `<article class="card mini comboMini" data-mini="${esc(p.id)}">
      ${igCode(p.instagram) ? `<div class="miniReel"><iframe src="https://www.instagram.com/p/${esc(igCode(p.instagram))}/embed/" scrolling="no" loading="lazy" allow="autoplay; encrypted-media; fullscreen" title="Video de ${esc(p.name)}"></iframe></div>` : `<button class="miniImg" type="button" data-product-detail="${esc(p.id)}" aria-label="Ver ${esc(p.name)}"><img loading="lazy" src="${esc(p.img)}" alt=""><em>Combo</em></button>`}
      <button class="miniName" type="button" data-product-detail="${esc(p.id)}">${esc(p.name)}</button>
      ${items.length ? `<details class="miniItems"><summary>Qué trae (${items.length})</summary><ul>${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>` : ''}
      ${p.instagram && !igCode(p.instagram) ? `<a class="miniIg" href="${esc(p.instagram)}" target="_blank" rel="noopener">Ver en Instagram</a>` : ''}
      <div class="miniFoot"><div class="miniLine" data-line="${k}"><div class="miniPrice"><strong>${fmt(p.price)}</strong></div><span class="miniCtl">${qtyHtml(k, p.name)}</span></div></div>
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

  // ---- Fiestas: productos tildados en la columna "fiestas" o con categoría Fiestas ----
  const FIESTA_SECS = ['Pan dulce y budines', 'Cajas navideñas', 'Estuches', 'Turrones y golosinas'];
  const esFiesta = p => p.fiestas === true || p.cat === 'Fiestas';
  const hayFiestas = products.some(esFiesta);
  const fiestaGroup = p => {
    const t = String(p.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    if (/pan dulce|budin|panettone|stollen/.test(t)) return 'Pan dulce y budines';
    if (/caja navide|cajas navide|canasta|caja de fiestas|caja fiestas/.test(t)) return 'Cajas navideñas';
    if (/estuche|caja regalo|regalo/.test(t)) return 'Estuches';
    if (/turron|garrapi|confit|mantecol|nougat|bombon|almendra|nuez|frutos secos|pasas/.test(t)) return 'Turrones y golosinas';
    if (/sidra|ananá fizz|anana fizz|frizz/.test(t)) return 'Sidras';
    return '';
  };
  if (typeof belongsToView === 'function') {
    const originalBelongs = belongsToView;
    belongsToView = function (p) {
      if (activeView === 'Fiestas') return esFiesta(p);
      if (p.cat === 'Fiestas' && activeView !== 'Todos' && activeView !== 'Ofertas') return false;
      return originalBelongs(p);
    };
  }
  {
    const originalSub = subcategoryGroup;
    subcategoryGroup = function (p) {
      if (activeView !== 'Fiestas') return originalSub(p);
      const g = fiestaGroup(p);
      if (g) return g;
      if (p.cat === 'Bebidas' && typeof beverageGroup === 'function') return beverageGroup(p);
      if (p.cat === 'Alimentos' && typeof foodGroup === 'function') return foodGroup(p);
      if (p.cat === 'Combos') return 'Combos de fiestas';
      return 'Especiales de fiestas';
    };
  }
  // Columna "seccion" de la planilla: si está completa, manda sobre la sección automática.
  {
    const autoSub = subcategoryGroup;
    subcategoryGroup = function (p) {
      if (p.seccion && activeView !== 'Todos' && activeView !== 'Ofertas' && (activeView !== 'Fiestas' || FIESTA_SECS.includes(p.seccion))) return p.seccion;
      return autoSub(p);
    };
  }
  const tabs = document.querySelector('.catalogTabs');
  if (hayFiestas && tabs && !tabs.querySelector('[data-view="Fiestas"]')) {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.view = 'Fiestas'; b.textContent = '🎄 Fiestas';
    tabs.prepend(b);
  }
  const fiestaOpt = document.querySelector('[data-choose="Fiestas"]');
  if (fiestaOpt) fiestaOpt.hidden = !hayFiestas;

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
      if (activeView === 'Fiestas') {
        const prio = FIESTA_SECS.concat(['Sidras', 'Espumantes', 'Combos de fiestas']);
        const sorted = [...groups].sort((x, y) => { const a = prio.indexOf(x[0]), b = prio.indexOf(y[0]); return (a < 0 ? 99 : a) - (b < 0 ? 99 : b); });
        groups.clear(); sorted.forEach(([k, v]) => groups.set(k, v));
      }
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
  .miniItems{margin:0 10px 6px;font-size:12px;color:#4b5563}
  .miniItems summary{cursor:pointer;color:var(--blue);font-weight:600}
  .miniItems ul{margin:6px 0 0;padding-left:16px}
  .miniIg{display:inline-block;margin:0 10px 6px;font-size:12px;font-weight:600;color:var(--blue)}
  .miniVideo{display:block;margin:0 10px 8px;padding:7px 12px;border:0;border-radius:999px;background:linear-gradient(45deg,#f58529,#dd2a7b,#8134af);color:#fff;font:700 12.5px 'DM Sans',sans-serif;cursor:pointer}
  .miniReel{display:block;position:relative;width:100%;aspect-ratio:4/5;overflow:hidden;container-type:inline-size;background:#000;border-radius:14px 14px 0 0}
  .miniReel iframe{position:absolute;border:0;width:143cqw;height:calc(56px + 180cqw + 160px);left:-21.5cqw;top:calc(-56px - 26.5cqw)}
  .igModal{position:fixed;inset:0;z-index:9999;background:rgba(6,29,73,.78);display:flex;align-items:center;justify-content:center;padding:16px}
  .igBox{position:relative;width:min(420px,94vw);height:min(760px,88vh);background:#fff;border-radius:18px;overflow:hidden;display:flex;flex-direction:column}
  .igBox iframe{flex:1;width:100%;border:0}
  .igBox a{display:block;text-align:center;padding:10px;font:600 13px 'DM Sans',sans-serif;color:var(--blue)}
  .igClose{position:absolute;top:8px;right:8px;z-index:2;width:36px;height:36px;border:0;border-radius:50%;background:#061d49;color:#fff;font-size:22px;cursor:pointer}
  #catalogo .catalogGrid:not(.rows) .comboMini{grid-column:span 1}
  @media(min-width:900px){.miniRail{grid-auto-columns:190px}}`;
  document.head.appendChild(css);

  const setHdr = () => { const h = document.querySelector('header'); if (h) document.documentElement.style.setProperty('--hdr', h.offsetHeight + 'px'); };
  setHdr(); window.addEventListener('resize', setHdr);
  const sInput = document.getElementById('search'); if (sInput) sInput.placeholder = 'Buscar: fernet, aceite, yerba…';

  renderCatalog();
  document.documentElement.classList.remove('cargando');
})();
