const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');

router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Obtener el número de página de los parámetros de consulta
  const limit = parseInt(req.query.limit) || 10; // Obtener el límite de productos por página
  try {
    const { products, totalPages, currentPage } = await getProducts(page, limit);
    res.json({ products, totalPages, currentPage });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = await createProduct(req.body); // Usar el cuerpo de la solicitud
    res.status(201).json(product); // Devolver el producto creado
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

module.exports = router;