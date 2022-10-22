const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const email = document.querySelector("#email")
const mensaje = document.querySelector("#mensaje")
const tipo = document.querySelector("#tipo")
const descripcion = document.querySelector("#descripcion")
const llegada = document.querySelector("#llegada")
const salida = document.querySelector("#salida")
const dias = document.querySelector("#dias")
const btnCotizar = document.querySelector("#btnCotizar")
const btnReservar = document.querySelector("#btnReservar")
const btnEnviar = document.querySelector("#btnEnviar")
const total = document.querySelector("span.precioTotal")


const habitaciones =
[
    {
        id:1,
        tipo:"Simple",
        descripcion:"Simple ($5000)",
        precio: 5000
    },
    {
        id:2,
        tipo:"Doble",
        descripcion:"Doble ($8000)",
        precio: 8000
    },
    {
        id:3,
        tipo:"Triple",
        descripcion:"Triple ($11000)",
        precio: 11000
    }
]

// cargo las opciones del select
const opciones = (select, array)=> {
    if(array.length > 0){
        array.forEach(elemento => {
            select.innerHTML += `<option class="option" id="${elemento.id} "value="${elemento.precio}">${elemento.descripcion}</option>`
        })
    } else{
        console.error("no existen elementos en el array")
    }
}
opciones(descripcion,habitaciones)

// datos para usar libreria luxon
const DateTime = luxon.DateTime
const fecha = {day: 8, month: 12, year: 2022}
const zona = {zone: 'America/Buenos_Aires', numberingSystem: 'latn'}
const dt = DateTime.fromObject(fecha, zona)

// calculo cantidad de dias
const cantidadDias = ()=>{
    const DT = luxon.DateTime
    let inicial = DT.fromISO(llegada.value);
    let final = DT.fromISO(salida.value);
    let dias = final.diff(inicial, ['days']).toObject()
    return dias
}

// calculo el precio total de la estadia
const estadia = ()=>{
    let eleccion = descripcion.value
    let totalPago = cantidadDias().days * eleccion
    return totalPago
}


// obtengo la opcion del select y la guardo en reserva[]
const obtenerOption = ()=> {
    let options = document.querySelectorAll(".option")
    for(const option of options){
        option.addEventListener("click", ()=> {
            const room = habitaciones.find(habitacion => habitacion.id == option.id)
            if(room){
                reserva.length = 0
                reserva.push(room)
            }
        })
    }
}
obtenerOption()

// no tiene mucho sentido, la use para tener una clase en el proyecto
class cotizacion {
    constructor(precio){
        this.precio = parseInt(precio)
    }
    cotizar() {
        let importeTotal = (cantidadDias().days * this.precio)
        return importeTotal
    }
}


const realizarCotizacion = ()=> {
    btnCotizar.innerText = "cotizando..."
    setTimeout(() => {
        const habitacion = new cotizacion(descripcion.value)
        total.innerText = habitacion.cotizar()
        btnCotizar.innerText = "Cotizar"
    }, 2000);
}


const reserva = []

// funcion para obtener que tipo de habitacion se esta reservando, simple/doble/triple
const obtenerTipo = (reserva)=> {
    for(const habitacion of reserva){
        return habitacion.tipo
    }
}

// esta es la funcion que me esta causando problemas
// antes tenia en vez del if(reserva), for(const habitacion of reserva){}, y en el primer td, en vez de obtenerTipo(), tenia habitacion.tipo
//fijate que si lo probas de esa manera y llamas a la funcion desde la consola, obviamente antes habiendo seleccionado el tipo de habitacion, se carga una reserva debajo del formulario con los datos que yo quiero reflejar

const cargarReserva = (reserva)=> {
    let containerReserva = document.querySelector(".containerReserva")
    let div = document.createElement("div")
    div.setAttribute("class", "reserva")
    if(reserva){
        div.innerHTML += `
        <div>
            <h4 class="text-center">MI RESERVA:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Habitacion</th>
                        <th>Cantidad de dias</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${obtenerTipo()}</td>
                        <td>${cantidadDias().days}</td>
                        <td>${estadia()}</td>
                        <td><button class="btn-send">Pagar</button></td>
                        <td><button class="btn-delete">Cancelar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        `
    }
    containerReserva.appendChild(div)
}



const enviarDatos = ()=> {
    const cotizacion = {
        nombre: nombre[nombre.selectedIndex].text,
        apellido: apellido[apellido.selectedIndex].text,
        email: email[email.selectedIndex].text,
        mensaje: mensaje[mensaje.selectedIndex].text,
        total: total.innerText
    }
    localStorage.setItem("Reserva realizada", JSON.stringify(cotizacion))
    alert("Muchas gracias por elegir nuestro hotel")
}



// CODIGO CON FETCH PARA LA CARGA DE COMENTARIOS
const comments = document.querySelector(".containerComments")
const URL = "../datos/comentarios.json"
let comentarios = []
let seccionComentarios = ""


const mostrarComentarios = (contenido)=> {
    const {name, body} = contenido
    return `<div>
                <h4 class="text-center">${name}</h4>
                <p class="text-center">${body}</p>
            </div>`
}



const cargarComentarios = async ()=> {
    try {
        const response = await fetch(URL)
        const datos = await response.json()
            comentarios = datos
            comentarios.forEach(elemento => {
                seccionComentarios += mostrarComentarios(elemento)
            })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal en la carga de datos!'
        })
    } finally {
        comments.innerHTML = seccionComentarios
    }
    
}

cargarComentarios()



btnCotizar.addEventListener("click", realizarCotizacion)
btnReservar.addEventListener("click", cargarReserva)



