import { DOMElements } from "../base.js";

// Determina el color del input del nombre
const colorInputNombre = mensaje => {
  if (mensaje !== "Valid name") {
    DOMElements.inputName.css("border-bottom", "2px solid orangered");
  } else {
    DOMElements.inputName.css("border-bottom", "2px solid yellowgreen");
  }
};

// Determina el color del input de la ciudad
const colorInputCiudad = mensaje => {
  if (mensaje !== "Valid city") {
    DOMElements.inputCity.css("border-bottom", "2px solid orangered");
  } else {
    DOMElements.inputCity.css("border-bottom", "2px solid yellowgreen");
  }
};

// Muestra el mensaje en el input
const mostrarMensaje = (mensaje, tipo) => {
  if (tipo === "name") {
    $("#mensajeNombre").text(mensaje);
  } else {
    $("#mensajeCiudad").text(mensaje);
  }
};

// Obtiene el valor del input
export const obtieneValorInput = input => input.val();

// Valida el input del nombre
export const validarInputNombre = nombre => {
  let mensaje = "";
  if (nombre.length < 2) {
    mensaje = "Name must have at least 2 characters";
    colorInputNombre(mensaje);
  } else if (nombre.length > 12) {
    mensaje = "Name must have less than 12 characters";
    colorInputNombre(mensaje);
  }
  if (nombre === "") {
    mensaje = "Name must not be empty";
    colorInputNombre(mensaje);
  }
  if (nombre.length >= 2 && nombre.length < 12) {
    mensaje = "Valid name";
    colorInputNombre(mensaje);
  }
  // Muestra el mensaje de validación
  mostrarMensaje(mensaje, "name");
  return mensaje === 'Valid name' ? true : false;
};

// Valida que la ciudad sea valida
export const validaInputCiudad = ciudad => {
  let mensaje = "";
  if (ciudad) {
    mensaje = "Valid city";
  } else {
    mensaje = "Wrong city";
  }
  // Muestra el color del input de la ciudad
  colorInputCiudad(mensaje);
  // Muestra el Mensaje de validación
  mostrarMensaje(mensaje, "city");
  return mensaje === 'Valid city' ? true : false;
};


// Habilita el boton de "enter"
export const habilitarBoton = (val1, val2) => {
  if (val1 === true && val2 === true) {
    DOMElements.btnLogin.attr("disabled", false);
    DOMElements.btnLogin.css("opacity", "1");
  } else {
    DOMElements.btnLogin.attr("disabled", true);
    DOMElements.btnLogin.css("opacity", "0.5");
  }
};
