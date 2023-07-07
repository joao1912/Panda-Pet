import { mesAtual } from "../../pagina-adm/pag-adm.js"
import { bodyCalendar } from "../../pagina-adm/pag-adm.js"

export function setDarkCellCalendar() {

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