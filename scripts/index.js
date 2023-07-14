import { produtos } from "./utils/produtos.js";
import { loadInfoProducts } from "./pag-individual_produto.js";
import { searchProducts } from "./utils/forProducts/searchProducts.js";
import { showProducts, showSearchResults } from "./utils/forProducts/showProducts.js";
import { verifyUserOnline } from "./utils/verifyUserOnline.js";
import { saveLocalStorage } from "./utils/saveLocalStorage.js";
import { exibeCarrinho, getRandomProducts } from "./pag-carrinho.js";
import {getDate} from './utils/getDate.js'

const imgLogo = document.querySelector("header > img")
if (imgLogo) {
    imgLogo.style.cursor = "pointer"
    imgLogo.addEventListener("click", function(){location.reload()})
}

let users = JSON.parse(localStorage.getItem("users"))

if (users == null) {
    users = [{
        id: 0 ,
        nome: "Admin",
        realName: null,
        senha: "administrador123", 
        carrinho: [], 
        lembrarDeMim: false,
        online: false, 
        date: getDate(), 
        atividadeNoSite: {totalGasto: 0, produtosComprados: []},
        contato: null,
        pets: [],
        img: '../../imagens/perfil-default.jpg'
    }]

    localStorage.setItem('users', JSON.stringify(users))
}


for (let user of users) {
    if (user.lembrarDeMim == false) {
        user.online = false
        saveLocalStorage(users)
    }
}

export let userID = verifyUserOnline()

let visibility = false

