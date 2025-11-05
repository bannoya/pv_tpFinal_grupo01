const express = require('express');
const routes = express.Router();
//modelo de Datos   
const mongoose = require('mongoose');
const esquema =  mongoose.Schema;

const esquemaUsuario = new esquema({
    username: String,
    password: String,
    rol : String,
    name : String
});

const listaUsuarios = mongoose.model('users', esquemaUsuario);

routes.get('/obtenerUsuarios', async (req, res) => {
    try {
        const docs =  await listaUsuarios.find({});
        res.send(docs);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send({ message: "Error al obtener los usuarios", error: error });
    }
});

module.exports = routes;