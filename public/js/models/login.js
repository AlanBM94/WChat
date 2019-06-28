export default class Coordenadas {
    constructor(ciudad) {
        this.ciudad = ciudad;
    }


    async buscaCoordenadas() {
        let info;
        await $.ajax({
            method: "GET",
            url: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${this.ciudad}`,
            dataType: 'json',
            headers: {
                "X-RapidAPI-Key": "3916865927mshfa6ed92ad2d0b93p1e3dfbjsn91a619d4b126"
            }
        }).done(function (data) {
            return data;
        }).then((data) => {
            info = data.Results[0];
        });
        return info === undefined ? false : info;
    }

    validarCiudad(valor) {
        if (!/[a-zA-Z]/.test(valor)) {
            return false;
        }
        return true;
    }

}