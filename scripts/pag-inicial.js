import {verifyUserOnline} from "./utils/verifyUserOnline.js"

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

function setTableMyShopping() {
    
    let totCompras
    let produtos = JSON.parse(localStorage.getItem("listaProdutos"))
    const tbody = document.querySelector("#containerTable > table > tbody")
    tbody.innerHTML = ""
    for (let obj of users) {
        if (obj.id === userID) {
            totCompras = obj.atividadeNoSite.produtosComprados
            break
        }
    }

    for (let i = 0 ; i < totCompras.length ; i++) {

        let nomeProd, codigoProd, precoProd
        
        for (let prod of produtos) {
            if (prod.codigo == totCompras[i]) {
                nomeProd = prod.nome
                codigoProd = prod.codigo
                precoProd = prod.preco
                break
            }
        }

        let tr = constructorTableMyShopping(codigoProd, nomeProd, precoProd)
        tbody.appendChild(tr)
    }
}

function constructorTableMyShopping(cod, nome, preco) {

    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdPreco = document.createElement("td")

    let textCodigo = document.createTextNode(`${cod}`)
    let textNome = document.createTextNode(`${nome}`)
    let textPreco = document.createTextNode(`R$ ${preco.toFixed(2)}`)

    tdCodigo.appendChild(textCodigo)
    tdCodigo.classList.add("tdCodProduct")

    tdNome.appendChild(textNome)

    tdPreco.appendChild(textPreco)
    tdPreco.classList.add("tdPrecoProduct")

    let tr = document.createElement("tr")
    tr.appendChild(tdCodigo)
    tr.appendChild(tdNome)
    tr.appendChild(tdPreco)

    return tr
}

const botaoFecharMinhasCompras = document.getElementById("btnCloseMinhasCompras")
botaoFecharMinhasCompras.addEventListener("click", function(){
    const telaMinhasCompras = document.getElementById("containerMinhasCompras")
    
    if (telaMinhasCompras.style.display === "none") {
        telaMinhasCompras.style.display = "flex"
    } else {
        telaMinhasCompras.style.display = "none"
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

