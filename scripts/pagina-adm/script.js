import {showProducts} from '../../scripts/utils/showProducts.js'
import { saveLocalStorage } from '../utils/saveLocalStorage.js'

let bodyCalendar = [...document.getElementById("calendar").lastElementChild.children]
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

    document.getElementById("botaoSair").addEventListener("click",function sair(){
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

const iconeDoPerfil = document.getElementById("perfilIcon")

iconeDoPerfil.addEventListener("click",function(){
    const tabelaPerfil = document.getElementById("containerPerfil")

    function redirecionarCadastro(){
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

const iconTelaAdm = document.getElementById("icon-tela-adm")
iconTelaAdm.addEventListener("click", function(){


    if (!window.location.pathname == '/paginas/administrador.html') {
        window.location.href = "../../paginas/administrador.html"
    }

    
})

const botoesTrocaMes = document.querySelectorAll(".trocaMes")
let mesAtual 

;[...botoesTrocaMes].forEach(botao => {
    botao.addEventListener("click", function(event){
        let direction = event.target.textContent

        if (direction === "keyboard_arrow_left") {

            if (mesAtual != 0) {
                mesAtual -= 1
                changeMonth(mesAtual)
            } else {
                mesAtual = 11
                changeMonth(mesAtual)
            }
            
        } else if(direction === "keyboard_arrow_right") {

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

function setCurrentDay() {
    let data = new Date()
    let month = data.getMonth()
    let day = data.getDate()

    let week1 = [...bodyCalendar[0].children]
    let week2 = [...bodyCalendar[1].children]
    let week3 = [...bodyCalendar[2].children]
    let week4 = [...bodyCalendar[3].children]
    let week5 = [...bodyCalendar[4].children]

    let weeks = [...week1, ...week2, ...week3, ...week4, ...week5]

    if (mesAtual == month) {
        
        for(let dayIterable of weeks) {

            if (!dayIterable.classList.contains("escurecer")) {
                
                if (dayIterable.textContent == day) {

                    dayIterable.setAttribute("currentDay", true)

                } 
            }
        }

    } else {

        for(let dayIterable of weeks) {

            dayIterable.removeAttribute("currentDay")

        }
    }
}

document.addEventListener("DOMContentLoaded",function(){
    let mes = new Date()
    mes = mes.getMonth()
    const mouthTitle = document.getElementById("mouthTitle")

    switch(mes) {
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


const months = [
    {
        id: 0,
        Mouth: 'Janeiro',
        daysSet: [31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4]
    },
    {
        id: 1,
        Mouth: 'Fevereiro',
        daysSet: [29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,1,2,3,4]
    },
    {
        id: 2,
        Mouth: 'Março',
        daysSet: [26,27,28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1]
    },
    {
        id: 3,
        Mouth: 'Abril',
        daysSet: [26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6]
    },

    {
        id: 4,
        Mouth: 'Maio',
        daysSet: [30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3]
    },
    {
        id: 5,
        Mouth: 'Junho',
        daysSet: [28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1]
    },
    {
        id: 6,
        Mouth: 'Julho',
        daysSet: [25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5]
    },
    {
        id: 7,
        Mouth: 'Agosto',
        daysSet: [30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2]
    },

    {
        id: 8,
        Mouth: 'Setembro',
        daysSet: [27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    {
        id: 9,
        Mouth: 'Outubro',
        daysSet: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4]
    },
    {
        id: 10,
        Mouth: 'Novembro',
        daysSet: [29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2]
    },
    {
        id: 11,
        Mouth: 'Dezembro',
        daysSet: [26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6]
    }
]

function changeMonth(mes) {


    let week1 = [...bodyCalendar[0].children]
    let week2 = [...bodyCalendar[1].children]
    let week3 = [...bodyCalendar[2].children]
    let week4 = [...bodyCalendar[3].children]
    let week5 = [...bodyCalendar[4].children]

    let weeks = [...week1, ...week2, ...week3, ...week4, ...week5]

    const mouthTitle = document.getElementById("mouthTitle")
    
    switch(mes) {
        case 0:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[0].daysSet[i]
            }
            mouthTitle.innerHTML = "Janeiro"
            break
        case 1:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[1].daysSet[i]
            }
            mouthTitle.innerHTML = "Fevereiro"
            break
        case 2:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[2].daysSet[i]
            }
            mouthTitle.innerHTML = "Março"
            break
        case 3:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[3].daysSet[i]
            }
            mouthTitle.innerHTML = "Abril"
            break
        case 4:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[4].daysSet[i]
            }
            mouthTitle.innerHTML = "Maio"
            break
        case 5:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[5].daysSet[i]
            }
            mouthTitle.innerHTML = "Junho"
            break
        case 6:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[6].daysSet[i]
            }
            mouthTitle.innerHTML = "Julho"
            break
        case 7:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[7].daysSet[i]
            }
            mouthTitle.innerHTML = "Agosto"
            break
        case 8:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[8].daysSet[i]
            }
            mouthTitle.innerHTML = "Setembro"
            break
        case 9:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[9].daysSet[i]
            }
            mouthTitle.innerHTML = "Outubro"
            break
        case 10:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[10].daysSet[i]
            }
            mouthTitle.innerHTML = "Novembro"
            break
        case 11:
            for (let i = 0 ; i < 35; i++) {
                weeks[i].innerHTML = months[11].daysSet[i]
            }
            mouthTitle.innerHTML = "Dezembro"
            break
    }
    setDarkCellCalendar()
    setMarkersCalendar()
    setCurrentDay()
}

function setDarkCellCalendar() {

    let week1 = [...bodyCalendar[0].children]
    let week5 = [...bodyCalendar[4].children]

    for (let i = 0 ; i < 7 ; i++) {
        week1[i].removeAttribute("escurecer")
        week5[i].removeAttribute("escurecer")
    }
    
    switch(mesAtual) {
        case 0:
            week1[0].setAttribute("escurecer", true)
            for (let i = 4; i < 7 ; i++) {
                week5[i].setAttribute("escurecer", true)
            }
            break
        case 1:
            for (let i = 0 ; i < 3 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            for (let i = 3; i < 7 ; i++) {
                week5[i].setAttribute("escurecer", true)
            }
            break
        case 2:
            for (let i = 0 ; i < 3 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            week5[6].setAttribute("escurecer", true)
            break
        case 3:
            for (let i = 0 ; i < 6 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            break
        case 4:
            week1[0].setAttribute("escurecer", true)

            for(let i = 4 ; i < 7 ; i++) {
                week5[i].setAttribute("escurecer", true)
            }
            break
        case 5:
            for(let i = 0 ; i < 4 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            week5[6].setAttribute("escurecer", true)
            break
        case 6:
            for (let i = 0 ; i < 6 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            break
        case 7:
            week1[0].setAttribute("escurecer", true)
            week1[1].setAttribute("escurecer", true)

            week5[5].setAttribute("escurecer", true)
            week5[6].setAttribute("escurecer", true)
            break
        case 8: 
            for (let i = 0 ; i < 5 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            break
        case 9:
            for (let i = 3 ; i < 7 ; i++) {
                week5[i].setAttribute("escurecer", true)
            }
            break
        case 10:
            for (let i = 0 ; i < 3 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }

            week5[5].setAttribute("escurecer", true)
            week5[6].setAttribute("escurecer", true)
            break
        case 11:
            for (let i = 0 ; i < 5 ; i++) {
                week1[i].setAttribute("escurecer", true)
            }
            
            break
    }
}

const agendamentos = []
agendamentos.push(
    {
        id: userID,
        service: "Hospedagem",
        dia: 19,
        mes: 11 //o mes vai de 0 a 11 !!!
    },
    {
        id: userID,
        service: "Hospedagem",
        dia: 6,
        mes: 0 //o mes vai de 0 a 11 !!!
    },
    {
        id: userID,
        service: "Hospedagem",
        dia: 27,
        mes: 10 //o mes vai de 0 a 11 !!!
    },
    {
        id: userID,
        service: "Hospedagem",
        dia: 29,
        mes: 9 //o mes vai de 0 a 11 !!!
    }
)

localStorage.setItem("agendamentos", JSON.stringify(agendamentos))

function setMarkersCalendar() {
    
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos"))

    let week1 = [...bodyCalendar[0].children]
    let week2 = [...bodyCalendar[1].children]
    let week3 = [...bodyCalendar[2].children]
    let week4 = [...bodyCalendar[3].children]
    let week5 = [...bodyCalendar[4].children]

    let weeks = [...week1, ...week2, ...week3, ...week4, ...week5]

    for (let day of weeks) {
        day.classList.remove("mark")
    }

    if (agendamentos.length === 0) return

    for (let agendamento of agendamentos) {
        
        if (agendamento.mes == mesAtual) {
            
            for (let day of weeks) {
                
                if (day.textContent == agendamento.dia) {
                    let verifyClass = false

                    if (day.classList.contains("mark")) {
                        verifyClass = true
                    }

                    if (day.getAttribute("escurecer")) {
                        
                        verifyClass = true
                        

                    }
                    
                    if (!verifyClass) {
                        day.classList += "mark"
                    }

                }
                
                if (day.getAttribute("escurecer")) {
                
                    for (let agendamentoEscuro of agendamentos) {
                        
                        if (agendamentoEscuro.mes == (mesAtual - 1)) {
                            
                            for (let day of weeks) {
                                
                                if (day.textContent == agendamentoEscuro.dia && day.getAttribute("escurecer")) {
                                    day.classList += " mark"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}