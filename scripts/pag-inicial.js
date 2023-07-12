import {verifyUserOnline} from "./utils/verifyUserOnline.js"
import { setTableMyShopping } from "./index.js";

let users = JSON.parse(localStorage.getItem("users"))

$('#containerCarrossel').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
});

let userID = verifyUserOnline()

const btnAgendar = document.getElementById("botaoTransparente")
btnAgendar.addEventListener("click", function() {
    const containerTelaInicial = document.getElementById("containerTelaInicial")
    const containerTelaProdutos = document.getElementById("containerTelaProdutos")
    const containerTelaAgendamento = document.getElementById("containerTelaAgendamento")
    const containerTelaIndividualProd = document.getElementById("containerTelaIndividualProduto")
    const containerTelaCarrinho = document.getElementById("containerTelaCarrinho")

    const telas = [containerTelaInicial, containerTelaProdutos, containerTelaAgendamento, containerTelaIndividualProd, containerTelaCarrinho]

    telas.forEach( tela => {
        tela.style.display = "none"
    })

    containerTelaAgendamento.style.display = "block"
})

const containerBtnsPerfilUser = document.getElementById("excluirEeditar")
containerBtnsPerfilUser.addEventListener("click", function(event){
    let id = event.target.id
    const telaMinhasCompras = document.getElementById("containerMinhasCompras")

    switch(id) {
        case "btnExcluirUser":

            break
        case "btnEditUser":
            
            break
        case "btnMyShopping":
            setTableMyShopping()
            telaMinhasCompras.style.display = "flex"

            break
    }
})



let nome 
let dataConta
let img

function puxarInfos(){
   
    let users=localStorage.getItem("users")
    users=JSON.parse(users) 

    for(let obj of users){
       

        if(obj.id == userID){
            nome=obj.nome
            dataConta=obj.date.text
            img=obj.img
        
        }
    }
   inserirInfo()
}

function inserirInfo(){
   let nomeUser = document.getElementById("nomeUser")
   let contaUser= document.getElementById("contaUser")
   let imagem=document.getElementById("imagem")

   nomeUser.value=nome
   contaUser.value=dataConta
   imagem.src=img

   const imgUser = document.getElementById("imagem")
   imgUser.addEventListener(() => {trocaFotoPerfil("imagem", "userImg")})

}

