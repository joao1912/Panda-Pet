import { showProducts } from "./utils/forProducts/showProducts.js";
import { verifyUserOnline } from "./utils/verifyUserOnline.js";
import { saveLocalStorage } from "./utils/saveLocalStorage.js";

let users = JSON.parse(localStorage.getItem("users"))

for (let user of users) {
    if (user.lembrarDeMim == false) {
        user.online = false
        saveLocalStorage(users)
    }
}

export let userID = verifyUserOnline()

function setPerfilOnline() {
   
    if (users[userID].img) {
        let urlImagem = users[userID].img
        const fotoPerfil = document.getElementById("fotoPerfilOnline")
        fotoPerfil.src = urlImagem
    } 

    const containerUser = document.getElementById("containerPerfil")
    containerUser.style.height = "110px"
    containerUser.style.width = "200px"
    containerUser.style.marginLeft = "-75px"
    const botaoLogar = document.getElementById("botaoLogar")
    const containerUserLogado = document.getElementById("userLogado")
    botaoLogar.style.display = "none"
    containerUserLogado.style.display = "flex"

    document.getElementById("botaoSair").addEventListener("click",function sair(){
        users[userID].online = false
        users[userID].lembrarDeMim = false
        localStorage.removeItem("welcome")

        if (window.location.pathname == "./index.html") {
            location.reload()
        } else {
            window.location.href = "../../index.html"
        }
    
        saveLocalStorage(users)
    })
}

if (userID) {
    setPerfilOnline()

    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", () => {trocaFotoPerfil("fotoPerfilOnline", "inptTrocaFoto")} )
}

function trocaFotoPerfil(elementIdImg, inptFileId) {
   
    const fileTrocaFoto = document.getElementById(inptFileId)
    const file = document.getElementById(elementIdImg)

    if (file !== null && fileTrocaFoto !== null) {

        /* ESTA REALIZANDO UM DUPLO CLICK, RESOLVER */

        fileTrocaFoto.click();
        fileTrocaFoto.addEventListener("change", readImage, false);
        
        function readImage() { 
            let fr = new FileReader();
            fr.onload = function(event) {
                file.src = event.target.result
                
            };       
            fr.readAsDataURL(this.files[0]);

            fr.addEventListener("load",() => {
                users[userID].img = fr.result
                saveLocalStorage(users)
            })
        }

    }
}

const iconeDoPerfil = document.getElementById("perfilIcon")
let visibility = false
iconeDoPerfil.addEventListener("click",function(){
    const tabelaPerfil = document.getElementById("containerPerfil")

    function redirecionarCadastro(){
        window.location.href = "./paginas/cadastro-login.html"
    }

    if (!visibility) {
        visibility = true
        tabelaPerfil.style.display = "flex"

        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.addEventListener("click", redirecionarCadastro)

    } else {
        visibility = false
        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.removeEventListener('click', redirecionarCadastro)
        tabelaPerfil.style.display = "none"
    }
})

const nav = document.querySelector("nav")
const containerTelaInicial = document.getElementById("containerTelaInicial")
const containerTelaProdutos = document.getElementById("containerTelaProdutos")
const containerTelaAgendamento = document.getElementById("containerTelaAgendamento")
const containerTelaIndividualProd = document.getElementById("containerTelaIndividualProduto")

const telas = [containerTelaInicial, containerTelaProdutos, containerTelaAgendamento, containerTelaIndividualProd]

nav.addEventListener("click",function(event){
   
    switch(event.target.id) {
        case "forHome":

            if (containerTelaInicial.style.display == "block") return

            telas.forEach( tela => {
                tela.style.display = "none"
            })

            containerTelaInicial.style.display = "block"
            location.reload()

            break

        case "forAcessorios":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("acessorios")
            } else {
                telas.forEach( tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("acessorios")

            }
 
           

            break
        case "forAlimentacao":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("alimentos")
            } else {
                telas.forEach( tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("alimentos")
            }
            break

        case "forBrinquedos":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("brinquedos")
            } else {
                telas.forEach( tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("brinquedos")

            }

            break

        case "forSugestoes":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("sugestoes")
            } else {
                telas.forEach( tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("sugestoes")

            }

            break  
        
        case "forAgendamento":
            
            if (containerTelaAgendamento.style.display == "block") return

            telas.forEach( tela => {
                tela.style.display = "none"
            })

            containerTelaAgendamento.style.display = "block"
                
            break
    }
})

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

   

    ;[...searhProdutos].forEach( produto => {

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


const iconAdmUtils = document.getElementById("icon-tela-adm")
const containerUser = document.getElementById("containerPerfil")
if (userID == 0) {
    iconAdmUtils.style.display = "inline-flex"
    iconAdmUtils.addEventListener("click", function(){
        window.location.href = "./paginas/administrador.html" 
    })
    
    setPerfilOnline()
    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", () => {trocaFotoPerfil()})
    containerUser.style.marginLeft = "-5px"
} 

if (userID == undefined) {
    containerUser.style.marginLeft = "-43px"
    containerUser.style.top = "115px" 
}