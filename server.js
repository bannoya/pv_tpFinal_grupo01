const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://jsebach99_db_user:0CNqQmNXoeCxr5WC@cluster0.uxnqrd1.mongodb.net/?appName=Cluster0");

const object = mongoose.connection;

object.on('connected', () => {
    console.log("✅ Conectado a MongoDB Atlas");
});

object.on('error', (err) => {
    console.log("❌ Error de conexión:", err);
});

// Ruta principal
app.get('/', (req, res) => {
    res.end("Bienvenido al servidor de Proyecto X");
});

// Levantar servidor
app.listen(5000, () => {
    console.log(" Servidor corriendo en http://localhost:5000");
});