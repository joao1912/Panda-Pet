import { produtos } from "../produtos.js"

export function getIndexCategory(getCategoria) {
    let indexProd = []
    let index = 0
    for(let obj of produtos) {
        
        if (obj.categoria === getCategoria) {
            indexProd.push(index)
        }
    
        index++
    }

    return indexProd
}