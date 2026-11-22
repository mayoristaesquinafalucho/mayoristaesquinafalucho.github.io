const sourceProducts=[...(window.PRODUCTS||[])];
const combo2Final={id:1002,slug:'combo-2-almacen-limpieza',name:'Combo 2 · Almacén y limpieza',price:87440,regularPrice:null,cat:'Combos',categories:['Combos'],brand:'Falucho',sku:'COMBO2',description:'',img:'assets/combo-2-almacen-limpieza.png?v=1',packLabel:'COMBO',comboItems:['15 fideos tirabuzón Sol Pampeano x500 g','10 azúcares Gury x1 kg','6 aceites de girasol El Paisano x900 ml','12 purés de tomate La Huerta x520 g','1 papel higiénico Elegante Extra Pack Familiar x24 rollos','12 leches enteras Silvia x1 L','8 paquetes de rollo de cocina Elegante x3 rollos']};
const combo2Index=sourceProducts.findIndex(product=>String(product.id)==='1002');
const combo2Current=combo2Index>=0?sourceProducts.splice(combo2Index,1)[0]:{};
sourceProducts.splice(1,0,{...combo2Current,...combo2Final});
const combo3Final={id:1003,slug:'combo-3-almacen-completo',name:'Combo 3 · Almacén completo',price:99640,regularPrice:null,cat:'Combos',categories:['Combos'],brand:'Falucho',sku:'COMBO3',description:'',img:'assets/combo-3-almacen-completo.svg?v=1',packLabel:'COMBO',comboItems:['15 fideos tirabuzón Sol Pampeano x500 g','12 purés de tomate La Huerta x520 g','10 azúcares Gury x1 kg','10 arroces Molinos Ala x500 g','10 yerbas Flor de Oro x500 g','6 leches enteras Silvia x1 L','1 papel higiénico Elegante Extra Pack Familiar x24 rollos','8 paquetes de rollo de cocina Elegante x3 rollos','6 aceites de girasol El Paisano x900 ml']};
const combo3Index=sourceProducts.findIndex(product=>String(product.id)==='1003');
const combo3Current=combo3Index>=0?sourceProducts.splice(combo3Index,1)[0]:{};
sourceProducts.splice(2,0,{...combo3Current,...combo3Final});
const combo5Final={id:1005,slug:'combo-5-almacen-bebidas',name:'Combo 5 · Almacén y bebidas',price:99530,regularPrice:null,cat:'Combos',categories:['Combos'],brand:'Falucho',sku:'COMBO5',description:'',img:'assets/combo-5-almacen-bebidas.svg?v=1',packLabel:'COMBO',comboItems:['15 fideos tirabuzón Sol Pampeano x500 g','12 purés de tomate La Huerta x520 g','10 azúcares Gury x1 kg','10 arroces Molinos Ala x500 g','10 yerbas Flor de Oro x500 g','6 leches enteras Silvia x1 L','6 aguas Baggio Fresh x1,5 L','6 aguas saborizadas Baggio Fresh x1,5 L','6 aceites de girasol El Paisano x900 ml','8 alfajores Fantoche Triple Negro']};
const combo5Index=sourceProducts.findIndex(product=>String(product.id)==='1005');
const combo5Current=combo5Index>=0?sourceProducts.splice(combo5Index,1)[0]:{};
const combo6Index=sourceProducts.findIndex(product=>String(product.id)==='1006');
sourceProducts.splice(combo6Index>=0?combo6Index:4,0,{...combo5Current,...combo5Final});
sourceProducts.forEach(product=>{if(String(product.id)==='1007')product.price=99830;if(String(product.id)==='9009')product.price=32420});

if(!sourceProducts.some(p=>p.slug==='fideos-mostachol-sol-pampeano-x500gr'))sourceProducts.push({id:'destacado-mostachol',slug:'fideos-mostachol-sol-pampeano-x500gr',name:'Fideos Mostachol "Sol Pampeano" x500gr',price:960,regularPrice:null,cat:'Alimentos',categories:['Alimentos > Otros'],brand:'Sol Pampeano',sku:'OTR',description:'',img:'https://acdn-us.mitiendanube.com/stores/007/258/334/products/untitled-design-1-5afbb127e5e8a0f8b617814423290684-640-0.webp',featuredOffer:false,boxPrice:12750,boxQuantity:15,boxUnitPrice:850,boxLabel:'PACK X15',twoForEnabled:true});
if(!sourceProducts.some(p=>p.slug==='aceite-girasol-el-paisano-x900cc'))sourceProducts.push({id:'destacado-aceite-paisano',slug:'aceite-girasol-el-paisano-x900cc',name:'Aceite de girasol El Paisano x900 cc',price:2250,regularPrice:null,cat:'Alimentos',categories:['Alimentos > Otros'],brand:'El Paisano',sku:'OTR',description:'',img:'assets/aceite-girasol-el-paisano-900cc.png?v=2',featuredOffer:false,twoForEnabled:true});
const products=sourceProducts.filter(p=>!p.offerOnly||!p.offerUntil||Date.now()<=new Date(p.offerUntil).getTime()).map(p=>p.offerUntil&&Date.now()>new Date(p.offerUntil).getTime()?{...p,price:p.regularPrice??p.price,regularPrice:null,featuredOffer:false}:p);
const money=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n),moneyUnit=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);
function initMetaPixel(){const pixelId=String(window.FALUCHO_META_PIXEL_ID||'').trim();if(!pixelId||window.fbq)return;!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',pixelId);fbq('track','PageView')}
const trackMeta=(eventName,parameters={})=>{if(typeof window.fbq==='function')window.fbq('track',eventName,parameters)};
initMetaPixel();
let basket=JSON.parse(localStorage.getItem('falucho-cart')||'{}'),activeView='Alimentos',activeSubcategory='all',activeDetail='all',activeBrand='all',buyerMode='',purchaseMode='all',query='',sortMode='featured',visibleLimit=30;
if(!localStorage.getItem('falucho-combo-id-fix')){['389','390','391','392','393'].forEach(id=>delete basket[id]);localStorage.setItem('falucho-cart',JSON.stringify(basket));localStorage.setItem('falucho-combo-id-fix','1')}

const viewMenus={Ofertas:['Alimentos','Bebidas','Limpieza'],Alimentos:['Pastas, arroz, harinas y legumbres','Desayuno y dulces','Lácteos y quesos','Galletitas y snacks','Golosinas y alfajores','Panificados y tapas','Salsas, aderezos y conservas','Aceites, condimentos y otros'],Bebidas:['Gaseosas','Aguas y aguas saborizadas','Jugos','Energizantes','Vinos','Espumantes','Cervezas','Aperitivos','Vodka, gin y tequila','Whisky y licores'],Limpieza:['Lavadero','Cocina','Baño y desinfección','Papel e higiene','Otros de limpieza'],Combos:['Combos de almacén','Desayuno y merienda','Bebidas','Limpieza','Familiares'],Todos:['Alimentos','Bebidas','Limpieza','Combos']};
const allProductDetails={Alimentos:['Pastas, arroz, harinas y legumbres','Desayuno y dulces','Lácteos y quesos','Galletitas y snacks','Golosinas y alfajores','Panificados y tapas','Salsas, aderezos y conservas','Aceites, condimentos y otros'],Bebidas:['Gaseosas','Aguas y aguas saborizadas','Jugos','Energizantes','Vinos','Espumantes','Cervezas','Aperitivos','Vodka, gin y tequila','Whisky y licores'],Limpieza:['Lavadero','Cocina','Baño y desinfección','Papel e higiene','Otros de limpieza'],Combos:['Combos de almacén','Desayuno y merienda','Bebidas','Limpieza','Familiares']};
const normalize=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''),normalizedText=p=>normalize([p.name,p.brand,p.sku,...(p.categories||[]),...(p.comboItems||[])].join(' '));

