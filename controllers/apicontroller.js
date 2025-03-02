// controllers/apiController.js
const express = require('express');
const router = express.Router();
const services = require('../negocios/servicios');

// Endpoint para login
router.post('/login', async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const response = await services.loginService(correo, contrasenia);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para insertar comprador
router.post('/comprador', async (req, res) => {
  try {
    const { correo, contrasenia, nombre, apellido, direccion } = req.body;
    const response = await services.insertarCompradorService(correo, contrasenia, nombre, apellido, direccion);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para modificar comprador
router.put('/comprador/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { ncorreo, ncontrasenia, nnombre, napellido, ndireccion } = req.body;
    const response = await services.modificarCompradorService(id, ncorreo, ncontrasenia, nnombre, napellido, ndireccion);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para generar datos del cliente (por ejemplo, usando el ID)
router.get('/cliente/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.generarDatoClienteService(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para insertar feedback
router.post('/feedback', async (req, res) => {
  try {
    const { calificacion, comentario } = req.body;
    const response = await services.insertFeedbackService(calificacion, comentario);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para modificar empleado
router.put('/empleado/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { ncorreo, ncontrasenia, npuesto, nnombre, napellido, nhorario } = req.body;
    const response = await services.modificarEmpleadoService(id, ncorreo, ncontrasenia, npuesto, nnombre, napellido, nhorario);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para insertar proyecto final
router.post('/proyecto', async (req, res) => {
  try {
    const { idarticulo, idcomprador, p_modificaciones } = req.body;
    const response = await services.insertProyectoFinalService(idarticulo, idcomprador, p_modificaciones);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para sumar stock
router.put('/stock', async (req, res) => {
  try {
    const { id, incremento } = req.body;
    const response = await services.sumarStockService(id, incremento);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para filtrar servicios
router.get('/servicios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.filtrarServiciosService(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener periféricos (vista)
router.get('/perifericos', async (req, res) => {
  try {
    const response = await services.obtenerPerifericosService();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener información del comprador (vista)
router.get('/infocomprador', async (req, res) => {
  try {
    const response = await services.generar_info_compradorService();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener periféricos (vista)
router.get('/historialcomprador', async (req, res) => {
  try {
    const response = await services.historial_compra_ultimo_usuarioService();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
