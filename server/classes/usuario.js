class Usuario {
    constructor() {
        this.personas = [];
    }

    agregarUsuario(id, nombre, ciudad) {
        let persona = { id, nombre, ciudad };
        this.personas.push(persona);
        return this.personas;
    }

    getPersonas() {
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    borrarUsuario(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id !== id);
        return personaBorrada;
    }

}

module.exports = {
    Usuario
};

