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

const realizarCotizacion = ()=> {
    if(chequeoform()){
        const habitacion = new cotizacion(tipo.value, dias.value)
            total.innerText = habitacion.cotizar()
    }else{
        alert("Completa los datos correctamente")
    }
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

btnReservar.addEventListener("click", realizarCotizacion)
btnEnviar.addEventListener("click",enviarDatos)