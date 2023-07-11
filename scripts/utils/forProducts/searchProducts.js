import { produtos } from "../produtos.js";

export function searchProducts(term) {

    term = term.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")
    .toLowerCase()

    let indexProducts = []

    for(let i = 0; i < produtos.length; i++) {

        let title = produtos[i].nome

        let exist = title.normalize("NFD")
            .replace(/[^a-zA-Z\s]/g, "")
            .toLowerCase()
            .includes(term)

        if (exist) {
            
            indexProducts.push(i)

        }
    }

    return indexProducts
}
