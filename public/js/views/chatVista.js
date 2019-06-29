import { DOMElements } from '../base.js';


// Valida que los datos del usuario hayan sido ingresados
export const validaUsuario = () => {
    let params = new URLSearchParams(window.location.search);
    if (!params.has('name') && !params.has('city')) {
        alert("Name and city are required");
        window.location = "index.html";
    } else {
        // Retorna el usuario
        let usuario = {
            nombre: params.get("name"),
            ciudad: params.get("city")
        };
        return usuario;
    }
};
// Muestra el usuario en el DOM
export const muestraUsuario = (usuario) => {
    DOMElements.nombreCiudadContenedor.text(usuario.ciudad);
    DOMElements.nombreUsuarioContenedor.text(usuario.nombre);
};


// Muestra los usuarios en el DOM
export const renderizarUsuarios = (personas) => {
    // elegirCiudad(ciudades);
    let usuario = validaUsuario();
    let markup = "";
    for (let i = 0; i < personas.length; i++) {
        // Solo se renderizan los usuarios que son diferentes al usuario actual
        if (personas[i].nombre !== usuario.nombre && personas[i].ciudad !== usuario.ciudad) {
            markup += `
        <li class="conectados__persona">
            <h3 class="nombreUsuario nombreUsuario--2">${personas[i].nombre}<span
                class="ciudadUsuario ciudadUsuario--2">${personas[i].ciudad}</span></h3>
            <button class="botonClima botonClima--tu">weather</button>
        </li>
        `;
        }
    }
    DOMElements.conectados.html(markup);
};

const formatoHoraMensaje = fecha => `${new Date(fecha).getHours()}:${new Date(fecha).getMinutes()}`;

// Muestra el mensaje del chat
export const mostrarMensaje = (mensaje, yo) => {
    let markup = "";
    if (yo) {
        markup = `
        <div class=" chat__contenido__mensaje chat__contenido__mensajeYo">
            <h3 class="nombreUsuario nombreUsuario--4">${mensaje.nombre}<span class="ciudadUsuario ciudadUsuario--4">${mensaje.ciudad}</span></h3>
            <p class="mensaje mensaje--yo">${mensaje.mensaje}</p>
            <span class="horaMensaje horaMensaje--yo">${formatoHoraMensaje(mensaje.fecha)}</span>
        </div>
        `
    } else {
        markup = `
        <div class=" chat__contenido__mensaje chat__contenido__mensajeTu">
        <h3 class="nombreUsuario nombreUsuario--3">${mensaje.nombre} <span
            class="ciudadUsuario ciudadUsuario--3">${mensaje.ciudad}</span></h3>
        <p class="mensaje mensaje--tu">${mensaje.mensaje}</p>
        <span class="horaMensaje">${formatoHoraMensaje(mensaje.fecha)}</span>
        </div>
    `;
    }
    DOMElements.contenedorMensaje.append(markup);
};

// Muestra el mensaje del administrador
export const mostrarMensajeAdmin = usuario => {
    let markup = "";
    if (usuario.tipo) {
        markup = `
            <p class="mensajeAdmin mensajeAdmin">${usuario.nombre} from ${usuario.ciudad} joined the chat</p>
        `;
    } else {
        markup = `
            <p class="mensajeAdmin mensajeAdmin--rojo">${usuario.nombre} from ${usuario.ciudad} left the chat</p>
        `;
    }
    // Desaparece con la animación
    DOMElements.contenedorMensaje.append(markup);
    setTimeout(() => {
        $(".mensajeAdmin").addClass("fadeOut");
    }, 3000);
    // Lo elimina del DOM
    setTimeout(() => {
        $(".mensajeAdmin").remove();
    }, 3500);
};

// Cuando se envía un mensaje el scrollbar baja automaticamente
export const scrollBar = function newMsg() {
    // shouldScroll will be true if we're at the bottom of the
    // scrollable container before the new message appears
    var $panel = $('.chat__contenido');

    let persona = $('.chat__contenido__mensaje');

    var shouldScroll = $panel[0].scrollHeight - $panel.height() <= $panel.scrollTop();

    // this is where you append a new message to the container
    $panel.append(persona);


    // if we were at the bottom before the new message,
    // then scroll to the new bottom of the container
    if (!shouldScroll) {
        $panel.scrollTop($panel[0].scrollHeight);
    }
}

