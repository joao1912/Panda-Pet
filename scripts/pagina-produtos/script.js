import { saveLocalStorage } from "../utils/saveLocalStorage.js"
import { showProducts } from "../utils/forProducts/showProducts.js"
import { verifyUserOnline } from "../utils/verifyUserOnline.js"

var users = JSON.parse(localStorage.getItem("users"))
export var userID = verifyUserOnline()

let categoryOrNot = JSON.parse(localStorage.getItem("category"))
localStorage.removeItem("category")

function setPerfilOnline() {

    if (users[userID].img) {
        let urlImagem = users[userID].img
        const fotoPerfil = document.getElementById("fotoPerfilOnline")
        fotoPerfil.src = urlImagem
    }

    const containerUser = document.getElementById("containerPerfil")
    containerUser.style.height = "90px"
    containerUser.style.width = "200px"
    containerUser.style.marginLeft = "-5px"
    const botaoLogar = document.getElementById("botaoLogar")
    const containerUserLogado = document.getElementById("userLogado")
    botaoLogar.style.display = "none"
    containerUserLogado.style.display = "flex"

    document.getElementById("botaoSair").addEventListener("click", function sair() {
        users[userID].online = false
        saveLocalStorage(users)
        localStorage.removeItem("welcome")
        window.location.href = "../../index.html"
    })

}

if (userID) {
    setPerfilOnline()

    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", trocaFotoPerfil)
}

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

            //href
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