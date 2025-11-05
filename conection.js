const mongoose = require('mongoose');
mongoose.connect
("mongodb+srv://fatx:7825@cluster0.h5sqje0.mongodb.net/ProyectoX?appName=Cluster0");

const objeto = mongoose.connection;

objeto.on('connected', () => {
    console.log("Conexión exitosa a la base de datos");
});

objeto.on('error', () => {
    console.log("Error en la conexión a la base de datos ");
});

module.exports = mongoose;