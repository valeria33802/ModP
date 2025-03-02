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
