const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }
});

productSchema.pre('save', function(next) {
  if (this.price < 0) {
    this.invalidate('price', 'El precio no puede ser negativo');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);