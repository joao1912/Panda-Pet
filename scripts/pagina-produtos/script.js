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


const nav = document.querySelector("nav")

nav.addEventListener("click",function(event){
    const h1Produtos = document.getElementById("h1Produtos")
    const containerProdutos = document.getElementById("containerProdutos")
    let indexProdutos

    switch(event.target.id) {
        case "forHome":
            window.location.href = "../../index.html"
            break

        case "forAcessorios":
            h1Produtos.textContent = "Acessórios"
            indexProdutos = getIndexCategory("acessorios")
            containerProdutos.innerHTML = ""

            setElements(indexProdutos, constructorElements)
            
            break
        
        case "forAlimentacao":
            h1Produtos.textContent = "Alimentação"
            indexProdutos = getIndexCategory("alimentacao")
            containerProdutos.innerHTML = ""

            setElements(indexProdutos, constructorElements)

            break

        case "forBrinquedos":
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

function botoesListener() {
    const botoesCarrinho = document.querySelectorAll(".btnCarrinho")
    const iconCart = document.querySelectorAll(".imgCart")
   
    ;[...botoesCarrinho].forEach(botao => {
        
        botao.addEventListener("click",function(event){
            
        if (userID === undefined) {
            window.location.href = "../../paginas/cadastro-login.html" 
        }

        let produtoId = botao.value 
        
        if (botao.textContent === "shopping_cart" && userID != undefined) {
            event.target.src = "../../imagens/icons/remove_shopping_cart.svg" //inderir essa imagem no botao correto

            let objProduto = {
                cod: produtoId,
                quant: 1
            }

            users[userID].carrinho.push(objProduto)

            let usersJson = JSON.stringify(users)
            localStorage.setItem("users", usersJson)

        } else if (userID != undefined) {

            event.target.src = "../../imagens/icons/carrinho_add.svg" //inderir essa imagem no botao correto
            let index = 0
            let produtoIndex
            
            for (let obj of users[userID].carrinho) {
                
                if (obj.cod === produtoId) {
                    produtoIndex = index
                }
                index++
            }
            users[userID].carrinho.splice(produtoIndex, 1)

            let usersJson = JSON.stringify(users)
            localStorage.setItem("users", usersJson)
        }

        })
    })
}

    