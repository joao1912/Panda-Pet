import { verifyUserOnline } from './utils/verifyUserOnline.js'

let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

const botaoEscolhaGenero = document.getElementById("botaoEscolhaGenero")
const btnMacho = document.getElementById("btnMacho")
let btnBeforeGenero 

;[...document.styleSheets[7].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnMacho::before") {
    btnBeforeGenero = styleSheet
  }
  
})

botaoEscolhaGenero.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnMacho":
            btnBeforeGenero.style.left = "3px"
            btnMacho.dataset.content = "Macho"
            break
        case "btnFemea":
            btnBeforeGenero.style.left = "102px"
            btnMacho.dataset.content = "Fêmea"
            break
    }
})

const botaoEscolha = document.getElementById("botaoEscolha")
const btnNo = document.getElementById("btnNo")
let btnBefore 



;[...document.styleSheets[7].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnNo::before") {
    btnBefore = styleSheet
  }
  
})

const areaText = document.getElementById("quadro")

botaoEscolha.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnNo":
            btnBefore.style.left = "3px"
            btnNo.dataset.content = "Não"
            areaText.setAttribute("disabled", true)
            areaText.value = ""
            break

        case "btnYes":
            btnBefore.style.left = "102px"
            btnNo.dataset.content = "Sim"
            areaText.removeAttribute("disabled")
            break
    }
})