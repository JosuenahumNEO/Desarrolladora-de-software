const ventana = document.getElementById("ventana");
const enviar = document.getElementById("enviar");
const volver = document.getElementById("volver");

enviar.addEventListener("click", () => {
    ventana.style.display = "flex";
});

volver.addEventListener("click", () =>{
    ventana.style.display = "none";
});