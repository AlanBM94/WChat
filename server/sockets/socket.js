const { io } = require("../server");
const { Usuario } = require("../classes/usuario.js");
const persona = new Usuario();
const { crearMensaje, crearMensajeAdmin } = require("../utils/utilidades");
io.on("connection", client => {
    // La información del usuario que recibe es data
    // El callback es el que se ejecuta cuando el usuario entra al servidor
    client.on("entrarChat", (data, callback) => {
        if (!data.nombre || !data.ciudad) {
            return callback({
                error: true,
                mensaje: "El nombre/sala es necesario"
            });
        }
        // Cuando una persona se une al chat aparece un mensaje del administrador
        client.broadcast.emit("crearMensajeAdmin", crearMensajeAdmin(data.nombre, data.ciudad, true));
        // Agrega un nuevo usuario al arreglo de usuarios
        let personas = callback(persona.agregarUsuario(client.id, data.nombre, data.ciudad));

        // Cada que una persona entra al chat o sale del chat
        client.broadcast.emit("listaPersonas", persona.getPersonas());
        callback(personas);
    });

    // Crea el evento crearMensaje
    client.on("crearMensaje", (data, callback) => {
        let usuarioChat = persona.getPersona(client.id);
        let mensaje = crearMensaje(usuarioChat.nombre, data.ciudad, data.mensaje);
        client.broadcast.emit("crearMensaje", mensaje);
        callback(mensaje);
    });

    // Cuando una persona se desconecta
    client.on("disconnect", () => {
        // Cuando una persona se desconecta la elimina del arreglo de los usuarios
        let personaBorrada = persona.borrarUsuario(client.id);
        client.broadcast.emit("crearMensajeAdmin", crearMensajeAdmin(personaBorrada.nombre, personaBorrada.ciudad, false));
        // Crea un mensaje del administrador con la persona que ha sido eliminada del arreglo
        client.broadcast.emit("listaPersonas", persona.getPersonas());
    });
});
