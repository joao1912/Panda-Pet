import { showProducts } from '../utils/forProducts/showProducts.js'
import { saveLocalStorage } from '../utils/saveLocalStorage.js'
import { changeMonth } from '../utils/forCalendar/changeMonth.js'
import { setDarkCellCalendar } from '../utils/forCalendar/setDarkCellCalendar.js'
import { setMarkersCalendar } from '../utils/forCalendar/setMarkersCalendar.js'
import { setCurrentDay } from '../utils/forCalendar/setCurrentDay.js'
import { setDayTasks } from '../utils/forCalendar/setDayTasks.js'

let categoryTransations = JSON.parse(localStorage.getItem("compras"))

if (categoryTransations == null) {
    categoryTransations = [
        {
            nome: "banhoETosa",
            valorVendido: 110
        },
        {
            nome: "hospedagem",
            valorVendido: 220
        },
        {
            nome: "brinquedo",
            valorVendido: 330
        },
        {
            nome: "acessorios",
            valorVendido: 50
        },
        {
            nome: "alimentacao",
            valorVendido: 60
        }
    ]
}
export let bodyCalendar = [...document.getElementById("calendar").lastElementChild.children]
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
    return userOnline || undefined
}

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
        if (window.location.pathname != '/index.html') {

            window.location.href = "../../index.html"

        }
        saveLocalStorage(users)
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

const iconTelaAdm = document.getElementById("icon-tela-adm")
iconTelaAdm.addEventListener("click", function () {


    if (!window.location.pathname == '/paginas/administrador.html') {
        window.location.href = "../../paginas/administrador.html"
    }


})

const telaAdmUtilities = document.getElementById("containerAdmUtilities")
const containerCalendar = document.getElementById("viewCalendar")
const containerProfiles = document.getElementById("viewProfiles")
const containerPayments = document.getElementById("viewPayments")
const containerProducts = document.getElementById("editProducts")


telaAdmUtilities.addEventListener("click", function (event) {
    let idBtn = event.target.id

    switch (idBtn) {
        case "btnCalendar":
            telaAdmUtilities.style.display = "none"
            containerCalendar.style.display = "flex"
            break
        case "btnUsers":
            telaAdmUtilities.style.display = "none"
            containerProfiles.style.display = "flex"
            break
        case "btnPayments":
            telaAdmUtilities.style.display = "none"
            containerPayments.style.display = 'flex'
            break
        case "btnEdit":
            telaAdmUtilities.style.display = "none"
            containerProducts.style.display = "flex"
    }
})

let btnsBackMenu = document.querySelectorAll(".backMenu")

    ;[...btnsBackMenu].forEach(btnBack => {
        btnBack.addEventListener("click", function (event) {
            telaAdmUtilities.style.display = "flex"

            let id = event.target.id

            switch (id) {
                case "btnBackCalendar":
                    containerCalendar.style.display = 'none'
                    break
                case "btnBackProfiles":
                    containerProfiles.style.display = 'none'
                    break
                case "btnBackPayments":
                    containerPayments.style.display = 'none'
                    break
                case "btnBackProducts":
                    containerProducts.style.display = 'none'
                    break
            }
        })
    })

const botoesTrocaMes = document.querySelectorAll(".trocaMes")
export let mesAtual

    ;[...botoesTrocaMes].forEach(botao => {
        botao.addEventListener("click", function (event) {
            let direction = event.target.textContent

            if (direction === "keyboard_arrow_left") {

                if (mesAtual != 0) {
                    mesAtual -= 1
                    changeMonth(mesAtual)
                } else {
                    mesAtual = 11
                    changeMonth(mesAtual)
                }

            } else if (direction === "keyboard_arrow_right") {

                if (mesAtual != 11) {
                    mesAtual += 1
                    changeMonth(mesAtual)

                } else {
                    mesAtual = 0
                    changeMonth(mesAtual)
                }
            }
        })
    })

