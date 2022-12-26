const textarea1 = document.getElementById("textarea1");
const textarea2 = document.getElementById("textarea2");
const textAreaContainer = document.querySelectorAll(".textAreaWrite, .textAreaResult");
const textareas = document.querySelectorAll('textarea');
const coderBtn = document.getElementById("coder-btn");
const encoderBtn = document.getElementById("encoder-btn");
const message = document.querySelector(".message");
const textAreaResult = document.querySelector(".textAreaResult");

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

//Funcion que limpia los campos de texto al recargar la pagina
window.onload = () => {
    textareas.forEach((textarea) => {
        textarea.value = "";  
    });
  }

textarea1.addEventListener("input", () => {
  // Establecer la altura del div según el scrollHeight del textarea
  textarea1.style.height = textarea1.scrollHeight + "px";
  console.log("valor del offsetHeight" +" "+ `${textarea1.scrollHeight}px`)
  console.log("valor del scrollheight" +" "+ `${textarea1.scrollHeight}px`)
  console.log(textarea1)
});

textarea1.addEventListener('focus', () => {
  textarea1.setAttribute('placeholder', '');
  //Borra el contenido del placeholder al hacer foco
});

textarea1.addEventListener('blur', () => {
  if (!textarea1.value) {
    textarea1.setAttribute('placeholder', 'Ingrese texto aqui...');
    textarea1.style.height = 184 + "px";
    textarea2Height()
    textarea1Height()
    //Al dejar de hacer foco rellena el placeholder con el contenido indicado si el textarea esta vacia
  }
});


const hiddenElement = () => {
  if (textarea1.value) {
    message.classList.add('hidden-element');
    textAreaResult.classList.remove('hidden-element');
  } else {
    message.classList.remove('hidden-element');
    textAreaResult.classList.add('hidden-element');
  }

}

const createEncripterMessage = (message) => {
    // Usa la función map de los arrays para crear un nuevo array con cada carácter modificado
    const textEncrpter = [...message].map((caracter) => {
      // Si el carácter se encuentra en el objeto de conversiones, devuelve su versión modificada
      if (conversiones[caracter]) {
        return conversiones[caracter];
      }
      // Si el carácter no se encuentra en el objeto de conversiones, se devuelve tal cual
      return caracter;
    });
  
    // Devuelve el texto modificado como una cadena de texto
    return textEncrpter.join('');
  }
  


const createDesencripterMessage = (message) => {

    // Crea una expresión regular con todas las secuencias del diccionario
    const expresion = new RegExp(Object.keys(conversiones2).join('|'), 'g');
  
    // Sustituye todas las secuencias del diccionario por las letras correspondientes
    return message.replace(expresion, match => conversiones2[match]);
  }

const showEncripterMessage = () => {
  if (textarea1.value) {
    textarea2.value =  createEncripterMessage(textarea1.value);
  }
}

const showDesencripterMessage = () => {
  if (textarea1.value) {
    textarea2.value = createDesencripterMessage(textarea1.value)
  }
}

const textarea2Height = () => {
  // Establecer la altura del div según el scrollHeight del textarea
  textarea2.style.height = textarea2.scrollHeight + "px";
  console.log(textarea2.scrollHeight)
}

const textarea1Height = () => {
  // Establecer la altura del div según el scrollHeight del textarea
  textarea1.style.height = textarea1.scrollHeight + "px";
}

coderBtn.addEventListener('click', () => {
  hiddenElement()
  showEncripterMessage()
  

  
})

encoderBtn.addEventListener('click', () => {
  hiddenElement()
  showDesencripterMessage()
  
})
