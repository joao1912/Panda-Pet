import { months } from "./months.js"
import { setDarkCellCalendar } from "./setDarkCellCalendar.js"
import { bodyCalendar } from "../../pag-adm.js"
import { setMarkersCalendar } from "./setMarkersCalendar.js"
import { setCurrentDay } from "./setCurrentDay.js"

export function changeMonth(mes) {


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