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