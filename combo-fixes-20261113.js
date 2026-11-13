(() => {
  const combo2 = {
    id: 1002,
    slug: 'combo-2-almacen-limpieza',
    name: 'Combo 2 · Almacén y limpieza',
    price: 87440,
    regularPrice: null,
    cat: 'Combos',
    categories: ['Combos'],
    brand: 'Falucho',
    sku: 'COMBO2',
    description: '',
    img: 'assets/combo-2-almacen-limpieza.png?v=1',
    packLabel: 'COMBO',
    comboItems: [
      '15 fideos tirabuzón Sol Pampeano x500 g',
      '10 azúcares Gury x1 kg',
      '6 aceites de girasol El Paisano x900 ml',
      '12 purés de tomate La Huerta x520 g',
      '1 papel higiénico Elegante Extra Pack Familiar x24 rollos',
      '12 leches enteras Silvia x1 L',
      '8 paquetes de rollo de cocina Elegante x3 rollos'
    ]
  };

  const catalog = window.PRODUCTS || [];
  if (!catalog.some(product => product.id === combo2.id)) catalog.push(combo2);

  const prices = new Map([[1007, 99830], [9009, 32420]]);
  catalog.forEach(product => {
    if (prices.has(product.id)) product.price = prices.get(product.id);
  });

  window.PRODUCTS = catalog;
})();
