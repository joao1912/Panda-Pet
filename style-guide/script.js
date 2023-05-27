const containerBotaoEscolha = document.getElementById("botaoEscolha")
const botaoDeTroca = document.getElementById("botaoTrocaEscolha")
containerBotaoEscolha.addEventListener("click", function(event){
    const id = event.target.id

    if (id === "op2") {
        botaoDeTroca.style.left = "68.2%"
    } else if (id === "op1") {
        botaoDeTroca.style.left = "62%"
    }
 
})

function teste() {
    window.scroll(0,findPos(document.getElementById("containerIcones")));
}