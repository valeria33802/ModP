// manejo del form LOGIN

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Evita el envío del formulario tradicional

            const correo = document.getElementById('correo').value;
            const contrasenia = document.getElementById('password').value;
            const mensajeError = document.getElementById('mensajeError');

            try {
                const response = await axios.post('http://localhost:3300/api/login', {
                    correo,
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
  
        // 3. Seleccionar el contenedor general
        const catalogContainer = document.getElementById("catalogContainer");
  
        // 4. Iterar por cada categoría y sus artículos
        Object.keys(articulosPorCategoria).forEach((categoria) => {
          const productos = articulosPorCategoria[categoria];
          
          // Para cada producto, creamos una tarjeta colapsable
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
  
  