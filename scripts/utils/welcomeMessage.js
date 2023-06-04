import { userID } from "../pagina-produtos/script.js"
let users = JSON.parse(localStorage.getItem("users"))
let newUser = JSON.parse(localStorage.getItem("welcome")) 

const divWelcomeMessage = document.getElementById("msgBemVindo")
const containerFotoBemVindo = document.querySelector("#fotoUserBemVindo")

if (userID != undefined && newUser != 1) {

    newUser = localStorage.setItem("welcome", 1)
    let imgUser = users[userID].img

    if (imgUser) {
        containerFotoBemVindo.src = imgUser
    }

    divWelcomeMessage.style.display = "block"
    divWelcomeMessage.classList.toggle("flip")

    setTimeout(() => {
        divWelcomeMessage.classList = "esconder"
    }, 1500);

    setTimeout(() => {
        divWelcomeMessage.style.display = "none"
    }, 2500);

}