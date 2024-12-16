const Product = require('../models/Product');

const createProduct = async (productData) => {
  try {
    // Validaciones
    if (!productData.name || !productData.price || !productData.description || !productData.image) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (productData.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    const product = new Product(productData);
    await product.save();
    console.log('Producto creado con éxito');
    return product;
  } catch (err) {
    console.error('Error al crear producto:', err);
    throw err;
  }
};

const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error('Error al obtener productos:', err);
  }
};

module.exports = { createProduct, getProducts };