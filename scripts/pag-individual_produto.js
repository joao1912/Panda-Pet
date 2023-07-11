import {verifyUserOnline} from "./utils/verifyUserOnline.js"
import {saveLocalStorage} from "./utils/saveLocalStorage.js"
let nome,descricao,imagem,descricaoImagem,preco,classificacao

const btnCarrinho = document.getElementById("btnCarrinhoProdIndividual")
const userID = verifyUserOnline()

let carrinho


export function loadInfoProducts(codigoProduto) {

    let listaProdutos = JSON.parse(localStorage.getItem("listaProdutos")) 
    let users = JSON.parse(localStorage.getItem("users"))

    if (userID == undefined) {
        window.location.href = "../paginas/cadastro-login.html"
    }

    for (let user of users) {
        if (user.id == userID) {
            carrinho = user.carrinho
    
        }
    }
    
    for (let obj of listaProdutos){

        if (obj.codigo == codigoProduto){

            nome = obj.nome
            descricao = obj.descricao
            imagem = obj.imagem
            descricaoImagem = obj.descricaoImagem
            preco = obj.preco
            classificacao = obj.classificacao

            break

        }

    }
    
    const tituloProduto = document.getElementById("tituloProduto")
    const codigoElemento = document.getElementById("descricaoCodigo")
    const descricaoProduto = document.getElementById("informacoesProduto")
    const precoProduto = document.getElementById("alteracoesDescricaodivs")
    const imgProduto = document.getElementById("imagemProdutoIndividual")

    tituloProduto.textContent = nome
    codigoElemento.textContent = `Código: ${codigoProduto}`
    descricaoProduto.textContent = descricao
    precoProduto.textContent = `R$ ${preco.toFixed(2)}`
    imgProduto.src = imagem
    imgProduto.alt = descricaoImagem

    setStars(classificacao)

    btnCarrinho.textContent = "Adicionar no Carrinho"

    if (carrinho.length > 0) {
        for (let prod of carrinho) {
            if (prod.codigo == codigoProduto) {
                btnCarrinho.textContent = "Remover do Carrinho"
            }
        }
    }

    if (btnCarrinho.textContent == "Remover do Carrinho") {
        btnCarrinho.addEventListener("click", () => {removerItemCarrinho(codigoProduto)})
    } else if ("Adicionar no Carrinho") {
        btnCarrinho.addEventListener("click", () => {addItemCarrinho(codigoProduto)})
    }


}


function setStars(classificacao) {
    const containerStars = document.getElementById("containerStars")
    containerStars.innerHTML = ""
    let stars = []

    for (let i = 0 ; i < classificacao ; i++) {
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
    let users = JSON.parse(localStorage.getItem("users"))

    for (let i = 0 ; i < carrinho.length ; i++) {
        if (carrinho[i].codigo == cod) {
            carrinho.splice(i, 1)
            break
        }
    }

    for (let user of users) {
        if (user.id == userID) {
            user.carrinho = carrinho
            
        }
    }
    saveLocalStorage(users)

    btnCarrinho.textContent = "Adicionar no Carrinho"
    
}

function addItemCarrinho(cod) {
    let users = JSON.parse(localStorage.getItem("users"))

    let produtoAdd = {
        codigo: Number(cod),
        quantidade: 1
    }

    for (let user of users) {
        if (user.id == userID) {
            user.carrinho.push(produtoAdd)
            
        }
    }

    saveLocalStorage(users)

    btnCarrinho.textContent = "Remover do Carrinho"

}
