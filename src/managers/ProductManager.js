const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      ...product,
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      return products[productIndex];
    }
    return null;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
    return filteredProducts.length !== products.length;
  }
}

module.exports = ProductManager;
