const express = require('express');
const router = express.Router();
const servicios = require('../negocios/servicios'); //


// Endpoint para login
router.post('/login', async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {
        const resultado = await servicios.loginService(correo, contrasenia);

        if (resultado.length === 0) {
            return res.status(401).json({ error: 'Usuario no reconocido o contraseña incorrecta' });
        }

        const mensaje = resultado[0].Mensaje; // Mensaje del SP
        const posicion = resultado[0].Posicion; // Tipo de usuario

        if (mensaje.includes('ha hecho sesión')) {
            res.json({ success: true, mensaje, posicion });
        } else {
            res.status(401).json({ success: false, mensaje });
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para insertar comprador
router.post('/comprador', async (req, res) => {
  try {
    const { correo, contrasenia, nombre, apellido, direccion } = req.body;
    const response = await servicios.insertarCompradorService(correo, contrasenia, nombre, apellido, direccion);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para modificar comprador
router.put('/comprador/:id', async (req, res) => {
  try {
    // const id = req.params.id;
    const { ncorreo, ncontrasenia, nnombre, napellido, ndireccion } = req.body;
    const response = await servicios.modificarCompradorService(id, ncorreo, ncontrasenia, nnombre, napellido, ndireccion);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para generar datos del cliente (por ejemplo, usando el ID)
router.get('/cliente/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await servicios.generarDatoClienteService(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para insertar feedback
router.post('/feedback', async (req, res) => {
  try {
    const { calificacion, comentario } = req.body;
    const response = await servicios.insertFeedbackService(calificacion, comentario);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para modificar empleado
router.put('/empleado/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { ncorreo, ncontrasenia, npuesto, nestado, nnombre, napellido, nhorario } = req.body;
    const response = await servicios.modificarEmpleadoService(id, ncorreo, ncontrasenia, npuesto, nestado, nnombre, napellido, nhorario);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para insertar proyecto final
router.post('/proyecto', async (req, res) => {
  try {
    const { idarticulo, idcomprador, p_modificaciones } = req.body;
    const response = await servicios.insertProyectoFinalService(idarticulo, idcomprador, p_modificaciones);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para sumar stock
router.put('/stock', async (req, res) => {
  try {
    const { id, incremento } = req.body;
    const response = await servicios.sumarStockService(id, incremento);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para filtrar servicios
router.get('/servicios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await servicios.filtrarServiciosService(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Endpoint para obtener periféricos (vista)
// router.get('/perifericos', async (req, res) => {
//   try {
//     const perifericos = await servicios.obtenerPerifericosService();
//     res.json(perifericos);
//   } catch (error) {
//     console.error('Error en /perifericos:', error);
//     res.status(500).json({ error: 'Error al obtener los periféricos' });
//   }
// });

router.get('/compradorlogin', async (req, res) => {
  try {
      const response = await servicios.obtenerCompradorLoginService();
      
      if (!response || response.length === 0) {
          return res.status(404).json({ error: 'No hay datos disponibles.' });
      }
      
      res.json(response);
  } catch (error) {
      console.error('Error en /compradorlogin:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener información del comprador (vista)
router.get('/infocomprador', async (req, res) => {
  try {
    const response = await servicios.generar_info_compradorService();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener historial del comprador
router.get('/historialcomprador', async (req, res) => {
  try {
    const response = await servicios.historial_compra_ultimo_usuarioService();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener perifericos
router.get('/perifericos', async (req, res) => {
  try {
    const perifericos = await servicios.obtenerPerifericosService();
    res.json(perifericos);
  } catch (error) {
    console.error('Error en /perifericos:', error);
    res.status(500).json({ error: 'Error al obtener los periféricos' });
  }
});


module.exports = router;
