let nameUserF;
let respon = document.querySelector(".response0");
let errorR = [];
let puntuacionF = 0;
// ------------------------------------------Sirve para generar el usuario y en caso de no existir mostrar un flecha con la
// opcion de registrarse
class generator {
  constructor(nombre, header) {
    this.nombre = nombre;
    this.valor;
    this.header = header;
    this.content;
    this.start;
  }
  generateName() {
    this.valor = document.querySelector(this.header);
    this.content = document.createElement("h1");

    this.content.innerHTML =
      JSON.parse(localStorage.getItem("Users"))[0].users.length <= 0
        ? "No existe un Usuario"
        : "Bienvenido " + this.nombre;
    if (this.content.textContent == "No existe un Usuario") {
      this.content.className = "bienvenida py-4";
      this.valor.appendChild(this.content);
      this.redirection();
    } else {
      this.content.className = "bienvenida py-4";
      this.valor.appendChild(this.content);

      this.start = document.createElement("h2");
      this.start.className = `start`;
      this.start.textContent = "Empezemos!!";
      this.valor.appendChild(this.start);
    }
  }
  redirection() {
    respon.style.display = "none";
    let redit = document.createElement("div");
    let scrip = document.querySelector("script");
    let puntuacion = document.querySelector("#puntuacion");
    redit.innerHTML = `<div><picture id="flecha">
  <source srcset='../assets/img/phone/flechaF-phone.webp' media='(max-width: 500px)'>
  <img src='../assets/img/flechaF.png' alt='flecha hacia abajo' class="img">
  </picture>
  </div>
  <a href="../dir/Registro.html" class= "btn btn-primary regis">Registrate</a>`;
    redit.className = "container  redireg";
    document.body.insertBefore(document.body.appendChild(redit), scrip);
    
  }
}

try {
  let laskeys = JSON.parse(localStorage.getItem("Users"))[0].users.length - 1;
  nameUserF = JSON.parse(localStorage.getItem("Users"))[0].users[laskeys];
} catch (e) {
  let person = [{ users: [] }];

  person[0].users.push();

  localStorage.setItem("Users", JSON.stringify(person));
}

new generator(nameUserF, "header").generateName();

//localStorage.clear();

//---------------------------------------Funcionalidad de Botones-----------------

const div = document.querySelector(".res");
const children = Array.from(div.children);
for (let i = 0; i < children.length; i++) {
  children[i].addEventListener("click", (event) => {
    if (event.target.nodeName == "BUTTON") {
      let fue = new picture(event.target.value, 0);
      fue.picture();
      fue.delete();
      fue.picture();
      event.target.style.display = "none";
      if (event.target.value != "Pato") {
        errorR.push(1);
      } else {
        puntuacionF += 1;
      }
      console.log(puntuacionF, errorR);
      event.stopPropagation();
    }
  });
}
//.children.length);

//--------------------------Resultado de los botones-------------

const audio = document.querySelector(".audio");
class picture {
  constructor(value, index) {
    this.value = value;
    this.respuesta_user;
    this.index = index;
    this.respuestas = ["Pato", "Perro", "Caballo", "Avion"];
    this.respues_incorrectas = [
      ["Ganzo", "Perro", "Palo"],
      ["Pelota", "Pato", "Pantera"],
      ["Camello", "Cartera", "Cantante"],
    ];
    this.redirection_audio = [
      [
        "../assets/audio/ejampleOne/soy-un-pato.mp3",
        "../assets/audio/ejampleOne/no-soy-un-ganzo.mp3",
        "../assets/audio/ejampleOne/no-soy-un-perro.mp3",
        "../assets/audio/ejampleOne/no-soy-un-palo.mp3",
      ],
      [
        "../assets/audio/ejampleTwo/b-s-perro.mp3",
        "../assets/audio/ejampleTwo/n-s-pelota.mp3",
        "../assets/audio/ejampleTwo/n-s-pato.mp3",
        "../assets/audio/ejampleTwo/n-s-pantera.mp3",
      ],
      [
        "../assets/audio/ejampleTree/b-s-caballo.mp3",
        "../assets/audio/ejampleTree/n-s-camello.mp3",
        "../assets/audio/ejampleTree/n-s-cartera.mp3",
        "../assets/audio/ejampleTree/n-s-cantante.mp3",
      ],
    ];
    this.res_bottons = document.querySelector(`#resultado${this.index}`);
  }

