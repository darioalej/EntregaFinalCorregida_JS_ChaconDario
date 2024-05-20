const NAVE = document.getElementById("nave");
const TEMPORIZADOR = document.getElementById("temporizador");
const CONTADOR = document.getElementById("contador");
const MENSAJE_FINAL = document.getElementById("mensaje-final");

let y = 0; // posición vertical de la nave
let x = 0; // posición horizontal de la nave
let tiempoRestante = 120; // tiempo inicial en segundos
let contador = 0; // contador de objetos recogidos
let enPausa = true; // el juego empieza en pausa
let intervaloTemporizador;
let intervaloObstaculos;
let intervaloObjeto1;
let intervaloObjeto2;
let objeto2Visible = false;

function teclado(evt) {
    const TECLA = evt.key;

    if (TECLA === " ") {
        // Espaciadora: alternar pausa/reanudar
        if (enPausa) {
            iniciarJuego();
        } else {
            pausarJuego();
        }
    } else {
        NAVE.src = "../img/nave1.png";
    }

    if (!enPausa) {
        const maxHeight = window.innerHeight - NAVE.offsetHeight; // altura máxima que la nave puede alcanzar
        const maxWidth = window.innerWidth - NAVE.offsetWidth; // ancho máximo que la nave puede alcanzar

        if (TECLA === "ArrowUp" && y < maxHeight) {
            y += 10;
            NAVE.style.bottom = `${y}px`;
            evt.preventDefault();
        }
        if (TECLA === "ArrowDown" && y > 0) {
            y -= 10;
            NAVE.style.bottom = `${y}px`;
            evt.preventDefault();
        }
        if (TECLA === "ArrowLeft" && x > 0) {
            x -= 10;
            NAVE.style.left = `${x}px`;
            evt.preventDefault();
        }
        if (TECLA === "ArrowRight" && x < maxWidth) {
            x += 10;
            NAVE.style.left = `${x}px`;
            evt.preventDefault();
        }
    }
}

// Función para mover los obstáculos y detectar colisiones
function moverObstaculos() {
    const obstaculos = [
        document.getElementById('obstaculo1'),
        document.getElementById('obstaculo2'),
        document.getElementById('obstaculo3'),
        document.getElementById('obstaculo4')
    ];
    
    // Inicialización de los obstáculos
    obstaculos[0].style.top = '20%';
    obstaculos[0].style.left = '0%';
    
    obstaculos[1].style.top = '50%';
    obstaculos[1].style.left = '0%';
    
    obstaculos[2].style.top = '0%';
    obstaculos[2].style.left = '10%';
    
    obstaculos[3].style.top = '80%';
    obstaculos[3].style.left = '80%';
    
    let directionH1 = 10;
    let directionH2 = 10;
    let directionV1 = 10;
    let directionV2 = -10;

    intervaloObstaculos = setInterval(() => {
        if (!enPausa) {
            // Mover obstáculo 1 horizontalmente
            let left1 = parseInt(obstaculos[0].style.left || '0', 10) + directionH1;
            if (left1 >= window.innerWidth - obstaculos[0].offsetWidth || left1 <= 0) {
                directionH1 *= -1;
            }
            obstaculos[0].style.left = `${left1}px`;

            // Mover obstáculo 2 horizontalmente
            let left2 = parseInt(obstaculos[1].style.left || '0', 10) + directionH2;
            if (left2 >= window.innerWidth - obstaculos[1].offsetWidth || left2 <= 0) {
                directionH2 *= -1;
            }
            obstaculos[1].style.left = `${left2}px`;

            // Mover obstáculo 3 verticalmente
            let top1 = parseInt(obstaculos[2].style.top || '0', 10) + directionV1;
            if (top1 >= window.innerHeight - obstaculos[2].offsetHeight || top1 <= 0) {
                directionV1 *= -1;
            }
            obstaculos[2].style.top = `${top1}px`;

            // Mover obstáculo 4 verticalmente
            let top2 = parseInt(obstaculos[3].style.top || '0', 10) + directionV2;
            if (top2 >= window.innerHeight - obstaculos[3].offsetHeight || top2 <= 0) {
                directionV2 *= -1;
            }
            obstaculos[3].style.top = `${top2}px`;

            // Detectar colisiones
            obstaculos.forEach(obstaculo => detectarColision(obstaculo));
        }
    }, 50); // Aumenta la velocidad reduciendo el intervalo
}

