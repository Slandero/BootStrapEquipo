(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                guardarReserva()
            }

            form.classList.add('was-validated')

        }, false)
    })
})();

var precio = 0;
var nombreShow = "";

document.getElementById('reservaModal').addEventListener('show.bs.modal', function (event) {
    const boton = event.relatedTarget; 
    
    precio = parseFloat(boton.getAttribute('data-precio')) || 0;
    nombreShow = boton.getAttribute('data-show') || "";

    document.getElementById('numasientos').value = 1;
    calcularTotal(); 
});

function calcularTotal() {
    const cant = document.getElementById('numasientos').value;
    
    const resultado = cant * precio;
    
    const total1 = document.getElementById('total');
    if (total1) {
        total1.innerText = "$" + resultado;
    }
}

function guardarReserva() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value.toLowerCase().trim();
    const boletos = document.getElementById("numasientos").value;
    const totalVenta = document.getElementById("total").innerText;

    const reserva = {
        nombre: nombre,
        correo: correo,
        show: nombreShow,
        boletos: boletos,
        total: totalVenta,
        estado: "Confirmado"
    };

    let reservas = JSON.parse(localStorage.getItem("todas_las_reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("todas_las_reservas", JSON.stringify(reservas));

    const modalElement = document.getElementById('reservaModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    
    if (modalInstance) {
        modalInstance.hide(); 
    }
}