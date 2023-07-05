import {showProducts} from '../utils/forProducts/showProducts.js'

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
                window.location.href = "./paginas/produtos.html"
            }   

            break
        
        case "forAlimentacao":
           
            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("alimentos")

            } else {
                let category = JSON.stringify("alimentos")
                localStorage.setItem("category", category)
                window.location.href = "./paginas/produtos.html" 
            }

            break

        case "forBrinquedos":
           
            if (window.location.pathname == '/paginas/produtos.html') {

                showProducts("brinquedos")

            } else {
                let category = JSON.stringify("brinquedos")
                localStorage.setItem("category", category)
                window.location.href = "/paginas/produtos.html" 
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

if (userID) {
    
    setPerfilOnline()
    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", trocaFotoPerfil)
    
} else {
    if (userID != 0) {
        containerUser.style.marginLeft = "-43px"
        containerUser.style.top = "115px" 
    }
}

$('#container').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
  });

  let nome 
  let dataConta
  let img

function puxarInfos(){
   
    let users=localStorage.getItem("users")
    users=JSON.parse(users) 

    for(let obj of users){
       

        if(obj.id == userID){
            nome=obj.nome
            dataConta=obj.date.text
            img=obj.img
        
        }
    }
   inserirInfo()
}

function inserirInfo(){
   let nomeUser = document.getElementById("nomeUser")
   let contaUser= document.getElementById("contaUser")
   let imagem=document.getElementById("imagem")

   nomeUser.value=nome
   contaUser.value=dataConta
   imagem.src=img

   const imgUser = document.getElementById("imagem")
   imgUser.addEventListener(() => {trocaFotoPerfil("imagem", "userImg")})

}


 


  
