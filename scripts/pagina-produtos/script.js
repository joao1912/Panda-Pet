import { produtos } from "../utils/produtos.js"

const nav = document.querySelector("nav")

nav.addEventListener("click",function(event){
    const h1Produtos = document.getElementById("h1Produtos")
    let indexProdutos

    switch(event.target.id) {
        case "forHome":
            window.location.href = "../../index.html"
            break

        case "forAcessorios":
            h1Produtos.textContent = "Acessórios"
            indexProdutos = getIndexCategory("acessorios")

            setElements(indexProdutos, constructorElements)
            
            break
        
        case "forAlimentacao":
            h1Produtos.textContent = "Alimentação"
            indexProdutos = getIndexCategory("alimentacao")

            setElements(indexProdutos, constructorElements)

            break

        case "forBrinquedos":
            h1Produtos.textContent = "Brinquedos"
            indexProdutos = getIndexCategory("brinquedos")

            setElements(indexProdutos, constructorElements)

            break
        
        case "forAgendamento":
            //href
            break
    }
})

function getIndexCategory(getCategoria) {
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

function setElements(indexProdutos, funcConstructor) {
    for (let c = 0; c < indexProdutos.length ; c++) {
        let index = indexProdutos[c]
        
        let elemento = funcConstructor(produtos[index].nome, produtos[index].preco ,produtos[index].quantidade ,produtos[index].codigo ,produtos[index].descricao ,produtos[index].imagem, produtos[index].descricaoImagem)

        //enviar o elemento criado para o html
        console.log(elemento)
        
    }

}

function constructorElements(nome, preco, quantidade, codigo, descricao, imagem, descricaoImagem) {

    //construir um elemento e retornar

    return `
        Nome: ${nome}
        Preço: ${preco}
        Quantidade: ${quantidade}
        código: ${codigo}
        descricao: ${descricao}
        imagem: ${imagem}
        descricao da imagem: ${descricaoImagem}
    `

}