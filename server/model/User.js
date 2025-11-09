const mongoose = require('mongoose');

// Este esquema determina qué campos tendrá cada usuario y qué tipo de datos guardará.
const esquemaUsuario = new mongoose.Schema({
  username: String,
  password: String,
  rol: String,
  state: Boolean,
  lastname: String,
  name: String,
  opcion1: String,
  opcion2: String,
  score: { type: Number, default: 0 }

}, { timestamps: true });

// Exportamos el modelo 'users', basado en el esquema definido arriba.
// Esto permite que podamos interactuar con la colección 'users' en MongoDB
// (por ejemplo, para crear, leer, actualizar o eliminar usuarios).
module.exports = mongoose.model('users', esquemaUsuario);
