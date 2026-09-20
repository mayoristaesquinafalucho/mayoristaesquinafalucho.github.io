(() => {
  const catalog = window.PRODUCTS || [];
  const packOnlyIds = new Set([356, 357, 358]);

  const isPack = product => !product.offerOnly && product.cat !== 'Combos' && (
    Boolean(product.packLabel) || /^(?:Pack|Caja)\b/i.test(product.name)
  );

  const normalizedTokens = name => name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¨"“”'.·]/g, ' ')
    .replace(/\b(pack|caja|unidades?|uni|paquetes?)\b/g, ' ')
    .replace(/\bx\s*\d+\b/g, ' ')
    .replace(/\bde\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(token => token.length > 1);

  const similarity = (left, right) => {
    const a = new Set(normalizedTokens(left));
    const b = new Set(normalizedTokens(right));
    let matches = 0;
    a.forEach(token => {
      if (b.has(token)) matches += 1;
    });
    return matches / Math.max(a.size, b.size, 1);
  };

  const packQuantity = product => {
    const label = (product.packLabel || '').match(/(?:PACK|CAJA)\s*X\s*(\d+)/i);
    if (label) return Number(label[1]);

    const packs = product.name.match(/x\s*(\d+)\s*paquetes?\s*$/i);
    if (packs) return Number(packs[1]);

    const units = product.name.match(/x\s*(\d+)\s*unidades?\s*$/i);
    return units ? Number(units[1]) : 0;
  };

  const packProducts = catalog.filter(isPack);
  const unitProducts = catalog.filter(product => !product.offerOnly && !isPack(product) && product.cat !== 'Combos');
  const mergedPackIds = new Set();

  packProducts.forEach(pack => {
    const quantity = packQuantity(pack);
    if (!quantity) return;

    if (packOnlyIds.has(pack.id)) {
      pack.boxOnly = true;
      pack.boxPrice = pack.price;
      pack.boxQuantity = quantity;
      pack.boxUnitPrice = pack.price / quantity;
      return;
    }

    const match = unitProducts
      .map(unit => ({ unit, score: similarity(pack.name, unit.name) }))
      .sort((a, b) => b.score - a.score)[0];

    if (!match || match.score < 0.6) return;

    match.unit.boxPrice = pack.price;
    match.unit.boxQuantity = quantity;
    match.unit.boxUnitPrice = pack.price / quantity;
    match.unit.boxLabel = pack.packLabel || `CAJA X${quantity}`;
    match.unit.boxProductId = pack.id;
    mergedPackIds.add(pack.id);
  });

  window.PRODUCTS = catalog.filter(product => !mergedPackIds.has(product.id));
})();