function detectarColision(obstaculo) {
    const obstaculoRect = obstaculo.getBoundingClientRect();
    const naveRect = NAVE.getBoundingClientRect();

    if (
        naveRect.top < obstaculoRect.bottom &&
        naveRect.bottom > obstaculoRect.top &&
        naveRect.left < obstaculoRect.right &&
        naveRect.right > obstaculoRect.left
    ) {
        // Detener intervalos
        clearInterval(intervaloTemporizador);
        clearInterval(intervaloObstaculos);
        clearInterval(intervaloObjeto1);
        clearInterval(intervaloObjeto2);

        // Ocultar todos los objetos
        const objetos = document.querySelectorAll('.objeto');
        objetos.forEach(objeto => {
            objeto.style.display = 'none';
        });

        // Mostrar alerta solo una vez
        if (!enPausa) {
            enPausa = true; // Pausar el juego
            Swal.fire({
                title: '¡Colisión! Perdiiiiiiissssteeeee!!!',
                text: 'Juego terminado.',
                imageUrl: src="../img/homero3.jpg",
                imageWidth: 400,
                imageHeight: 200,
                confirmButtonText: 'OK'
            }).then(() => {
                resetJuego(); // Reiniciar el juego
            });
        }
    }
}

function resetJuego() {
    y = 0;
    x = 0;
    NAVE.style.bottom = '0';
    NAVE.style.left = '0';
    NAVE.src = '../img/nave1.png';
    tiempoRestante = 120;
    contador = 0;
    TEMPORIZADOR.innerText = `Tiempo: ${tiempoRestante}`;
    CONTADOR.innerText = `Objetos recogidos: ${contador}`;
    enPausa = true;
    clearInterval(intervaloTemporizador);
    clearInterval(intervaloObstaculos);
    clearInterval(intervaloObjeto1);
    clearInterval(intervaloObjeto2);
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    intervaloTemporizador = setInterval(() => {
        if (!enPausa && tiempoRestante > 0) {
            tiempoRestante--;
            TEMPORIZADOR.innerText = `Tiempo: ${tiempoRestante}`; // Actualiza el texto del temporizador
            if (tiempoRestante <= 0) {
                MENSAJE_FINAL.innerText = "Juego finalizado";
                pausarJuego(); // Pausar el juego cuando el tiempo se acabe
            }
        }
    }, 1000); 
}

const OBJETO1 = document.getElementById('objeto1');
const OBJETO2 = document.getElementById('objeto2');

let objeto1Movimiento;

// Inicializa el movimiento del objeto coleccionable
function moverObjeto1() {
    OBJETO1.style.top = '0px'; // Posición inicial
    OBJETO1.style.left = '50%'; // Posición inicial
    objeto1Movimiento = setInterval(() => {
        if (!enPausa) {
            let top = parseInt(OBJETO1.style.top || '0', 10);
            top += 5;
            if (top >= window.innerHeight) {
                top = -OBJETO1.offsetHeight; // reiniciar al llegar al final
            }
            OBJETO1.style.top = `${top}px`;
            detectarColisionObjeto(OBJETO1);
        }
    }, 50);
}

function moverObjeto2() {
    intervaloObjeto2 = setInterval(() => {
        if (!enPausa) {
            objeto2Visible = !objeto2Visible;
            if (objeto2Visible) {
                OBJETO2.style.top = `${Math.random() * (window.innerHeight - OBJETO2.offsetHeight)}px`;
                OBJETO2.style.left = `${Math.random() * (window.innerWidth - OBJETO2.offsetWidth)}px`;
                OBJETO2.style.display = 'block';
            } else {
                OBJETO2.style.display = 'none';
            }
        }
    }, 4000); // Aparece y desaparece cada 4 segundos
}

function detectarColisionObjeto(objeto) {
    const objetoRect = objeto.getBoundingClientRect();
    const naveRect = NAVE.getBoundingClientRect();

    if (
        naveRect.top < objetoRect.bottom &&
        naveRect.bottom > objetoRect.top &&
        naveRect.left < objetoRect.right &&
        naveRect.right > objetoRect.left
    ) {
        contador++;
        CONTADOR.innerText = `Objetos recogidos: ${contador}`;
        objeto.style.top = '-50px'; // reiniciar posición del objeto
        objeto.style.left = `${Math.random() * (window.innerWidth - objeto.offsetWidth)}px`;
    }
}

function iniciarJuego() {
    enPausa = false;
    iniciarTemporizador();
    moverObstaculos();
    moverObjeto1();
    moverObjeto2();
}

function pausarJuego() {
    enPausa = true;
}

// Escucha de eventos del teclado
window.addEventListener("keydown", teclado);
