const crearMensaje = (nombre, ciudad, mensaje) => {
    return {
        nombre,
        ciudad,
        mensaje,
        fecha: new Date().getTime()
    };
};

const crearMensajeAdmin = (nombre, ciudad, tipo) => {
    return {
        nombre,
        ciudad,
        tipo
    };
};


module.exports = {
    crearMensaje,
    crearMensajeAdmin
};
