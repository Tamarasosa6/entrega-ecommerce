const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager.js');

const productManager = new ProductManager('src/data/products.json');

// GET /api/products
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  const success = await productManager.deleteProduct(parseInt(req.params.pid));
  if (success) {
    res.status(200).json({ message: 'Producto eliminado con éxito.' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager.js');

const productManager = new ProductManager('src/data/products.json');

// GET /api/products
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  const success = await productManager.deleteProduct(parseInt(req.params.pid));
  if (success) {
    res.status(200).json({ message: 'Producto eliminado con éxito.' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

module.exports = router;
