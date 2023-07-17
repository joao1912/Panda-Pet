import { verifyUserOnline } from "./utils/verifyUserOnline.js"
import { saveLocalStorage } from "./utils/saveLocalStorage.js"
import { produtos } from "./utils/produtos.js"
import { getRandomProducts, pegaCarrinho, finalizarCompra } from "./pag-carrinho.js"
import { validaCep, calcularFrete } from "./utils/checkCep.js"

let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()
const btnCarrinho = document.getElementById("btnCarrinhoProdIndividual")
const btnRemove = document.getElementById("removeToCartButtonIndividual")
const inputQuantidade = document.getElementById("botaoINPTIndividual");
const btnAdd = document.getElementById("addToCartButtonIndividual")
const btnCheckoutIndividual = document.getElementById("btnCheckoutIndividual")

export function loadInfoProducts(codigoProduto) {

    if (userID == undefined) {
        window.location.href = "paginas/cadastro-login.html"
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

    if(imgProduto.src.substring(0, 5) != "data:") {

        imgProduto.src = imgProduto.src.replace("Panda-Pet/", "Panda-Pet/imagens/")

    }
    
    imgProduto.alt = descricaoImagem

    setStars(classificacao)

    let carrinho = pegaCarrinho()
    let index = carrinho.findIndex(produto => produto.codigo == codigoProduto)
    if (index > -1) {

        inputQuantidade.value = carrinho[index].quantidade

        btnCarrinho.textContent = "Remover item do carrinho"
        btnAdd.removeAttribute("disabled")
        btnRemove.removeAttribute("disabled")

    }

    btnCarrinho.onclick = function () {

        let carrinho = pegaCarrinho()
        let index = carrinho.findIndex(produto => produto.codigo == codigoProduto)
    
        if (index > -1) {

            removeProdutoDoCarrinho(codigoProduto, 1, true)

            btnCarrinho.textContent = "Adicionar ao Carrinho"
            btnAdd.setAttribute("disabled", "true")
            inputQuantidade.value = 1
            btnRemove.setAttribute("disabled", "true")

        } else {

            adicionaProdutoAoCarrinho(codigoProduto)

            btnCarrinho.textContent = "Remover item do carrinho"
            btnAdd.removeAttribute("disabled")
            btnRemove.removeAttribute("disabled")

        }

    }


    const randomProducts = getRandomProducts(4)
    let sugestoesProdutos = document.querySelectorAll(".sugest")
    index = 0

    sugestoesProdutos.forEach((sugestaoProduto) => {

        let productElement = document.createElement("img")

        productElement.id = produtos[randomProducts[index]].codigo

        let imgProduct = produtos[randomProducts[index]].imagem

        if(imgProduct.substring(0, 5) != "data:") {

            imgProduct = `./imagens/${imgProduct}`

    }

    productElement.src = imgProduct
    
productElement.alt = produtos[randomProducts[index]].descricaoImagem

        productElement.addEventListener("click", function () {

            loadInfoProducts(Number(productElement.id))

        })

        sugestaoProduto.innerHTML = ""
        sugestaoProduto.appendChild(productElement)
        index++
    })


btnAdd.removeEventListener("click", adicionaProdutoAoCarrinho)
btnAdd.addEventListener("click", (event) => {
    adicionaProdutoAoCarrinho(codigoProduto)
})

btnRemove.removeEventListener("click", removeProdutoDoCarrinho)
btnRemove.addEventListener("click", (event) => {
    removeProdutoDoCarrinho(codigoProduto, 1)
})

btnCheckoutIndividual.removeEventListener("click", finalizarCompra)
btnCheckoutIndividual.addEventListener("click", finalizarCompra)

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

function adicionaProdutoAoCarrinho(codigo) {
    let carrinho = pegaCarrinho()
    //Verificar se o produto já existe e adicionar um amais 
    let produtoExistente = carrinho.find(produto => produto.codigo === codigo)
    if (produtoExistente == undefined || produtoExistente == null) {
        let produto = produtos.find(produto => produto.codigo === codigo)
        if (produto == undefined || produto == null) {
            console.log(`Produto com o código ${codigo} não encontrado.`)
            return
        }
        let produtoAdd = {
            codigo: produto.codigo,
            quantidade: 1
        }
        carrinho.push(produtoAdd)
    } else {

        produtoExistente.quantidade++
        inputQuantidade.value = produtoExistente.quantidade

    }

    for (let user of users) {
        if (user.id == userID) {
            user.carrinho = carrinho
        }
    }
    saveLocalStorage(users)

}


function removeProdutoDoCarrinho(codigoProduto, quantidade = 1, deletaItem = false) {
    let carrinho = pegaCarrinho()
    // Obter o índice do produto no carrinho (-1 se não encontrar)
    let index = carrinho.findIndex(produto => produto.codigo === codigoProduto)

    if (index == -1) {
        console.log(`Produto com o código ${codigoProduto} não encontrado no carrinho.`)
        return
    }

    // Checar se deve remover completamente o item
    if (deletaItem) {
        carrinho.splice(index, 1)
    } else {
        // Diminuir a quantidade passada pela função
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade -= quantidade
    inputQuantidade.value = carrinho[index].quantidade
        }
    }
    for (let user of users) {
        if (user.id == userID) {
            user.carrinho = carrinho
        }
    }
    saveLocalStorage(users)
}


const btnOk = document.getElementById("btnOk")
btnOk.addEventListener("click", function() {
    
    let cep = document.getElementById("tituloTextoCep")
    let result = calcularFrete(cep)
})