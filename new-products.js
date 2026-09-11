const alamosUnit=window.PRODUCTS.find(product=>product.slug==='vino-alamos-malbec-x750ml');
if(alamosUnit){
  alamosUnit.price=6270;
  alamosUnit.img='assets/vino-alamos-malbec-750ml.png';
}
window.PRODUCTS=window.PRODUCTS.filter(product=>product.slug!=='vino-alamos-malbec-x750ml-caja-x6');

window.PRODUCTS=(window.PRODUCTS||[]).concat([
  {id:493,slug:'vino-elementos-malbec-x750ml',name:'Vino Elementos Malbec x750ml',price:5250,regularPrice:null,cat:'Bebidas',categories:['Bebidas > Bebidas alcohólicas'],brand:'Elementos',sku:'',description:'',img:'assets/vino-elementos-malbec-750ml.png',featuredOffer:false},
  {id:494,slug:'whisky-old-smuggler-x1lt',name:'Whisky Old Smuggler x1lt',price:9590,regularPrice:null,cat:'Bebidas',categories:['Bebidas > Bebidas alcohólicas'],brand:'Old Smuggler',sku:'',description:'',img:'http://acdn-us.mitiendanube.com/stores/007/258/334/products/5-3d8ce0fa55c5f6d21b17702408032239-640-0.webp',featuredOffer:false}
]);
