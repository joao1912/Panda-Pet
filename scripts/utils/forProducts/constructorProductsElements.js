import { userID } from "../../pag-produtos.js"


export function constructorProductsElements(id, nome, preco, imagem, descricaoImagem) {
    let users = JSON.parse(localStorage.getItem("users"))
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
        let carrinho
        for (let user of users) {
            if (user.id == userID) {
                carrinho = user.carrinho
            }
        }
        
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
    elementImg.classList = "imageProduct"
    if(imagem.substring(0, 5) != "data:") {
    elementImg.src = `../../imagens/${imagem}`
    } else {
        elementImg.src = imagem
    }
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