const toggleDarkMode = document.getElementById("toggleDarkMode");
const rangeTamano = document.getElementById("rangeTamano");
const rangeContraste = document.getElementById("rangeContraste");
const selectFuente = document.getElementById("selectFuente");
const todosLosPuntos = document.querySelectorAll(".dot, .dot-lg");

toggleDarkMode.addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

rangeTamano.addEventListener("input", (e) => {
  const porcentaje = e.target.value + "%";
  
  // AQUI AGG L A ADAPTACION CHAVALOS
  document.documentElement.style.fontSize = porcentaje;
});

rangeContraste.addEventListener("input", (e) => {
  const nivelContraste = e.target.value;
  
  // AQUI AGG L A ADAPTACION CHAVALOS
  document.body.style.filter = `contrast(${nivelContraste})`;
});

selectFuente.addEventListener("change", (e) => {
  const nuevaFuente = e.target.value;
  
  // AQUI AGG L A ADAPTACION CHAVALOS
  document.body.style.fontFamily = nuevaFuente;
});

todosLosPuntos.forEach(punto => {
  punto.addEventListener("click", (e) => {
    const colorSeleccionado = e.target.getAttribute("data-color");
    
    // AQUI AGG L A ADAPTACION CHAVALOS
    document.body.style.color = colorSeleccionado;

    document.querySelectorAll(".dot").forEach(d => d.classList.remove("selected-dot"));
    if(e.target.classList.contains("dot")) {
      e.target.classList.add("selected-dot");
    }
  });
});