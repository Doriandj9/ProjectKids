
const form = document.querySelector("form");
const elementsForm = Array.from(form);
let person = [{"users":[]}];
//console.log(elementsForm);
form.addEventListener("input",()=> {
    setTimeout(() => {
        if(elementsForm[0].value > 5){
            elementsForm[0].className = "form-control error";
            console.log(elementsForm[0])
        } 
    },50)
})
form.addEventListener("submit", event =>{
    let userName = elementsForm[0];
    let userEge = elementsForm[1];
    let nameUser= tableHash(userName.value);
    // console.log(nameUser);
    // localStorage.setItem(`${nameUser}`, JSON.stringify(userName.value));
     person[0].users.push(userName.value);

        localStorage.setItem("Users",JSON.stringify(person))
});

const tableHash = (userName) => {
    
    let newHash = userName.split("").map(char => char.charCodeAt(0)).join("");
    return "User"+newHash
}


// console.log(localStorage.getItem("User7797114105111"))
// let content = document.createElement("h1");
//     content.innerHTML = JSON.parse(localStorage.getItem("User7797114105111"));
//     header.appendChild(content);