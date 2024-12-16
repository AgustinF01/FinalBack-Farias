const express = require('express');
const router = express.Router();
const { createCart, addProductToCart, getCart } = require('../controllers/cartController');

// Ruta para crear un nuevo carrito
router.post('/cart', async (req, res) => {
  try {
    const cart = await createCart();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear carrito' });
  }
});

// Ruta para agregar un producto al carrito
router.post('/cart/:cartId/products/:productId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cart = await addProductToCart(cartId, productId);
    res.json(cart);
  } catch (err) {
    console.error('Error al agregar producto al carrito:', err);
    res.status(500).json({ message: 'Error al agregar producto al carrito' });
  }
});

// Ruta para obtener el contenido del carrito
router.get('/cart/:cartId', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await getCart(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener carrito' });
  }
});

module.exports = router;