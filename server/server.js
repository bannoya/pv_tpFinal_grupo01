const express = require('express'); 
const cors = require('cors'); 

const app = express();

//  Middlewares globales
app.use(cors());           // Habilita CORS para permitir peticiones desde otros dominios (por ejemplo, tu frontend React)
app.use(express.json());   // Permite que Express interprete cuerpos JSON en las solicitudes (req.body)

// Importa el archivo de conexión que establece la conexión con MongoDB
require('./conection.js');

//  Rutas
const usuariosRoutes = require('./routes/usuarios'); 
app.use('/api/usuarios', usuariosRoutes);

//  Ruta principal
app.get('/', (req, res) => {
  res.end("Bienvenido al servidor de Proyecto X");
});

//  Inicialización del servidor

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
