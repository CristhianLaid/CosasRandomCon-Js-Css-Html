class Calculadora {
    constructor() {
        this.resultadoElement = document.querySelector("#resultado");
        this.numerosElement = document.querySelectorAll(".gray");
        this.operadoresElement = document.querySelectorAll(".led");
        this.operadorcero = document.querySelectorAll(".led1")
        this.Ac = document.querySelector("#ac");
        this.Del = document.querySelector("#del");
        this.mas = document.querySelector(".mas");
        this.operadorMas = document.querySelectorAll(".mas1");
        this.volver1 = document.querySelector(".mas2");
        this.Igual = document.querySelector("#igual");
        this.numero = "";
        this.operador = "";
        this.mas.addEventListener("click", () => {
            this.EventoMas();
        });

        this.volver1.addEventListener("click", () => {
            this.Volver();
        });

        this.operadorMas.forEach(boton => {
            boton.addEventListener("click", (e) => {
                this.eventosEspeciales(e.currentTarget.id);
            });
        });
    }

    eventos() {
        this.numerosElement.forEach(elemento => {
            elemento.addEventListener("click", () => {
                const elementos = elemento.innerText;
                if (this.resultadoElement.value === "0" || this.resultadoElement.value === "Error" || this.resultadoElement.value === "NaN") {
                    this.resultadoElement.value = elementos;
                } else {
                    this.resultadoElement.value += elementos;
                    
                }
                this.numero = this.resultadoElement.value;
                console.log(`Elemento => ${elemento.innerText}`);
            });
        });
    
        this.operadoresElement.forEach(elemento => {
            elemento.addEventListener("click", () => {
                const elementos = elemento.innerText;
                this.resultadoElement.value += elementos;
                this.operador = this.resultadoElement.value;
                console.log(`Elemento => ${this.numero}`);
            });
        });

        this.operadorcero.forEach(boton => {
            boton.addEventListener("click", () => {
                const elemento = boton.innerText;
                if (this.resultadoElement.value === "Error" || this.resultadoElement.value === "NaN") {
                    this.resultadoElement.value = elemento;
                } else {
                    this.resultadoElement.value += elemento;
                }
                this.numero = this.resultadoElement.value;
                console.log(`Elemento => ${elemento}`);
            });
        });
    }
    

    eventosEspeciales(boton) {
        console.log(`=> ${boton}`);
        if (boton === "raiz") {
            const j = parseInt(this.resultadoElement.value);
            const k = Math.sqrt(j);
            this.resultadoElement.value = k;
        }
        if (boton === "factorial") {
            const t = parseInt(this.resultadoElement.value);
            let r = 1;
            for (let i = t; i > 0; i--) {
                r *= i;
            }
            this.resultadoElement.value = r;
        }
        if (boton === "Exp") {
            const base = parseFloat(this.resultadoElement.value);
            const exponente = parseFloat(prompt("Ingrese el exponente"));
            const resultado = Math.pow(base, exponente);
            this.resultadoElement.value = resultado;
        }
    
        if (boton === "Div") {
            const divisor = parseFloat(this.resultadoElement.value);
            const dividendo = parseFloat(prompt("Ingrese el dividendo"));
            const cociente = divisor / dividendo;
            this.resultadoElement.value = cociente;
        }
    
        if (boton === "%") {
            const porcentaje = parseFloat(this.resultadoElement.value);
            const numero = parseFloat(prompt("Ingrese el número"));
            const resultado = (porcentaje * numero) / 100;
            this.resultadoElement.value = resultado;
        }

        if (boton === "divisores") {
            const numero = parseInt(this.resultadoElement.value);
            let divisores = [];
            for (let i = 2; i <= numero / 2; i++) {
                if (numero % i === 0) {
                    divisores.push(i);
                }
            }
            this.resultadoElement.value = divisores.join(", ");
        }
    }

    vaciar() {
        this.Ac.addEventListener("click", () => {
            this.resultadoElement.value = "0";
        });
    }

    eliminar() {
        this.Del.addEventListener("click", () => {
            console.log("Has hecho un click");
            if (this.resultadoElement.value.length === 1 || this.resultadoElement.value === "Error") {
                this.resultadoElement.value = "0";
            } else {
                this.resultadoElement.value = this.resultadoElement.value.slice(0, -1);
            }
        });
    }

    EventoMas() {
        this.mas.classList.add("disable");
        this.volver1.classList.remove("disable");
        this.operadorMas.forEach(mas => {
            mas.classList.remove("disable");
        });
    }

    Volver() {
        this.volver1.classList.add("disable");
        this.mas.classList.remove("disable");
        console.log(`=> ${this.volver1.classList}`);
        this.operadorMas.forEach(mas => {
            mas.classList.add("disable");
        });
    }

    Resultado() {
        this.Igual.addEventListener("click", () => {
            try {
                this.eventosEspeciales();
                this.resultadoElement.value = eval(this.resultadoElement.value);
                console.log("has hecho click");
            } catch {
                this.resultadoElement.value = "Error";
            }
        });
    }
}

const cal = new Calculadora();
cal.eventos();
cal.vaciar();
cal.eliminar();
cal.Resultado();
