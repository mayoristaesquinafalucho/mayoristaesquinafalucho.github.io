const alamosUnit=window.PRODUCTS.find(product=>product.slug==='vino-alamos-malbec-x750ml');
if(alamosUnit){
  alamosUnit.price=6270;
  alamosUnit.img='assets/vino-alamos-malbec-750ml.png';
}
window.PRODUCTS=window.PRODUCTS.filter(product=>product.slug!=='vino-alamos-malbec-x750ml-caja-x6');
const fernetBranca=window.PRODUCTS.find(product=>product.slug==='aperitivo-fernet-branca-x750ml');
if(fernetBranca){
  fernetBranca.price=15500;
  fernetBranca.boxQuantity=12;
  fernetBranca.boxUnitPrice=14500;
  fernetBranca.boxPrice=174000;
}


window.PRODUCTS=(window.PRODUCTS||[]).concat([
  {id:493,slug:'vino-elementos-malbec-x750ml',name:'Vino Elementos Malbec x750ml',price:5250,regularPrice:null,cat:'Bebidas',categories:['Bebidas > Bebidas alcohólicas'],brand:'Elementos',sku:'',description:'',img:'assets/vino-elementos-malbec-750ml.png',featuredOffer:false},
  {id:494,slug:'whisky-old-smuggler-x1lt',name:'Whisky Old Smuggler x1lt',price:9590,regularPrice:null,cat:'Bebidas',categories:['Bebidas > Bebidas alcohólicas'],brand:'Old Smuggler',sku:'',description:'',img:'http://acdn-us.mitiendanube.com/stores/007/258/334/products/5-3d8ce0fa55c5f6d21b17702408032239-640-0.webp',featuredOffer:false},
  {id:495,slug:'aceite-girasol-canuelas-x15l',name:'Aceite de girasol Cañuelas x1,5 L',price:6500,regularPrice:null,cat:'Alimentos',categories:['Alimentos > Otros'],brand:'Cañuelas',sku:'',description:'',img:'assets/aceite-girasol-canuelas-15l.png',featuredOffer:false},
  {id:496,slug:'queso-cremoso-vacremita-horma-4kg',name:'Queso Cremoso Vacremita x Horma (4 KILOS)',price:30000,regularPrice:null,cat:'Alimentos',categories:['Alimentos > Lácteos y quesos'],brand:'Vacremita',sku:'',description:'Precio equivalente: $7.500 por kilo. El total final puede ajustarse según el peso real de la horma.',img:'assets/queso-cremoso-vacremita-horma-4kg.png',featuredOffer:false,comboItems:['Horma de 4 kg aproximados','$7.500 por kilo','El total final se ajusta según el peso real']},
  {id:497,slug:'salchichas-maneca-x6',name:'Salchichas Maneca x6 unidades',price:950,regularPrice:null,cat:'Alimentos',categories:['Alimentos > Otros'],brand:'Maneca',sku:'',description:'Paquete de 6 salchichas, 190 g.',img:'assets/salchichas-maneca-x6.png',featuredOffer:false},
  {id:498,slug:'harina-0000-campodonico-25kg',name:'Harina 0000 Campodónico x25 kg',price:28900,regularPrice:null,cat:'Alimentos',categories:['Alimentos > Harinas'],brand:'Campodónico',sku:'',description:'Bolsa de harina 0000 de 25 kg.',img:'assets/harina-0000-campodonico-25kg.png',featuredOffer:false}
]);