document.addEventListener("DOMContentLoaded", function () {
    let mes = new Date()
    mes = mes.getMonth()
    const mouthTitle = document.getElementById("mouthTitle")

    switch (mes) {
        case 0:
            changeMonth(0)
            mouthTitle.innerHTML = "Janeiro"
            mesAtual = 0
            break
        case 1:
            changeMonth(1)
            mouthTitle.innerHTML = "Fevereiro"
            mesAtual = 1
            break
        case 2:
            changeMonth(2)
            mouthTitle.innerHTML = "Março"
            mesAtual = 2
            break
        case 3:
            changeMonth(3)
            mouthTitle.innerHTML = "Abril"
            mesAtual = 3
            break
        case 4:
            changeMonth(4)
            mouthTitle.innerHTML = "Maio"
            mesAtual = 4
            break
        case 5:
            changeMonth(5)
            mouthTitle.innerHTML = "Junho"
            mesAtual = 5
            break
        case 6:
            changeMonth(6)
            mouthTitle.innerHTML = "Julho"
            mesAtual = 6
            break
        case 7:
            changeMonth(7)
            mouthTitle.innerHTML = "Agosto"
            mesAtual = 7
            break
        case 8:
            changeMonth(8)
            mouthTitle.innerHTML = "Setembro"
            mesAtual = 8
            break
        case 9:
            changeMonth(9)
            mouthTitle.innerHTML = "Outubro"
            mesAtual = 9
            break
        case 10:
            changeMonth(10)
            mouthTitle.innerHTML = "Novembro"
            mesAtual = 10
            break
        case 11:
            changeMonth(11)
            mouthTitle.innerHTML = "Dezembro"
            mesAtual = 11
            break
    }
    setDarkCellCalendar()
    setMarkersCalendar()
    setCurrentDay()
})

/* --- TEMPORARIO --- */


const agendamentos = []
agendamentos.push(
    {
        id: 1,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 2,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 3,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 4,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    }
)

localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
/* ------------------ */

const telaCheckedTasks = document.getElementById("containerCheckedTasks")
const calendar = document.getElementById("tbody")
let flagCalendar = false

calendar.addEventListener("click", function (event) {

    if (flagCalendar) return

    flagCalendar = true

    const imgSemServico = document.getElementById("imgSemSevico")
    let target = event.target
    let day = target.textContent
    let atributos = event.target.getAttribute("escurecer")
    const container = document.getElementById("tasks")

    if (atributos != null) {

        if (day > 20) {
            if (mesAtual == 0) {

                mesAtual = 11

            } else {

                mesAtual -= 1

            }

            changeMonth(mesAtual)


        } else {
            mesAtual += 1
            changeMonth(mesAtual)

        }

    }

    //pegar e salvar os serviços desse dia

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos"))
    let flagEmptyDayTasks = true

    for (let obj of agendamentos) {

        let diaMarcado = obj.dia
        let mesMarcado = obj.mes

        if (mesMarcado == mesAtual && diaMarcado == day) {
            flagEmptyDayTasks = false
        }

    }

    const dayH1 = document.getElementById("dayH1")
    dayH1.innerText = `Dia ${day}`

    if (flagEmptyDayTasks) {

        imgSemServico.style.display = "block"

        telaCheckedTasks.style.display = "flex"

    } else {

        container.style.display = "block"
        imgSemServico.style.display = "none"
        telaCheckedTasks.style.display = "flex"

        setDayTasks(day)
    }

})

const btnClose = document.getElementById("btnClose")
btnClose.addEventListener("click", function () {
    flagCalendar = false
    const container = document.getElementById("tasks")
    telaCheckedTasks.style.display = "none"
    container.style.display = "none"
    localStorage.removeItem("deleteWarning")
})


/* containerProfiles */

loadProfiles()
function loadProfiles() {
    let elementos = containerProfiles.childNodes

    for (let i = 7; i < elementos.length; i++) {

        elementos[i].remove()
    }

    let users = JSON.parse(localStorage.getItem("users"))
   
    if (users.length == 1 || users.length == 0) {

        //por imagem

    } else {

        for (let user of users) {
           
            let id = user.id
            let nome = user.nome
            let dataObj = user.date
            let totalGasto = user.atividadeNoSite.totalGasto
            let imagem = user.img

            if (!imagem) {
                imagem = null
            }

            if (id == 0) continue

            let containerUser = constructorProfiles(id, nome, dataObj, totalGasto, imagem)

            containerProfiles.appendChild(containerUser)
        }

    }
}

