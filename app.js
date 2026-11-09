const express = require('express');

const app = express();
app.use(express.json());

/**
 * Calcula el total de una compra aplicando un descuento.
 * - precio: número positivo, precio unitario
 * - cantidad: número entero positivo
 * - descuento: porcentaje entre 0 y 100 (opcional, default 0)
 */
function calcularTotal(precio, cantidad, descuento = 0) {
  if (typeof precio !== 'number' || precio < 0) {
    throw new Error('precio inválido');
  }
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    throw new Error('cantidad inválida');
  }
  if (typeof descuento !== 'number' || descuento < 0 || descuento > 100) {
    throw new Error('descuento inválido');
  }

  const subtotal = precio * cantidad;
  const total = subtotal - subtotal * (descuento / 100);
  return Math.round(total * 100) / 100;
}

app.post('/total', (req, res) => {
  try {
    const { precio, cantidad, descuento } = req.body;
    const total = calcularTotal(precio, cantidad, descuento);
    res.json({ total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Solo arranca el servidor si se ejecuta directamente (no al importarlo en los tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`tienda-segura escuchando en puerto ${PORT}`));
}

module.exports = { app, calcularTotal };