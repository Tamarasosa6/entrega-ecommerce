const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.path = './src/data/products.json';
    this.validTypes = ['ABC', 'BC', 'CO2', 'AFFF', 'K', 'D'];
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getProducts() {
    return await this.#readFile();
  }

  async getProductById(id) {
    const products = await this.#readFile();
    return products.find(p => p.id === id);
  }

  async addProduct(product) {
    const products = await this.#readFile();
    if (products.some(p => p.code === product.code)) {
      throw new Error('El código del matafuego ya existe');
    }
    if (!this.validTypes.includes(product.type)) {
      throw new Error('Tipo de matafuego inválido. Tipos permitidos: ' + this.validTypes.join(', '));
    }
    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: true,
      stock: product.stock,
      category: product.category,
      type: product.type,
      capacity: product.capacity,
      certifications: product.certifications || [],
      thumbnails: product.thumbnails || []
    };
    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.#readFile();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return null;
    if (updatedFields.code && products.some(p => p.code === updatedFields.code && p.id !== id)) {
      throw new Error('El código del matafuego ya existe');
    }
    if (updatedFields.type && !this.validTypes.includes(updatedFields.type)) {
      throw new Error('Tipo de matafuego inválido. Tipos permitidos: ' + this.validTypes.join(', '));
    }
    const updatedProduct = { ...products[productIndex], ...updatedFields, id };
    products[productIndex] = updatedProduct;
    await this.#writeFile(products);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.#readFile();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return null;
    products.splice(productIndex, 1);
    await this.#writeFile(products);
    return true;
  }
}

module.exports = ProductManager;
