const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
  username: String,
  password: String,
  rol: String,
  state: Boolean,
  lastname: String,
  name: String,
  score: Number
}, { timestamps: true });

module.exports = mongoose.model('users', esquemaUsuario);