const searchWords = value => normalize(value)
  .replace(/\bx\s*(?=\d)/g, '')
  .replace(/(\d)[.,](\d)/g, '$1d$2')
  .replace(/(\d)\s*(?:grs?|gramos?|g)\b/g, '$1g')
  .replace(/(\d)\s*(?:lts?|litros?|l)\b/g, '$1l')
  .replace(/(\d)\s*(?:mililitros?|cc|ml)\b/g, '$1ml')
  .replace(/(\d)\s*(?:kilos?|kg)\b/g, '$1kg')
  .match(/[a-z0-9]+/g) || [];

const searchIndex = new Map(products.map(product => [product, {
  primary: searchWords([product.name, product.brand, product.sku].join(' ')),
  secondary: searchWords([product.cat, ...(product.categories || []), ...(product.comboItems || [])].join(' ')),
}]));

function oneEditApart(term, word) {
  if (Math.abs(term.length - word.length) > 1) return false;
  if (term.length > word.length) [term, word] = [word, term];
  let index = 0;
  while (index < term.length && term[index] === word[index]) index++;
  if (term.length < word.length) return term.slice(index) === word.slice(index + 1);
  if (term.slice(index + 1) === word.slice(index + 1)) return true;
  return term[index] === word[index + 1] && term[index + 1] === word[index]
    && term.slice(index + 2) === word.slice(index + 2);
}

function wordScore(term, words) {
  if (words.includes(term)) return 4;
  if (/^\d/.test(term)) return 0;
  if (term.length >= 2 && words.some(word => word.startsWith(term))) return 3;
  if (term.length >= 4 && words.some(word => oneEditApart(term, word))) return 1;
  return 0;
}

function searchScore(product, terms) {
  const {primary, secondary} = searchIndex.get(product);
  let score = 0;
  for (const term of terms) {
    const main = wordScore(term, primary), extra = wordScore(term, secondary);
    if (!main && !extra) return 0;
    score += Math.max(main * 2, extra);
  }
  return score;
}

function foodGroup(p){const t=normalizedText(p);if(/gallet|talita|snack|papita|palito|mani/.test(t))return'Galletitas y snacks';if(/alfajor|chupet|rocklet|golos|caramel|chocolate|bocadito/.test(t))return'Golosinas y alfajores';if(/tostad|yerba|azucar|cafe|mermelada|dulce de leche|dulce de batata/.test(t))return'Desayuno y dulces';if(/queso|tybo|mozzarella|vacremita|gandacrem|leche|yogur|manteca|crema lactea/.test(t))return'Lácteos y quesos';if(/pan\b|pancho|hamburguesa|lactal|pascualina|empanad/.test(t))return'Panificados y tapas';if(/mayonesa|ketchup|mostaza|salsa|aderezo|tomate|atun|durazno|pera gentleman|choclo|conserva|lata/.test(t))return'Salsas, aderezos y conservas';if(/fideo|spaghetti|rigatti|tirabuzon|arroz|polenta|harina|legumbre|lenteja|garbanzo/.test(t))return'Pastas, arroz, harinas y legumbres';return'Aceites, condimentos y otros'}
function beverageGroup(p){const t=normalizedText(p);if(/speed|energizante/.test(t))return'Energizantes';if(/jugo|baggio pronto/.test(t))return'Jugos';if(/agua|soda|fresh/.test(t))return'Aguas y aguas saborizadas';if(/gaseosa|coca|sprite/.test(t))return'Gaseosas';if(/champagne|espumante|chandon|fresita|vivace|federico de alvear/.test(t))return'Espumantes';if(/cerveza/.test(t))return'Cervezas';if(/fernet|aperol|campari|aperitivo/.test(t))return'Aperitivos';if(/vodka|gin\b|tequila/.test(t))return'Vodka, gin y tequila';if(/whisky|whiskey|licor|grappa/.test(t))return'Whisky y licores';return'Vinos'}
const beverageAlcohol=p=>['Gaseosas','Aguas y aguas saborizadas','Jugos','Energizantes'].includes(beverageGroup(p))?'Sin alcohol':'Con alcohol';
function cleaningGroup(p){const t=normalizedText(p);if(/papel|rollo|servilleta|panuelo|higien|desodorante/.test(t))return'Papel e higiene';if(/jabon en polvo|jabon liquido|ariel|ropa|suavizante|lavadero/.test(t))return'Lavadero';if(/detergente|desengras|cocina/.test(t))return'Cocina';if(/bano|inodoro|desinfectante|lavandina|ayudin/.test(t))return'Baño y desinfección';return'Otros de limpieza'}
function comboGroup(p){const t=normalizedText(p);if(/limpieza|papel|rollo|detergente|lavandina/.test(t))return'Limpieza';if(/bebida|gaseosa|jugo|vino|cerveza/.test(t))return'Bebidas';if(/familiar|familia/.test(t))return'Familiares';if(/desayuno|merienda|yerba|azucar|cafe|mermelada|tostada|dulce de leche|yogur|leche/.test(t))return'Desayuno y merienda';return'Combos de almacén'}
function kioskGroup(p){if(p.cat==='Combos')return'';if(p.cat==='Bebidas')return beverageAlcohol(p)==='Sin alcohol'?'Bebidas sin alcohol':'Bebidas con alcohol';if(p.cat==='Limpieza')return'Limpieza e higiene';const f=foodGroup(p);if(['Golosinas y alfajores','Galletitas y snacks'].includes(f))return'Golosinas y galletitas';if(f==='Lácteos y quesos')return f;return'Almacén'}
function gastronomyGroup(p){if(p.cat==='Combos')return'';if(p.cat==='Bebidas')return'Bebidas';if(p.cat==='Limpieza')return'Limpieza y descartables';const f=foodGroup(p);if(['Salsas, aderezos y conservas','Lácteos y quesos','Panificados y tapas'].includes(f))return f;if(['Pastas, arroz, harinas y legumbres','Desayuno y dulces','Aceites, condimentos y otros'].includes(f))return'Almacén e ingredientes';return''}
function detailGroup(p){if(activeView==='Todos'){if(p.cat==='Alimentos')return foodGroup(p);if(p.cat==='Bebidas')return beverageGroup(p);if(p.cat==='Limpieza')return cleaningGroup(p);if(p.cat==='Combos')return comboGroup(p)}return''}
function subcategoryGroup(p){if(activeView==='Ofertas'||activeView==='Todos')return p.cat;if(activeView==='Alimentos')return foodGroup(p);if(activeView==='Bebidas')return beverageGroup(p);if(activeView==='Limpieza')return cleaningGroup(p);if(activeView==='Combos')return comboGroup(p);return''}
function belongsToView(p){if(activeView==='Ofertas')return p.featuredOffer===true;if(['Alimentos','Bebidas','Limpieza','Combos'].includes(activeView))return p.cat===activeView;return true}
function belongsToBuyer(p){if(!buyerMode)return true;if(buyerMode==='Hogar')return true;if(buyerMode==='Kioscos')return Boolean(kioskGroup(p));if(buyerMode==='Gastronomía')return Boolean(gastronomyGroup(p));return true}

