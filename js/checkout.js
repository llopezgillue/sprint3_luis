
// Exercise 6
function validate(event) {

	event.preventDefault()

	// Guardo expresiones regulares
	const lettersOnly = /^[A-Za-z]+$/;
	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
	const numberFormat = /^\d{9}$/;
	const passwordFormat = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

	// Asigno las ids a la expresion correspondiente
	const fields = [
		{ id: 'fName', regex: lettersOnly },
		{ id: 'fLastN', regex: lettersOnly },
		{ id: 'fEmail', regex: emailFormat },
		{ id: 'fPassword', regex: passwordFormat },
		{ id: 'fAddress', regex: /.+/ },
		{ id: 'fPhone', regex: numberFormat },
	];

	// Comprobacion si los inputs son correctos (+3 letras y si tienen las expresiones regulares correspondientes)

	fields.forEach(field => {
		const inputField = document.getElementById(field.id); // Guardamos el elemento del input en la variable
		const errorElement = document.getElementById('error' + field.id.substring(1)); // Le quitamos la 'f' inicial a la id y le añadimos 'error' delante para construir el id del mensaje de error
		if (inputField.value.length < 3 || !field.regex.test(inputField.value)) {  // Realizamos el test de validacion en la cadena de texto de las expresiones regulares con el input introducido por el usuario
			errorElement.style.display = 'block'; //  mostramos el mensaje de error si es incorrecto
			inputField.classList.add('is-invalid');  //Añadimos la clase is-invalid para indicar de manera visual el error
		} else { 
			errorElement.style.display = 'none'; // Si el formato del campo esta bien, ocultamos el mensaje de error
			inputField.classList.remove('is-invalid'); // y eliminamos la clase is-invalid
			inputField.classList.add('is-valid'); //  tick verde en caso correcto.
		}
	});
	

}
