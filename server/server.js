const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a Mongo
require('./conection.js');

// Rutas
const usuariosRoutes = require('./routes/usuarios'); // <- IMPORTA EL ROUTER
app.use('/api/usuarios', usuariosRoutes);           // <- MONTALO EN /api/usuarios

// Ruta principal
app.get('/', (req, res) => {
  res.end("Bienvenido al servidor de Proyecto X");
});

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
