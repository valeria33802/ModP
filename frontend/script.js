// manejo del form LOGIN

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Evita el envío del formulario tradicional

            const nombreusuario = document.getElementById('nombreusuario').value;
            const contrasenia = document.getElementById('password').value;
            const mensajeError = document.getElementById('mensajeError');

            try {
                const response = await axios.post('http://localhost:3300/api/login', {
                  nombreusuario,
                  contrasenia
                });

                if (response.data.success) {
                    // Redirigir según el rol del usuario
                    const posicion = response.data.posicion;
                    if (posicion === 'Admin') {
                        window.location.href = 'inicio.html';
                    } else if (posicion === 'Empleado') {
                        window.location.href = 'inicio.html';
                    } else if (posicion === 'Compra') {
                        window.location.href = 'inicio.html';
                    } else {
                        mensajeError.innerText = 'Tipo de usuario desconocido';
                        mensajeError.style.display = 'block';
                    }
                }
            } catch (error) {
                console.error('Error en el login:', error);
                mensajeError.innerText = error.response?.data?.mensaje || 'Error al iniciar sesión';
                mensajeError.style.display = 'block';
            }
        });
    }
});

//función para llenar las columnas con los datos del comprador

document.addEventListener("DOMContentLoaded", async function () {
    // Detectar perfil
    if (window.location.pathname.includes("perfil.html")) {
        try {
            const response = await fetch("http://localhost:3300/api/compradorlogin");
            const data = await response.json();

            if (!data || data.length === 0) {
                console.error("No se encontraron datos.");
                return;
            }

            // Llenar los campos con los datos obtenidos
            document.getElementById("nombre").value = data.COM_Nombre || "";
            document.getElementById("apellidos").value = data.COM_Apellido || "";
            document.getElementById("correo").value = data.US_Correo || "";
            document.getElementById("direccion").value = data.COM_Direccion || "";

        } catch (error) {
            console.error("Error al obtener datos del perfil:", error);
        }
    }
});

// menejo del catologo desde la vista de los usuarios

