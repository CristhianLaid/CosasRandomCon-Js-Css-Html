class Juego {
    constructor(armaHumano, armaElegida) {
      this.armaHumano = armaHumano;
      this.armaPc = armaElegida;
      this.eleccionElement = document.querySelector("#gana-punto");
      this.mensaje = document.querySelector(".mensaje");
      this.eleccionPc = document.querySelector("#eleccion-pc");
      this.Resultado = document.querySelector("#resultado");
      this.ElegiTuarma = document.querySelector("#Elige-arma");
      this.Reiniciar = document.querySelector("#reiniciar");
      this.Inicio = document.querySelector("#btn-inicio");
      this.Salir = document.querySelector("#btn-salir");
      this.estadisticas = {
        jugador: parseInt(localStorage.getItem("estadisticasJugador")) || 0,
        pc: parseInt(localStorage.getItem("estadisticasPc")) || 0,
      };
      this.Armas = [];
      this.puntos = 0;
      this.puntosPc = 0;
      this.puntosJugador = document.querySelector("#jugador");
      this.puntosPcElement = document.querySelector("#Pc");
  
      this.Inicio.addEventListener("click", () => {
        this.IniciarJuego(armaElegida);
      });
  
      this.Salir.addEventListener("click", () => {
        this.mostrarEstadisticas();
      });
    }
  
    IniciarJuego(armaElegida) {
      this.ElegiTuarma.classList.remove("disable");
      this.Inicio.classList.add("disable");
  
      const pc = new Pc("Pc", this.ValidarArmarPc());
      let armaElegidaPc = pc.armaElegida;
      console.log(`Arma seleccionada por la PC: ${armaElegidaPc}`);
      if (
        (armaElegida === "Piedra" && armaElegidaPc === "tijera") ||
        (armaElegida === "Tijera" && armaElegidaPc === "papel") ||
        (armaElegida === "Papel" && armaElegidaPc === "piedra")
      ) {
        this.ganaUsuario();
      } else if (
        (armaElegidaPc === "piedra" && armaElegida === "Tijera") ||
        (armaElegidaPc === "tijera" && armaElegida === "Papel") ||
        (armaElegidaPc === "papel" && armaElegida === "Piedra")
      ) {
        this.ganaPc();
      } else {
        this.empate();
      }
      this.Salir.classList.remove("disable");
      this.eleccionPc.innerText = armaElegidaPc;
    }
  
    ganaUsuario() {
      this.actualizarPuntos(true);
      console.log("¡Has ganado!");
      this.eleccionElement.innerText = `¡Has Ganado!`;
    }
  
    ganaPc() {
      this.puntosPc++;
      this.actualizarPuntos(false);
      console.log("Has perdido");
      this.eleccionElement.innerText = `¡Has Perdido!`;
    }
  
    empate() {
      console.log("Empate");
      this.eleccionElement.innerText = `¡Empate!`;
    }
  
    victoria(puntos, puntosPc, puntosJugador, puntosPcElement) {
      if (puntos === 3 || puntosPc === 3) {
        if (puntos === 3) {
          this.Resultado.innerHTML = `<h1>El jugador ha ganado</h1>`;
          this.estadisticas.jugador++;
          localStorage.setItem("estadisticasJugador", this.estadisticas.jugador);
        }
        if (puntosPc === 3) {
          this.Resultado.innerHTML = `<h1>El jugador ha perdido</h1>`;
          this.estadisticas.pc++;
          localStorage.setItem("estadisticasPc", this.estadisticas.pc);
        }
  
        this.ElegiTuarma.classList.add("disable");
        this.Reiniciar.classList.remove("disable");
        this.Reiniciar.addEventListener("click", () => {
          this.mensaje.classList.add("disable");
          this.ElegiTuarma.classList.remove("disable");
          this.Reiniciar.classList.add("disable");
          this.Resultado.innerHTML = `<h1>Primero en llegar a 3 gana.</h1>`;
          this.puntos = 0;
          this.puntosPc = 0;
          this.puntosJugador.innerText = "0";
          this.puntosPcElement.innerText = "0";
        });
      }
    }
  
    ValidarArmarPc() {
      const eleccionPc = Math.floor(Math.random() * 3);
      return this.Armas[eleccionPc];
    }
  
    actualizarPuntos(ganaJugador) {
      if (ganaJugador) {
        this.puntos++;
        this.puntosJugador.textContent = this.puntos;
      } else {
        this.puntosPcElement.textContent = this.puntosPc;
      }
  
      this.victoria(
        this.puntos,
        this.puntosPc,
        this.puntosJugador,
        this.puntosPcElement
      );
    }
  
    obtenerArmas(tipo_arma) {
      const arma = new Arma();
      this.Armas = this.Armas.concat(arma.NombreArma(tipo_arma));
    }
  
    mostrarEstadisticas() {
      const estadisticasJugador = this.estadisticas.jugador;
      const estadisticasPc = this.estadisticas.pc;
      alert(
        `Estadísticas:\nJugador: ${estadisticasJugador} partidas ganadas\nPC: ${estadisticasPc} partidas ganadas`
      );
  
      this.Inicio.classList.remove("disable");
      this.ElegiTuarma.classList.add("disable");
      this.mensaje.classList.add("disable");
      this.Reiniciar.classList.add("disable");
      this.Salir.classList.add("disable");
      this.puntosJugador.innerText = 0;
      this.puntosPcElement.innerText = 0;
      this.estadisticas.jugador = 0;
      this.estadisticas.pc = 0;
    }
  }



class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.eleccionJugador = document.querySelector("#eleccion-jugador");
    }

    ElegirArmas(armaElegida) {
        if (armaElegida === "Piedra") {
            console.log("Has escogido piedra");
        } else if (armaElegida === "Papel") {
            console.log("Has escogido papel");
        } else if (armaElegida === "Tijera") {
            console.log("Has escogido tijera");
        }

        this.eleccionJugador.textContent = armaElegida;
        juego.IniciarJuego(armaElegida);
        juego.mensaje.classList.remove("disable")
    }
}


class Pc {
    constructor(nombre, armaElegida) {
        this.nombre = nombre;
        this.armaElegida = armaElegida;
    }
}

class Arma {
    NombreArma(tipoArma) {
        return tipoArma.armas;
    }
}

class TipoArma {
    constructor() {
        this.armas = ["piedra", "papel", "tijera"];
    }
}

const jugador = new Jugador("jugador");

let armaElegida = document.querySelectorAll(".arma");

armaElegida.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        let eleccionJugador = e.currentTarget.id;
        jugador.ElegirArmas(eleccionJugador);
        console.log(eleccionJugador)
    });
});


const tipo_arma = new TipoArma();

const armaHumano = "hola"
const juego = new Juego(armaHumano, armaElegida);
juego.obtenerArmas(tipo_arma);

