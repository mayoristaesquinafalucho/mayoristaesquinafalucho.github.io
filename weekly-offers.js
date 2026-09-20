(() => {
  const until='2026-09-26T00:00:00-03:00';
  const bySlug=slug=>(window.PRODUCTS||[]).find(product=>product.slug===slug);
  const highlight=slug=>{
    const product=bySlug(slug);
    if(product){product.featuredOffer=true;product.offerUntil=until;}
    return product;
  };
  const discount=(slug,offerPrice)=>{
    const product=bySlug(slug);
    if(product){
      product.regularPrice=product.price;
      product.price=offerPrice;
      product.featuredOffer=true;
      product.offerUntil=until;
    }
    return product;
  };

  discount('cajon-dulce-de-membrillo-la-huerta-x5kg',15550);
  discount('cajon-dulce-de-membrillo-7-dias-x5kg',14290);
  highlight('galletitas-dulces-neosol-tripack');
  highlight('galletitas-de-agua-neosol-tripack');
  highlight('galletitas-de-salvado-neosol-tripack');
  discount('galletitas-macarena-hojaldre-x100gr',590);
  highlight('dulce-de-leche-repostero-gandara-10kg');
  highlight('harina-000-campodonico-xkg-1yfl2');
  highlight('harina-0000-campodonico-25kg');
  highlight('fideos-spaghetti-sol-pampeano-x500gr-n0s76');
  highlight('fideos-mostachol-sol-pampeano-x500gr-14yur');
  highlight('fideos-tirabuzon-sol-pampeano-x500gr-4kbph');
  highlight('azucar-gury-x1kg');

  if(!bySlug('aceite-girasol-el-paisano-x900cc')){
    window.PRODUCTS.push({
      id:499,slug:'aceite-girasol-el-paisano-x900cc',
      name:'Aceite de girasol El Paisano x900 cc',
      price:2250,regularPrice:null,cat:'Alimentos',
      categories:['Alimentos > Aceites'],brand:'El Paisano',sku:'',
      description:'',img:'assets/oferta-semanal-18.png',
      featuredOffer:true,offerUntil:until
    });
  }else highlight('aceite-girasol-el-paisano-x900cc');

  discount('queso-cremoso-vacremita-horma-4kg',27960);

  const leche=highlight('leche-larga-vida-gandara-x1lt');
  if(leche){
    leche.price=1850;
    leche.boxQuantity=12;
    leche.boxUnitPrice=1690;
    leche.boxPrice=20280;
  }

  discount('queso-cremoso-silvia-x-horma',32600);
  highlight('papel-higienico-simple-hoja-elegante-x4-rollos-de-30mts');
  highlight('pure-de-tomate-la-huerta-x520gr');
  highlight('salchichas-maneca-x6');

  [
    'agua-baggio-fresh-x15lts',
    'agua-saborizada-fresh-pomelo-x15lts',
    'agua-saborizada-fresh-naranja-x15lts',
    'agua-saborizada-fresh-manzana-x1-5lts',
    'agua-saborizada-fresh-pera-x1-5lts',
    'agua-saborizada-fresh-mix-frutal-x1-5lts',
    'vino-sapo-de-otro-pozo-blend-de-tintas-x750ml',
    'vino-cordero-con-piel-de-lobo-malbec-x750ml',
    'vino-salentein-reserva-malbec-x750ml',
    'vino-la-linda-malbec-x750ml',
    'vino-escorihuela-gascon-malbec-x750ml',
    'vino-famiglia-malbec-x750ml',
    'champagne-chandon-aperitif-x750ml',
    'champagne-chandon-delice-x750ml',
    'champagne-chandon-extra-brut-x750ml',
    'aperitivo-fernet-branca-x750ml',
    'vino-don-valentin-lacrado-x750ml',
    'vino-perro-callejero-blend-de-malbec-x750ml',
    'vino-alamos-malbec-x750ml',
    'vino-don-david-malbec-x750ml'
  ].forEach(highlight);

  const fernet=bySlug('aperitivo-fernet-branca-x750ml');
  if(fernet){
    fernet.price=15500;
    fernet.boxQuantity=12;
    fernet.boxUnitPrice=14500;
    fernet.boxPrice=174000;
  }

  const firme=bySlug('yogur-firme-frutilla-gandara-x190gr')||bySlug('yogur-firme-vainilla-gandara-x190gr');
  const bebible=bySlug('yogur-bebible-de-frutilla-gandara-x190gr')||bySlug('yogur-bebible-de-vainilla-gandara-x190gr');
  window.PRODUCTS=(window.PRODUCTS||[]).concat([
    {
      id:3001,slug:'oferta-yogur-firme-gandara-3-unidades',
      name:'Promo 3 Yogures firmes Gándara x190 g',
      price:2700,regularPrice:3195,cat:'Alimentos',
      categories:['Alimentos > Lácteos y quesos'],brand:'Gándara',sku:'OFERTA-SEM',
      description:'Oferta semanal válida hasta el viernes 25 de septiembre inclusive.',
      img:firme?.img||'',featuredOffer:true,offerOnly:true,offerUntil:until,
      packLabel:'PROMO 3 UNIDADES',comboItems:['3 yogures firmes por $2.700','Podés combinar frutilla y vainilla']
    },
    {
      id:3002,slug:'oferta-yogur-bebible-gandara-2-unidades',
      name:'Promo 2 Yogures bebibles Gándara x900 g',
      price:3430,regularPrice:4120,cat:'Alimentos',
      categories:['Alimentos > Lácteos y quesos'],brand:'Gándara',sku:'OFERTA-SEM',
      description:'Oferta semanal válida hasta el viernes 25 de septiembre inclusive.',
      img:bebible?.img||'',featuredOffer:true,offerOnly:true,offerUntil:until,
      packLabel:'PROMO 2 UNIDADES',comboItems:['2 yogures bebibles por $3.430','Podés combinar frutilla y vainilla']
    }
  ]);
})();
