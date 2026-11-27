// Pantalla inicial "¿Qué buscás?". Al elegir, abre esa categoría del catálogo.
// Link directo sin la pregunta: ?ver=fiestas | ?ver=combos | ?ver=bebidas | ?ver=alimentos | ?ver=todo
// Cotización directa: ?ver=cotizacion
(() => {
  const WA = '541164591826';
  const OPTIONS = [
    { view: 'Fiestas', label: '🎄 Fiestas', hint: 'Pan dulce, sidras, espumantes, estuches y más', fiesta: true },
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
  .chooserOpt.fiesta{background:#fff;color:var(--red,#ed1c24);border-color:#fff}
  .chooserOpt.fiesta b,.chooserOpt.fiesta i{color:var(--red,#ed1c24)}.chooserOpt.fiesta span{color:#7a1015}
  .chooserOpt.fiesta:hover{background:#fff3f3}
  .chooserOpt.fiesta em{font-style:normal;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:var(--red,#ed1c24);color:#fff;border-radius:999px;padding:3px 8px;margin-left:8px;vertical-align:middle}
  .chooserQuote{display:flex;align-items:center;gap:12px;width:100%;margin-top:14px;padding:16px 20px;background:transparent;border:2px dashed #ffffffb3;border-radius:16px;color:#fff;font:inherit;text-align:left;cursor:pointer}
  .chooserQuote:hover{background:#ffffff14}
  .chooserQuote b{display:block;font-size:18px}.chooserQuote span{display:block;font-size:13px;color:#ffffffcc}
  .quoteStep{display:none;text-align:left}
  .chooserBox.quoting .chooserMain{display:none}.chooserBox.quoting .quoteStep.on{display:block}
  .quoteStep h2{font-family:'Playfair Display',Georgia,serif;font-size:28px;margin:0 0 6px;text-align:center}
  .quoteStep p{margin:0 0 18px;text-align:center;color:#ffffffd9}
  .quoteGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .quoteBtn{padding:16px 12px;border:2px solid #fff;border-radius:14px;background:var(--red,#ed1c24);color:#fff;font:inherit;font-weight:700;font-size:16px;cursor:pointer}
  .quoteBtn:hover{background:#c8141b}
  .quoteLabel{display:block;margin:14px 0 8px;font-weight:700}
  .quoteChips{display:flex;flex-wrap:wrap;gap:8px}
  .quoteChip{padding:9px 14px;border:1.5px solid #fff;border-radius:999px;background:transparent;color:#fff;font:inherit;font-size:14px;cursor:pointer}
  .quoteChip[aria-pressed=true]{background:#fff;color:var(--blue,#061d49);font-weight:700}
  .quoteInput{width:100%;box-sizing:border-box;padding:12px 14px;border:0;border-radius:12px;font:inherit;font-size:16px;color:#111}
  textarea.quoteInput{min-height:74px;resize:vertical}
  .quoteSend{display:block;width:100%;margin-top:18px;padding:16px;border:0;border-radius:14px;background:#25d366;color:#fff;font:inherit;font-weight:700;font-size:17px;cursor:pointer;box-shadow:0 8px 24px #0004}
  .quoteBack{display:block;margin:14px auto 0;background:none;border:0;color:#fff;text-decoration:underline;font:inherit;cursor:pointer}
  .catalogTabs,.catalogTools{scroll-margin-top:90px}
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
  const chips = (name, items) => `<div class="quoteChips" data-group="${name}">${items.map(t => `<button type="button" class="quoteChip" aria-pressed="false">${t}</button>`).join('')}</div>`;
  box.innerHTML = `<div class="chooserBox">
    ${logo ? `<img class="logo" src="${logo.src}" alt="Esquina Falucho">` : ''}
    <div class="chooserMain">
      <h1 id="chooserTitle">¿Qué buscás?</h1>
      <p class="sub">Precios mayoristas, sin mínimo de compra.</p>
      <div class="chooserOpts">${OPTIONS.map(o => `<button class="chooserOpt${o.fiesta ? ' fiesta' : ''}" type="button" data-choose="${o.view}"><div><b>${o.label}${o.fiesta ? '<em>Temporada</em>' : ''}</b><span>${o.hint}</span></div><i aria-hidden="true">→</i></button>`).join('')}</div>
      <button class="chooserQuote" type="button" data-quote="start"><div><b>📋 Pedir cotización mayorista</b><span>Para tu fiesta, evento, kiosco o comercio</span></div></button>
      <button class="chooserAll" type="button" data-choose="todo">Ver todo el catálogo</button>
    </div>
    <div class="quoteStep" data-step="1">
      <h2>¿Para qué es la cotización?</h2>
      <p>Te respondemos por WhatsApp con precios mayoristas.</p>
      <div class="quoteGrid">
        <button type="button" class="quoteBtn" data-tipo="evento">🎉 Fiesta o evento</button>
        <button type="button" class="quoteBtn" data-tipo="Kiosco o almacén">🏪 Kiosco o almacén</button>
        <button type="button" class="quoteBtn" data-tipo="Bar o restaurante">🍽️ Bar o restaurante</button>
        <button type="button" class="quoteBtn" data-tipo="Otro">💬 Otro</button>
      </div>
      <button type="button" class="quoteBack" data-quote="back">← Volver</button>
    </div>
    <div class="quoteStep" data-step="evento">
      <h2>Contanos de tu evento</h2>
      <label class="quoteLabel" for="qPersonas">¿Para cuántas personas?</label>
      <input id="qPersonas" class="quoteInput" type="number" inputmode="numeric" min="1" placeholder="Ej: 80">
      <span class="quoteLabel">¿Qué necesitás?</span>
      ${chips('necesita', ['Bebidas con alcohol', 'Bebidas sin alcohol', 'Comida / almacén', 'Descartables y limpieza'])}
      <label class="quoteLabel" for="qNotaE">¿Algo más? (fecha, tipo de evento, marcas)</label>
      <textarea id="qNotaE" class="quoteInput" placeholder="Ej: casamiento el 20/12, buscamos fernet y espumantes"></textarea>
      <button type="button" class="quoteSend" data-send="evento">Enviar por WhatsApp</button>
      <button type="button" class="quoteBack" data-quote="start">← Volver</button>
    </div>
    <div class="quoteStep" data-step="comercio">
      <h2 data-titulo>Contanos de tu comercio</h2>
      <span class="quoteLabel">¿Qué productos buscás?</span>
      ${chips('busca', ['Bebidas', 'Golosinas y galletitas', 'Almacén', 'Lácteos y quesos', 'Fiambres', 'Limpieza'])}
      <label class="quoteLabel" for="qZona">¿En qué zona estás?</label>
      <input id="qZona" class="quoteInput" type="text" placeholder="Ej: Ciudadela">
      <label class="quoteLabel" for="qNotaC">¿Algo más? (productos, cantidades)</label>
      <textarea id="qNotaC" class="quoteInput" placeholder="Ej: 10 cajas de agua por semana"></textarea>
      <button type="button" class="quoteSend" data-send="comercio">Enviar por WhatsApp</button>
      <button type="button" class="quoteBack" data-quote="start">← Volver</button>
    </div>
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
    const target = document.querySelector('.catalogTools') || document.querySelector('.catalogTabs') || catalog;
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', 'EligioCategoria', { categoria: view });
  };

  // El catálogo arranca después de leer la planilla: esperamos a que existan las pestañas.
  const whenReady = fn => {
    if (document.querySelector('.catalogTabs [data-view]') && document.querySelector('#catalogo article, #catalogo [data-product], #catalogo .productCard')) return fn();
    let tries = 0; const t = setInterval(() => { tries++; if (document.querySelector('#catalogo article, #catalogo [data-product], #catalogo .productCard') || tries > 40) { clearInterval(t); fn(); } }, 200);
  };

  // ---- Cotización mayorista ----
  const inner = box.querySelector('.chooserBox');
  let tipo = '';
  const showStep = step => {
    inner.classList.toggle('quoting', !!step);
    box.querySelectorAll('.quoteStep').forEach(s => s.classList.toggle('on', s.dataset.step === step));
    box.scrollTop = 0;
  };
  const picked = g => [...box.querySelectorAll(`[data-group="${g}"] [aria-pressed=true]`)].map(b => b.textContent);
  box.addEventListener('click', e => {
    const q = e.target.closest('[data-quote]');
    if (q) { showStep(q.dataset.quote === 'start' ? '1' : ''); return; }
    const chip = e.target.closest('.quoteChip');
    if (chip) { chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); return; }
    const t = e.target.closest('[data-tipo]');
    if (t) {
      tipo = t.dataset.tipo;
      if (tipo === 'evento') showStep('evento');
      else { box.querySelector('[data-titulo]').textContent = tipo === 'Otro' ? 'Contanos qué necesitás' : 'Contanos de tu ' + tipo.toLowerCase(); showStep('comercio'); }
      return;
    }
    const send = e.target.closest('[data-send]');
    if (send) {
      const L = ['¡Hola! Quiero pedir una cotización mayorista.'];
      if (send.dataset.send === 'evento') {
        const n = box.querySelector('#qPersonas').value.trim();
        L.push('• Es para: Fiesta o evento' + (n ? ` (${n} personas)` : ''));
        const nec = picked('necesita'); if (nec.length) L.push('• Necesito: ' + nec.join(', '));
        const nota = box.querySelector('#qNotaE').value.trim(); if (nota) L.push('• Detalle: ' + nota);
      } else {
        L.push('• Es para: ' + tipo);
        const bus = picked('busca'); if (bus.length) L.push('• Busco: ' + bus.join(', '));
        const z = box.querySelector('#qZona').value.trim(); if (z) L.push('• Zona: ' + z);
        const nota = box.querySelector('#qNotaC').value.trim(); if (nota) L.push('• Detalle: ' + nota);
      }
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'Cotización ' + (tipo || '') });
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(L.join('\n')), '_blank');
    }
  });

  box.addEventListener('click', e => {
    const b = e.target.closest('[data-choose]'); if (!b) return;
    const v = b.dataset.choose;
    document.body.dataset.chose = '1'; document.body.classList.add('simpleMode');
    close();
    whenReady(() => openView(v === 'todo' ? 'Todos' : v));
  });

  const param = (new URLSearchParams(location.search).get('ver') || '').toLowerCase();
  if (param === 'cotizacion') showStep('1');
  const direct = OPTIONS.find(o => o.view.toLowerCase() === param);
  if (direct || param === 'todo' || location.hash === '#catalogo') {
    close();
    if (param) { document.body.dataset.chose = '1'; document.body.classList.add('simpleMode'); }
    if (direct) whenReady(() => openView(direct.view));
    else if (param === 'todo') whenReady(() => openView('Todos'));
  }
  document.documentElement.classList.remove('arranque');
})();
