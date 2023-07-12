import { constructorProductsElements } from "./utils/forProducts/constructorProductsElements.js"
import { saveLocalStorage } from "./utils/saveLocalStorage.js"
import { verifyUserOnline } from "./utils/verifyUserOnline.js"
import { produtos } from "./utils/produtos.js";
import { loadInfoProducts } from "./pag-individual_produto.js";

let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

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
    setListenersRedirector()
    
}

function setButtonsCartsListeners() {

    const botoesCarrinho = document.querySelectorAll(".btnCarrinho")

    ;[...botoesCarrinho].forEach(botao => {
        
        botao.addEventListener("click",function(event){

            if (userID === undefined) {
                window.location.href = "../../paginas/cadastro-login.html" 
            } else {
                let elemento = event.target
                let produtoId = Number(botao.value)
                if (elemento.src === undefined) {
                    elemento = elemento.children[0].children[0]
                }

                saveOrDeleteProduct(produtoId, elemento)
            }
            
       
        })
      
    })
}

function saveOrDeleteProduct(produtoId, imgIcon) { 
    

    let carrinho
    for (let user of users) {
        if (user.id == userID) {
            carrinho = user.carrinho
            break
        }
    }

    let searchProduto = carrinho.filter( obj => obj.codigo == produtoId)
    
    if (searchProduto.length === 0) {

        imgIcon.src = "../../imagens/icons/remove_shopping_cart.svg" 
      
        let objProduto = {
            codigo: produtoId,
            quantidade: 1
        }

        users = JSON.parse(localStorage.getItem("users"))

        for (let user of users) {
            if (user.id == userID) {
                user.carrinho.push(objProduto)
                break
            }
        }

        saveLocalStorage(users)

    } else {
     
        imgIcon.src = "../../imagens/icons/carrinho_add.svg" 
        
        let index = 0
        
        for (let obj of carrinho) { 
            
            if (obj.codigo === produtoId) {
                break
            }
            index++
        }

        users = JSON.parse(localStorage.getItem("users"))
        
        for (let user of users) {
            if (user.id == userID) {
                user.carrinho.splice(index, 1)
                break
            }
        }

        saveLocalStorage(users)
    }
}

function setListenersRedirector() {
    const imagesProducts = document.querySelectorAll(".imageProduct")
    const btnComprar = document.querySelectorAll(".btnComprar")

    imagesProducts.forEach( image => {
        image.addEventListener("click", (event) => {setRedirectorProduct("img", event)} )
    })

    btnComprar.forEach( btn => {
        btn.addEventListener("click", (event) => {setRedirectorProduct("btn", event)} )
    })
}

function setRedirectorProduct(alvo, event) {
    const containerTelaInicial = document.getElementById("containerTelaInicial")
    const containerTelaProdutos = document.getElementById("containerTelaProdutos")
    const containerTelaAgendamento = document.getElementById("containerTelaAgendamento")
    const containerTelaIndividualProd = document.getElementById("containerTelaIndividualProduto")
    const containerTelaCarrinho = document.getElementById("containerTelaCarrinho")

    const telas = [containerTelaInicial, containerTelaProdutos, containerTelaAgendamento, containerTelaIndividualProd, containerTelaCarrinho]

    telas.forEach ( tela => {
        tela.style.display = "none"
    })

    containerTelaIndividualProd.style.display = "block"

    let codProduct
    switch (alvo) {
        case "img":
            codProduct = event.target.nextElementSibling.lastElementChild.lastElementChild.value


            break

        case "btn":
            codProduct = event.target.nextElementSibling.value



            break
    }

    if (codProduct !== undefined ) {
            loadInfoProducts(Number(codProduct))
    }

}