function renderBrandFilter(){const host=document.querySelector('#brandFilterChips');if(!host)return;const available=products.filter(p=>belongsToView(p)&&belongsToBuyer(p));const brands=[...new Set(available.map(p=>(p.brand||'Otros').trim()||'Otros'))].sort((a,b)=>a.localeCompare(b,'es',{sensitivity:'base'}));if(activeBrand!=='all'&&!brands.includes(activeBrand))activeBrand='all';host.innerHTML=`<button type="button" class="${activeBrand==='all'?'active':''}" data-brand-filter="all">Todas</button>${brands.map(brand=>`<button type="button" class="${activeBrand===brand?'active':''}" data-brand-filter="${brand.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">${brand}</button>`).join('')}`}

function renderDetailTabs(){const tabs=document.querySelector('#detailCategoryTabs');let items=[];if(activeView==='Todos')items=allProductDetails[activeSubcategory]||[];if(activeView==='Gastronomía'&&activeSubcategory==='Bebidas')items=['Sin alcohol','Con alcohol'];items=items.filter(item=>products.some(p=>belongsToView(p)&&subcategoryGroup(p)===activeSubcategory&&detailGroup(p)===item));if(!items.length){tabs.hidden=true;tabs.innerHTML='';activeDetail='all';return}tabs.hidden=false;tabs.innerHTML=`<span>Filtrar por:</span><button class="active" data-detail="all">Todos</button>${items.map(item=>`<button data-detail="${item}">${item}</button>`).join('')}`}
function renderSubcategoryTabs(){const tabs=document.querySelector('#subCategoryTabs'),details=document.querySelector('#detailCategoryTabs'),items=viewMenus[activeView]||[];activeSubcategory='all';activeDetail='all';details.hidden=true;details.innerHTML='';tabs.hidden=!items.length;tabs.innerHTML=items.length?`<span>Después, filtrá por tipo</span><button class="active" data-subcategory="all">Todos</button>${items.map(item=>`<button data-subcategory="${item}">${item}</button>`).join('')}`:'';renderBrandFilter()}

function boxName(p) {
  const label = p.boxLabel || p.packLabel || '';
  if (/bulto/i.test(label)) return 'Bulto';
  return /pack/i.test(label) ? 'Pack' : 'Caja';
}
const boxTitle = p => p.boxQuantity ? `${boxName(p)} x${p.boxQuantity}` : boxName(p);
const productFormat = (p, format = 'unit') => p.cat === 'Combos' ? 'COMBO'
  : format === 'box' ? boxTitle(p).toUpperCase() : format === 'pair' ? 'PACK X2' : 'UNIDADES';
const offerDate=p=>p.offerUntil?new Intl.DateTimeFormat('es-AR',{day:'2-digit',month:'2-digit'}).format(new Date(p.offerUntil).getTime()-1):'';

function amountField(p, format, label) {
  const key = `${p.id}:${format}`;
  const count = basketQuantity(key);
  const name = label.toLowerCase();
  return `<div class="amountField" data-order-line="${key}">
    <span>${label}</span>
    <button class="add quickAdd" type="button" data-card-quantity="${key}" data-d="1" aria-label="Agregar ${name}" ${count ? 'hidden' : ''}>Agregar</button>
    <div class="cardQty" ${count ? '' : 'hidden'}>
      <button type="button" data-card-quantity="${key}" data-d="-1" aria-label="Restar ${name}">−</button>
      <input type="number" min="0" step="1" inputmode="numeric" data-card-count="${key}" aria-label="Cantidad de ${name}" value="${count}">
      <button type="button" data-card-quantity="${key}" data-d="1" aria-label="Sumar ${name}">+</button>
    </div>
  </div>`;
}

function orderComposer(p, compact = false) {
  return `<div class="orderComposer${compact ? ' compactComposer' : ''}"><div class="amountFields">
    ${p.boxOnly || !p.price ? '' : amountField(p, 'unit', p.cat === 'Combos' ? 'Combo' : 'Unidad')}
    ${p.boxPrice ? amountField(p, 'box', boxName(p)) : ''}
  </div></div>`;
}

