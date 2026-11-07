(() => {
  const fernet = (window.PRODUCTS || []).find(product => product.id === 158 || product.slug === 'aperitivo-fernet-branca-x750ml');
  if (fernet) {
    fernet.price = 17000;
    fernet.boxQuantity = 12;
    fernet.boxUnitPrice = 16000;
    fernet.boxPrice = 192000;
  }
})();