const decidirIcono = (tipo, tamaño) => {
    let markup = '';
    if (tamaño === "pequeño") {
        if (tipo === "Thunderstorm") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                    <use xlink:href="img/symbol-defs.svg#icon-lightning"></use>
                   </svg>
           `;
        }
        if (tipo === "Drizzle") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-rainy"></use>
                   </svg>
           `;
        }
        if (tipo === "Rain") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-rainy"></use>
                   </svg>
           `;
        }
        if (tipo === "Snow") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-snowy"></use>
                   </svg>
           `;
        }
        if (tipo === "Mist" || tipo === "Smoke" || tipo === "Haze" || tipo === "Dust" || tipo === "Fog" || tipo === "Sand" || tipo === "Ash" || tipo === "Squall") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-weather"></use>
                   </svg>
           `;
        }
        if (tipo === "Tornado") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-wind"></use>
                   </svg>
           `;
        }
        if (tipo === "Clear") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-sun"></use>
                   </svg>
           `;
        }
        if (tipo === "Clouds") {
            markup = `
                   <svg class="iconoClima iconoClima--yo">
                   <use xlink:href="img/symbol-defs.svg#icon-cloud"></use>
                   </svg>
           `;
        }

    } else {
        if (tipo === "Thunderstorm") {
            markup = `
                   <svg class="iconoGrande">
                    <use xlink:href="img/symbol-defs.svg#icon-lightning"></use>
                   </svg>
           `;
        }
        if (tipo === "Drizzle") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-rainy"></use>
                   </svg>
           `;
        }
        if (tipo === "Rain") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-rainy"></use>
                   </svg>
           `;
        }
        if (tipo === "Snow") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-snowy"></use>
                   </svg>
           `;
        }
        if (tipo === "Mist" || tipo === "Smoke" || tipo === "Haze" || tipo === "Dust" || tipo === "Fog" || tipo === "Sand" || tipo === "Ash" || tipo === "Squall") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-weather"></use>
                   </svg>
           `;
        }
        if (tipo === "Tornado") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-wind"></use>
                   </svg>
           `;
        }
        if (tipo === "Clear") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-sun"></use>
                   </svg>
           `;
        }
        if (tipo === "Clouds") {
            markup = `
                   <svg class="iconoGrande">
                   <use xlink:href="img/symbol-defs.svg#icon-cloud"></use>
                   </svg>
           `;
        }
    }
    return markup;

};

const formatoHora = hora => hora.split('').slice(0, 5).join('');


export const muestraMiBotonClima = () => {
    // Decide el icono que se mostrara
    const markup = `
        <button class="botonClima botonClima--yo">weather</button>
    `;
    DOMElements.contenedorInfoPersonal.append(markup);
};


// Muestra el clima
export const muestraMiClima = (clima, pronosticosHoy, pronosticosDias) => {
    const markup = `
        <div class="clima">
            <div class="clima__principal">
                <div class="clima__principal__diaSeleccionado">
                    <h4 class="climaCiudadTitulo">${clima.coordenadas.usuarioCiudad}</h4>
                    <div class="contenedorBotonesTemperatura">
                    <span class="temperatura">${clima.clima.temperatura}</span>
                    <button class="btnTemperatura btnTemperatura--activo" disabled="true">
                        C
                    </button>
                    <button class="btnTemperatura btnTemperatura--inactivo">
                        F
                    </button>
                    </div>
                    ${decidirIcono(clima.clima.icono, "grande")}
                </div>
                <div class="clima__principal__info">
                    <ul class="listaInfoClima">
                    <li class="listaInfoClima__item">Humidity: <span>${clima.clima.principal.humidity}%</span></li>
                    <li class="listaInfoClima__item">Pressure: <span>${clima.clima.principal.pressure}</span></li>
                    <li class="listaInfoClima__item">Temp-max: <span class="tempMaxHoy">${clima.clima.temperaturaMax}</</span></li>
                    <li class="listaInfoClima__item">Temp-min: <span class="tempMinHoy">${clima.clima.temperaturaMin}</</span></li>
                    <li class="listaInfoClima__item">${clima.clima.icono}</li>
                    </ul>
                </div>
                <div class="clima__principal__pronosticoHoras">
                    <ul class="pronosticoHorasLista">
                    ${pronosticosHoy.map(pronostico => {
        let markup = '';
        markup = `<li class="pronosticoHorasLista__item">
                    <p>${formatoHora(pronostico.dt_txt.split(" ")[1])}</p>
                    ${decidirIcono(pronostico.weather[0].main, "pequeño")}
                </li>`;
        return markup;
    }).join('')}
                    </ul>
                </div>
                </div>
                <div class="clima__pronostico">
                    <ul class="pronosticoClima">
                        ${pronosticosDias.map(pronosticoDia => {
        let markup = '';
        markup = `<li class="pronosticoClima__item">
                    <p class="pronosticoOtroDia">${pronosticoDia.dt_txt.split(" ")[0]} 12:00</p>
                    ${decidirIcono(pronosticoDia.weather[0].main, "pequeño")}
                    <div class="pronosticoClima__item__temperaturas">
                        <span class="temperaturaOtroDia temperaturaOtroDiaMax">${Math.round(pronosticoDia.main.temp_max)}</span>
                    </div>
                </li>`;
        return markup;
    }).join('')};
                    </ul>
                    <a href="#" class="cerrarClima">X</a>
                </div>
        </div>
    `;
    $("body").append(markup);
};

// Muestra tu clima
export const muestraTuClima = (clima, pronosticosHoy, pronosticosDias) => {
    const markup = `
        <div class="clima">
            <div class="clima__principal">
                <div class="clima__principal__diaSeleccionado">
                    <h4 class="climaCiudadTitulo">${clima.tusCoordenadas.usuarioCiudad}</h4>
                    <div class="contenedorBotonesTemperatura">
                    <span class="temperatura">${clima.tuClima.temperatura}</span>
                    <button class="btnTemperatura btnTemperatura--activo" disabled="true">
                        C
                    </button>
                    <button class="btnTemperatura btnTemperatura--inactivo">
                        F
                    </button>
                    </div>
                    ${decidirIcono(clima.tuClima.icono, "grande")}
                </div>
                <div class="clima__principal__info">
                    <ul class="listaInfoClima">
                    <li class="listaInfoClima__item">Humidity: <span>${clima.tuClima.principal.humidity}%</span></li>
                    <li class="listaInfoClima__item">Pressure: <span>${clima.tuClima.principal.pressure}</span></li>
                    <li class="listaInfoClima__item">Temp-max: <span class="tempMaxHoy">${clima.tuClima.temperaturaMax}</</span></li>
                    <li class="listaInfoClima__item">Temp-min: <span class="tempMinHoy">${clima.tuClima.temperaturaMin}</</span></li>
                    <li class="listaInfoClima__item">${clima.tuClima.icono}</li>
                    </ul>
                </div>
                <div class="clima__principal__pronosticoHoras">
                    <ul class="pronosticoHorasLista">
                    ${pronosticosHoy.map(pronostico => {
        let markup = '';
        markup += `<li class="pronosticoHorasLista__item">
                        <p>${formatoHora(pronostico.dt_txt.split(" ")[1])}</p>
                        ${decidirIcono(pronostico.weather[0].main, "pequeño")}
                    </li>`;
        return markup;
    }).join('')}
                    </ul>
                </div>
                </div>
                <div class="clima__pronostico">
                    <ul class="pronosticoClima">
                        ${pronosticosDias.map(pronosticoDia => {
        let markup = '';
        markup += `<li class="pronosticoClima__item">
                        <p class="pronosticoOtroDia">${pronosticoDia.dt_txt.split(" ")[0]} 12:00</p>
                        ${decidirIcono(pronosticoDia.weather[0].main, "pequeño")}
                        <div class="pronosticoClima__item__temperaturas">
                            <span class="temperaturaOtroDia temperaturaOtroDiaMax">${Math.round(pronosticoDia.main.temp_max)}</span>
                        </div>
                    </li>`;
        return markup;
    }).join('')}
                    </ul>
                    <a href="#" class="cerrarClima">X</a>
                </div>
        </div>
    `;
    $("body").append(markup);
};


// Convierte los grados Celcius a Fahrenheit
const gradosCelciusAFahrenheit = gradosCelcius => {
    return Math.round((9 / 5) * gradosCelcius + 32);
};

// Convierte los grados Fahrenheit a Celcius
const gradosFahrenheitACelcius = gradosFahrenheit => {
    return Math.round((gradosFahrenheit - 32) / 1.8);
};


// Retorna todos los elementos del DOM que van a cambiar en un objeto
const objetoTemperatura = () => {

    return {
        temperatura: $(".temperatura"),
        temperaturaMaximaHoy: $(".tempMaxHoy"),
        temperaturaMinimaHoy: $(".tempMinHoy"),
        temperaturaMaximaOtroDia: $(".temperaturaOtroDiaMax"),
        temperaturaMinimaOtroDia: $(".temperaturaOtroDiaMin"),
        botonActivo: $(".btnTemperatura--activo"),
        botonInactivo: $(".btnTemperatura--inactivo")
    };

};


// Cambia las letras de los botones
const switchBotones = (contador, objetoTemp) => {
    if (contador % 2 !== 0) {
        objetoTemp.botonActivo.text("F");
        objetoTemp.botonInactivo.text("C");
    } else {
        objetoTemp.botonActivo.text("C");
        objetoTemp.botonInactivo.text("F");
    }
};

// Cambia las temperaturas del día de hoy 
const cambiaTemperaturasHoy = (contador, objetoTemp) => {
    if (contador % 2 !== 0) {
        objetoTemp.temperatura.text(gradosCelciusAFahrenheit(parseInt(objetoTemp.temperatura[0].innerText)));
        objetoTemp.temperaturaMaximaHoy.text(gradosCelciusAFahrenheit(parseInt(objetoTemp.temperaturaMaximaHoy[0].innerText)));
        objetoTemp.temperaturaMinimaHoy.text(gradosCelciusAFahrenheit(parseInt(objetoTemp.temperaturaMinimaHoy[0].innerText)));
    } else {
        objetoTemp.temperatura.text(gradosFahrenheitACelcius(parseInt(objetoTemp.temperatura[0].innerText)));
        objetoTemp.temperaturaMaximaHoy.text(gradosFahrenheitACelcius(parseInt(objetoTemp.temperaturaMaximaHoy[0].innerText)));
        objetoTemp.temperaturaMinimaHoy.text(gradosFahrenheitACelcius(parseInt(objetoTemp.temperaturaMinimaHoy[0].innerText)));
    }
};

// Cambia las temperaturas de los otros días
const cambiaTemperaturasOtrosDias = (contador, objetoTemp) => {
    if (contador % 2 !== 0) {
        $.map(objetoTemp.temperaturaMaximaOtroDia, dia => dia.innerText = gradosCelciusAFahrenheit(parseInt(dia.innerText)));
        $.map(objetoTemp.temperaturaMinimaOtroDia, dia => dia.innerText = gradosCelciusAFahrenheit(parseInt(dia.innerText)));
    } else {
        $.map(objetoTemp.temperaturaMaximaOtroDia, dia => dia.innerText = gradosFahrenheitACelcius(parseInt(dia.innerText)));
        $.map(objetoTemp.temperaturaMinimaOtroDia, dia => dia.innerText = gradosFahrenheitACelcius(parseInt(dia.innerText)));
    }
};

// Cambia los grados de Celcius a Fahrenheit y viceversa
export const cambiarGrados = contador => {
    let objetoTemp = objetoTemperatura();
    if (contador % 2 !== 0) {
        switchBotones(contador, objetoTemp);
        cambiaTemperaturasHoy(contador, objetoTemp);
        cambiaTemperaturasOtrosDias(contador, objetoTemp);
    } else {
        switchBotones(contador, objetoTemp);
        cambiaTemperaturasHoy(contador, objetoTemp);
        cambiaTemperaturasOtrosDias(contador, objetoTemp);
    }
};
