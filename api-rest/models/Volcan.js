// models/Volcan.js
const mongoose = require('mongoose');

const VolcanSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
  altura: Number,
  erupcion: String,
  activo: Boolean,
  imagen: String,
  tipo: String, 
  descripcion: String, 
  estado: String, 
  alerta: String 
}, { timestamps: true });

module.exports = mongoose.model('Volcan', VolcanSchema);
