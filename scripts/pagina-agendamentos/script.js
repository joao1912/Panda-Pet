import { showProducts } from '../utils/forProducts/showProducts.js'
import { saveLocalStorage } from '../utils/saveLocalStorage.js'

let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

function verifyUserOnline() {

    let userOnline
    if (users) {
    for (let obj of users) {
            if (obj.online) {
                userOnline = obj.id
            }
        } 
    }
    return userOnline ?? undefined
}

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
        if (window.location.pathname != '/index.html') {

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
        window.location.href = "../../paginas/cadastro-login.html"
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
nav.addEventListener("click",function(event){
   
    switch(event.target.id) {
        case "forHome":
            
           

            if (window.location.pathname != '/index.html') {

                 window.location.href = "../../index.html"

            }

            break

        case "forAcessorios":

            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("acessorios")

            } else {
                let category = JSON.stringify("acessorios")
                localStorage.setItem("category", category)
                window.location.href = "../../paginas/produtos.html"
            }   

            break
        
        case "forAlimentacao":
           
            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("alimentos")

            } else {
                let category = JSON.stringify("alimentos")
                localStorage.setItem("category", category)
                window.location.href = "../../paginas/produtos.html" 
            }

            break

        case "forBrinquedos":
           
            if (window.location.pathname == '../../paginas/produtos.html') {

                showProducts("brinquedos")

            } else {
                let category = JSON.stringify("brinquedos")
                localStorage.setItem("category", category)
                window.location.href = "../../paginas/produtos.html" 
            }

            break
        
        case "forAgendamento":
        
            //href
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
        window.location.href = "../../paginas/administrador.html" 
    })
    
    setPerfilOnline()
    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", trocaFotoPerfil)
    containerUser.style.marginLeft = "-5px"
}

const botaoEscolhaGenero = document.getElementById("botaoEscolhaGenero")
const btnMacho = document.getElementById("btnMacho")
let btnBeforeGenero 

;[...document.styleSheets[2].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnMacho::before") {
    btnBeforeGenero = styleSheet
  }
  
})

botaoEscolhaGenero.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnMacho":
            btnBeforeGenero.style.left = "3px"
            btnMacho.dataset.content = "Macho"
            break
        case "btnFemea":
            btnBeforeGenero.style.left = "102px"
            btnMacho.dataset.content = "Fêmea"
            break
    }
})

const botaoEscolha = document.getElementById("botaoEscolha")
const btnYes = document.getElementById("btnYes")
let btnBefore 

;[...document.styleSheets[2].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnYes::before") {
    btnBefore = styleSheet
  }
  
})

botaoEscolha.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnYes":
            btnBefore.style.left = "3px"
            btnYes.dataset.content = "Sim"
            break
        case "btnNo":
            btnBefore.style.left = "102px"
            btnYes.dataset.content = "Não"
            break
    }
})