function constructorProfiles(id, nome, dataObj, totalGasto, imagem = null) {

    // paragrafos

    let paragrafoUserId = document.createElement("p")
    let paragrafoUserName = document.createElement("p")
    let paragrafoUserDate = document.createElement("p")
    let paragrafoUserSpending = document.createElement("p")

    let textUserId = document.createTextNode(id)
    let textUserName = document.createTextNode(nome)
    let textUserDate = document.createTextNode(dataObj.text)
    let textUserSpending = document.createTextNode(totalGasto)

    paragrafoUserId.classList.add("userId")
    paragrafoUserId.appendChild(textUserId)

    paragrafoUserName.classList.add("userName")
    paragrafoUserName.appendChild(textUserName)

    paragrafoUserDate.classList.add("userDate")
    paragrafoUserDate.appendChild(textUserDate)

    paragrafoUserSpending.classList.add("userSpending")
    paragrafoUserSpending.appendChild(textUserSpending)

    //article

    let article = document.createElement("article")
    article.appendChild(paragrafoUserId)
    article.appendChild(paragrafoUserName)
    article.appendChild(paragrafoUserDate)
    article.appendChild(paragrafoUserSpending)

    //imagem user

    let img = document.createElement("img")

    if (imagem == null) {
        img.src = "../../imagens/perfil-default.jpg"
    } else {
        img.src = imagem
    }

    img.alt = "Foto De Perfil"

    //div container user

    let divContainer = document.createElement("div")
    divContainer.classList.add("containerUser")

    divContainer.appendChild(img)
    divContainer.appendChild(article)

    return divContainer
}

// payments

var ctx = document.getElementById("chart")


let tosaText = document.getElementById("tosaText")
let hospedagemText = document.getElementById("hospedagemText")
let brinquedosText = document.getElementById("brinquedosText")
let acessoriosText = document.getElementById("acessoriosText")
let alimentosText = document.getElementById("alimentosText")
let valueAllTransations = 0

for (let obj of categoryTransations) {
    valueAllTransations += obj.valorVendido

    let id = document.getElementById(`${obj.nome}-text`) 
    id.innerHTML = `R$ ${obj.valorVendido.toFixed(2)}`
}

if (valueAllTransations > 0) {

    var chartGraph = new Chart(ctx, {
        type: "pie",
        data: {
            labels: [
                'Tosa e Banho',
                'Hospedagem',
                'Brinquedos',
                'Acessórios',
                'Alimentos'
            ],
            datasets: [{
                label: 'Rendimento Bruto',
                data: [categoryTransations[0].valorVendido, categoryTransations[1].valorVendido, categoryTransations[2].valorVendido, categoryTransations[3].valorVendido, categoryTransations[4].valorVendido],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(217, 94, 50)',
                    'rgb(255, 3, 33)'
                ],
                hoverOffset: 4
            }]
        }
    })
} else {
    const imgContainer = document.getElementById("semRedimentos")

    imgContainer.style.display = "flex"
}

/*
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)'
*/


/* edit products */

const editButtons = document.querySelectorAll(".btnEditProducts")
const screenButtons = document.getElementById("containerEditButtons")
const screenAddProducts = document.getElementById("screenAddProducts")
const screenEditProducts = document.getElementById("screenEditProduct")
const screenRemoveProdutcs = document.getElementById("screenRemoveProduct")

;[...editButtons].forEach( button => {
    button.addEventListener("click", function(event){
        let text = event.target.textContent
        text = text.trim()
       
        switch(text) {
            case "add":
                screenButtons.style.display = "none"
                screenAddProducts.style.display = "flex"
                break
            case "edit_square":
                screenButtons.style.display = "none"
                screenEditProducts.style.display = "flex"
                break
            case "delete_forever":
                screenButtons.style.display = "none"
                screenRemoveProdutcs.style.display = "flex"
                break
        }
    })
})

const buttonInternos = document.querySelectorAll(".backEditButtons")

;[...buttonInternos].forEach(button => {
    button.addEventListener("click",function(event){
        let id = event.target.id

        switch(id) {
            case "internalAddButton":
                screenAddProducts.style.display = "none"
                screenButtons.style.display = "flex"
                break
            case "internalEditButton":
                screenEditProducts.style.display = "none"
                screenButtons.style.display = "flex"
                break
            case "internalRemoveButton":
                screenRemoveProdutcs.style.display = "none"
                screenButtons.style.display = "flex"
                break
        }
    })
})



