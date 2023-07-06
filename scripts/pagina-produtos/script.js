import { saveLocalStorage } from "../utils/saveLocalStorage.js"
import { showProducts } from "../utils/forProducts/showProducts.js"
import { verifyUserOnline } from "../utils/verifyUserOnline.js"

let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

let categoryOrNot = JSON.parse(localStorage.getItem("category")) 
localStorage.removeItem("category")

function setPerfilOnline() {

    if (users[userID].img) {
        let urlImagem = users[userID].img
        const fotoPerfil = document.getElementById("fotoPerfilOnline")
        fotoPerfil.src = urlImagem
    }

    const containerUser = document.getElementById("containerPerfil")
    containerUser.style.height = "110px" /* alterar na tela da zuma */
    containerUser.style.width = "200px"
    const botaoLogar = document.getElementById("botaoLogar")
    const containerUserLogado = document.getElementById("userLogado")
    botaoLogar.style.display = "none"
    containerUserLogado.style.display = "flex"

    document.getElementById("botaoSair").addEventListener("click", function sair() {
        users[userID].online = false
        users[userID].lembrarDeMim = false /* alterar na tela da zuma */
        saveLocalStorage(users)
        localStorage.removeItem("welcome")
        window.location.href = "../../index.html"
    })

    /* ADICINAR EM TODAS AS PAGES */
    const iconAdmUtils = document.getElementById("icon-tela-adm")

    if (userID == 0) {
        containerUser.style.marginLeft = "-5px"
        iconAdmUtils.style.display = "inline-flex"
        iconAdmUtils.addEventListener("click", function(){
            window.location.href = "../../paginas/administrador.html" 
        })
    } else {
        containerUser.style.marginLeft = "-5px"
    }
    /* -------------------------- */
    

}
/* ADICINAR EM TODAS AS PAGES */
if (userID || userID == 0) {
    
    setPerfilOnline()
    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", trocaFotoPerfil)
    
} else {
    const containerUser = document.getElementById("containerPerfil")
    containerUser.style.marginLeft = "-43px"
    containerUser.style.top = "108px"
}
/* -------------------------- */
function trocaFotoPerfil() {
    const fileTrocaFoto = document.getElementById("inptTrocaFoto")

    fileTrocaFoto.click();
    fileTrocaFoto.addEventListener("change", readImage, false);
    const file = document.getElementById("fotoPerfilOnline")

    function readImage() {
        let fr = new FileReader();
        fr.onload = function (event) {
            file.src = event.target.result

        };
        fr.readAsDataURL(this.files[0]);

        fr.addEventListener("load", () => {
            users[userID].img = fr.result
            saveLocalStorage(users)
        })
    }
}

const iconeDoPerfil = document.getElementById("perfilIcon")

iconeDoPerfil.addEventListener("click", function () {
    const tabelaPerfil = document.getElementById("containerPerfil")

    function redirecionarCadastro() {
        window.location.href = "../../paginas/cadastro-login.html"
    }

    let visibility = tabelaPerfil.style.display

    if (visibility === "none") {
        tabelaPerfil.style.display = "flex"

        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.addEventListener("click", redirecionarCadastro)

    } else {
        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.removeEventListener('click', redirecionarCadastro)
        tabelaPerfil.style.display = "none"
    }
})

const nav = document.querySelector("nav")
nav.addEventListener("click", function (event) {

    switch (event.target.id) {
        case "forHome":

            window.location.href = "../../index.html"
            break

        case "forAcessorios":

            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("acessorios")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("acessorios")) 
            }   

            break

        case "forAlimentacao":

            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("alimentos")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("alimentos")) 
            }

            break

        case "forBrinquedos":

            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("brinquedos")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("brinquedos")) 
            }

            break

            case "forSugestoes":

            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("sugestoes")

            } else {
                window.location.href = "../../paginas/produtos.html"
                document.addEventListener("DOMContentLoaded", showProducts("sugestoes"))
            }

            break            
        
        case "forAgendamento":

            window.location.href = "/paginas/agendamentos.html" 
            break
    }
})

if (categoryOrNot) {
    switch (categoryOrNot) {
        case "acessorios": 
            showProducts("acessorios")
            break
        case "alimentos":
            showProducts("alimentos")
            break
        case "brinquedos":
            showProducts("brinquedos")
            break
    
    }
    
} else {
    showProducts("sugestoes")
}




export function setButtonsCartsListeners() {
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

const barra_pesquisa = document.getElementById("barraPesquisa")
barra_pesquisa.addEventListener("keyup", barraPesquisa)

function barraPesquisa() {

    let stringSearch = barra_pesquisa.value
    stringSearch = stringSearch.trim()
    let searhProdutos = document.querySelectorAll(".produto")

    if (stringSearch == "") {
        let arrayProdutos = [...searhProdutos]
        for (let produto of arrayProdutos) {
            produto.style.display = "flex"
        }
    }

    if (searhProdutos.length == 0) return



        ;[...searhProdutos].forEach(produto => {

            let title = produto.children[0].children[1].children[0].children[0].textContent

            let exist = title.normalize("NFD")
                .replace(/[^a-zA-Z\s]/g, "")
                .toLowerCase()
                .includes(stringSearch.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
                    .toLowerCase())

            if (!exist) {
                produto.style.display = "none"
            } else {
                produto.style.display = "flex"
            }
        })
}