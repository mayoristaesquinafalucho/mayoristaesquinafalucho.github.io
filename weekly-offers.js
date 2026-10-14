(() => {
  const until='2026-10-17T00:00:00-03:00';
  const description='Oferta semanal válida hasta el viernes 16 de octubre inclusive.';
  const bySlug=slug=>(window.PRODUCTS||[]).find(product=>product.slug===slug);

  const highlight=(slug,changes={})=>{
    const product=bySlug(slug);
    if(product){
      Object.assign(product,changes,{
        featuredOffer:true,
        offerUntil:until
      });
    }
    return product;
  };

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

  const discounted=(slug,price,changes={})=>{
    const product=bySlug(slug);
    if(product){
      Object.assign(product,changes,{
        regularPrice:product.price,
        price,
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

  // Lácteos
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

  [
    'yogur-bebible-de-vainilla-gandara-x190gr',
    'yogur-bebible-de-frutilla-gandara-x190gr'
  ].forEach(slug=>{
    const product=bySlug(slug);
    if(product) product.price=1960;
  });
  const bebible=bySlug('yogur-bebible-de-frutilla-gandara-x190gr')||bySlug('yogur-bebible-de-vainilla-gandara-x190gr');
  upsertPromo('oferta-yogur-bebible-gandara-2-unidades',{
    id:2006,
    name:'Promo 2 Yogures bebibles Gándara x900 g',
    price:3920,
    cat:'Alimentos',
    categories:['Alimentos > Lácteos y quesos'],
    brand:'Gándara',
    img:bebible?.img||'assets/oferta-semanal-6.png',
    packLabel:'PROMO 2 UNIDADES',
    comboItems:['2 yogures bebibles por $3.920','Podés combinar frutilla y vainilla']
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

  const lecheGandara=priced('leche-larga-vida-gandara-x1lt',2030,{
    boxQuantity:12,
    boxUnitPrice:1790,
    boxPrice:21480
  });

  priced('leche-larga-vida-en-sachet-silvia-x1lt-52a46',1590,{
    boxQuantity:12,
    boxUnitPrice:1500,
    boxPrice:18000
  });

  discounted('queso-cremoso-silvia-x-horma',32800);
  const quesoSilvia=bySlug('queso-cremoso-silvia-x-horma');
  if(quesoSilvia){
    quesoSilvia.comboItems=['Horma de 4 kg aproximados','$8.200 por kilo','El total final se ajusta según el peso real'];
  }

  // Almacén
  discounted('pure-de-tomate-la-huerta-x520gr',830,{
    boxQuantity:12,
    boxUnitPrice:790,
    boxPrice:9480
  });

  [
    ['fideos-spaghetti-sol-pampeano-x500gr-n0s76',20],
    ['fideos-mostachol-sol-pampeano-x500gr-14yur',15],
    ['fideos-tirabuzon-sol-pampeano-x500gr-4kbph',15]
  ].forEach(([slug,boxQuantity])=>priced(slug,850,{
    boxQuantity,
    boxUnitPrice:800,
    boxPrice:boxQuantity*800
  }));

  priced('azucar-gury-x1kg',1200,{
    boxQuantity:10,
    boxUnitPrice:1160,
    boxPrice:11600
  });

  priced('yerba-andresito-especial-x500gr',1900);
  priced('yerba-andresito-x500gr',1700);

  upsertPromo('oferta-jugo-baggio-pronto-naranja-1l',{
    id:2013,
    name:'Jugo Baggio Pronto Naranja x1 L',
    price:1660,
    cat:'Bebidas',
    categories:['Bebidas > Jugos'],
    brand:'Baggio',
    img:bySlug('oferta-jugo-baggio-pronto-naranja-1l')?.img||'assets/oferta-semanal-11.png'
  });

  [
    'agua-saborizada-fresh-pomelo-x15lts',
    'agua-saborizada-fresh-naranja-x15lts',
    'agua-saborizada-fresh-manzana-x1-5lts',
    'agua-saborizada-fresh-pera-x1-5lts',
    'agua-saborizada-fresh-mix-frutal-x1-5lts'
  ].forEach(slug=>highlight(slug,{
    boxQuantity:6,
    boxUnitPrice:1150,
    boxPrice:6900
  }));

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

  // Vinos y bebidas alcohólicas
  priced('vino-cordero-con-piel-de-lobo-malbec-x750ml',4540,{
    boxQuantity:6,
    boxUnitPrice:4007,
    boxPrice:24040
  });

  priced('vino-perro-callejero-blend-de-malbec-x750ml',6780,{
    boxQuantity:6,
    boxUnitPrice:5990,
    boxPrice:35940
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

  discounted('vino-mosquita-muerta-blend-de-tintas-x750ml',14090,{
    boxQuantity:3,
    boxUnitPrice:12405,
    boxPrice:37215
  });

  priced('vino-sapo-de-otro-pozo-blend-de-tintas-x750ml',11800,{
    boxQuantity:6,
    boxUnitPrice:10410,
    boxPrice:62460
  });
})();