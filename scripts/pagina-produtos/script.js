import { produtos } from "../utils/produtos.js"

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
        
        let elemento = funcConstructor(produtos[index].nome, produtos[index].preco , produtos[index].imagem, produtos[index].descricaoImagem)

        const containerProdutos = document.getElementById("containerProdutos")
        
        containerProdutos.appendChild(elemento)
    }
}

function constructorElements(nome, preco, imagem, descricaoImagem) {

    //botao do carrinho criado

    let btnCarrinho = document.createElement("button")
    let iconeCarrinho = document.createElement("i")
    iconeCarrinho.classList = "material-symbols-outlined cart"
    let textIconeCarrinho = document.createTextNode("shopping_cart") 
    iconeCarrinho.appendChild(textIconeCarrinho)
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




