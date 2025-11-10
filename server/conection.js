// Importamos el paquete mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Realizamos la conexión a MongoDB Atlas.
// 📌 Esta URL incluye:
//   - Usuario: jsebach99_db_user
//   - Contraseña: 0CNqQmNXoeCxr5WC
//   - Cluster: cluster0.uxnqrd1.mongodb.net
//   - Base de datos: tudivj
// ⚠️ IMPORTANTE: Nunca compartas credenciales reales en repositorios públicos.
mongoose.connect("mongodb+srv://jsebach99_db_user:0CNqQmNXoeCxr5WC@cluster0.uxnqrd1.mongodb.net/tudivj?appName=Cluster0");

// Guardamos la conexión activa en una variable para escuchar eventos
const object = mongoose.connection;

// 📡 Evento “connected” → se ejecuta cuando la conexión es exitosa
object.on('connected', () => {
  console.log("✅ Conectado a MongoDB");
});

// ⚠️ Evento “error” → se ejecuta si ocurre un problema durante la conexión
object.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});