function setPerfilOnline() {

    let imgUser
    for (let user of users) {
        if (user.id == userID) {
            imgUser = user.img
        }
    }

    if (imgUser) {
        let urlImagem = imgUser
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

    const btnMeuPerfil = document.getElementById("btnMeuPerfil")
    const containerPerfil = document.getElementById("perfilUsuario")
    const body = document.querySelector("body")

    btnMeuPerfil.addEventListener("click", function () {
        containerPerfil.style.display = "flex"
        containerUser.style.display = "none"
        visibility = false
        body.style.overflow = "hidden"
        
        pegarInfoUser()
    })

    const btnClosePerfil = document.querySelector("#botaoFechar > button")
    btnClosePerfil.addEventListener("click", function () {
        containerPerfil.style.display = "none"
        body.removeAttribute("style")
    })

    function  pegarInfoUser(){

        let nome
        let realName
        let img
        let pets=[]
        let data
        let contato

        for(let obj of users){

            if (userID == obj.id){
                nome=obj.nome
                realName = obj.realName
                img=obj.img
                data=obj.date.text
                contato=obj.contato
                pets = obj.pets
            }
        }

    const inputNome=document.getElementById("nomeUser")
    const inputData=document.getElementById("contaUser")
    const inputContato=document.getElementById("contatoUser")
    const inputImagem=document.getElementById("imagem")

        if (img){
            inputImagem.src=img

        }

        if (realName == undefined) {
            inputNome.value=nome
        } else {
            inputNome.value=realName
        }

        inputContato.value = contato
        inputData.value=data

    }

    document.getElementById("botaoSair").addEventListener("click", function sair() {
        
        for (let user of users) {
            if (user.id == userID) {
                user.online = false
                user.lembrarDeMim = false
            }
        }
       
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
    fotoPerfil.addEventListener("click", () => { trocaFotoPerfil("fotoPerfilOnline", "inptTrocaFoto") })
}

function trocaFotoPerfil(elementIdImg, inptFileId) {

    const fileTrocaFoto = document.getElementById(inptFileId)
    const file = document.getElementById(elementIdImg)

    if (file !== null && fileTrocaFoto !== null) {

        fileTrocaFoto.click();
        fileTrocaFoto.addEventListener("change", readImage, false);

        function readImage() {
            let fr = new FileReader();
            fr.onload = function (event) {
                file.src = event.target.result

            };
            fr.readAsDataURL(this.files[0]);

            fr.addEventListener("load", () => {

                for (let user of users) {
                    if (user.id == userID) {
                        user.img = fr.result
                        
                    }
                }
                document.getElementById("fotoPerfilOnline").src = fr.result
                saveLocalStorage(users)
            })
        }
    }
}

const iconeDoPerfil = document.getElementById("perfilIcon")

iconeDoPerfil.addEventListener("click", function () {
    const tabelaPerfil = document.getElementById("containerPerfil")

    function redirecionarCadastro() {
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
const header = document.querySelector("header")
const nav = document.querySelector("nav")
const footer = document.querySelector("footer")

const containerTelaInicial = document.getElementById("containerTelaInicial")
const containerTelaProdutos = document.getElementById("containerTelaProdutos")
const containerTelaAgendamento = document.getElementById("containerTelaAgendamento")
const containerTelaIndividualProd = document.getElementById("containerTelaIndividualProduto")
const containerTelaCarrinho = document.getElementById("containerTelaCarrinho")

const telas = [containerTelaInicial, containerTelaProdutos, containerTelaAgendamento, containerTelaIndividualProd, containerTelaCarrinho]

let newPage = localStorage.getItem("newPage")

if (newPage != null) {

    localStorage.removeItem("newPage")

    telas.forEach(tela => {

        tela.style.display = "none"
        
    })


    if (newPage == "agendamento") {

        containerTelaAgendamento.style.display = "block"

    } else if(newPage == "carrinho") {

        containerTelaCarrinho.style.display = "block"
        exibeCarrinho()

    } else {

        containerTelaProdutos.style.display = "block"
        showProducts(newPage)
        
    }

}

const barra_pesquisa = document.getElementById("barraPesquisa")

nav.addEventListener("click", function (event) {

    switch (event.target.id) {
        case "forHome":

            if (containerTelaInicial.style.display == "block") return

            telas.forEach(tela => {
                tela.style.display = "none"
            })

            containerTelaInicial.style.display = "block"
            location.reload()

            break

        case "forAcessorios":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("acessorios")
            } else {
                telas.forEach(tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("acessorios")

            }
            barra_pesquisa.value = ""


            break
        case "forAlimentacao":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("alimentos")
            } else {
                telas.forEach(tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("alimentos")
            }
            barra_pesquisa.value = ""
            break

        case "forBrinquedos":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("brinquedos")
            } else {
                telas.forEach(tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("brinquedos")

            }
            barra_pesquisa.value = ""
            break

        case "forSugestoes":

            if (containerTelaProdutos.style.display == "block") {
                showProducts("sugestoes")
            } else {
                telas.forEach(tela => {
                    tela.style.display = "none"
                })

                containerTelaProdutos.style.display = "block"
                showProducts("sugestoes")

            }
            barra_pesquisa.value = ""
            break

        case "forAgendamento":

            if (containerTelaAgendamento.style.display == "block") return

            if (userID == undefined) {
                window.location.href = "../paginas/cadastro-login.html"
            }

            telas.forEach(tela => {
                tela.style.display = "none"
            })

            containerTelaAgendamento.style.display = "block"
            barra_pesquisa.value = ""
            break
    }
})

const btnCart = document.getElementById("btnShoppingCart")
btnCart.addEventListener("click", function () {
    telas.forEach(tela => {
        tela.style.display = "none"
    })

    header.style.display = "none"
    nav.style.display = "none"
    footer.style.display = "none"

    const randomProducts = getRandomProducts(3)
    let sugestoesProdutos = document.querySelectorAll(".sugestaoProduto")
    let index = 0
    
    sugestoesProdutos.forEach((sugestaoProduto) => {
    
        let productElement = document.createElement("img")

        productElement.id = produtos[randomProducts[index]].codigo

        productElement.src = produtos[randomProducts[index]].imagem

        productElement.alt = produtos[randomProducts[index]].descricaoImagem

        productElement.addEventListener("click", function() {

            loadInfoProducts(Number(productElement.id))

            header.style.display = "flex"
            nav.style.display = "flex"

            containerTelaCarrinho.style.display = "none"
            containerTelaIndividualProd.style.display = "block"

            footer.style.display = "block"

        })

        sugestaoProduto.innerHTML = ""
        sugestaoProduto.appendChild(productElement)
        index++
    })
    
    exibeCarrinho()

    containerTelaCarrinho.style.display = "flex"

})

if(localStorage.hasOwnProperty("pesquisarPor")) {

    let stringSearch = localStorage.getItem("pesquisarPor")
    localStorage.removeItem("pesquisarPor")

    stringSearch = stringSearch.trim()
    if(stringSearch != "") {

let searchedProducts = searchProducts(stringSearch)
showSearchResults(searchedProducts)

    containerTelaProdutos.style.display = "block"
    containerTelaInicial.style.display = "none"

    }
}

barra_pesquisa.addEventListener("keydown", function(event) {
    if(event.keyCode == 13) {

        let stringSearch = barra_pesquisa.value
        stringSearch = stringSearch.trim()
        if(stringSearch == "") return
    
    let searchedProducts = searchProducts(stringSearch)
    showSearchResults(searchedProducts)

    telas.forEach(tela => {
        tela.style.display = "none"
    })

        containerTelaProdutos.style.display = "block"
        
    }
})

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


const iconAdmUtils = document.getElementById("icon-tela-adm")
const containerUser = document.getElementById("containerPerfil")
if (userID == 0) {
    iconAdmUtils.style.display = "inline-flex"
    iconAdmUtils.addEventListener("click", function () {
        window.location.href = "./paginas/administrador.html"
    })

    setPerfilOnline()
    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", () => { trocaFotoPerfil() })
    containerUser.style.marginLeft = "-5px"
}

if (userID == undefined) {
    containerUser.style.marginLeft = "-43px"
    containerUser.style.top = "115px"
}

/* crud user */

const imagem = document.getElementById("imagem")
imagem.addEventListener("click", () => {trocaFotoPerfil("imagem", "userImg")})

/* ----------- */

const containerBtnsPerfilUser = document.getElementById("excluirEeditar")
containerBtnsPerfilUser.addEventListener("click", function(event){
    let id = event.target.id
    const telaMinhasCompras = document.getElementById("containerMinhasCompras")
    const btnEditarEexcluir = document.getElementById("btnEditUser")

    switch(id) {
        case "btnExcluirUser":
            if (userID == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'O admin não pode ser deletado!'
                  })
            } else {
                
                let indexUser
                
                for(let i = 0 ; i < users.length ; i++) {
                    if (users[i].id == userID) {
                        indexUser = i
                        break
                    }
                }

                users.splice(indexUser, 1)
                saveLocalStorage(users)

                containerUser.style.display = "none"
                location.reload()

            }

            break
        case "btnEditUser":
            let textoBotao=event.target.textContent
     
            if (textoBotao == "Editar"){
                const inputNome=document.getElementById("nomeUser")
                const inputContato=document.getElementById("contatoUser")

                inputNome.removeAttribute("readonly")
                inputContato.removeAttribute("readonly")

                btnEditarEexcluir.textContent="Salvar"

                
            }else if (textoBotao=="Salvar"){
                const inputNome=document.getElementById("nomeUser")
                const inputContato=document.getElementById("contatoUser")

                inputNome.setAttribute("readonly" , true)
                inputContato.setAttribute("readonly", true) 

                btnEditarEexcluir.textContent="Editar"
                let antigoNome
                for(let obj of users){

                    if (userID == obj.id){ 
                        antigoNome = obj.nome
                        
                    }
                }

                let nome , contato
                let verifyName = false


                nome=inputNome.value

                if (nome == antigoNome) {
                    verifyName = true
                }

                contato=inputContato.value

                for(let obj of users){

                    if (userID == obj.id){
                        if (!verifyName) {
                            obj.realName = nome
                        } else {
                            obj.nome=nome
                        }
                        
                    obj.contato = contato
                        
                    }
                }   
                saveLocalStorage(users)
            }
            break
        case "btnMyShopping":
            setTableMyShopping()
            telaMinhasCompras.style.display = "flex"

            break
    }
})

export function setTableMyShopping() {
    
    let totCompras
    let produtos = JSON.parse(localStorage.getItem("listaProdutos"))
    const tbody = document.querySelector("#containerTable > table > tbody")
    tbody.innerHTML = ""
    for (let obj of users) {
        if (obj.id === userID) {
            totCompras = obj.atividadeNoSite.produtosComprados
            break
        }
    }

 
    if (totCompras.length == 0) {
        const containerTable = document.getElementById("containerTable")
        const table = document.querySelector("#containerTable > table")

        let span = document.createElement("span")
        span.className = "messageNoShopping"
        let text = document.createTextNode("Lamento, você não possui historico de compras.")
        span.appendChild(text)
        containerTable.appendChild(span)
        table.style.display = "none"
    }

    for (let i = 0 ; i < totCompras.length ; i++) {

        let nomeProd, codigoProd, precoProd
        
        for (let prod of produtos) {
            if (prod.codigo == totCompras[i]) {
                nomeProd = prod.nome
                codigoProd = prod.codigo
                precoProd = prod.preco
                break
            }
        }

        let tr = constructorTableMyShopping(codigoProd, nomeProd, precoProd)
        tbody.appendChild(tr)
    }
}

function constructorTableMyShopping(cod, nome, preco) {

    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdPreco = document.createElement("td")

    let textCodigo = document.createTextNode(`${cod}`)
    let textNome = document.createTextNode(`${nome}`)
    let textPreco = document.createTextNode(`R$ ${preco.toFixed(2)}`)

    tdCodigo.appendChild(textCodigo)
    tdCodigo.classList.add("tdCodProduct")

    tdNome.appendChild(textNome)

    tdPreco.appendChild(textPreco)
    tdPreco.classList.add("tdPrecoProduct")

    let tr = document.createElement("tr")
    tr.appendChild(tdCodigo)
    tr.appendChild(tdNome)
    tr.appendChild(tdPreco)

    return tr
}

const botaoFecharMinhasCompras = document.getElementById("btnCloseMinhasCompras")
botaoFecharMinhasCompras.addEventListener("click", function(){
    const telaMinhasCompras = document.getElementById("containerMinhasCompras")
    
    if (telaMinhasCompras.style.display === "none") {
        telaMinhasCompras.style.display = "flex"
    } else {
        telaMinhasCompras.style.display = "none"
    }
})