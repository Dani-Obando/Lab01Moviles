const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // para servir imágenes

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Importar y usar rutas
const volcanesRoute = require('./routes/volcanes');
app.use('/api/volcanes', volcanesRoute);

// Ruta base opcional
app.get('/', (req, res) => {
  res.send('API Volcanes funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
