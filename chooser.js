// Pantalla inicial "¿Qué buscás?". Al elegir, abre esa categoría del catálogo.
// Link directo sin la pregunta: ?ver=combos | ?ver=bebidas | ?ver=alimentos | ?ver=todo
(() => {
  const OPTIONS = [
    { view: 'Combos', label: 'Combos', hint: 'Packs armados con mejor precio', img: 'assets/combo-2-almacen-limpieza.png' },
    { view: 'Bebidas', label: 'Bebidas', hint: 'Vinos, aperitivos, gaseosas y más', img: 'assets/bebidas-chandon-extra-brut.svg' },
    { view: 'Alimentos', label: 'Alimentos', hint: 'Almacén, lácteos y más', img: 'assets/aceite-girasol-el-paisano-900cc.png' }
  ];

  const css = `
  .chooser{position:fixed;inset:0;z-index:9999;background:linear-gradient(#061d49d9,#061d49cc),url('assets/banner-local-falucho-original.jpg') center/cover no-repeat var(--blue,#061d49);color:#fff;display:flex;align-items:center;justify-content:center;padding:24px 16px;overflow:auto;font-family:'DM Sans',system-ui,sans-serif}
  .chooser[hidden]{display:none}
  .chooserBox{width:100%;max-width:520px;text-align:center}
  .chooserBox .logo{height:56px;margin:0 auto 18px;display:block}
  .chooserBox h1{font-family:'Playfair Display',Georgia,serif;color:#fff;font-size:34px;margin:0 0 6px}
  .chooserBox p.sub{margin:0 0 22px;color:#ffffffd9}
  .chooserOpts{display:grid;gap:12px}
  .chooserOpt{display:flex;align-items:center;gap:16px;width:100%;padding:20px 22px;background:var(--red,#ed1c24);border:2px solid #fff;border-radius:16px;cursor:pointer;text-align:left;font:inherit;color:#fff;box-shadow:0 8px 24px #0004;transition:transform .15s,background .15s}
  .chooserOpt:hover,.chooserOpt:focus-visible{background:#c8141b;transform:translateY(-1px);outline:none}
  .chooserOpt b{display:block;font-size:24px;color:#fff}
  .chooserOpt span{display:block;font-size:14px;color:#ffffffe0}
  .chooserOpt i{margin-left:auto;font-style:normal;font-size:26px;color:#fff}
  .chooserAll{margin-top:18px;background:none;border:0;color:#fff;text-decoration:underline;font:inherit;cursor:pointer;padding:8px}
  body.chooserOpen{overflow:hidden}
  .catalogTabs{scroll-margin-top:90px}
  .catalogFirst .catalogHeading,.catalogFirst .catalogBenefits{display:none}
  .filterToggle{display:flex;align-items:center;justify-content:space-between;width:100%;margin:0 0 14px;padding:12px 16px;border:1px solid var(--blue,#061d49);border-radius:12px;background:#fff;color:var(--blue,#061d49);font:inherit;font-weight:700;cursor:pointer}
  .filterToggle em{font-style:normal;transition:transform .2s}
  .filterToggle[aria-expanded=true] em{transform:rotate(180deg)}
  .filterFlow.collapsed{display:none}
  .subCategoryTabs>span{font-size:0}.subCategoryTabs>span::after{content:'Tipo';font-size:14px}
  .subCategoryTabs button.active{background:var(--blue,#061d49)!important;color:#fff!important;border-color:var(--blue,#061d49)!important}`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const logo = document.querySelector('header .brand img');
  const box = document.createElement('div');
  box.className = 'chooser'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'chooserTitle');
  box.innerHTML = `<div class="chooserBox">
    ${logo ? `<img class="logo" src="${logo.src}" alt="Esquina Falucho">` : ''}
    <h1 id="chooserTitle">¿Qué buscás?</h1>
    <p class="sub">Precios mayoristas, sin mínimo de compra.</p>
    <div class="chooserOpts">${OPTIONS.map(o => `<button class="chooserOpt" type="button" data-choose="${o.view}"><div><b>${o.label}</b><span>${o.hint}</span></div><i aria-hidden="true">→</i></button>`).join('')}</div>
    <button class="chooserAll" type="button" data-choose="todo">Ver todo el catálogo</button>
  </div>`;
  document.body.prepend(box);
  document.body.classList.add('chooserOpen');


  // Filtros de marca y tipo plegados en un botón, para que se vean los productos de una.
  const flow = document.querySelector('.filterFlow');
  if (flow) {
    const t = document.getElementById('brandFilterTitle'); if (t) t.textContent = 'Marca';
    flow.classList.add('collapsed'); flow.id = flow.id || 'filterFlow';
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'filterToggle'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', flow.id);
    btn.innerHTML = '<span>Filtrar por marca o tipo</span><em aria-hidden="true">▾</em>';
    btn.onclick = () => { const open = flow.classList.toggle('collapsed') === false; btn.setAttribute('aria-expanded', String(open)); };
    flow.before(btn);
  }
  const close = () => { box.hidden = true; document.body.classList.remove('chooserOpen'); };
  const openView = view => {
    close();
    const catalog = document.querySelector('#catalogo');
    const tab = view && document.querySelector(`.catalogTabs [data-view="${view}"]`);
    if (tab) tab.click();
    const target = document.querySelector('.catalogTabs') || catalog;
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', 'EligioCategoria', { categoria: view });
  };

  // El catálogo arranca después de leer la planilla: esperamos a que existan las pestañas.
  const whenReady = fn => {
    if (document.querySelector('.catalogTabs [data-view]') && document.querySelector('#catalogo article, #catalogo [data-product], #catalogo .productCard')) return fn();
    let tries = 0; const t = setInterval(() => { tries++; if (document.querySelector('#catalogo article, #catalogo [data-product], #catalogo .productCard') || tries > 40) { clearInterval(t); fn(); } }, 200);
  };

  box.addEventListener('click', e => {
    const b = e.target.closest('[data-choose]'); if (!b) return;
    const v = b.dataset.choose;
    document.body.dataset.chose = '1'; document.body.classList.add('simpleMode');
    close();
    whenReady(() => openView(v === 'todo' ? 'Todos' : v));
  });

  const param = (new URLSearchParams(location.search).get('ver') || '').toLowerCase();
  const direct = OPTIONS.find(o => o.view.toLowerCase() === param);
  if (direct || param === 'todo' || location.hash === '#catalogo') {
    close();
    if (param) { document.body.dataset.chose = '1'; document.body.classList.add('simpleMode'); }
    if (direct) whenReady(() => openView(direct.view));
    else if (param === 'todo') whenReady(() => openView('Todos'));
  }
})();
