const test = require('node:test');
const assert = require('node:assert');
const { calcularTotal } = require('./app');

test('calcula el total sin descuento', () => {
  assert.strictEqual(calcularTotal(100, 2), 200);
});

test('aplica el descuento correctamente', () => {
  assert.strictEqual(calcularTotal(100, 2, 10), 180);
});

test('rechaza precio negativo', () => {
  assert.throws(() => calcularTotal(-10, 1), /precio inválido/);
});

test('rechaza cantidad inválida', () => {
  assert.throws(() => calcularTotal(10, 0), /cantidad inválida/);
});

test('rechaza descuento fuera de rango', () => {
  assert.throws(() => calcularTotal(10, 1, 150), /descuento inválido/);
});