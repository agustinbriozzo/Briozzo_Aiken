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