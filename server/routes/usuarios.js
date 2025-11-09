
const express = require('express');
const router = express.Router();
const User = require('../model/User');



// Esta ruta obtiene todos los usuarios almacenados en la base de datos.
router.get('/obtenerUsuarios', async (req, res) => {
  try {
    // Buscamos todos los documentos en la colección "users".
    const docs = await User.find();

    // Enviamos los resultados en formato JSON al cliente.
    res.json(docs);
    
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    res.status(500).json({ message: "Error interno", error: String(error) });
  }
});


// Esta ruta crea (registra) un nuevo usuario en la base de datos.
router.post('/registrarUsuarios', async (req, res) => {
  try {
    // Creamos una nueva instancia del modelo "User" usando los datos del cuerpo de la solicitud (req.body).
    const nuevoUsuario = new User(req.body);

    // Guardamos el usuario en la base de datos.
    const usuarioGuardado = await nuevoUsuario.save();

    // Respondemos con código 201 (creado) y el usuario guardado.
    res.status(201).json({ success: true, data: usuarioGuardado });

    console.log(res.message);

  } catch (error) {
    console.error("Error en /registrarUusuario", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
});



// Actualiza el puntaje (score) de un usuario identificado por su username.
router.put('/by-username/:username/score', async (req, res) => {

  // Obtenemos el nombre de usuario desde los parámetros de la URL.
  const { username } = req.params;

  // Obtenemos el nuevo puntaje desde el cuerpo de la solicitud.
  const { score } = req.body;

  // Validamos que el score recibido sea un número.
  if (typeof score !== 'number') {
    return res.status(400).json({ success:false, message:'score debe ser numérico' });
  }

  // Buscamos el usuario por username y actualizamos su score.
  // new: true → devuelve el documento actualizado.
  // runValidators: true → aplica validaciones del esquema.
  const updated = await User.findOneAndUpdate(
    { username },
    { score },
    { new: true, runValidators: true }
  );

  if (!updated)
    return res.status(404).json({ success:false, message:'Usuario no encontrado' });

  // Enviamos como respuesta el usuario actualizado.
  res.json({ success:true, data: updated });
});

module.exports = router;
