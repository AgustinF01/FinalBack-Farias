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

const getProducts = async (page = 1, limit = 10, category = '') => {
  const skip = (page - 1) * limit; 
  const query = category ? { category: category } : {}; 

  //console.log('Consulta de productos:', query);

  const products = await Product.find(query).skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments(query); 

  return {
    products,
    totalPages: Math.ceil(totalProducts / limit), 
    currentPage: page
  };
};

module.exports = { createProduct, getProducts };