const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const email = document.querySelector("#email")
const mensaje = document.querySelector("#mensaje")
const tipo = document.querySelector("#tipo")
const llegada = document.querySelector("#llegada")
const salida = document.querySelector("#salida")
const dias = document.querySelector("#dias")
const btnReservar = document.querySelector("#btnReservar")
const btnEnviar = document.querySelector("#btnEnviar")
const total = document.querySelector("span.precioTotal")



const habitaciones = [{tipo:"Simple ($5000)", precio: 5000}, {tipo:"Doble ($8000)", precio: 8000}, {tipo:"Triple ($11000)", precio: 11000}]


const opciones = (select, array)=> {
    if(array.length > 0){
        array.forEach(elemento => {
            select.innerHTML += `<option value="${elemento.precio}">${elemento.tipo}</option>`
        })
    } else{
        console.error("no existen elementos en el array")
    }
}

opciones(tipo, habitaciones)

const chequeoform = ()=> {
    if(dias.value >= 1){
        return true
    } else{
        return false
    }
}


const DateTime = luxon.DateTime
const fecha = {day: 8, month: 12, year: 2022}
const zona = {zone: 'America/Buenos_Aires', numberingSystem: 'latn'}
const dt = DateTime.fromObject(fecha, zona)



class cotizacion {
    constructor(precio){
        this.precio = parseInt(precio)
    }
    cotizar() {
        const DT = luxon.DateTime
        let inicial = DT.fromISO(llegada.value);
        let final = DT.fromISO(salida.value);
        let resultado = final.diff(inicial, ['days']).toObject()
        let importeTotal = (resultado.days * this.precio)
        return importeTotal
    }
}



const realizarCotizacion = ()=> {
    btnReservar.innerText = "cargando..."
    setTimeout(() => {
        const habitacion = new cotizacion(tipo.value)
        total.innerText = habitacion.cotizar()
        btnReservar.innerText = "Reservar"
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn-send',
        cancelButton: 'btn-delete'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro de realizar la reserva?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su reserva fue realizada con éxito',
                showConfirmButton: false,
                timer: 3000
                })
        } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Su reserva fue cancelada',
                showConfirmButton: false,
                timer: 3000
                })
        }
    })
    }, 2000);
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





btnReservar.addEventListener("click", realizarCotizacion)


