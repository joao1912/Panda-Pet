import {showProducts} from '../utils/forProducts/showProducts.js'
import { saveLocalStorage } from '../utils/saveLocalStorage.js'
import { changeMonth } from '../utils/forCalendar/changeMonth.js'
import { setDarkCellCalendar } from '../utils/forCalendar/setDarkCellCalendar.js'
import { setMarkersCalendar } from '../utils/forCalendar/setMarkersCalendar.js'
import { setCurrentDay } from '../utils/forCalendar/setCurrentDay.js'

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

const telaAdmUtilities = document.getElementById("containerAdmUtilities")
const containerCalendar = document.getElementById("viewCalendar")


telaAdmUtilities.addEventListener("click", function(event){
    let idBtn = event.target.id

    switch(idBtn) {
        case "btnCalendar":
            telaAdmUtilities.style.display = "none"
            containerCalendar.style.display = "flex"
            break
    }
})

let btnsBackMenu = document.querySelectorAll(".backMenu")

;[...btnsBackMenu].forEach(btnBack => {
    btnBack.addEventListener("click", function(){
        telaAdmUtilities.style.display = "flex"
    
        containerCalendar.style.display = 'none'
    })
})

const botoesTrocaMes = document.querySelectorAll(".trocaMes")
export let mesAtual 

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

/* --- TEMPORARIO --- */


const agendamentos = []
agendamentos.push(
    {
        id: 1,
        service: "Hospedagem",
        dia: 10,
        mes: 11 ,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 2,
        service: "Hospedagem",
        dia: 10,
        mes: 11 ,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 3,
        service: "Hospedagem",
        dia: 10,
        mes: 11 ,//o mes vai de 0 a 11 !!!
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

calendar.addEventListener("click", function(event){
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
btnClose.addEventListener("click", function(){
    const container = document.getElementById("tasks")
    telaCheckedTasks.style.display = "none"
    container.style.display = "none"
})

function setDayTasks(diaSelecionado) {

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) 
    let users = JSON.parse(localStorage.getItem("users"))
    
    const containerTasks = document.getElementById("dayTasks")
    containerTasks.innerHTML = ""

    for (let obj of agendamentos) {

        let id = obj.id
        let nome = users[id].nome
        let servico = obj.service
        let day = obj.dia
        let mes = obj.mes
        let hora = obj.hora

        if (mesAtual == mes && day == diaSelecionado) {

            let task = constructorTasks(id, nome, hora, servico)

            containerTasks.appendChild(task) 
        }
    }

    const botoesCancel = document.querySelectorAll(".btnCancel")
    ;[...botoesCancel].forEach( botao => {
    botao.addEventListener("click",async function(event){
       
        
        let flagCancel = await warningMessage()

        //fazer ele esperar a resposta da função de cima!!!!!!!!!
        
        if (flagCancel) return

        let btnValue = event.target.value
        let taskDeleted

        for (let obj of agendamentos) {
            if (obj.id == btnValue) {
                taskDeleted = obj
            }
        }

        
        
        cancelTask(taskDeleted)
    })
    })

    async function warningMessage() {
        let showMessageOrNot = JSON.parse(localStorage.getItem("deleteWarning"))
        let flagCancel = false

        if (showMessageOrNot == null) {
            localStorage.setItem("deleteWarning", true)
            showMessageOrNot = true
        }

        if (showMessageOrNot) {
            Swal.fire({

            title: 'Tem Certeza?',
            icon: 'warning',
            text: 'Não poderá ser desfeito!',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            denyButtonText: `Sim, não me avise de novo`,
            cancelButtonText: 'Cancelar'

            }).then((result) => {
                
                if (result.isConfirmed) {
                    Swal.fire('Deletado!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Deletado', '', 'success')
                    showMessageOrNot = false
                    localStorage.setItem("deleteWarning", JSON.stringify(showMessageOrNot))
                } else if(result.isDismissed) {
                    flagCancel = true
                }
            })
        }
    }

}



function constructorTasks(id, nome, hora, servico) {
    //botao delete

    let deleteButton = document.createElement("button")
    deleteButton.classList.add('material-symbols-outlined')
    deleteButton.classList.add('btnCancel')

    let textBtnDelete = document.createTextNode('delete')
    deleteButton.appendChild(textBtnDelete)
    deleteButton.value = id

    //td do botao delete

    let tdDeleteButton = document.createElement("td")
    tdDeleteButton.appendChild(deleteButton)

    //td serviço

    let tdServico = document.createElement("td")
    let textServico = document.createTextNode(servico)
    tdServico.appendChild(textServico)

    //td horario

    let tdHora = document.createElement("td")
    tdHora.classList.add("hrCell")
    let textHora = document.createTextNode(hora)
    tdHora.appendChild(textHora)

    //td nome user

    let tdUserName = document.createElement("td")
    let textName = document.createTextNode(nome)
    tdUserName.appendChild(textName)

    // td userId

    let tdUserId = document.createElement("td")
    let textId = document.createTextNode(id)
    tdUserId.classList.add("idCell")
    tdUserId.appendChild(textId)

    // tr

    let tr = document.createElement("tr")
    tr.appendChild(tdUserId)
    tr.appendChild(tdUserName)
    tr.appendChild(tdHora)
    tr.appendChild(tdServico)
    tr.appendChild(tdDeleteButton)

    return tr
}




function cancelTask(obj) {
    const tasks = document.getElementById("dayTasks").children
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos"))
    
    for (let task of tasks) {
        let idTask = task.firstElementChild.textContent
        if (obj.id == idTask) {
            task.remove()
            let novosAgendamentos = agendamentos.filter( item => item.id != obj.id)
            localStorage.setItem("agendamentos", JSON.stringify(novosAgendamentos))
        }
    }

}