function purchasePrices(p) {
  const boxUnit = p.boxUnitPrice ?? (p.boxQuantity ? p.boxPrice / p.boxQuantity : null);
  return `<div class="purchasePrices">
    ${p.boxOnly ? '' : `<div class="purchasePrice"><small>Por unidad</small><strong>${money(p.price)}</strong></div>`}
    ${p.boxPrice ? `<div class="purchasePrice boxPurchasePrice"><small>${boxTitle(p)}</small><strong>${money(p.boxPrice)}</strong>${boxUnit == null ? '' : `<span>${moneyUnit(boxUnit)} c/u</span>`}</div>` : ''}
  </div>`;
}
function card(p){
  const isCombo=p.cat==='Combos',offerSaving=p.regularPrice&&p.regularPrice>p.price?p.regularPrice-p.price:0;
  return`<article class="card${isCombo?' comboCard':''}${[1008,1009,1010].includes(Number(p.id))?' wideComboImage':''}${p.featuredOffer?' weeklyOffer':''}">${p.featuredOffer?`<span class="badge${p.regularPrice?'':' featuredBadge'}">${p.regularPrice?`${Math.round((1-p.price/p.regularPrice)*100)}% OFF`:'DESTACADO SEMANAL'}</span>`:''}${p.boxOnly?`<span class="badge">${boxTitle(p)}</span>`:''}<button class="productImage productQuickView" type="button" data-product-detail="${p.id}" aria-label="Ver detalles de ${p.name}"><img loading="lazy" src="${p.img}" alt="${p.name}"><span>Ver producto</span></button><div class="cardBody">${p.brand?`<small class="brandName">${p.brand}</small>`:''}<button class="productTitleButton" type="button" data-product-detail="${p.id}"><h3>${p.name}</h3></button>${p.regularPrice?`<div class="offerPriceInfo"><span>Antes <del>${money(p.regularPrice)}</del></span>${offerSaving>0?`<b>Ahorrás ${money(offerSaving)}</b>`:''}</div>`:''}${isCombo||p.offerOnly?`<small class="priceType">${isCombo?'Precio por combo':'Precio especial'}</small><div class="price offerPrice">${money(p.price)}</div>`:purchasePrices(p)}${p.featuredOffer&&offerDate(p)?`<span class="offerUntil">Válido hasta el ${offerDate(p)}</span>`:''}${orderComposer(p)}</div></article>`
}
const descriptionText=p=>String(p.description||'').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&aacute;|&eacute;|&iacute;|&oacute;|&uacute;/g,match=>({'&nbsp;':' ','&aacute;':'á','&eacute;':'é','&iacute;':'í','&oacute;':'ó','&uacute;':'ú'}[match])).replace(/\s+/g,' ').trim();
function productDetailPrices(p) {
  if (p.cat === 'Combos' || p.offerOnly) return `<div class="productDetailMainPrice"><small>${p.cat === 'Combos' ? 'Precio por combo' : 'Precio especial'}</small><strong>${money(p.price)}</strong></div>`;
  return purchasePrices(p);
}
function ensureProductModal(){let modal=document.querySelector('#productModal');if(modal)return modal;modal=document.createElement('div');modal.id='productModal';modal.className='productModal';modal.setAttribute('aria-hidden','true');modal.innerHTML='<button class="productModalBackdrop" type="button" data-product-modal-close aria-label="Cerrar detalle"></button><section class="productModalDialog" role="dialog" aria-modal="true" aria-labelledby="productModalTitle"><button class="productModalClose" type="button" data-product-modal-close aria-label="Cerrar">×</button><div id="productModalContent"></div></section>';document.body.appendChild(modal);return modal}
function openProductDetail(productId){const p=products.find(product=>String(product.id)===String(productId));if(!p)return;const modal=ensureProductModal(),description=descriptionText(p),items=p.comboItems||[];modal.querySelector('#productModalContent').innerHTML=`<div class="productDetailGrid"><div class="productDetailImage"><img src="${p.img}" alt="${p.name}"></div><div class="productDetailBody">${p.brand?`<small class="brandName">${p.brand}</small>`:''}<h2 id="productModalTitle">${p.name}</h2>${description?`<p class="productDetailDescription">${description}</p>`:''}${productDetailPrices(p)}${items.length?`<div class="productDetailIncludes"><b>Incluye:</b><ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul></div>`:''}${orderComposer(p)}</div></div>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('productModalOpen');trackMeta('ViewContent',{content_ids:[String(p.id)],content_name:p.name,content_type:'product',value:Number(p.price)||0,currency:'ARS'})}
function closeProductDetail(){const modal=document.querySelector('#productModal');if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('productModalOpen')}
function loadInstagramReel(button){const card=button.closest('.reelCard'),url=button.dataset.reelLoad;if(!card||!url)return;card.classList.add('loading');card.innerHTML=`<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14"><a href="${url}" target="_blank" rel="noopener">Ver combo en Instagram</a></blockquote>`;const process=()=>window.instgrm?.Embeds?.process();if(window.instgrm){process();return}const script=document.createElement('script');script.async=true;script.src='https://www.instagram.com/embed.js';script.onload=process;document.body.appendChild(script)}
function homeComboCard(p){const items=p.comboItems||[];return `<article class="homeComboCard" data-home-combo><div class="homeComboImage"><img loading="lazy" src="${p.img}" alt="${p.name}"><span class="comboImageHint">Tocá para ver qué incluye</span></div><div class="homeComboBody"><small>COMBO FALUCHO</small><h3>${p.name}</h3>${items.length?`<details class="homeComboDetails"><summary>Ver qué incluye <span aria-hidden="true">+</span></summary><ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul></details>`:''}<div class="homeComboPrice">${money(p.price)}</div>${orderComposer(p,true)}</div></article>`}
function renderHomeCombos(){const host=document.querySelector('#homeCombos');if(!host)return;const selected=products.filter(p=>p.cat==='Combos').slice(0,6);host.innerHTML=selected.map(homeComboCard).join('')}
function renderHomeHighlights(){const host=document.querySelector('#homeHighlights');if(!host)return;const featuredSlugs=['fideos-mostachol-sol-pampeano-x500gr','vodka-skyy-cosmic-x700ml','speed-xl-x-unidad','azucar-gury-x1kg','aceite-girasol-el-paisano-x900cc','leche-larga-vida-gandara-x1lt','alfajor-super-triple-fantoche-x100gr','cajon-dulce-de-membrillo-7-dias-x5kg','queso-cremoso-4-hermanos-x-horma','aperitivo-fernet-branca-x750ml'];const selected=featuredSlugs.map(slug=>products.find(p=>p.slug===slug)).filter(Boolean);host.innerHTML=selected.map(card).join('')}
function initHighlightRail(){const rail=document.querySelector('#homeHighlights'),buttons=document.querySelectorAll('[data-highlight-scroll]');if(!rail||!buttons.length)return;const update=()=>{const max=rail.scrollWidth-rail.clientWidth;buttons.forEach(button=>button.disabled=Number(button.dataset.highlightScroll)<0?rail.scrollLeft<5:rail.scrollLeft>max-5)};buttons.forEach(button=>button.addEventListener('click',()=>rail.scrollBy({left:Number(button.dataset.highlightScroll)*Math.max(280,rail.clientWidth*.82),behavior:'smooth'})));rail.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update()}
function renderBrandShowcase(){const host=document.querySelector('#brandShowcase');if(!host)return;const preferred=['Gándara','Baggio','Fantoche','Silvia','Esnaola','Molinos Cañuelas','Bahía','Elegante','Coca-Cola','Speed','Campari','Pernod Ricard','Bodega Rutini Wines','Otros'],brandVisuals={
  'Gándara':{logo:'assets/logo-gandara.png',color:'#344998',soft:'#eef1ff'},
  'Baggio':{logo:'assets/logo-baggio.png',color:'#cf2917',soft:'#fff1ed'},
  'Fantoche':{logo:'assets/logo-fantoche.png',color:'#ce252b',soft:'#fff0f1'},
  'Silvia':{logo:'assets/logo-silvia.png',color:'#ed1c24',soft:'#edf3ff'},
  'Esnaola':{logo:'assets/logo-esnaola.png',color:'#cda765',soft:'#f6f0e5'},
  'Molinos Cañuelas':{logo:'assets/logo-molinos-canuelas.png',color:'#1f5a97',soft:'#eef6ff'},
  'Bahía':{logo:'assets/logo-bahia.png',color:'#0d3c8d',soft:'#eef4ff'},
  'Elegante':{logo:'assets/logo-elegante.png',color:'#15376f',soft:'#f0f4fb'},
  'Coca-Cola':{logo:'assets/logo-coca-cola.png',color:'#f50109',soft:'#fff0f0'},
  'Speed':{logo:'assets/logo-speed.png',color:'#d81f2a',soft:'#f3f0f1'},
  'Campari':{logo:'assets/logo-campari.png',color:'#c8102e',soft:'#fff0f3'},
  'Pernod Ricard':{logo:'assets/logo-pernod-ricard.png',color:'#123d71',soft:'#edf5fc'},
  'Bodega Rutini Wines':{logo:'assets/logo-rutini.png',color:'#bd8d53',soft:'#f7f0e8'}
};const available=new Set(products.map(p=>(p.brand||'Otros').trim()||'Otros')),brands=preferred.filter(brand=>available.has(brand));host.innerHTML=brands.map(brand=>{const visual=brandVisuals[brand],safeBrand=brand.replace(/&/g,'&amp;').replace(/"/g,'&quot;');return `<button type="button" class="brandTile${visual?' hasBrandLogo':''}" data-brand-shop="${safeBrand}" style="--brand-color:${visual?.color||'#ed1c24'};--brand-soft:${visual?.soft||'#f8f4ee'}">${visual?`<span class="brandLogoWrap"><img loading="lazy" src="${visual.logo}" alt="Logo ${brand}"></span>`:`<span class="brandInitials">${brand.slice(0,2).toUpperCase()}</span>`}<b>${brand}</b><small>Ver productos</small></button>`}).join('')}
const businessSelections = {
  kioskDrinks: p => p.cat === 'Bebidas' && Boolean(p.boxPrice),
  kioskSnacks: p => kioskGroup(p) === 'Golosinas y galletitas',
  kitchenBasics: p => p.cat === 'Alimentos' && /\b(aceite|harina|tomate|arroz|fideo)/.test(normalize(p.name)),
  kitchenBulk: p => p.cat === 'Alimentos' && /\b(?:[2-9]|[1-9]\d)(?:[.,]\d+)?\s*(?:kg|l|lt|litros?)\b/.test(normalize(p.name).replace(/x(?=\d)/g, ' ')),
};
let businessSelection = '';

function filteredProducts() {
  let list = products.filter(p => (query || belongsToView(p)) && belongsToBuyer(p));
  if (businessSelection && !query) list = list.filter(businessSelections[businessSelection]);
  if (activeBrand !== 'all') list = list.filter(p => (p.brand || 'Otros') === activeBrand);
  if (!query && activeSubcategory !== 'all') list = list.filter(p => subcategoryGroup(p) === activeSubcategory);
  if (!query && activeDetail !== 'all') list = list.filter(p => detailGroup(p) === activeDetail);
  if (query) {
    const terms = [...new Set(searchWords(query))];
    list = list.map(product => ({product, score: searchScore(product, terms)}))
      .filter(result => result.score).sort((a, b) => b.score - a.score).map(result => result.product);
  }
  if (purchaseMode === 'unit') list = list.filter(p => !p.boxOnly);
  if (purchaseMode === 'box') list = list.filter(p => Boolean(p.boxPrice || p.boxOnly));
  if (sortMode === 'price-asc') list.sort((a, b) => (a.boxOnly ? a.boxUnitPrice : a.price) - (b.boxOnly ? b.boxUnitPrice : b.price));
  if (sortMode === 'price-desc') list.sort((a, b) => (b.boxOnly ? b.boxUnitPrice : b.price) - (a.boxOnly ? a.boxUnitPrice : a.price));
  if (sortMode === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  return list;
}
function renderCatalog(){document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',!query&&!buyerMode&&!businessSelection&&b.dataset.view===activeView));document.querySelectorAll('[data-buyer]').forEach(b=>b.classList.toggle('active',b.dataset.buyer===buyerMode));const buyerNotice=document.querySelector('#buyerNotice');if(buyerNotice){buyerNotice.hidden=!(buyerMode||businessSelection);buyerNotice.textContent=businessSelection?document.querySelector(`[data-business-selection="${businessSelection}"]`).textContent:'';if(buyerMode)buyerNotice.innerHTML=`<b>Selección para ${buyerMode==='Hogar'?'tu hogar':buyerMode}</b><span>Te mostramos los productos más útiles para este tipo de compra. Podés seguir filtrando o ver todo el catálogo.</span>`}const list=filteredProducts();productGrid.innerHTML=list.length?list.slice(0,visibleLimit).map(card).join(''):`<p class="categoryEmpty">${activeView==='Ofertas'&&!query?'Próximamente vas a encontrar acá nuestras mejores ofertas.':'No encontramos productos con esos filtros.'}</p>`;resultsCount.textContent=`${list.length} ${list.length===1?'producto':'productos'}${query?' encontrados':''}`;loadMore.hidden=list.length<=visibleLimit;clearFilters.hidden=activeView==='Ofertas'&&activeSubcategory==='all'&&!buyerMode&&purchaseMode==='all'&&!query&&sortMode==='featured';document.querySelector('#offersNotice').hidden=Boolean(query)||Boolean(buyerMode)||activeView!=='Ofertas'}

for (const [key, quantity] of Object.entries(basket)) {
  if (!key.includes(':')) {
    basket[`${key}:unit`] = Number(basket[`${key}:unit`] || 0) + Number(quantity);
    delete basket[key];
  }
}

const cartPanel = document.querySelector('#cart');
const checkoutButton = document.querySelector('#checkout');
const floatingOrder = document.querySelector('#floatingCart');
const repeatButton = document.querySelector('#repeatOrder');
const repeatShortcut = document.querySelector('#repeatOrderShortcut');
const repeatNotice = document.querySelector('#repeatNotice');
const whatsappResume = document.querySelector('#whatsappResume');
const lastOrderKey = 'falucho-last-order-items';
const basketQuantity = key => Number(basket[key] || 0);
let submittingOrder = false;
let cartOpener;

function basketData(key) {
  const [id, format = 'unit'] = String(key).split(':');
  const product = products.find(p => String(p.id) === id);
  if (!product || (product.boxOnly && format !== 'box')) return null;
  const price = {unit: product.price, box: product.boxPrice, pair: product.price * 2}[format];
  return Number(price) > 0 ? {product, format, price: Number(price)} : null;
}

function orderEntries(items) {
  return Object.entries(items).flatMap(([key, quantity]) => {
    const item = basketData(key);
    return item && Number.isSafeInteger(quantity) && quantity > 0 ? [{key, quantity, ...item}] : [];
  });
}

function lastOrder() {
  try { return JSON.parse(localStorage.getItem(lastOrderKey)) || {}; }
  catch { return {}; }
}

function setQuantity(key, quantity) {
  const [id, format = 'unit'] = key.split(':');
  if (format === 'unit') delete basket[id];
  if (quantity > 0) basket[`${id}:${format}`] = quantity;
  else delete basket[`${id}:${format}`];
}

function changeQuantity(key, quantity, field) {
  if (submittingOrder || !basketData(key)) return;
  const previous = basketQuantity(key.includes(':') ? key : `${key}:unit`);
  const count = Number.isSafeInteger(quantity) ? Math.max(0, quantity) : previous;
  setQuantity(key, count);
  save();
  if (field && Boolean(previous) !== Boolean(count)) {
    field.querySelector(count ? '.cardQty button:last-child' : '.quickAdd').focus({preventScroll:true});
  }
  if (count > previous) {
    const {product, price} = basketData(key);
    trackMeta('AddToCart', {content_ids:[String(product.id)], content_name:product.name,
      content_type:'product', value:price * (count - previous), currency:'ARS', num_items:count - previous});
  }
}

function save() {
  localStorage.setItem('falucho-cart', JSON.stringify(basket));
  renderCart();
}

function renderCart() {
  const entries = orderEntries(basket);
  const itemCount = entries.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = entries.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = itemCount;
  cartItems.className = 'cartItems';
  cartItems.innerHTML = entries.length ? entries.map(({key,quantity,product,format,price}) => `<div class="cartRow"><img src="${product.img}" alt=""><div><p><b>${product.name}</b></p><small class="cartFormat">${productFormat(product,format)}</small><span>${money(price*quantity)}</span></div><div class="qty"><button type="button" data-qty="${key}" data-d="-1" aria-label="Restar">−</button><b>${quantity}</b><button type="button" data-qty="${key}" data-d="1" aria-label="Sumar">+</button></div></div>`).join('') : '<p class="empty">Tu carrito está vacío.</p>';
  cartTotal.textContent = money(subtotal);
  floatingOrder.querySelector('em').textContent = `${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} · ${money(subtotal)}`;
  floatingOrder.hidden = !itemCount;
  document.body.classList.toggle('hasOrder', itemCount > 0);
  checkoutButton.disabled = submittingOrder || !entries.length;
  repeatButton.hidden = repeatShortcut.hidden = !Object.keys(lastOrder()).length;
  const resumeUrl = localStorage.getItem('falucho-last-whatsapp-url');
  whatsappResume.hidden = !resumeUrl || !resumeUrl.startsWith('https://wa.me/541164591826?text=');
  if (!whatsappResume.hidden) whatsappResume.href = resumeUrl;
  document.querySelectorAll('[data-order-line]').forEach(field => {
    const count = basketQuantity(field.dataset.orderLine);
    field.querySelector('.quickAdd').hidden = count > 0;
    field.querySelector('.cardQty').hidden = !count;
    field.querySelector('input').value = count;
  });
}

function openCart(open = true) {
  const wasOpen = cartPanel.classList.contains('open');
  if (open && !wasOpen) cartOpener = document.activeElement;
  document.querySelector('#overlay').classList.toggle('show', open);
  cartPanel.classList.toggle('open', open);
  cartPanel.inert = !open;
  floatingOrder.classList.toggle('hidden', open);
  cartPanel.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('cartOpen', open);
  if (open && !wasOpen) document.querySelector('#closeCart').focus({preventScroll:true});
  if (!open && wasOpen) (cartOpener?.isConnected && !cartOpener.hidden ? cartOpener : document.querySelector('#cartBtn')).focus({preventScroll:true});
}

function repeatOrder() {
  if (submittingOrder) return;
  const savedItems = lastOrder();
  const available = orderEntries(savedItems).filter(({product}) =>
    product.stock === undefined || product.stock === null || product.stock === '' || Number(product.stock) > 0);
  for (const {key, quantity} of available) setQuantity(key, basketQuantity(key) + quantity);
  save();
  const skipped = Object.keys(savedItems).length - available.length;
  repeatNotice.textContent = available.length ? `Agregamos tu último pedido con los precios vigentes.${skipped ? ' Algunas presentaciones ya no están disponibles.' : ''}` : 'Los productos de tu último pedido ya no están disponibles.';
  openCart();
  repeatNotice.focus({preventScroll:true});
}

repeatButton.onclick = repeatShortcut.onclick = repeatOrder;
document.addEventListener('change', event => {
  const input = event.target.closest('[data-card-count]');
  if (input) changeQuantity(input.dataset.cardCount, input.valueAsNumber, input.closest('.amountField'));
});

document.addEventListener('click',event=>{
  const modalClose=event.target.closest('[data-product-modal-close]');
  if(modalClose){closeProductDetail();return}
  const productDetail=event.target.closest('[data-product-detail]');
  if(productDetail){openProductDetail(productDetail.dataset.productDetail);return}
  const reel=event.target.closest('[data-reel-load]');
  if(reel){loadInstagramReel(reel);return}
  const close=event.target.closest('[data-close-cart]');
  if(close){openCart(false);return}
  const homeCombo=event.target.closest('[data-home-combo]');
  if(homeCombo&&!event.target.closest('button,input,summary,details,a')){
    const comboDetails=homeCombo.querySelector('.homeComboDetails');
    if(comboDetails)comboDetails.open=!comboDetails.open;
    return
  }
  const step = event.target.closest('[data-card-quantity]');
  if (step) {
    const key = step.dataset.cardQuantity;
    changeQuantity(key, basketQuantity(key) + Number(step.dataset.d), step.closest('.amountField'));
    return;
  }
  const quantity = event.target.closest('[data-qty]');
  if (quantity) {
    const key = quantity.dataset.qty;
    changeQuantity(key, Number(basket[key]) + Number(quantity.dataset.d));
    const next = [...cartItems.querySelectorAll('[data-qty]')].find(button =>
      button.dataset.qty === (key.includes(':') ? key : `${key}:unit`) && button.dataset.d === quantity.dataset.d);
    (next || document.querySelector('#closeCart')).focus({preventScroll:true});
    return;
  }
  const quick = event.target.closest('[data-business-selection]');
  if (quick) {
    businessSelection = quick.dataset.businessSelection;
    activeView = 'Todos';
    buyerMode = query = search.value = '';
    activeBrand = purchaseMode = purchaseType.value = 'all';
    visibleLimit = 30;
    renderSubcategoryTabs();
    renderCatalog();
    document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'});
    return;
  }
  const brand=event.target.closest('[data-brand-filter]');
  if(brand){activeBrand=brand.dataset.brandFilter;visibleLimit=30;renderBrandFilter();renderCatalog();return}
  const buyer=event.target.closest('[data-buyer]');
  if(buyer){buyerMode=buyer.dataset.buyer;activeView='Todos';activeSubcategory='all';activeDetail='all';query='';search.value='';visibleLimit=30;renderSubcategoryTabs();renderCatalog();document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'});return}
  const view=event.target.closest('[data-view]');
  if(view){buyerMode='';query='';search.value='';activeView=view.dataset.view;activeSubcategory='all';activeDetail='all';visibleLimit=30;renderSubcategoryTabs();renderCatalog();return}
  const sub=event.target.closest('[data-subcategory]');
  if(sub){activeSubcategory=sub.dataset.subcategory;activeDetail='all';visibleLimit=30;document.querySelectorAll('[data-subcategory]').forEach(button=>button.classList.toggle('active',button===sub));renderDetailTabs();renderCatalog();return}
  const detail=event.target.closest('[data-detail]');
  if(detail){activeDetail=detail.dataset.detail;visibleLimit=30;document.querySelectorAll('[data-detail]').forEach(button=>button.classList.toggle('active',button===detail));renderCatalog()}
});
document.addEventListener('click',event=>{if(event.target.closest('[data-view],[data-buyer]')){activeBrand='all';businessSelection=''}},true);
document.querySelector('#searchBtn').onclick=()=>{document.querySelector('#catalogo').scrollIntoView();document.querySelector('#search').focus()};document.querySelector('#cartBtn').onclick=document.querySelector('#floatingCart').onclick=()=>openCart();document.querySelector('#closeCart').onclick=document.querySelector('#overlay').onclick=()=>openCart(false);document.addEventListener('keydown',event=>{if(event.key==='Escape'){openCart(false);closeProductDetail()}});search.oninput=e=>{const previous=query;query=searchWords(e.target.value).length?e.target.value.trim():'';if(query&&!previous){businessSelection=buyerMode='';activeView='Todos';activeBrand=purchaseMode=purchaseType.value='all';renderSubcategoryTabs()}visibleLimit=30;renderCatalog()};sort.onchange=e=>{sortMode=e.target.value;visibleLimit=30;renderCatalog()};purchaseType.onchange=e=>{purchaseMode=e.target.value;visibleLimit=30;renderCatalog()};loadMore.onclick=()=>{visibleLimit+=30;renderCatalog()};clearFilters.onclick=()=>{businessSelection='';activeView='Alimentos';activeSubcategory='all';activeDetail='all';activeBrand='all';buyerMode='';purchaseMode='all';query='';sortMode='featured';search.value='';sort.value='featured';purchaseType.value='all';visibleLimit=30;renderSubcategoryTabs();renderCatalog()};
const orderEndpoint="https://pedidos-falucho-receptor.solwheeler3.chatgpt.site/api/orders";
checkoutButton.onclick=async()=>{
  const entries=orderEntries(basket);
  if(submittingOrder||!entries.length)return;
  const name=document.querySelector("#buyerName").value.trim(),phone=document.querySelector("#buyerPhone").value.trim(),location=document.querySelector("#buyerLocation").value.trim(),type=document.querySelector("#buyerType").value,delivery=document.querySelector("#deliveryType").value,notes=document.querySelector("#buyerNotes").value.trim(),error=document.querySelector("#checkoutError"),validPhone=phone.replace(/\D/g,"").length>=8;
  if(!name||!validPhone||!location){error.textContent="Completá tu nombre, un WhatsApp válido y tu localidad para enviar el pedido.";error.hidden=false;document.querySelector('.buyerForm').open=true;(!name?document.querySelector("#buyerName"):!validPhone?document.querySelector("#buyerPhone"):document.querySelector("#buyerLocation")).focus();return}
  error.hidden=true;
  const lines=entries.map(({quantity,product,format,price})=>"• "+quantity+" x "+product.name+" ("+productFormat(product,format)+") — "+money(price*quantity)),total=entries.reduce((sum,item)=>sum+item.price*item.quantity,0),customer="Nombre: "+name+"\nWhatsApp: "+phone+"\nLocalidad: "+location+"\nTipo de cliente: "+type+"\nEntrega: "+delivery+(notes?"\nObservaciones: "+notes:""),clientOrderId=localStorage.getItem("falucho-pending-order-id")||("web-"+Date.now()+"-"+Math.random().toString(36).slice(2,12)),intakeNotes=[notes,"WhatsApp: "+phone].filter(Boolean).join(" · ");
  trackMeta('InitiateCheckout',{content_ids:entries.map(entry=>String(entry.product.id)),content_type:'product',value:total,currency:'ARS',num_items:entries.reduce((sum,entry)=>sum+entry.quantity,0)});
  localStorage.setItem("falucho-pending-order-id",clientOrderId);
  submittingOrder=true;
  checkoutButton.disabled=true;
  checkoutButton.textContent='Guardando pedido…';
  try{
    const response=await fetch(orderEndpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({clientOrderId,customerName:name,phone,locality:location,buyerType:type,deliveryType:delivery,notes:intakeNotes,total,items:entries.map(({quantity,product,format,price})=>({productCode:String(product.id),productName:product.name,format,quantity,unitsPerBox:format==='box'?product.boxQuantity||null:format==='pair'?2:null,price,lineTotal:price*quantity})),website:""})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok||!result.ok)throw new Error(result.error||"No se pudo registrar el pedido");
    const message="Hola, quiero hacer este pedido:\n\n"+lines.join("\n")+"\n\nTotal estimado: "+money(total)+"\n\n"+customer+"\n\nReferencia del pedido: "+clientOrderId+"\n\n¿Me confirman stock, precio final y envío?";
    localStorage.setItem("falucho-buyer",JSON.stringify({name,phone,location,type,delivery,notes}));
    localStorage.removeItem("falucho-pending-order-id");
    localStorage.setItem(lastOrderKey, JSON.stringify(Object.fromEntries(entries.map(({key,quantity}) => [key,quantity]))));
    const whatsappUrl="https://wa.me/541164591826?text="+encodeURIComponent(message);
    localStorage.setItem("falucho-last-whatsapp-url",whatsappUrl);
    basket={};
    document.querySelector('.buyerForm').open=false;
    save();
    openCart();
    repeatNotice.textContent='Pedido registrado. En WhatsApp, tocá Enviar para coordinar la entrega.';
    whatsappResume.focus({preventScroll:true});
    trackMeta('Contact',{content_ids:entries.map(entry=>String(entry.product.id)),value:total,currency:'ARS'});
    window.location.assign(whatsappUrl);
  }catch(failure){
    error.textContent="No pudimos guardar el pedido. Probá nuevamente; el carrito quedó guardado.";
    error.hidden=false;
    console.error(failure);
  }finally{
    submittingOrder=false;
    checkoutButton.disabled=!orderEntries(basket).length;
    checkoutButton.textContent='Enviar pedido por WhatsApp';
  }
};
document.addEventListener('click',event=>{const brandButton=event.target.closest('[data-brand-shop]');if(brandButton){businessSelection=buyerMode='';query='';search.value='';activeView='Todos';activeSubcategory='all';activeDetail='all';activeBrand=brandButton.dataset.brandShop;visibleLimit=30;renderSubcategoryTabs();renderCatalog();document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'})}if(event.target.closest('.sectionLink[data-view]'))document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'})});
const offerSignup=document.querySelector('#offerSignup');if(offerSignup)offerSignup.onsubmit=event=>{event.preventDefault();const name=document.querySelector('#offerName').value.trim(),phone=document.querySelector('#offerPhone').value.trim(),location=document.querySelector('#offerLocation').value.trim(),type=document.querySelector('#offerCustomerType').value;if(!name||!phone||!location)return;const message=`Hola, quiero recibir las ofertas de Esquina Falucho.\n\nNombre: ${name}\nWhatsApp: ${phone}\nLocalidad: ${location}\nTipo de cliente: ${type}`;trackMeta('Lead',{content_name:'Ofertas Falucho'});window.location.assign('https://wa.me/541164591826?text='+encodeURIComponent(message))};
try{const savedBuyer=JSON.parse(localStorage.getItem('falucho-buyer')||'{}');document.querySelector('#buyerName').value=savedBuyer.name||'';document.querySelector('#buyerPhone').value=savedBuyer.phone||'';document.querySelector('#buyerLocation').value=savedBuyer.location||'';document.querySelector('#buyerType').value=savedBuyer.type||'Hogar';document.querySelector('#deliveryType').value=savedBuyer.delivery||'A coordinar';document.querySelector('#buyerNotes').value=savedBuyer.notes||''}catch{}
renderHomeCombos();renderHomeHighlights();initHighlightRail();renderBrandShowcase();renderSubcategoryTabs();renderCatalog();renderCart();openCart(false);window.addEventListener('pageshow',event=>{if(event.persisted)renderCart()});

const customComboForm=document.querySelector('#customComboForm');if(customComboForm)customComboForm.onsubmit=event=>{event.preventDefault();const request=document.querySelector('#customComboRequest').value.trim(),name=document.querySelector('#customComboName').value.trim();if(!request)return;const message=`Hola, quiero cotizar un combo personalizado.\n\n${name?`Nombre: ${name}\n`:''}Productos y cantidades:\n${request}\n\n¿Me confirman el precio y la disponibilidad?`;window.location.assign('https://wa.me/541164591826?text='+encodeURIComponent(message))};
