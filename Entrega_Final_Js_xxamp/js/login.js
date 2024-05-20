document.addEventListener("DOMContentLoaded", function() {
    let usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (usuarioLogueado) {
        mostrarMensajeBienvenida(usuarioLogueado.usuario);
        document.getElementById('juegos').style.display = "block";
        document.getElementById('boton-mostrar-juegos').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    }

    // Event listener para el formulario de login
    document.querySelector("#login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los valores ingresados por el usuario
        let nombre_usuario = document.querySelector("#usuario").value.trim();
        let contraseña = document.querySelector("#pass").value;

        // Cargar los datos de usuarios desde el archivo datos.json
        fetch('datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('respuesta no correcta en la red' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Verificar si el usuario y contraseña coinciden con alguno de los usuarios del archivo JSON
            let usuarioEncontrado = data.find(usuario => usuario.usuario === nombre_usuario && usuario.contraseña === contraseña);
            
            if (usuarioEncontrado) {
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado)); // guardo el inicio de sesión en storage
                mostrarMensajeBienvenida(nombre_usuario);
                document.getElementById('juegos').style.display = "block"; // Mostrar la sección de juegos
                document.getElementById('boton-mostrar-juegos').style.display = 'block'; // Mostrar el botón para mostrar los juegos
                document.getElementById('login-form').reset(); // Limpiar el formulario después de iniciar sesión
                document.getElementById('login-form').style.display = 'none'; // Ocultar el formulario de login
            } else {
                Swal.fire({
                    title: "Error!!!",
                    text: "Usuario o contraseña incorrecto",
                    imageUrl: "../img/7JJ.gif",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                  });
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos de usuarios:', error);
        });
    });

    // Event listener para el botón para cerrar sesión en caso que no quiera jugar 
    document.getElementById('boton-mostrar-juegos').addEventListener('click', function() {
        localStorage.removeItem('usuarioLogueado');
        document.getElementById('juegos').style.display = "none"; // Ocultar la sección de juegos
        document.getElementById('boton-mostrar-juegos').style.display = 'none'; // Ocultar el botón de cerrar sesión
        document.getElementById('mensaje-bienvenida').style.display = 'none'; // Ocultar el mensaje de bienvenida
        document.getElementById('login-form').style.display = 'block';
    });

    // Función para mostrar un mensaje de bienvenida
    function mostrarMensajeBienvenida(nombreUsuario) {
        let mensajeBienvenida = document.querySelector("#mensaje-bienvenida");
        mensajeBienvenida.textContent = "¡Bienvenido, " + nombreUsuario + ". Haz click en uno de estos 2 juegos y diviértete!";
        mensajeBienvenida.style.display = "block";
    }

    // Event listener para activar la función leer al presionar enter
    document.querySelector("#pass").addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            // Prevenir el envío del formulario al presionar Enter
            e.preventDefault();
            // Simular el clic en el botón de ingreso
            document.querySelector('.ingreso').click();
        }
    });
});
