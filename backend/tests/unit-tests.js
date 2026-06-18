const assert = require('assert');
const { calcularTotal, calcularStockRestante } = require('../src/utils/sale.utils');

const total = calcularTotal([
  { precio_unitario: 25, cantidad: 3 },
  { precio_unitario: 10, cantidad: 2 }
]);
assert.strictEqual(total, 95);
console.log('Prueba 1 aprobada: calculo de total de venta');

const stock = calcularStockRestante(20, 4);
assert.strictEqual(stock, 16);
console.log('Prueba 2 aprobada: calculo de stock restante');
