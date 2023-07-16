import { bodyCalendar } from "../../pag-adm.js"
import { mesAtual } from "../../pag-adm.js"

export function setMarkersCalendar() {
    
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
        
        if (agendamento.mes == mesAtual || agendamento.mesSaida == mesAtual) {
            
            for (let day of weeks) {
                
                if (day.textContent == agendamento.dia || day.textContent == agendamento.diaSaida) {
                    let verifyClass = false

                    if (day.classList.contains("mark")) {
                        verifyClass = true
                    }

                    if (day.getAttribute("escurecer")) {
                        verifyClass = true
                    }
                    
                    if (!verifyClass) {
                        day.classList = "mark"
                    }

                }
                
                if (day.getAttribute("escurecer")) {
                
                    for (let agendamentoEscuro of agendamentos) {
                        
                        if (agendamentoEscuro.mes == (mesAtual - 1) || agendamentoEscuro.mesSaida == (mesAtual - 1)) {
                            
                            for (let day of weeks) {
                                
                                if (day.textContent == agendamentoEscuro.dia && day.getAttribute("escurecer")) {
                                    if (!day.classList.contains("mark")) {
                                        day.classList = "mark"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}