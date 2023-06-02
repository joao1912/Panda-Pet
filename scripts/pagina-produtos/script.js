import { saveLocalStorage } from "../utils/saveLocalStorage.js"
import { showProducts } from "../utils/showProducts.js"


let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

let categoryOrNot = JSON.parse(localStorage.getItem("category")) 
localStorage.removeItem("category")

function verifyUserOnline() {

    let userOnline
    if (users) {
    for (let obj of users) {
            if (obj.online) {
                userOnline = obj.id
            }
        } 
    }
    return userOnline || undefined
}

function setPerfilOnline() {
    
    if (users[userID].img) {
        let urlImagem = users[userID].img
        const fotoPerfil = document.getElementById("fotoPerfilOnline")
        fotoPerfil.src = urlImagem
    } 

    const containerUser = document.getElementById("containerPerfil")
    containerUser.style.height = "90px"
    containerUser.style.width = "200px"
    containerUser.style.marginLeft = "-5px"
    const botaoLogar = document.getElementById("botaoLogar")
    const containerUserLogado = document.getElementById("userLogado")
    botaoLogar.style.display = "none"
    containerUserLogado.style.display = "flex"

    document.getElementById("botaoSair").addEventListener("click",function sair(){
        users[userID].online = false
        window.location.href = "../../index.html"
        saveLocalStorage(users)
    })
    
}

if (userID) {
    setPerfilOnline()

    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", trocaFotoPerfil)
}

function trocaFotoPerfil() {
    const fileTrocaFoto = document.getElementById("inptTrocaFoto")

    fileTrocaFoto.click();
    fileTrocaFoto.addEventListener("change", readImage, false);
    const file = document.getElementById("fotoPerfilOnline")

    function readImage() { 
        let fr = new FileReader();
        fr.onload = function(event) {
            file.src = event.target.result
            
        };       
        fr.readAsDataURL(this.files[0]);

        fr.addEventListener("load",() => {
            users[userID].img = fr.result
            saveLocalStorage(users)
        })
    }
}

const iconeDoPerfil = document.getElementById("perfilIcon")

iconeDoPerfil.addEventListener("click",function(){
    const tabelaPerfil = document.getElementById("containerPerfil")

    function redirecionarCadastro(){
        window.location.href = "../../paginas/cadastro-login.html"
    }
    
    let visibility = tabelaPerfil.style.display

    if (visibility === "none") {
        tabelaPerfil.style.display = "flex"

        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.addEventListener("click", redirecionarCadastro)

    } else {
        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.removeEventListener('click', redirecionarCadastro)
        tabelaPerfil.style.display = "none"
    }
})

const nav = document.querySelector("nav")
nav.addEventListener("click",function(event){
   
    switch(event.target.id) {
        case "forHome":
            
            window.location.href = "../../index.html"
            break

        case "forAcessorios":

            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("acessorios")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("acessorios")) 
            }   

            break
        
        case "forAlimentacao":
           
            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("alimentos")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("alimentos")) 
            }

            break

        case "forBrinquedos":
           
            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("brinquedos")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("brinquedos")) 
            }

            break
        
        case "forAgendamento":
        
            //href
            break
    }
})

if (categoryOrNot) {
    switch (categoryOrNot) {
        case "acessorios": 
            showProducts("acessorios")
            break
        case "alimentos":
            showProducts("alimentos")
            break
        case "brinquedos":
            showProducts("brinquedos")
            break
    }
}

