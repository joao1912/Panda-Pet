const botaoEscolha = document.getElementById("botaoEscolha")
const btnYes = document.getElementById("btnYes")
let btnBefore 

;[...document.styleSheets[2].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnYes::before") {
    btnBefore = styleSheet
  }
  
})

botaoEscolha.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnYes":
            btnBefore.style.left = "3px"
            btnYes.dataset.content = "Sim"
            break
        case "btnNo":
            btnBefore.style.left = "102px"
            btnYes.dataset.content = "Não"
            break
    }
})