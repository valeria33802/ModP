const pool = require('./configdb');

//view

// const obtenerperifericos = async () => {
//     try {
//         const [rows] = await pool.query('select * from vista_perifericos_compradores');
//         return rows;
//     } catch (error) {
//         console.error('Error al obtener perifericos:', error);
//         throw error;
//     }
// };

//--------------------------
async function loginUser(nombreusuario, contrasenia) {
    try {
      
      const [result] = await pool.query('CALL spd_login(?, ?)', [nombreusuario, contrasenia]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al ejecutar spd_login:', error);
      throw error;
    }
  }

  // async function sp_InsertarComprador(nombreusuario, correo, contrasenia, nombre, apellido, direccion) {
  //   try {
      
  //     const [result] = await pool.query('CALL sp_insert_comprador(?, ?, ?, ?, ?, ?)', [nombreusuario, correo, contrasenia, nombre, apellido, direccion]);
  //     const data = result[0];
  //     return data;
  //   } catch (error) {
  //     console.error('Error al insertar comprador:', error);
  //     throw error;
  //   }
  // }

  async function sp_InsertarComprador(
    nombreusuario, correo, contrasenia, nombre, apellido, direccion
  ) {
    const [result] = await pool.query(
      'CALL sp_insert_comprador(?, ?, ?, ?, ?, ?)',
      [nombreusuario, correo, contrasenia, nombre, apellido, direccion]
    );
    return result[0];
  }

  async function sp_ModificarComprador( ncorreo, ncontrasenia, nnombre, napellido, ndireccion) {
    try {
      
      const [result] = await pool.query('CALL sp_modificar_comprador( ?, ?, ?, ?, ?)', [ ncorreo, ncontrasenia, nnombre, napellido, ndireccion]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al ejecutar modificar comprador:', error);
      throw error;
    }
  }

  async function sp_GenerarDatoCliente(id, correo, contrasenia, nombre, apellido, direccion) {
    try {
      
      const [result] = await pool.query('CALL sp_generar_datos_cliente(?, ?, ?, ?, ?, ?)', [id, correo, contrasenia, nombre, apellido, direccion]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al mostrar dator', error);
      throw error;
    }
  }

  async function sp_insert_feedback(calificacion, comentario) {
    try {
      
      const [result] = await pool.query('CALL sp_insert_feedback(?, ?)', [calificacion, comentario]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al ejecutar insertar comentario', error);
      throw error;
    }
  }

  async function sp_modificar_empleado(id, ncorreo, ncontrasenia, npuesto, nestado, nnombre, napellido, nhorario) {
    try {
      
      const [result] = await pool.query('CALL sp_modificar_empleado(?, ?, ?, ?, ?, ?, ?,?)', [id, ncorreo, ncontrasenia, npuesto, nestado, nnombre, napellido, nhorario]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al modificar empleado', error);
      throw error;
    }
  }

  // async function sp_insert_proyecto_final(idarticulo, idcomprador, p_modificaciones) {
  //   try {
      
  //     const [result] = await pool.query('CALL sp_insert_proyecto_final(?, ?, ?)', [idarticulo, idcomprador, p_modificaciones]);
  //     const data = result[0];
  //     return data;
  //   } catch (error) {
  //     console.error('Error al ejecutar crear proyecto', error);
  //     throw error;
  //   }
  // }

  // async function sp_insert_proyecto_final(
  //   p_ID_Articulo,
  //   p_art_price,
  //   p_mod_price_sum,
  //   p_modificaciones
  // ) {
  //   try {
  //     const [rows] = await pool.query(
  //       'CALL sp_insert_proyecto_final(?, ?, ?, ?)',
  //       [p_ID_Articulo, p_art_price, p_mod_price_sum, p_modificaciones]
  //     );
  //     // MySQL devuelve un array de result-sets; el primero contiene el SELECT final
  //     return rows[0];
  //   } catch (error) {
  //     console.error('Error en sp_insert_proyecto_final:', error);
  //     throw error;
  //   }
  // }

  async function sp_insert_proyecto_final(
    p_ID_Articulo,
    p_art_price,
    p_mod_price_sum,
    p_modificaciones,
    p_card_number,
    p_card_cvv,
    p_card_name,
    p_card_expire
  ) {
    try {
      const [resultSets] = await pool.query(
        'CALL sp_insert_proyecto_final(?, ?, ?, ?, ?, ?, ?, ?)',
        [
          p_ID_Articulo,
          p_art_price,
          p_mod_price_sum,
          p_modificaciones,
          p_card_number,
          p_card_cvv,
          p_card_name,
          p_card_expire
        ]
      );
      // el primer resultSet contiene el SELECT final del SP
      return resultSets[0];
    } catch (err) {
      console.error('Error al ejecutar sp_insert_proyecto_final:', err);
      throw err;
    }
  }
  
  

  async function sp_sumar_stock(id, incremento) {
    try {
      
      const [result] = await pool.query('CALL sp_sumar_stock(?, ?)', [id, incremento]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al ejecutar editar inventario:', error);
      throw error;
    }
  }

  async function sp_filtrar_servicios(id, incremento) {
    try {
      
      const [result] = await pool.query('CALL sp_filtrar_servicios(?)', [id]);
      const data = result[0];
      return data;
    } catch (error) {
      console.error('Error al ejecutar filtro:', error);
      throw error;
    }
  }
// obtiene la información del último usuario que hizo login
  const sp_generar_info_ultimo_comprador = async () => {
    try {
        const [rows] = await pool.query('CALL sp_generar_info_ultimo_comprador()');
        return rows;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
};
//ver historial del usuario
const sp_historial_compra_ultimo_usuario = async () => {
  try {
    const [rows] = await pool.query('CALL sp_historial_compra_ultimo_usuario()');
    return rows[0]; 
  } catch (error) {
    console.error('Error al obtener la info del último comprador:', error);
    throw error;
  }
};
//modificar los datos del empleado
async function sp_modificar_empleado(id, ncorreo, ncontrasenia, npuesto, nnombre, napellido, nhorario) {
  try {
    
    const [result] = await pool.query('CALL sp_modificar_empleado(?, ?, ?, ?, ?, ?, ?)', [id, ncorreo, ncontrasenia, npuesto, nnombre, napellido, nhorario]);
    const data = result[0];
    return data;
  } catch (error) {
    console.error('Error al modificar empleado', error);
    throw error;
  }
}
//obtener los perifericos para verlos 
const obtenerperifericos = async () => {
  try {
    // Llamamos al SP que ejecuta la vista
    const [rows] = await pool.query('CALL ejecutar_vista_articulos()');
    // MySQL retorna un arreglo bidimensional para CALL, el primer result set está en rows[0]
    return rows;
  } catch (error) {
    console.error('Error al obtener periféricos:', error);
    throw error;
  }
};


const ejecutar_vista_faq = async () => {
  try {
      const [rows] = await pool.query('CALL ejecutar_vista_faq()');
      return rows;
  } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
  }
};

const ejecutar_vista_calificaciones = async () => {
  try {
      const [rows] = await pool.query('CALL ejecutar_vista_calificaciones()');
      return rows;
  } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
  }
};

async function sp_insert_codigo(codigo, tiempocreacion, tiempovencimiento) {
  try {
    
    const [result] = await pool.query('CALL sp_insert_codigo(?, ?, ?)', [codigo, tiempocreacion, tiempovencimiento]);
    const data = result[0];
    return data;
  } catch (error) {
    console.error('Error al modificar empleado', error);
    throw error;
  }
}

async function sp_cambio_contrasenia(npass) {
  try {
    
    const [result] = await pool.query('CALL sp_cambio_contrasenia(?)', [npass]);
    const data = result[0];
    return data;
  } catch (error) {
    console.error('Error al modificar empleado', error);
    throw error;
  }
}

const sp_obtener_correo_usuario = async () => {
  try {
      const [rows] = await pool.query('CALL sp_obtener_correo_usuario()');
      return rows;
  } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
  }
};

async function sp_validar_codigo(codigo) {
  try {
    
    const [result] = await pool.query('CALL sp_validar_codigo(?)', [codigo]);
    const data = result[0];
    return data;
  } catch (error) {
    console.error('Error al modificar empleado', error);
    throw error;
  }
}

// async function getUbicaciones() {
//   try {
//     const [rows] = await pool.query('CALL sp_get_ubicaciones()');
//     // rows[0] suele ser un array con una única fila, donde la propiedad "ubicaciones" contiene el JSON
//     const result = rows[0][0].ubicaciones;
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

  module.exports = {
    obtenerperifericos,
    loginUser,
    sp_InsertarComprador,
    sp_ModificarComprador,
    sp_GenerarDatoCliente,
    sp_insert_feedback,
    sp_modificar_empleado,
    sp_insert_proyecto_final,
    sp_sumar_stock,
    sp_filtrar_servicios, 
    sp_generar_info_ultimo_comprador, 
    sp_historial_compra_ultimo_usuario,
    ejecutar_vista_faq,
    ejecutar_vista_calificaciones,
    sp_insert_codigo,
    sp_obtener_correo_usuario,
    sp_cambio_contrasenia,
    sp_validar_codigo, 
   
};