import Chat from "./models/chat.js";
import * as chatVista from "./views/chatVista.js";
import { DOMElements } from "./base.js";
// ---------------------Cuando la página del chat es cargada-------------------
$(document).ready(function () {
    let socket = io();
    let usuario = chatVista.validaUsuario();
    let estadoChat = {
        switchGrados: 0
    };
    if (usuario) {
        // Muestra al usuario en la pantalla
        chatVista.muestraUsuario(usuario);
        // Establece la conexión de los sockets
        socket.on("connect", () => {
            // Cuando el usuario se conecta al servidor tiene que ejecutar un callback
            socket.emit("entrarChat", usuario, (respuesta) => {
                chatVista.renderizarUsuarios(respuesta);
            });
        });

        // Escucha cuando el usuario abandona el chat
        socket.on("disconnect", function () {
            console.log("Perdimos conexión con el servidor");
        });

        // Recibe el mensaje del servidor
        socket.on("crearMensaje", function (mensaje) {
            chatVista.mostrarMensaje(mensaje, false);
            chatVista.scrollBar();
        });

        // Muestra las personas que se han unico al chat
        socket.on("listaPersonas", (personas) => {
            chatVista.renderizarUsuarios(personas);
        });
    }

    // Crea el mensaje del administrador si alguien entra o sale del chat
    socket.on("crearMensajeAdmin", (data) => {
        chatVista.mostrarMensajeAdmin(data);
    });



    // --------------------------------Controladores------------------------------------------
    // Controlador de mi clima
    const controladorMiClima = async () => {
        const usuario = chatVista.validaUsuario();
        estadoChat.coordenadas = new Chat(usuario.ciudad);
        const coordenadas = await estadoChat.coordenadas.buscaCoordenadas();
        // Muestra el icono del usuario principal
        estadoChat.idCiudad = await estadoChat.coordenadas.getID(coordenadas);
        estadoChat.clima = await estadoChat.coordenadas.getClima(estadoChat.idCiudad);
        // Muestra mi boton del clima
        chatVista.muestraMiBotonClima();
        // Obtiene el pronostico de los días siguientes
        estadoChat.pronostico = await estadoChat.coordenadas.getPronostico(coordenadas);
        estadoChat.pronosticosDias = estadoChat.coordenadas.pronosticosUnicos(estadoChat.pronostico.pronosticos);
    };

    // Controlador del clima de otros usuarios que no soy yo
    const controladorTuClima = async (target) => {
        const ciudad = target.parentElement.children[0].children[0].innerText
        estadoChat.tusCoordenadas = new Chat(ciudad);
        const coordenadas = await estadoChat.tusCoordenadas.buscaCoordenadas();
        // Muestra el icono del usuario principal
        estadoChat.tuIdCiudad = await estadoChat.tusCoordenadas.getID(coordenadas);
        estadoChat.tuClima = await estadoChat.tusCoordenadas.getClima(estadoChat.tuIdCiudad);
        // Obtiene el pronostico de los días siguientes
        estadoChat.tuPronostico = await estadoChat.tusCoordenadas.getPronostico(coordenadas);
        estadoChat.tusPronosticosDias = estadoChat.tusCoordenadas.pronosticosUnicos(estadoChat.tuPronostico.pronosticos);
        // chatVista.muestraMiClima(estadoChat)
        chatVista.muestraTuClima(estadoChat, estadoChat.tuPronostico.pronosticosHoy, estadoChat.tusPronosticosDias);

    };

    // Cuando la página se carga se ejecuta el controladorMiClima
    controladorMiClima();

    const controladorMiInfoClima = () => {
        chatVista.muestraMiClima(estadoChat, estadoChat.pronostico.pronosticosHoy, estadoChat.pronosticosDias);
    };

    // Cuando el formulario del mensaje del chat se envía
    DOMElements.formEnviar.on("submit", e => {
        e.preventDefault();
        // Si el mensaje está vacío no hace nada
        if (DOMElements.formMensaje.val().trim().length === 0) {
            return;
        }
        // Se envía al servidor el mensaje
        socket.emit("crearMensaje", {
            nombre: usuario.nombre,
            ciudad: usuario.ciudad,
            mensaje: DOMElements.formMensaje.val()
        }, mensaje => {
            DOMElements.formMensaje.val("");
            chatVista.mostrarMensaje(mensaje, true);
            chatVista.scrollBar();
        });
    });

    // Evento que se dispara cuando el boton de ver el clima ha sido presionado
    DOMElements.contenedorInfoPersonal.on('click', e => {
        if (e.target.matches('.botonClima--yo')) {
            controladorMiInfoClima();
        }
    });
    // Evento que se dispara cuando se hace click en algún boton del clima de los otros usuarios que no soy yo
    $("body").on("click", e => {
        if (e.target.matches(".botonClima--tu")) {
            controladorTuClima(e.target);
        }
    });


    // Cuando Se quieren cambiar los grados Celcius a Fahrenheit y viceversa
    $("body").on("click", e => {
        if (e.target.matches(".btnTemperatura--inactivo")) {
            estadoChat.switchGrados++;
            chatVista.cambiarGrados(estadoChat.switchGrados);
        }
    });

    // Cuando se cierra el clima
    $("body").on("click", e => {
        if (e.target.matches(".cerrarClima")) {

            $(".clima").css({ "animation-name": "fadeOut", "animation-time": "0.5s" });

            // Lo elimina del DOM
            setTimeout(() => {
                $(".clima").remove();
            }, 400);
            estadoChat.switchGrados = 0;
        }
    });
});