document.addEventListener("DOMContentLoaded", async function() {
    // Verificamos si estamos en "catalogo.html"
    if (window.location.pathname.includes("catalogovistausuario.html")) {
      try {
        // 1. Pedir datos al endpoint
        const response = await fetch("http://localhost:3300/api/perifericos");
        const data = await response.json();
        console.log("Artículos recibidos:", data);
  
        if (!data || data.length === 0) {
          console.error("No se encontraron artículos.");
          return;
        }
  
        // 2. Agrupar artículos por categoría (opcional)
        const articulosPorCategoria = {};
        data.forEach(item => {
          const categoria = item["Tipo Periferico"];
          if (!articulosPorCategoria[categoria]) {
            articulosPorCategoria[categoria] = [];
          }
          articulosPorCategoria[categoria].push(item);
        });
  
        
        const catalogContainer = document.getElementById("catalogContainer");
  
        
        Object.keys(articulosPorCategoria).forEach((categoria) => {
          const productos = articulosPorCategoria[categoria];
          
          // Para cada producto, una tarjeta colapsable
          productos.forEach((producto, index) => {
            // Generar un ID único para el collapse
            const collapseID = `${categoria}_${index}_collapse`;
            const cardHTML = `
              <div class="catalog-item mb-3 p-2 border rounded">
                <div 
                  class="catalog-item-header d-flex justify-content-between align-items-center"
                  data-bs-toggle="collapse" 
                  data-bs-target="#${collapseID}"
                  style="cursor: pointer;"
                >
                  <div>
                    <h5 class="mb-0">${categoria} - ${producto.Nombre}</h5>
                    <small>Toca aquí para desplegar</small>
                  </div>
                  <div>
                    <i class="bi bi-arrow-down-square-fill me-2"></i>
                    <i class="bi bi-image"></i>
                  </div>
                </div>
                <div id="${collapseID}" class="collapse mt-2">
                  <div class="catalog-content">
                    <div class="d-flex align-items-center justify-content-between">
                      <div>
                        <p class="mb-1"><strong>Descripción:</strong> ${producto.Descripcion}</p>
                        <p class="mb-1"><strong>Precio:</strong> $${producto.Precio.toFixed(2)}</p>
                      </div>
                      <button class="btn btn-primary btn-sm ms-3" onclick="window.location.href='carritocompras.html?nombre=${encodeURIComponent(producto.Nombre)}'">Comprar</button>

                    </div>
                  </div>
                </div>
              </div>
            `;
            // Insertar la tarjeta en el contenedor general
            catalogContainer.innerHTML += cardHTML;
          });
        });
        
      } catch (error) {
        console.error("Error al cargar el catálogo:", error);
      }
    }
  });


  // función para llamar sp de faq

  document.addEventListener("DOMContentLoaded", async function() {
    // Verifica que estamos en la página FAQ (ajusta el nombre según corresponda)
    if (window.location.pathname.includes("faq.html")) {
      try {
        // Hacer fetch al endpoint de FAQ
        const response = await fetch("http://localhost:3300/api/faq");
        const data = await response.json();
        console.log("FAQs recibidas:", data);
  
        // Seleccionar el contenedor de FAQ
        const faqContainer = document.querySelector(".faq-items");
        if (!faqContainer) {
          console.error("No se encontró el contenedor de FAQ (.faq-items)");
          return;
        }
  
       // resetear contenido
        faqContainer.innerHTML = "";
  
        // Iterar sobre cada objeto FAQ (asumiendo que cada objeto tiene la propiedad "Pregunta")
        data.forEach(item => {
          // Crear un div para cada FAQ
          const faqItem = document.createElement("div");
          faqItem.classList.add("faq-item", "mb-2", "p-2");
          
          faqItem.innerHTML = `
            <h6 class="mb-1">${item.Pregunta}</h6>
    //        <p class="mb-0 text-muted">Respuesta: ...</p>
          `;
          // Insertar el FAQ en el contenedor
          faqContainer.appendChild(faqItem);
        });
      } catch (error) {
        console.error("Error al cargar las FAQs:", error);
      }
    }
  });
  
  
  // historial

  document.addEventListener("DOMContentLoaded", async function() {
    // Verificamos si estamos en la página de historial (ajusta el criterio según el nombre de tu archivo)
    if (window.location.pathname.includes("historial.html")) {
      try {
        // 1. Obtener los datos del historial desde el endpoint
        const response = await fetch("http://localhost:3300/api/historialcomprador");
        const data = await response.json();
        console.log("Historial de compras recibido:", data);
    
        if (!data || data.length === 0) {
          console.error("No se encontraron registros de historial.");
          return;
        }
    
        // 2. Seleccionar el contenedor donde se mostrarán los items
        const historyContainer = document.querySelector(".history-items");
        
        historyContainer.innerHTML = "";
    
        // 3. Iterar sobre cada registro del historial y generar el HTML
        data.forEach(item => {
          
          const idFactura = item["ID Factura"] || item.id_factura || "Sin ID";
          const articulo = item["Articulo"] || "Sin artículo";
          const precio = item["Precio item"] || item.precio_item || 0;
          const fecha = item["Fecha"] || "Sin fecha";
          const detalle = item["Detalle compra"] || item.detalle_compra || "Sin detalle";
          const personalizaciones = item["Personalizaciones"] || "Sin personalizaciones";
    
          // html
          const historyHTML = `
            <div class="history-item d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
              <div>
                <h6 class="mb-0">Factura: ${idFactura}</h6>
                <small class="text-muted">Artículo: ${articulo}</small><br>
                <small class="text-muted">Detalle: ${detalle}</small><br>
                <small class="text-muted">Personalizaciones: ${personalizaciones}</small>
              </div>
              <div class="text-end">
                <p class="mb-0">Fecha: ${fecha}</p>
                <p class="mb-0">Precio: ₡${parseFloat(precio).toFixed(2)}</p>
              </div>
            </div>
          `;
    
          // insertar en el contenedor
          historyContainer.innerHTML += historyHTML;
        });
    
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      }
    }
  });
  
// función para obtener calificaciones