  picture() {
    this.respuesta_user = document.createElement("h2");
    console.log(this.index);
    this.respuesta_user.innerHTML =
      (this.value == this.respuestas[this.index] ? "Soy un" : "No soy un") +
      `<span class ="Rpato"> ${this.value} ${
        this.value == this.respuestas[this.index] ? "🤩" : "😥"
      }  </span>`;
    this.respuesta_user.className = "text-center";

    this.respuesta_user.style.color =
      this.value == this.respuestas[this.index] ? "#9BF21B" : "#EB2623";
    this.res_bottons.appendChild(this.respuesta_user);
    this.colocar();
    // if(this.value == this.respuestas[this.index]){

    // }
  }

  delete() {
    if (this.respuesta_user == undefined) {
      console.log(this.respuesta_user);
    } else {
      this.res_bottons.textContent = "";
    }
  }
  colocar() {
    if (this.value == this.respuestas[this.index]) {
      audio.innerHTML = `<div class="text-center">  
      <audio src="${
        this.redirection_audio[this.index][0]
      }" controls autoplay> </audio> </div>`;
      this.next();
    } else if (this.value == this.respues_incorrectas[this.index][0]) {
      audio.innerHTML = `<div class="text-center">  
      <audio src="${
        this.redirection_audio[this.index][1]
      }" controls autoplay> </audio> </div>`;
    } else if (this.value == this.respues_incorrectas[this.index][1]) {
      audio.innerHTML = `<div class="text-center"> 
       <audio src="${
         this.redirection_audio[this.index][2]
       } " controls autoplay> </audio> </div>`;
    } else if (this.value == this.respues_incorrectas[this.index][2]) {
      audio.innerHTML = `<div class="text-center"> 
       <audio src="${
         this.redirection_audio[this.index][3]
       } " controls autoplay> </audio> </div>`;
    }
  }
  next() {
    let start = document.querySelector(`.start`);
    respon = document.querySelector(`.response${this.index}`);
    setTimeout(() => {
      respon.style.display = "none";
      start.style.display = "none";
      new picture("", this.index + 1).nexUi();
    }, 3000);
  }

  nexUi() {
    let responseNext = document.querySelector(`.response${this.index}`);
    console.log(this.index);
    responseNext.style.display = "contents";
  }
}

//-----------------------Animacion de la Image flecha

let flecha = document.querySelector("#flecha");
let angle = Math.PI / 2;
const animation = (time, lastTime) => {
  if (lastTime != null) {
    angle += (time - lastTime) * 0.005;
  }
  flecha.style.top = Math.sin(angle) * 20 + "px";
  requestAnimationFrame((newTime) => animation(newTime, time));
};

requestAnimationFrame(animation);

/// ---------------------------------------Animacion de la imagen del pato
/*
const imgA= document.querySelector("#PatoAnimado");
let angleA = Math.PI/2;
function animationPato (time, lastTime){
  if (lastTime != null){
    angleA += (time - lastTime) * 0.005; 
  }
  imgA.style.top = Math.sin(angleA) * 8 + "px";

  requestAnimationFrame((newTime) => animationPato(newTime, time));
}

requestAnimationFrame(animationPato); */

// ------------------------------------- Evento del Segundo Ejemplo-----------------------------

const res1 = document.querySelector(".res1");
const children1 = Array.from(res1.children);
for (let i = 0; i < children1.length; i++) {
  children1[i].addEventListener("click", (event) => {
    if (event.target.nodeName == "BUTTON") {
      let ejample_two = new picture(event.target.value, 1);
      ejample_two.picture();
      ejample_two.delete();
      ejample_two.picture();
      event.target.style.display = "none";
      if (event.target.value != "Perro") {
        errorR.push(1);
      } else {
        puntuacionF += 1;
      }
      console.log(puntuacionF, errorR);
      event.stopPropagation();
    }
  });
}

// ---------------------------------------Evento del tercer Ejemplo-----------------------------

const res2 = document.querySelector(".res2");
const children2 = Array.from(res2.children);

