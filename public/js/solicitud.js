const form = document.getElementById('form-contacto');
const modal = document.getElementById('modal-overlay');
const btnCerrarX = document.getElementById('modal-cerrar-x');
const btnVolver = document.getElementById('btn-volver');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.add('activo');
});

function cerrarModal() {
    modal.classList.remove('activo');
}

btnCerrarX.addEventListener('click', cerrarModal);
btnVolver.addEventListener('click', cerrarModal);
