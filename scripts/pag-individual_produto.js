import { verifyUserOnline } from "./utils/verifyUserOnline.js"
import { saveLocalStorage } from "./utils/saveLocalStorage.js"
import { produtos } from "./utils/produtos.js"
import { getRandomProducts} from "./pag-carrinho.js"

let users = JSON.parse(localStorage.getItem("users"))
const userID = verifyUserOnline()
const btnCarrinho = document.getElementById("btnCarrinhoProdIndividual")


export function loadInfoProducts(codigoProduto) {

    if (userID == undefined) {
        window.location.href = "../paginas/cadastro-login.html"
    }


    let nome, preco, descricao, imagem, descricaoImagem, classificacao

    for (let obj of produtos) {

        if (obj.codigo == codigoProduto) {

            nome = obj.nome
            descricao = obj.descricao
            imagem = obj.imagem
            descricaoImagem = obj.descricaoImagem
            preco = obj.preco
            classificacao = obj.classificacao

            break

        }

    }

    if (nome == "") {
        return
    }

    const tituloProduto = document.getElementById("tituloProduto")
    const codigoElemento = document.getElementById("descricaoCodigo")
    const descricaoProduto = document.getElementById("informacoesProduto")
    const precoProduto = document.getElementById("alteracoesDescricaodivs")
    const imgProduto = document.getElementById("imagemProdutoIndividual")

    tituloProduto.textContent = nome
    codigoElemento.textContent = `SKU ${codigoProduto}`
    descricaoProduto.textContent = descricao
    precoProduto.textContent = `R$ ${preco.toFixed(2)}`
    imgProduto.src = imagem
    imgProduto.alt = descricaoImagem

    setStars(classificacao)

    let index = users[userID].carrinho.findIndex(produto => produto.codigo == codigoProduto)
    if (index > -1) {
        btnCarrinho.textContent = "Remover item do carrinho"
    }

    btnCarrinho.onclick = function () {

        index = users[userID].carrinho.findIndex(produto => produto.codigo == codigoProduto)

        if (index > -1) {

            removerItemCarrinho(codigoProduto)
            btnCarrinho.textContent = "Adicionar ao Carrinho"

        } else {

            addItemCarrinho(codigoProduto)
            btnCarrinho.textContent = "Remover item do carrinho"

        }

    }


    const randomProducts = getRandomProducts(4)
    let sugestoesProdutos = document.querySelectorAll(".sugest")
    index = 0
    
    sugestoesProdutos.forEach((sugestaoProduto) => {
    
        let productElement = document.createElement("img")

        productElement.id = produtos[randomProducts[index]].codigo

        productElement.src = produtos[randomProducts[index]].imagem

        productElement.alt = produtos[randomProducts[index]].descricaoImagem

        productElement.addEventListener("click", function() {

            loadInfoProducts(Number(productElement.id))

        })

        sugestaoProduto.innerHTML = ""
        sugestaoProduto.appendChild(productElement)
        index++
    })

}


function setStars(classificacao) {
    const containerStars = document.getElementById("containerStars")
    containerStars.innerHTML = ""
    let stars = []

    for (let i = 0; i < classificacao; i++) {
        stars.push("./imagens/estrela-cheia.png")
    }

    while (stars.length != 5) {
        stars.push("./imagens/estrela-vazia.png")
    }

    for (let star of stars) {
        let img = document.createElement("img")
        img.src = star

        if (star.indexOf("vazia") !== -1) {
            img.alt = "Estrela Cheia"
        } else {
            img.alt = "Estrela Vazia"
        }
        containerStars.appendChild(img)
    }
}

function removerItemCarrinho(cod) {

    let index = users[userID].carrinho.findIndex(produto => produto.codigo == cod)

    if (index > -1) {

        btnCarrinho.textContent = "Adicionar no Carrinho"

        users[userID].carrinho.splice(index, 1)
        saveLocalStorage(users)
    }

}

function addItemCarrinho(cod) {

    let produtoAdd = {
        codigo: Number(cod),
        quantidade: 1
    }

    users[userID].carrinho.push(produtoAdd)

    saveLocalStorage(users)

    btnCarrinho.textContent = "Remover do Carrinho"

}
