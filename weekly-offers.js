(() => {
  const until='2026-10-24T00:00:00-03:00';
  const description='Oferta semanal válida hasta el viernes 23 de octubre inclusive.';
  const bySlug=slug=>(window.PRODUCTS||[]).find(product=>product.slug===slug);

  const priced=(slug,price,changes={})=>{
    const product=bySlug(slug);
    if(product){
      Object.assign(product,changes,{
        price,
        regularPrice:null,
        featuredOffer:true,
        offerUntil:until
      });
    }
    return product;
  };

  const upsertPromo=(slug,data)=>{
    let product=bySlug(slug);
    if(product){
      Object.assign(product,data,{
        regularPrice:null,
        featuredOffer:true,
        offerOnly:true,
        offerUntil:until,
        description
      });
    }else{
      product={
        ...data,
        slug,
        regularPrice:null,
        featuredOffer:true,
        offerOnly:true,
        offerUntil:until,
        description,
        sku:'OFERTA-SEM'
      };
      window.PRODUCTS.push(product);
    }
    return product;
  };

  // Alimentos
  priced('fideos-tirabuzon-sol-pampeano-x500gr-4kbph',850,{
    boxQuantity:15,
    boxUnitPrice:800,
    boxPrice:12000
  });

  priced('azucar-gury-x1kg',1200,{
    boxQuantity:10,
    boxUnitPrice:1160,
    boxPrice:11600
  });

  priced('yerba-andresito-especial-x500gr',1900);
  priced('yerba-andresito-x500gr',1700);

  priced('alfajor-triple-negro-fantoche-x75gr',860);

  const firme=bySlug('yogur-firme-frutilla-gandara-x190gr')||bySlug('yogur-firme-vainilla-gandara-x190gr');
  upsertPromo('oferta-yogur-firme-gandara-3-unidades',{
    id:3001,
    name:'Promo 3 Yogures firmes Gándara x190 g',
    price:3000,
    cat:'Alimentos',
    categories:['Alimentos > Lácteos y quesos'],
    brand:'Gándara',
    img:firme?.img||'',
    packLabel:'PROMO 3 UNIDADES',
    comboItems:['3 yogures firmes por $3.000','Podés combinar frutilla y vainilla']
  });

  const cereal=bySlug('yogur-con-cereal-gandara-x170gr');
  upsertPromo('oferta-yogur-cereal-gandara-2-unidades',{
    id:3003,
    name:'Promo 2 Yogures con cereal Gándara x170 g',
    price:2500,
    cat:'Alimentos',
    categories:['Alimentos > Lácteos y quesos'],
    brand:'Gándara',
    img:cereal?.img||'',
    packLabel:'PROMO 2 UNIDADES',
    comboItems:['2 yogures con cereal por $2.500']
  });

  const yogurVidrio=
    bySlug('yogur-vidrio-vainilla-sin-colchon-gandara-x160gr')||
    bySlug('yogur-vidrio-frutilla-sin-colchon-gandara-x160gr');
  upsertPromo('oferta-yogur-vidrio-gandara-2-unidades',{
    id:3010,
    name:'Promo 2 Yogures en vidrio Gándara x160 g',
    price:3920,
    cat:'Alimentos',
    categories:['Alimentos > Lácteos y quesos'],
    brand:'Gándara',
    img:yogurVidrio?.img||'',
    packLabel:'PROMO 2 UNIDADES',
    comboItems:['2 yogures en vidrio por $3.920','Sabores sujetos a disponibilidad']
  });

  upsertPromo('oferta-aceite-paisano-2-unidades',{
    id:2023,
    name:'Promo 2 Aceites de girasol El Paisano x900 cc',
    price:4500,
    cat:'Alimentos',
    categories:['Alimentos > Aceites, condimentos y otros'],
    brand:'El Paisano',
    img:bySlug('oferta-aceite-paisano-2-unidades')?.img||'assets/oferta-semanal-18.png',
    packLabel:'PROMO 2 UNIDADES',
    comboItems:['2 aceites de girasol por $4.500']
  });

  priced('leche-larga-vida-gandara-x1lt',2030,{
    boxQuantity:12,
    boxUnitPrice:1790,
    boxPrice:21480
  });

  priced('pure-de-tomate-la-huerta-x520gr',830,{
    boxQuantity:12,
    boxUnitPrice:790,
    boxPrice:9480
  });

  priced('edulcorante-si-diet-x500ml',2610);

  [
    'tostadas-tosti-light',
    'tostadas-tosti-mediterraneas',
    'tostadas-tosti-sin-sal',
    'tostadas-tosti-dulces',
    'tostadas-tosti-clasicas'
  ].forEach(slug=>priced(slug,1350));

  // Limpieza
  priced('papel-higienico-simple-hoja-elegante-x4-rollos-de-30mts',1450,{
    boxQuantity:12,
    boxUnitPrice:1300,
    boxPrice:15600
  });

  priced('rollo-de-cocina-elegante-x3-rollos-de-50-panos',1620,{
    boxQuantity:8,
    boxUnitPrice:1450,
    boxPrice:11600
  });

  // Bebidas sin alcohol
  priced('jugo-baggio-multifruta-x1lt',1660);

  [
    'agua-saborizada-fresh-pomelo-x15lts',
    'agua-saborizada-fresh-naranja-x15lts',
    'agua-saborizada-fresh-manzana-x1-5lts',
    'agua-saborizada-fresh-pera-x1-5lts',
    'agua-saborizada-fresh-mix-frutal-x1-5lts'
  ].forEach(slug=>{
    const product=bySlug(slug);
    if(product){
      priced(slug,product.price,{
        boxQuantity:6,
        boxUnitPrice:1150,
        boxPrice:6900
      });
    }
  });

  const speed=bySlug('speed-xl-pack-12')||bySlug('speed-xl-x-unidad');
  upsertPromo('oferta-speed-xl-pack-x12',{
    id:2009,
    name:'Speed XL · Pack x12 unidades',
    price:23500,
    cat:'Bebidas',
    categories:['Bebidas > Energizantes'],
    brand:'Speed',
    img:speed?.img||'',
    packLabel:'PACK X12',
    comboItems:['1 pack x12: $23.500','Desde 5 packs: $22.500 cada pack','Consultá el precio mayorista por WhatsApp']
  });

  // Vinos, espumantes y vodka
  priced('champagne-chandon-delice-x750ml',15500,{
    boxQuantity:6,
    boxUnitPrice:14900,
    boxPrice:89400
  });

  priced('vino-mosquita-muerta-blend-de-tintas-x750ml',14090,{
    boxQuantity:3,
    boxUnitPrice:12405,
    boxPrice:37215
  });

  priced('vino-perro-callejero-blend-de-malbec-x750ml',6780,{
    boxQuantity:6,
    boxUnitPrice:5990,
    boxPrice:35940
  });

  priced('vino-sapo-de-otro-pozo-blend-de-tintas-x750ml',11800,{
    boxQuantity:6,
    boxUnitPrice:10410,
    boxPrice:62460
  });

  [
    'vodka-new-style-evolution-chicle-x750ml',
    'vodka-new-style-frutos-rojos-x750ml',
    'vodka-new-style-manzana-x750ml'
  ].forEach(slug=>priced(slug,4500,{
    boxQuantity:6,
    boxUnitPrice:4200,
    boxPrice:25200
  }));

  priced('vino-escorihuela-gascon-malbec-x750ml',8415,{
    boxQuantity:6,
    boxUnitPrice:7920,
    boxPrice:47520
  });
})();
