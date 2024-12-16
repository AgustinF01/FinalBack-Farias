const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createCart = async () => {
  try {
    const cart = new Cart();
    await cart.save();
    return cart;
  } catch (err) {
    console.error('Error al crear carrito:', err);
    throw err; // Lanza el error para manejarlo en la ruta
  }
};

const addProductToCart = async (cartId, productId) => {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(item => item.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementar la cantidad si ya existe
    } else {
      cart.products.push({ product: productId, quantity: 1 }); // Agregar nuevo producto
    }

    await cart.save();
    return cart; // Devuelve el carrito actualizado
  } catch (err) {
    console.error('Error al agregar producto al carrito:', err);
    throw err; // Lanza el error para manejarlo en la ruta
  }
};

const getCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products.product');
    return cart;
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    throw err; // Lanza el error para manejarlo en la ruta
  }
};

// Función para eliminar un producto del carrito
const removeProductFromCart = async (cartId, productId) => {
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    // Convertir productId a un ObjectId para la comparación
    const productObjectId = new mongoose.Types.ObjectId(productId); // Usa 'new' aquí
    
    const productIndex = cart.products.findIndex(item => item.product._id.equals(productObjectId));
    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    // Si hay más de uno, decrementa la cantidad
    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      // Si es uno, elimina el producto del carrito
      cart.products.splice(productIndex, 1);
    }

    await cart.save();
    return cart;
  } catch (err) {
    console.error('Error al eliminar producto del carrito:', err);
    throw err; // Lanza el error para manejarlo en la ruta
  }
};

module.exports = { createCart, addProductToCart, getCart, removeProductFromCart };