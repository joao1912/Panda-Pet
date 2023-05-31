import { produtos } from "./produtos.js"
import { setButtonsCartsListeners } from "../pagina-produtos/script.js"

export function setProductsElements(indexProdutos, funcConstructor) {
    for (let c = 0; c < indexProdutos.length ; c++) {
        let index = indexProdutos[c]
        
        if (produtos[index].estoque != 0) {
            let elemento = funcConstructor(produtos[index].codigo ,produtos[index].nome, produtos[index].preco , produtos[index].imagem, produtos[index].descricaoImagem)

            const containerProdutos = document.getElementById("containerProdutos")
            containerProdutos.appendChild(elemento)
        }
        
    }

    setButtonsCartsListeners()
    
}