export default class Chat {
  constructor(usuarioCiudad) {
    this.usuarioCiudad = usuarioCiudad;
  }
  // Busca las coordenadas de la ciudad que ingresó el usuario
  async buscaCoordenadas() {
    let coordenadas = {};
    try {
      await $.ajax({
        method: "GET",
        url: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${
          this.usuarioCiudad
        }`,
        dataType: "json",
        headers: {
          "X-RapidAPI-Key": "3916865927mshfa6ed92ad2d0b93p1e3dfbjsn91a619d4b126"
        }
      })
        .done(function(data) {
          return data;
        })
        .then(data => {
          coordenadas.latitud = data.Results[0].lat;
          coordenadas.longitud = data.Results[0].lon;
        });
      this.coordenadas = coordenadas;
      return coordenadas;
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  // Obtiene el id de la ciudad
  async getID(coordenadas) {
    let id;
    try {
      await $.ajax({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${
          coordenadas.latitud
        }&lon=${
          coordenadas.longitud
        }&appid=acf3ea683407fd3d8ba8d12e5c57f2b9&units=metric`,
        dataType: "json"
      })
        .done(function(data) {
          return data;
        })
        .then(data => (id = data.id));
      this.id = id;
      return id;
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  // Convierte los grados Kelvin a Celcius
  kelvinACelcius(gradosK) {
    return Math.round(gradosK - 273.15);
  }

  // Obtiene el clima actual de la ciudad del usuario
  async getClima(id) {
    let clima = {};
    try {
      await $.ajax({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=acf3ea683407fd3d8ba8d12e5c57f2b9`,
        dataType: "json"
      })
        .done(function(data) {
          return data;
        })
        .then(data => {
          clima.temperatura = this.kelvinACelcius(data.main.temp);
          clima.temperaturaMax = this.kelvinACelcius(data.main.temp_max);
          clima.temperaturaMin = this.kelvinACelcius(data.main.temp_min);
          clima.principal = data.main;
          clima.icono = data.weather[0].main;
          clima.ciudad = this.usuarioCiudad;
        });
      this.clima = clima;
      return clima;
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  // Obtiene el pronostico de los siguientes días y el de hoy
  async getPronostico(coordenadas) {
    try {
      let pronosticosHoy;
      let pronosticos;
      await $.ajax({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${
          coordenadas.latitud
        }&lon=${
          coordenadas.longitud
        }&appid=acf3ea683407fd3d8ba8d12e5c57f2b9&units=metric`,
        dataType: "json"
      })
        .done(function(data) {
          return data;
        })
        .then(data => {
          pronosticos = this.filtrarPronosticos(data.list);
          pronosticosHoy = this.filtrarPronosticoHoy(data.list);
        });
      return { pronosticosHoy, pronosticos };
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  // Le da formato al mes
  mes(mes) {
    // Si el mes tiene dos días, regresa el mes como esta más 1
    if (mes.toString().split("").length === 2) return mes + 1;
    // Si el mes tiene un día, agregale un 0 antes de ese día más 1
    if (mes.toString().split("").length === 1) {
      mes = mes + 1;
      let mesNuevo = mes.toString().split("");
      mesNuevo.unshift("0");
      return mesNuevo.join("");
    }
  }

  // Le da formato al días
  dia(dia) {
    // Si el dia tiene dos días, regresa el dia como esta
    if (dia.toString().split("").length === 2) return dia;
    // Si el dia tiene un día, agregale un 0 antes de ese día
    if (dia.toString().split("").length === 1) {
      let diaNuevo = dia.toString().split("");
      diaNuevo.unshift("0");
      return diaNuevo.join("");
    }
  }

  // Filtra los pronosticos de hoy
  filtrarPronosticoHoy(dias) {
    const fecha = new Date();
    let fechaNueva = `${fecha.getFullYear()}-${this.mes(
      fecha.getMonth()
    )}-${this.dia(fecha.getDate())}`;
    dias = dias.filter(dia => dia.dt_txt.split(" ")[0] == fechaNueva);
    return dias;
  }

  // Filtra los pronosticos de los siguientes días
  filtrarPronosticos(dias) {
    const fecha = new Date();
    let fechaNueva = `${fecha.getFullYear()}-${this.mes(
      fecha.getMonth()
    )}-${this.dia(fecha.getDate())}`;
    dias = dias.filter(dia => dia.dt_txt.split(" ")[0] !== fechaNueva);

    return dias;
  }

  // Retorna los pronosticos de los días que son únicos
  pronosticosUnicos(pronosticos) {
    pronosticos = pronosticos.filter(pronostico => {
      if (pronostico.dt_txt.split(" ")[1] === "12:00:00") {
        return pronostico;
      }
    });
    return pronosticos;
  }
  // Mete las ciudades a Local Storage

  ciudadesStorage(ciudades) {
    localStorage.setItem("ciudadesChat", JSON.stringify(ciudades));
  }
}
