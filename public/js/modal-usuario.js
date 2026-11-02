const enviar = document.getElementById("enviar");
const modal = document.getElementById("modal");
const sesion = document.getElementById("log-out");
const volver = document.getElementById("volver");
const perfil = document.getElementById("perfil");

enviar.addEventListener("click", () => {
    modal.style.display = "flex";
});

volver.addEventListener("click", () =>{
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target == modal){
        modal.style.display = "none";
    }
});