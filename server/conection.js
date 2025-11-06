const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jsebach99_db_user:0CNqQmNXoeCxr5WC@cluster0.uxnqrd1.mongodb.net/tudivj?appName=Cluster0");

const object = mongoose.connection;

object.on('connected', () => {
  console.log("✅ Conectado a MongoDB");
});

object.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});
