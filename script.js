const textarea1 = document.getElementById("textarea1");
const textarea2 = document.getElementById("textarea2");
const textAreaContainer = document.querySelectorAll(".textAreaWrite, .textAreaResult");
const textareas = document.querySelectorAll('textarea');
const textAreaResult = document.querySelector(".textAreaResult");
const textarea1Heights = {mobile:"181px",tablet: "626px"}
const textarea2Heights = 48
const coderBtn = document.getElementById("coder-btn");
const encoderBtn = document.getElementById("encoder-btn");
const copyBtn = document.querySelector(".copy_buttom");
const message = document.querySelector(".message");
const screenWidth = {tablet:"768", desktop:"1440"}
const rowsTextarea1 = {mobile: 4, tablet: 14}
const modal = document.getElementById("modal");

const conversiones = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

const conversiones2 = {
  enter: 'e',
  imes: 'i',
  ai: 'a',
  ober: 'o',
  ufat: 'u',
};

const hiddenElement = () => {
  //Oculta el elemento que muestra que "no hay ningun mensaje encontrado" para luego mostrar el textarea
  //de los resultados
  if (textarea1.value) {
    message.classList.add('hidden-element');
    textAreaResult.classList.remove('hidden-element');
  } else {
    message.classList.remove('hidden-element');
    textAreaResult.classList.add('hidden-element');
  }
}

//funcion que encripta mensaje
const createEncripterMessage = (message) => {
    // Usa la función map de los arrays para crear un nuevo array con cada carácter modificado
    const textEncrpter = [...message].map((caracter) => {
      // Si el carácter se encuentra en el objeto "conversiones", devuelve su versión modificada
      if (conversiones[caracter]) {
        return conversiones[caracter];
      }
      // Si el carácter no se encuentra en el objeto "conversiones", se devuelve tal cual
      return caracter;
    });
    // Devuelve el texto modificado como una cadena de texto
    return textEncrpter.join('');
  }

//funcion desencriptadora 
const createDesencripterMessage = (message) => {
    // Crea una expresión regular con todas las secuencias del objeto "conversiones2"
    const expresion = new RegExp(Object.keys(conversiones2).join('|'), 'g'); 
    // Sustituye todas las secuencias del diccionario por las letras correspondientes
    return message.replace(expresion, match => conversiones2[match]);
  }

//funcion que muestra el mensaje encriptado en el textarea de los resultados
const showEncripterMessage = () => {
  if (textarea1.value) {
    textarea2.value =  createEncripterMessage(textarea1.value);
    textarea2Height()
  }
}

//funcion que muestra el mensaje desencriptado en el textarea de los resultados
const showDesencripterMessage = () => {
  //muestra el mensaje desencriptado en el textarea de los resultados
  if (textarea1.value) {
    textarea2.value = createDesencripterMessage(textarea1.value)
    textarea2Height()
  }
}

//funcion que establece la altura del div según el scrollHeight del textarea de resultados
const textarea2Height = () => {
  if (window.innerWidth < screenWidth["desktop"]){
    textarea2.scrollHeight
    textarea2.style.height = textarea2.scrollHeight + "px";

  }
}

//funcion que establece la altura del div según el scrollHeight del textarea de ingreso de texto
const textarea1Height = () => {
  if (window.innerWidth < screenWidth["desktop"]){
    textarea1.style.height = textarea1.scrollHeight + "px";
    console.log("textarea1 altura" + textarea1.scrollHeight)
  }
}

//funcion que ajusta las filas (rows) del textarea1 segun el tamaño de la ventana o dispositivo
const resizeRowsTextarea1 = () => {
  if(window.innerWidth >= screenWidth["tablet"] ){
    textarea1.rows = rowsTextarea1["tablet"]
  } else if(window.innerWidth < screenWidth["tablet"]){
    textarea1.rows = rowsTextarea1["mobile"]
  }
}

//funcion que redimensiona el alto del textarea1 segun el tamaño de la ventana o dispositivo
const resizeHeightTextarea1 = () =>{
  if(window.innerWidth < screenWidth["tablet"] ){
    textarea1.style.height = textarea1Heights["mobile"] 
  } else if(window.innerWidth >= screenWidth["tablet"]){
    textarea1.style.height = textarea1Heights["tablet"]
  }
}
//funcio que controla cuando se muestra el modal y el mensaje que contiene
const callModal = (message) => {
  modal.innerText = message
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 2000);
}

window.onload = () => {
  //Funcion que limpia los campos de texto al recargar la pagina
    textareas.forEach((textarea) => {
        textarea.value = "";  
    });
    resizeRowsTextarea1()
  }

 window.addEventListener("resize", () => {
  // par de funciones que ajuntan el tamaño del textarea al redimencionar la ventana del navegador
  resizeRowsTextarea1()
  resizeHeightTextarea1()
 });

textarea1.addEventListener("input", () => {
  //funcion que ajusta el placeholder y el alto del textarea1 cuando esta sin texto 
  if (!textarea1.value) {
    textarea1.setAttribute('placeholder', 'Ingrese texto aqui...');
    resizeHeightTextarea1()
  }
  //Establecer la altura del div según el scrollHeight del textarea
  textarea1Height()
});

textarea1.addEventListener('focus', () => {
  //Borra el contenido del placeholder al hacer foco
  textarea1.setAttribute('placeholder', '');
});

//ejecuta la encriptacion del texto al hacer click en boton encriptar
coderBtn.addEventListener('click', () => {
  if(textarea1.value){
    hiddenElement()
    showEncripterMessage()
    callModal("Mensaje Encriptado")
  }
})

//ejecuta la desencriptacion del texto al hacer click en boton desencriptar
encoderBtn.addEventListener('click', () => {
  if(textarea1.value){
    hiddenElement()
    showDesencripterMessage()
    callModal("Mensaje Desencriptado")
  }
})

//ejecuta la copia del texto del textarea de resultados
copyBtn.addEventListener("click", () => {
  if(textarea2.value){
    const content = textarea2.value
    navigator.clipboard.writeText(content)
    textarea2.value = ""
    textarea1.value = ""
    resizeHeightTextarea1()
    hiddenElement()
    callModal("Mensaje Copiado")
  }

})

