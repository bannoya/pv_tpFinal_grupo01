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
router.post('/registrarUsuarios', async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({success: true, data: usuarioGuardado});
    console.log(res.message);
  } catch (error) {
    console.error("Error en /registrarUusuario", error);
    res.status(500).json({ success: false, message: "Error interno"});
  }
});

router.put('/by-username/:username/score', async (req, res) => {
  const { username } = req.params;
  const { score } = req.body;
  if (typeof score !== 'number') {
    return res.status(400).json({ success:false, message:'score debe ser numérico' });
  }
  const updated = await User.findOneAndUpdate({ username }, { score }, { new:true, runValidators:true });
  if (!updated) return res.status(404).json({ success:false, message:'Usuario no encontrado' });
  res.json({ success:true, data: updated });
});


module.exports = router;


