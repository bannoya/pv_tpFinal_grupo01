const express = require('express');
const router = express.Router();
const User = require('../model/User');

// GET /api/usuarios/obtenerUsuarios
router.get('/obtenerUsuarios', async (req, res) => {
  try {
    const docs = await User.find();
    res.json(docs);
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    res.status(500).json({ message: "Error interno", error: String(error) });
  }
});

module.exports = router;
