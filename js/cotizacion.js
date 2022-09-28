class cotizacion {
    constructor(precio, dias){
        this.precio = parseInt(precio)
        this.dias = parseInt(dias)
    }
    cotizar() {
        let resultado = (this.precio * this.dias)
        return resultado
    }
}