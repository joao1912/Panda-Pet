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
                        day.classList = "mark"
                    }

                }
                
                if (day.getAttribute("escurecer")) {

                    function calc() {
                        if (day.textContent > 20) {
                            
                            return mesAtual - 1
                            
                        } else {
                            return mesAtual + 1
                        }
                    }
                    
                
                    for (let agendamentoEscuro of agendamentos) {
                        
                        if (agendamentoEscuro.mes == calc()) {
                            
                            if (agendamentoEscuro.dia == day.textContent) {

                                for (let day of weeks) {       
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

        if (agendamento.mesSaida == mesAtual) {
            
            for (let day of weeks) {
                
                if (day.textContent == agendamento.diaSaida) {
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

                        function calc() {
                            if (day.textContent > 20) {
                                return mesAtual - 1
                            } else {
                                return mesAtual + 1
                            }
                        }
                        
                        if (agendamentoEscuro.mesSaida == calc()) {
                            
                            for (let day of weeks) {

                                if (day.textContent == agendamentoEscuro.diaSaida) {
                                    
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