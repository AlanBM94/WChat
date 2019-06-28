import { DOMElements } from "./base.js";
import Coordenadas from "./models/login.js";
import * as vistaLogin from "./views/loginVista.js";

$(document).ready(function () {
  // estadoLogin de la aplicación
  let estadoLogin = {};

  // ------------------Event listeners-------------------
  // Evento que se dispara cuando se envía el formulario

  DOMElements.formulario.on("submit", () => {
    //   console.log("Hola mundo");
  });

  // Controlador del inputNombre
  const controladorInputNombre = () => {
    const nombre = vistaLogin.obtieneValorInput(DOMElements.inputName);
    // Si el nombre es correcto el estadoLogin.validacion1 es true
    estadoLogin.validacion1 = vistaLogin.validarInputNombre(nombre);
    // Habilita el boton de enter
    // console.log(estadoLogin.validacion1);
    vistaLogin.habilitarBoton(estadoLogin.validacion1, estadoLogin.validacion2);

  };

  // Controlador del inputCiudad
  const controladorInputCiudad = async () => {
    const ciudad = vistaLogin.obtieneValorInput(DOMElements.inputCity);

    estadoLogin.ciudad = new Coordenadas(ciudad);

    // Busca que las coordenadas de la ciudad ingresada existan
    let infoCiudad;
    let validarCiudad;
    // Si la ciudad es diferente a un string vacío busca las coordenadas de la ciudad
    if (ciudad !== '') {
      infoCiudad = await estadoLogin.ciudad.buscaCoordenadas();
      if (infoCiudad) {
        // Valida que la ciudad ingresada solo tenga letras
        validarCiudad = estadoLogin.ciudad.validarCiudad(ciudad);
      }
    }
    // Si la ciudad ingresada es correcta el estadoLogin.validacion2 es true
    estadoLogin.validacion2 = vistaLogin.validaInputCiudad(validarCiudad);
    // console.log(estadoLogin.validacion2);
    // Habilita el boton de enter
    vistaLogin.habilitarBoton(estadoLogin.validacion1, estadoLogin.validacion2);
  };


  // Eventos que se disparan cuando se hace blur en el inpuNombre
  DOMElements.inputName.on("blur", () => {
    controladorInputNombre();
  });

  // Eventos que se disparan cuando se hace blur en el inputCiudad
  DOMElements.inputCity.on("blur", () => {
    controladorInputCiudad();
  });







});

