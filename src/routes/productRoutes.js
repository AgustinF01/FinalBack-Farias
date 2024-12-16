const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');

// Ruta para obtener productos
router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const category = req.query.category || ''; 
  try {
    const { products, totalPages, currentPage } = await getProducts(page, limit, category);
    res.json({ products, totalPages, currentPage });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Ruta para crear un producto
router.post('/products', async (req, res) => {
  try {
    const product = await createProduct(req.body); 
    res.status(201).json(product); 
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

module.exports = router;