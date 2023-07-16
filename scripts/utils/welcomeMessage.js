import { userID } from "../index.js"
let users = JSON.parse(localStorage.getItem("users"))
let newUser = JSON.parse(localStorage.getItem("welcome")) 

const divWelcomeMessage = document.getElementById("msgBemVindo")
const containerFotoBemVindo = document.querySelector("#fotoUserBemVindo")
divWelcomeMessage.style.zIndex = "4"

document.addEventListener("DOMContentLoaded", loadMessage)

function loadMessage() {
    
    if (userID != undefined && newUser != 1) {
        let imgUser
        newUser = localStorage.setItem("welcome", 1)
        for (let user of users) {
            if (user.id == userID) {
                imgUser = user.img
            }
        }
        
        if (imgUser) {
            containerFotoBemVindo.src = imgUser
        }

        setTimeout(() => {
            divWelcomeMessage.style.display = "block"
            divWelcomeMessage.classList.toggle("flip")

            setTimeout(() => {
                divWelcomeMessage.classList = "esconder"
            }, 1500);

            setTimeout(() => {
                divWelcomeMessage.style.display = "none"
            }, 2500);
        }, 600)

    }

}