export function constructorProductsElements(id, nome, preco, imagem, descricaoImagem) {

    //botao do carrinho criado

    let btnCarrinho = document.createElement("button")
    btnCarrinho.classList = "btnCarrinho"
    let imgCarrinho = document.createElement("img")
    imgCarrinho.classList = 'imgCart'
    imgCarrinho.src = "../../imagens/icons/carrinho_add.svg"
    btnCarrinho.value = id
    let iconeCarrinho = document.createElement("i")
   
    if (userID === undefined) {
        imgCarrinho.src = "../../imagens/icons/carrinho_add.svg"
    } else {
        let carrinho  = users[userID].carrinho
        
        if (carrinho.length === 0) {
            imgCarrinho.src = "../../imagens/icons/carrinho_add.svg"
           
        } else {

            let flag = false
            for (let obj of carrinho) {
                if (obj.codigo == id) {
                    flag = true
                }

                if (flag) {
                    imgCarrinho.src = "../../imagens/icons/remove_shopping_cart.svg"
                } else {
                    imgCarrinho.src = "../../imagens/icons/carrinho_add.svg"
                }

            }
        }
    }
   
    iconeCarrinho.appendChild(imgCarrinho)
    btnCarrinho.appendChild(iconeCarrinho)

    //botao de compra

    let btnComprar = document.createElement("button")
    btnComprar.classList = "btnComprar"
    let textComprar = document.createTextNode("Comprar")
    btnComprar.appendChild(textComprar)

    //div container dos botoes

    let divContainerBotoes = document.createElement("div")
    divContainerBotoes.classList = "containerBotoes"

    divContainerBotoes.appendChild(btnComprar)
    divContainerBotoes.appendChild(btnCarrinho)

    //div nome do produto

    let divNomeProduto = document.createElement("div")
    let textNomeProduto = document.createTextNode(nome) 
    divNomeProduto.classList = "titleProd"
    divNomeProduto.appendChild(textNomeProduto)

    //div preço do produto

    let divPrecoProduto = document.createElement("div")
    let textPrecoProduto = document.createTextNode(`R$ ${preco.toFixed(2)}`) 
    divPrecoProduto.classList = "precoProd"
    divPrecoProduto.appendChild(textPrecoProduto)

    //div container de descrição do produto(preço e nome)
    
    let divDescricao = document.createElement("div")
    divDescricao.classList = "descricao"

    divDescricao.appendChild(divNomeProduto)
    divDescricao.appendChild(divPrecoProduto)

    //div que separa a descrição, preço e nome da imagem do produto

    let divContainerInferior = document.createElement("div")

    divContainerInferior.appendChild(divDescricao)
    divContainerInferior.appendChild(divContainerBotoes)

    //img do produto

    let elementImg = document.createElement("img")
    elementImg.src = `../../imagens/${imagem}`
    elementImg.alt = descricaoImagem

    //div que contem a descrição e imagem do produto

    let divInterna = document.createElement("div")
    divInterna.appendChild(elementImg)
    divInterna.appendChild(divContainerInferior)

    //div container do produto inteiro

    let divContainerProduto = document.createElement("div")
    divContainerProduto.classList = "produto"
    divContainerProduto.appendChild(divInterna)
    
    return divContainerProduto

}


export function setButtonsCartsListeners() {
    const botoesCarrinho = document.querySelectorAll(".btnCarrinho")
   
    ;[...botoesCarrinho].forEach(botao => {
        
        botao.addEventListener("click",function(event){
            let elemento = event.target
            let produtoId = botao.value 
            if (elemento.src === undefined) {
                elemento = elemento.children[0].children[0]
            }

            if (userID === undefined) {
                window.location.href = "../../paginas/cadastro-login.html" 
            }
            if (userID === undefined) return

            saveOrDeleteProduct(produtoId, elemento)
       
        })
      
    })
}


function saveOrDeleteProduct(produtoId, imgIcon) { 

    let carrinho = users[userID].carrinho
    let searchProduto = carrinho.filter( obj => obj.codigo == produtoId)
    
    if (searchProduto.length === 0) {

        imgIcon.src = "../../imagens/icons/remove_shopping_cart.svg" 
      
        let objProduto = {
            codigo: produtoId,
            quantidade: 1
        }

        users = JSON.parse(localStorage.getItem("users"))
        users[userID].carrinho.push(objProduto)

        saveLocalStorage(users)

    } else {
     
        imgIcon.src = "../../imagens/icons/carrinho_add.svg" 
        
        let index = 0
        let produtoIndex 
        
        for (let obj of users[userID].carrinho) { 
            
            if (obj.codigo === produtoId) {
                produtoIndex = index
            }
            index++
        }
        users = JSON.parse(localStorage.getItem("users"))
        users[userID].carrinho.splice(produtoIndex, 1)

        saveLocalStorage(users)
    }
}

const barra_pesquisa = document.getElementById("barraPesquisa")
barra_pesquisa.addEventListener("keyup", barraPesquisa)

function barraPesquisa() {
    
    let stringSearch = barra_pesquisa.value
    stringSearch = stringSearch.trim()
    let searhProdutos = document.querySelectorAll(".produto")

    if (stringSearch == "") {
        let arrayProdutos = [...searhProdutos]
        for (let produto of arrayProdutos) {
            produto.style.display = "flex"
        }
    }

    if (searhProdutos.length == 0) return

   

    ;[...searhProdutos].forEach( produto => {

        let title = produto.children[0].children[1].children[0].children[0].textContent 
        
        let exist = title.normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "")
        .toLowerCase()
        .includes(stringSearch.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
        .toLowerCase())

        if (!exist) {
            produto.style.display = "none"
        } else {
            produto.style.display = "flex"
        }
    })
}