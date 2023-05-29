import { produtos } from "../utils/produtos.js"
let users = JSON.parse(localStorage.getItem("users"))
let userID

if (users) {
   for (let obj of users) {
        if (obj.online) {
            userID = obj.id
        }
    } 
}

if (userID) {

    if (users[userID].img) {
        let urlImagem = users[userID].img
        const fotoPerfil = document.getElementById("fotoPerfil")
        fotoPerfil.src = urlImagem
    }

    //fazer a telinha maior com a parte da foto e a opição de deslogar
    //se não tiver foto ta pra por a foto default como um botao para add

}


const iconeDoPerfil = document.getElementById("perfilIcon")
iconeDoPerfil.addEventListener("click",function(){
const tabelaPerfil = document.getElementById("containerPerfil")

function redirecionar(){
    window.location.href = "../../paginas/cadastro-login.html"
}
    
    let visibility = tabelaPerfil.style.display

    if (visibility === "none") {
        tabelaPerfil.style.display = "flex"

        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.addEventListener("click", redirecionar)

    } else {
        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.removeEventListener('click', redirecionar)
        tabelaPerfil.style.display = "none"
    }
})

const nav = document.querySelector("nav")
nav.addEventListener("click",function(event){
    const h1Produtos = document.getElementById("h1Produtos")
    const containerProdutos = document.getElementById("containerProdutos")
    const containerErro404 = document.getElementById("containerErro404")
    let indexProdutos

    switch(event.target.id) {
        case "forHome":
            
            window.location.href = "../../index.html"
            break

        case "forAcessorios":
            containerErro404.style.display = "none"

            h1Produtos.textContent = "Acessórios"
            indexProdutos = getIndexCategory("acessorios")
            containerProdutos.innerHTML = ""

            setElements(indexProdutos, constructorElements)
            
            break
        
        case "forAlimentacao":
            containerErro404.style.display = "none"


            h1Produtos.textContent = "Alimentação"
            indexProdutos = getIndexCategory("alimentacao")
            containerProdutos.innerHTML = ""

            setElements(indexProdutos, constructorElements)

            break

        case "forBrinquedos":
            containerErro404.style.display = "none"

            h1Produtos.textContent = "Brinquedos"
            indexProdutos = getIndexCategory("brinquedos")
            containerProdutos.innerHTML = ""

            setElements(indexProdutos, constructorElements)

            break
        
        case "forAgendamento":
        
            //href
            break
    }
})

function getIndexCategory(getCategoria) {
    let indexProd = []
    let index = 0
    for(let obj of produtos) {
        
        if (obj.categoria === getCategoria) {
            indexProd.push(index)
        }
    
        index++
    }

    return indexProd
}

function setElements(indexProdutos, funcConstructor) {
    for (let c = 0; c < indexProdutos.length ; c++) {
        let index = indexProdutos[c]
        
        if (produtos[index].estoque != 0) {
            let elemento = funcConstructor(produtos[index].codigo ,produtos[index].nome, produtos[index].preco , produtos[index].imagem, produtos[index].descricaoImagem)
            const containerProdutos = document.getElementById("containerProdutos")
            containerProdutos.appendChild(elemento)
        }
        
    }

    botoesListener()
    
}

function constructorElements(id, nome, preco, imagem, descricaoImagem) {

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
            for (let obj of carrinho) {
                if (obj.cod === id) {
                    imgCarrinho.src = "../../imagens/icons/remove_shopping_cart.svg"
                } else {
                    imgCarrinho.src = "../../imagens/icons/carrinho_add.svg"
                }
            }
        }
    }
    
    // iconeCarrinho.appendChild(textIconeCarrinho)
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

let produtoAdd = false
function botoesListener() {
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

        saveOrNotProduct(produtoId, elemento)
       
        })
      
    })
}

function saveOrNotProduct(produtoId, imgIcon) { //tem que arrumar(ta bugado)

    if (produtoAdd === false) {
        produtoAdd = true

        imgIcon.src = "../../imagens/icons/remove_shopping_cart.svg" 
      
        let objProduto = {
            cod: produtoId,
            quant: 1
        }

        users = JSON.parse(localStorage.getItem("users"))
        users[userID].carrinho.push(objProduto)

        let usersJson = JSON.stringify(users)
        localStorage.setItem("users", usersJson)

    } else {

        produtoAdd = false
        imgIcon.src = "../../imagens/icons/carrinho_add.svg" 
        
        let index = 0
        let produtoIndex 
        
        for (let obj of users[userID].carrinho) { 
            
            if (obj.cod === produtoId) {
                produtoIndex = index
            }
            index++
        }
        users = JSON.parse(localStorage.getItem("users"))
        users[userID].carrinho.splice(produtoIndex, 1)

        let usersJson = JSON.stringify(users)
        localStorage.setItem("users", usersJson)
    }
}

    