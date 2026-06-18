function calcularTotal(items) {
  return items.reduce((total, item) => total + Number(item.precio_unitario) * Number(item.cantidad), 0);
}

function calcularStockRestante(stockActual, cantidadVendida) {
  const restante = Number(stockActual) - Number(cantidadVendida);
  if (restante < 0) throw new Error('Stock insuficiente');
  return restante;
}

module.exports = { calcularTotal, calcularStockRestante };
