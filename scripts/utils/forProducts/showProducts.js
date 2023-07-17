import { setProductsElements } from "../../pag-produtos.js"
import { getIndexCategory } from "./getIndexCategory.js"

export function showProducts(categoria) {
    const h1Produtos = document.getElementById("h1Produtos")
    const containerProdutos = document.getElementById("containerProdutos")
    let indexProdutos
    containerProdutos.style.display = "flex"

    switch (categoria) {
        case 'acessorios':

            h1Produtos.textContent = "Acessórios"
            indexProdutos = getIndexCategory("acessorios")
            containerProdutos.innerHTML = ""

            setProductsElements(indexProdutos)

            break

        case 'sugestoes':

            h1Produtos.textContent = "Sugestões"
            indexProdutos = getIndexCategory("sugestoes")
            containerProdutos.innerHTML = ""

            setProductsElements(indexProdutos)

            break

        case 'alimentos':
            h1Produtos.textContent = "Alimentação"
            indexProdutos = getIndexCategory("alimentacao")
            containerProdutos.innerHTML = ""

            setProductsElements(indexProdutos)

            break

        case 'brinquedos':

            h1Produtos.textContent = "Brinquedos"
            indexProdutos = getIndexCategory("brinquedos")
            containerProdutos.innerHTML = ""

            setProductsElements(indexProdutos)

            break
    }
}

export function showSearchResults(indexProdutos) {

    const h1Produtos = document.getElementById("h1Produtos")
    const containerProdutos = document.getElementById("containerProdutos")
    const containerTelaProdutos = document.getElementById("containerTelaProdutos")
    
    h1Produtos.textContent = "Resultados para sua busca"
    containerProdutos.innerHTML = ""

    setProductsElements(indexProdutos)

    if(indexProdutos.length == 0) {
        containerProdutos.innerHTML = "<p id='NoResults'>Nenhum resultado encontrado</p>"
        containerTelaProdutos.style.height = "70%"
    }

    containerProdutos.style.display = "flex"
}