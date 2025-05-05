const express = require('express');
const router = express.Router();
const multer = require('multer');
const Volcan = require('../models/Volcan');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
  try {
    const volcan = new Volcan({
      nombre: req.body.nombre,
      ubicacion: req.body.ubicacion,
      altura: req.body.altura,
      erupcion: req.body.erupcion,
      activo: req.body.activo === true || req.body.activo === 'true',
      tipo: req.body.tipo,
      descripcion: req.body.descripcion,
      estado: req.body.estado,
      alerta: req.body.alerta,
      imagen: req.body.imagen || null 
    });

    await volcan.save();
    res.status(201).json(volcan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const volcanes = await Volcan.find();
    res.json(volcanes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
