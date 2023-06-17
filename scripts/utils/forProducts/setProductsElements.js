import { produtos } from "../produtos.js"
import { constructorProductsElements } from "./constructorProductsElements.js"
import { saveLocalStorage } from "../saveLocalStorage.js"
import { verifyUserOnline } from "../../pagina-produtos/script.js"


let userID = verifyUserOnline()
console.log(userID)

export function setProductsElements(indexProdutos) {
    for (let c = 0; c < indexProdutos.length ; c++) {
        let index = indexProdutos[c]
        
        if (produtos[index].estoque != 0) {
            let elemento = constructorProductsElements(produtos[index].codigo ,produtos[index].nome, produtos[index].preco , produtos[index].imagem, produtos[index].descricaoImagem)

            const containerProdutos = document.getElementById("containerProdutos")
            containerProdutos.appendChild(elemento)
        }
        
    }

    setButtonsCartsListeners()
    
}

function setButtonsCartsListeners() {
    const botoesCarrinho = document.querySelectorAll(".btnCarrinho")
   
    ;[...botoesCarrinho].forEach(botao => {
        
        botao.addEventListener("click",function(event){
            let elemento = event.target
            let produtoId = botao.value 
            if (elemento.src === undefined) {
                elemento = elemento.children[0].children[0]
            }

            if (userID === undefined) {
                window.location.href = "../../paginas/cadastro-login.html" 
            }
            if (userID === undefined) return

            saveOrDeleteProduct(produtoId, elemento)
       
        })
      
    })
}

function saveOrDeleteProduct(produtoId, imgIcon) { 
    

    let carrinho = users[userID].carrinho
    let searchProduto = carrinho.filter( obj => obj.codigo == produtoId)
    
    if (searchProduto.length === 0) {

        imgIcon.src = "../../imagens/icons/remove_shopping_cart.svg" 
      
        let objProduto = {
            codigo: produtoId,
            quantidade: 1
        }

        users = JSON.parse(localStorage.getItem("users"))
        users[userID].carrinho.push(objProduto)

        saveLocalStorage(users)

    } else {
     
        imgIcon.src = "../../imagens/icons/carrinho_add.svg" 
        
        let index = 0
        let produtoIndex 
        
        for (let obj of users[userID].carrinho) { 
            
            if (obj.codigo === produtoId) {
                produtoIndex = index
            }
            index++
        }
        users = JSON.parse(localStorage.getItem("users"))
        users[userID].carrinho.splice(produtoIndex, 1)

        saveLocalStorage(users)
    }
}