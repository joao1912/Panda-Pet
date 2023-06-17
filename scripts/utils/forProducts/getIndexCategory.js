import { produtos } from "../produtos.js"

export function getIndexCategory(getCategoria) {
    let indexProd = []
    if (getCategoria == "sugestoes") {
        let quantityProducts = produtos.length

        if (quantityProducts > 12) {
            quantityProducts = 12
        }

        while (indexProd.length < quantityProducts) {

            var randomNumber = Math.floor(Math.random() * produtos.length)

            if (indexProd.indexOf(randomNumber) > -1) {

                continue

            }

            indexProd.push(randomNumber)
        }

    } else {
        let index = 0
        for (let obj of produtos) {

            if (obj.categoria === getCategoria) {
                indexProd.push(index)
            }

            index++
        }

    }
    
    return indexProd
}