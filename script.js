const textarea1 = document.getElementById("textarea1");
const textarea2 = document.getElementById("textarea2");
const textAreaContainer = document.querySelectorAll(".textAreaWrite, .textAreaResult");
const textareas = document.querySelectorAll('textarea');

//Funcion que limpia los campos de texto al recargar la pagina
window.onload = () => {
    textareas.forEach((textarea) => {
        textarea.value = "";  
    });
  }

textarea1.addEventListener("input", () => {
  // Establecer la altura del div según el scrollHeight del textarea
  textarea1.style.height = textarea1.scrollHeight + "px";
});

textarea2.addEventListener("input", () => {
  // Establecer la altura del div según el scrollHeight del textarea
  textarea2.style.height = textarea2.scrollHeight + "px";
});

textarea1.addEventListener('focus', () => {
  textarea1.setAttribute('placeholder', '');
  //Borra el contenido del placeholder al hacer foco
});

textarea1.addEventListener('blur', () => {
  if (!textarea1.value) {
    textarea1.setAttribute('placeholder', 'Ingrese texto aqui...');
    //Al dejar de hacer foco rellena el placeholder con el contenido indicado si el textarea esta vacia
  }
});

console.log(textAreaContainer)