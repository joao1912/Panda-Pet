import { setProductsElements } from "../pagina-produtos/script.js"
import { constructorProductsElements } from "../pagina-produtos/script.js"
import { getIndexCategory } from "../pagina-produtos/script.js"

export function showProducts(categoria) {
    const h1Produtos = document.getElementById("h1Produtos")
    const containerProdutos = document.getElementById("containerProdutos")
    const containerErro404 = document.getElementById("containerErro404")

    let indexProdutos

    containerErro404.style.display = "none"
    containerProdutos.style.display = "flex"

    switch (categoria) {
        case 'acessorios':

            h1Produtos.textContent = "Acessórios"
            indexProdutos = getIndexCategory("acessorios")
            containerProdutos.innerHTML = ""
        
            setProductsElements(indexProdutos, constructorProductsElements)

            break

        case 'alimentos': 
            h1Produtos.textContent = "Alimentação"
            indexProdutos = getIndexCategory("alimentacao")
            containerProdutos.innerHTML = ""

            setProductsElements(indexProdutos, constructorProductsElements)

            break
        
        case 'brinquedos':

            h1Produtos.textContent = "Brinquedos"
            indexProdutos = getIndexCategory("brinquedos")
            containerProdutos.innerHTML = ""

            setProductsElements(indexProdutos, constructorProductsElements)

            break
    }

    

}   