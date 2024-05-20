
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//genero los números aleatorios para el juego
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});

function contarTiempo(){
	tiempoRegresivoId = setInterval( ()=>{
		timer--;
			mostrarTiempo.innerHTML = `tiempo: ${timer} segundos`;
			if(timer==0){
				clearInterval(tiempoRegresivoId);
				bloquearTarjetas()
			}
		},1000);
	}

function bloquearTarjetas(){
	for(let i=0; i<=15; i++){
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.innerHTML = numeros[i];
		tarjetaBloqueada.disabled = true;
	}
}

function destapar(id){

	if(temporizador == false){
		contarTiempo()
		temporizador = true;
	}

	tarjetasDestapadas++;
	console.log(tarjetasDestapadas);

	if (tarjetasDestapadas == 1){
		tarjeta1 = document.getElementById(id)      //mostrar primer numero que se destapa
		primerResultado = numeros[id];
		tarjeta1.innerHTML = primerResultado;

		//deshabilito primer botón para que el contador no siga sumando 
		tarjeta1.disabled = true;
	}else if (tarjetasDestapadas == 2){
		tarjeta2 = document.getElementById(id);                //mostrar segundo numero que se destapa
		segundoResultado = numeros[id];
		tarjeta2.innerHTML = segundoResultado;

		// deshabilito segundo boton idem al primero
		tarjeta2.disabled = true;

		movimientos++;     // incremento elcontador movimientos en uno en la segunda tarjeta destapada recordando que el juego funciona de a 2 vueltas de tarjetas
		mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

		if (primerResultado == segundoResultado){

			tarjetasDestapadas=0;
								//Aumento contador aciertos y lo muestro en el HTML
			aciertos++;
			mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

			if (aciertos ==8){
				clearInterval(tiempoRegresivoId);
				mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
				mostrarTiempo.innerHTML = `Genial ganaste!!!, tardaste ${timerInicial - timer} segundos`;
				mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
			}
		}else{
		//En caso que erremos el par de tarjetas, que muestre momentaneamente los numeros en las casillas y se de vuelta las tarjetas
		// con setTimeout hacemos esto 
		setTimeout( ()=>{
			tarjeta1.innerHTML =' ';
			tarjeta2.innerHTML =' ';
			tarjeta1.disabled = false;
			tarjeta2.disabled = false;
			tarjetasDestapadas = 0;
		},1000);
	}

	}
}