for (let i = 0; i < children2.length; i++) {
  // console.log(children1[i].children);
  children2[i].addEventListener("click", (event) => {
    if (event.target.nodeName == "BUTTON") {
      let ejample_three = new picture(event.target.value, 2);
      ejample_three.picture();
      ejample_three.delete();
      ejample_three.picture();
      event.target.style.display = "none";
      if (event.target.value != "Caballo") {
        errorR.push(1);
      } else {
        puntuacionF += 1;
      }
      console.log(puntuacionF, errorR);
      event.stopPropagation();
    }
  });
}

//------------------- Clase de puntuacion

// const punt = document.querySelector(".puntuacionOnclick");
// const resultP = document.querySelector(".result-puntuacion");
// const main = document.querySelector("main");
// let count =0;
// function clicked(ronda){

// punt.onclick = () =>{

//   console.log(count);
//   if( count >= 1){
//     removeF();
//   }else{
//   main.style.display= "none";
//   let div = document.createElement("div");
//   let laskeys = JSON.parse(localStorage.getItem("Users"))[0].users.length - 1;
//   div.innerHTML = `<h2>Bienvenido ${JSON.parse(localStorage.getItem("Users"))[0].users[laskeys]} </h2>
//     <table class="table table-striped table-bordered">
//       <thead>
//         <tr>
//             <th>Ronda</th>
//             <th>Errores</th>
//             <th>Puntuacion</th>
//         </tr>
//       </thead>
//       <tbody>
//             <td></td>
//             <td></td>
//             <td></td>
//       </tbody>
//     </table>
//    <div> <button onclick="regresarAl()" class= "btn btn-primary regresar-a"> Regresar </button> </div>`;
//   div.className = "text-center";
//   resultP.append(div);
//   }
//   count +=1;
// }
// }
// clicked("")

// function removeF(){
//   document.body.removeChild(div);
//   resultP.style.display = "contents";
// }

// function regresarAl(){
//   main.style.display = "contents";
//   console.log("salir")
//   resultP.style.display = "none";
// }

//-------------------------------------------------Clase de la segunda ronda

class rond2 {
  constructor(value) {
    this.responsep = document.querySelector(".res-rond2")
    this.content;
    this.value = value;
  }

  picture () {
    
    this.content = document.createElement("div");
    this.content.className = "centrado-div h2 tam";
    this.content.innerHTML = `${this.value}`;
    this.responsep.style.background = "#1ae707c7";
    this.responsep.append(this.content);
    
  }
}

//-----------------------------------------------funcion de resultado-----

const resultR2 = (index) =>{
  const responseWrite = [["PAPÁ","PÁPA"]];
  let pictureR = document.querySelector(".res-rond2")
  let cases = Array.from(pictureR.children).map(x => x.textContent).reduce((x,y) => x+y);
  if (cases == responseWrite[index][0] || cases == responseWrite[index][1]){
    displayNone();
    correctOrIcorrect("Correcto","😄")
    new picture("", index + 3).next();
  }else{
    displayNone();
    correctOrIcorrect("Incorrecto","😥");
    new picture("", index + 3).next();
  }
  console.log(cases);
}
/// --------------------------funcion A------------------

function displayNone(){
  papaArray.forEach((x) =>
    Array.from(x.children).forEach((x) =>
      Array.from(x.children).forEach((x) => x.style.display = "none")));
}

///---------------------------Funcion de Correcto o Incorrecto 

function correctOrIcorrect(state, emoji){
  let creadora = document.createElement("h2");
  let response2 = document.querySelector(".response3");
  let div_img = document.querySelector(".img1-rond2")
  creadora.innerHTML = `<strong class="h1">${state} <span class="emoji"> ${emoji} </span></strong>`;
  creadora.style.color = state == "Correcto"? "#00f254":"#EB2623";
  creadora.style.background = "white";
  creadora.className = "text-center";
  response2.append(creadora);
  response2.insertBefore(creadora,div_img);
}
/// -------------------------------------------------Evento de la segunda ronda 1-------------------------------

const papa = document.querySelector(".fun-button");
const papaArray = Array.from(papa.children);
let county  =0;
papaArray.forEach((x) =>
  Array.from(x.children).forEach((x) =>
    Array.from(x.children).forEach((x) =>
      x.addEventListener("click", (event) => {
        if (event.target.nodeName == "BUTTON") {
          
          event.target.style.display ="none";
          
          console.log("si llego", event.target.textContent);
          new rond2(event.target.textContent).picture();
          county +=1;
          if (county >= 4){
              resultR2(0);
          }
        }
      })
    )
  )
);
//county =0;
