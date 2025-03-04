const { ejecutar_vista_faq } = require('../datos/repositorios');

// negocios/servicios.js
const {
    loginUser,
    sp_InsertarComprador,
    sp_ModificarComprador,
    sp_GenerarDatoCliente,
    sp_insert_feedback,
    sp_modificar_empleado,
    sp_insert_proyecto_final,
    sp_sumar_stock,
    obtenerperifericos,
    sp_filtrar_servicios,
    sp_generar_info_ultimo_comprador,
    sp_historial_compra_ultimo_usuario,
    ejecutar_vista_calificaciones
 
  } = repositorios = require('../datos/repositorios'); 
  
  // Función de negocio para el login
  async function loginService(nombreusuario, contrasenia) {
    
    const response = await loginUser(nombreusuario, contrasenia);
    return response;
  }
  
  // Función para insertar comprador
  async function insertarCompradorService(nombreusuario, correo, contrasenia) {
    const response = await sp_InsertarComprador(nombreusuario, correo, contrasenia);
    return response;
  }
  
  // Función para modificar comprador
  async function modificarCompradorService( ncorreo, ncontrasenia, nnombre, napellido, ndireccion) {
    const response = await sp_ModificarComprador( ncorreo, ncontrasenia, nnombre, napellido, ndireccion);
    return response;
  }
  
  // Función para generar datos del cliente (ajusta los parámetros según el SP)
  async function generarDatoClienteService(id) {
    const response = await sp_GenerarDatoCliente(id);
    return response;
  }
  
  // Función para insertar feedback
  async function insertFeedbackService(calificacion, comentario) {
    const response = await sp_insert_feedback(calificacion, comentario);
    return response;
  }
  
  // Función para modificar empleado
  async function modificarEmpleadoService(id, ncorreo, ncontrasenia, npuesto, nestado, nnombre, napellido, nhorario) {
    const response = await sp_modificar_empleado(id, ncorreo, ncontrasenia, npuesto, nestado, nnombre, napellido, nhorario);
    return response;
  }
  
  // Función para insertar proyecto final
  async function insertProyectoFinalService(idarticulo, idcomprador, p_modificaciones) {
    const response = await sp_insert_proyecto_final(idarticulo, idcomprador, p_modificaciones);
    return response;
  }
  
  // Función para sumar stock
  async function sumarStockService(id, incremento) {
    const response = await sp_sumar_stock(id, incremento);
    return response;
  }
  
  // Función para filtrar servicios
  async function filtrarServiciosService(id) {
    const response = await sp_filtrar_servicios(id);
    return response;
  }
  

  const obtenerCompradorLoginService = async () => {
    try {
        const [rows] = await sp_generar_info_ultimo_comprador();
        return rows[0]; // Devolver solo los datos obtenidos
    } catch (error) {
        console.error('Error al obtener datos del comprador:', error);
        throw error;
    }
};

// const obtenerPerifericosService = async () => {
//   return await obtenerperifericos();
// };

const historial_compra_ultimo_usuarioService = async () => {
  return await sp_historial_compra_ultimo_usuario(); 
};

const obtenerPerifericosService = async () => {
  try {
      const [rows] = await obtenerperifericos();
      return rows; // Devolver solo los datos obtenidos
  } catch (error) {
      console.error('Error al obtener datos del comprador:', error);
      throw error;
  }
};

const vistaFAQService = async () => {
  try {
      const [rows] = await ejecutar_vista_faq();
      return rows; // Devolver solo los datos obtenidos
  } catch (error) {
      console.error('Error al obtener datos del comprador:', error);
      throw error;
  }
};

const vistacalificacionesService = async () => {
  try {
      const [rows] = await ejecutar_vista_calificaciones();
      return rows; // Devolver solo los datos obtenidos
  } catch (error) {
      console.error('Error al obtener datos del comprador:', error);
      throw error;
  }
};

  
  module.exports = {
    loginService,
    insertarCompradorService,
    modificarCompradorService,
    generarDatoClienteService,
    insertFeedbackService,
    modificarEmpleadoService,
    insertProyectoFinalService,
    sumarStockService,
    filtrarServiciosService,
    obtenerPerifericosService,
    obtenerCompradorLoginService,
    historial_compra_ultimo_usuarioService,
    vistaFAQService,
    vistacalificacionesService
  };
  