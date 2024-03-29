import { mesAtual } from "../../pag-adm.js"
import { constructorTasks } from "./constructorTasks.js"
import { cancelTask } from "./cancelTask.js"
import { confirmDeletion } from "./confirmDeletion.js"

export function setDayTasks(diaSelecionado) {

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) 
    let users = JSON.parse(localStorage.getItem("users"))
    
    const containerTasks = document.getElementById("dayTasks")
    containerTasks.innerHTML = ""

    for (let obj of agendamentos) {

        let id = obj.id
        let nome = users[id].nome
        let servico = obj.service
        let day = obj.dia
        let exitDay = obj.diaSaida
        let mes = obj.mes
        let mesSaida = obj.mesSaida
        let hora = obj.horaEntrada
        let horaSaida = obj.horarioSaida
        let nomePet = obj.pet.nome
        let idPET = obj.pet.idPET

       
        if (mesSaida == mesAtual && exitDay == diaSelecionado) {
            const container = document.getElementById("containerCheckedTasks")
            container.style.width = "950px"
            
            servico = `${servico} \n(Check-Out)`
            let task = constructorTasks(id, nome, horaSaida, servico, idPET, nomePet)

            containerTasks.appendChild(task) 

        }

        if (mesAtual == mes && day == diaSelecionado) {
            const container = document.getElementById("containerCheckedTasks")
            container.style.width = "950px"

            if (servico == "Hospedagem") {
                servico = `${servico} \n(Check-In)`
            }

            let task = constructorTasks(id, nome, hora, servico, idPET, nomePet)

            containerTasks.appendChild(task) 
        }
    }

    const botoesCancel = document.querySelectorAll(".btnCancel")
    ;[...botoesCancel].forEach( botao => {
    botao.addEventListener("click", function(event){
       
            let showMessageOrNot = JSON.parse(localStorage.getItem("deleteWarning"))
        
            if (showMessageOrNot == null) {
                localStorage.setItem("deleteWarning", true)
                showMessageOrNot = true
            }

            let btnValue = event.target.value
            let taskDeleted

            for (let obj of agendamentos) {
                if (obj.id == btnValue) {
                    taskDeleted = obj
                }
            }

            if (!showMessageOrNot) {
                cancelTask(taskDeleted)
            } else {
                confirmDeletion(taskDeleted, showMessageOrNot)
            }
        })
    })
}