const enviar = document.getElementById("enviar");
const modal = document.getElementById("modal");
const volver = document.getElementById("volver");

if (enviar && modal) {
    enviar.addEventListener("click", () => {
        modal.style.display = "flex";
    });
}

if (volver && modal) {
    volver.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (modal && e.target === modal) {
        modal.style.display = "none";
    }
});