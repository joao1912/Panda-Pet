import { bodyCalendar } from "../../pagina-adm/pag-adm.js"
import { mesAtual } from "../../pagina-adm/pag-adm.js"

export function setCurrentDay() {
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