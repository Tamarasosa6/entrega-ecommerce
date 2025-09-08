const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());

// Estos archivos aún no existen, los crearemos después
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