document.addEventListener("DOMContentLoaded", async function() {
  // Verifica si la ruta del archivo coincide (opcional)
  if (window.location.pathname.includes("resenias.html")) {
    try {
      //api
      const response = await fetch("http://localhost:3300/api/calificaciones");
      const data = await response.json();
      console.log("Calificaciones recibidas:", data);

      //reseñas
      const existingReviews = document.querySelector(".existing-reviews");
      
      existingReviews.innerHTML = "";

      // 3) Iterar sobre cada objeto devuelto por la API
      data.forEach(item => {
        const calificacion = parseInt(item.Calificacion) || 0; 
        const comentario = item.Descripción || "Sin comentario";

        // Generar estrellas: si la calificación es 3, habrá 3 "bi-star-fill" y 2 "bi-star"
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          if (i <= calificacion) {
            starsHTML += `<i class="bi bi-star-fill"></i>`;
          } else {
            starsHTML += `<i class="bi bi-star"></i>`;
          }
        }

        const reviewHTML = `
          <div class="review-item d-flex mb-3">
            <div class="user-img me-2">
              <i class="bi bi-person fs-4"></i>
            </div>
            <div class="review-content">
              <div class="stars">
                ${starsHTML}
              </div>
              <p class="m-0">${comentario}</p>
            </div>
          </div>
        `;

        // 5) Insertar el bloque en .existing-reviews
        existingReviews.innerHTML += reviewHTML;
      });
    } catch (error) {
      console.error("Error al cargar las calificaciones:", error);
    }
  }
});
  

// validar tamaño de la contraseña e insert

document.addEventListener('DOMContentLoaded', function() {
  // Elementos
  const crearCuentaForm = document.getElementById('crearCuentaForm');
  const nombreusuarioField = document.getElementById('nombreusuario');
  const correoField = document.getElementById('correo');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const mensajeError = document.getElementById('mensajeError');
  
  // Barra de progreso (opcional para la fuerza de la contraseña)
  const passwordProgress = document.getElementById('passwordProgress');
  
  // Función para chequear fuerza de contraseña (opcional)
  function checkPasswordStrength(password) {
    let score = 0;
    
    // Requisito 1: Longitud >= 14
    if (password.length >= 14) score++;
    // Requisito 2: Al menos una mayúscula
    if (/[A-Z]/.test(password)) score++;
    // Requisito 3: Al menos una minúscula
    if (/[a-z]/.test(password)) score++;
    // Requisito 4: Al menos un dígito
    if (/\d/.test(password)) score++;
    // Requisito 5: Al menos un caracter especial
    if (/[!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/`~]/.test(password)) score++;
    
    return score; // Valor de 0 a 5
  }
  
  // Actualizar barra de progreso a medida que escribe en la contraseña
  passwordField.addEventListener('input', function() {
    const pwdValue = passwordField.value;
    const score = checkPasswordStrength(pwdValue);
    const percentage = (score / 5) * 100; // 0, 20, 40, 60, 80, 100
    
    passwordProgress.style.width = percentage + '%';
    passwordProgress.setAttribute('aria-valuenow', percentage);
    
    passwordProgress.classList.remove('bg-danger', 'bg-warning', 'bg-success');
    if (score <= 2) {
      passwordProgress.classList.add('bg-danger');
    } else if (score === 3) {
      passwordProgress.classList.add('bg-warning');
    } else {
      passwordProgress.classList.add('bg-success');
    }
  });

  // Manejo del Submit
  crearCuentaForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita el envío tradicional
    
    // Ocultar mensaje de error anterior
    mensajeError.style.display = 'none';
    
    // Obtener valores
    const nombreusuario = nombreusuarioField.value.trim();
    const correo = correoField.value.trim();
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    
    // Validar que ambas contraseñas coincidan
    if (password !== confirmPassword) {
      mensajeError.innerText = 'Las contraseñas no coinciden.';
      mensajeError.style.display = 'block';
      return;
    }
    
    // Chequear fuerza mínima (opcional)
    const score = checkPasswordStrength(password);
    if (score < 5) {
      mensajeError.innerText = 'La contraseña no cumple todos los requisitos de seguridad.';
      mensajeError.style.display = 'block';
      return;
    }
    
    try {
      // Llamar al endpoint /api/insertarcomprador
      const response = await axios.post('http://localhost:3300/api/insertarcomprador', {
        nombreusuario,
        correo,
        contrasenia: password
      });
      
      // Si la SP o el endpoint devuelven data con éxito
      // “response.data” contendrá la información devuelta
      console.log('Respuesta del servidor:', response.data);
      
      // Podrías redirigir o mostrar un mensaje de éxito
      alert('Cuenta creada exitosamente');
      //window.location.href = 'inicio.html'; // Ejemplo de redirección
      
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      
      // Manejo de errores
      // Cuando el SP lanza SIGNAL, MySQL manda un error que se convierte en HTTP 500
      // “error.response.data.error” suele contener error.message
      if (error.response && error.response.data && error.response.data.error) {
        mensajeError.innerText = error.response.data.error;
      } else {
        mensajeError.innerText = 'Error al crear la cuenta.';
      }
      mensajeError.style.display = 'block';
    }
  });
});
