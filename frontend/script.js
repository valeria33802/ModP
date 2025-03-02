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

document.addEventListener("DOMContentLoaded", async function () {
    // Verifica que estamos en la página del catálogo
    if (window.location.pathname.includes("catalogovistausuario.html")) {
        try {
            // Llamar a la API
            const response = await fetch("http://localhost:3300/api/perifericos");
            const perifericos = await response.json();

            if (!perifericos || perifericos.length === 0) {
                console.error("No se encontraron productos.");
                return;
            }

            // Agrupar los productos por categoría
            const categorias = {};
            perifericos.forEach((item) => {
                if (!categorias[item.categoria]) {
                    categorias[item.categoria] = [];
                }
                categorias[item.categoria].push(item);
            });

            // Llenar las secciones de catálogo con los productos obtenidos
            Object.keys(categorias).forEach((categoria) => {
                let categoriaID = categoria.toLowerCase() + "Content"; // ID del div collapsible
                let categoriaDiv = document.getElementById(categoriaID);

                if (categoriaDiv) {
                    let html = "";
                    categorias[categoria].forEach((producto) => {
                        html += `
                        <div class="catalog-content">
                            <div class="d-flex align-items-center justify-content-between">
                                <img src="${producto.imagen || 'https://via.placeholder.com/512'}" alt="${producto.nombre}" class="placeholder-image"/>
                                <div>
                                    <p><strong>${producto.nombre}</strong></p>
                                    <p>${producto.descripcion}</p>
                                    <button class="btn btn-primary btn-sm comprar-btn" data-id="${producto.id}">Comprar</button>
                                </div>
                            </div>
                        </div>`;
                    });
                    categoriaDiv.innerHTML = html;
                }
            });

            // Agregaevento a los botones de comprar
            document.querySelectorAll(".comprar-btn").forEach((boton) => {
                boton.addEventListener("click", function () {
                    const productoID = this.getAttribute("data-id");
                    alert(`Producto ${productoID} agregado al carrito.`);
                    
                });
            });

        } catch (error) {
            console.error("Error al obtener los periféricos:", error);
        }
    }
});
