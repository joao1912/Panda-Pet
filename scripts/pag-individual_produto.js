let nome,descricao,imagem,descricaoImagem,preco,classificacao


export function loadInfoProducts(codigoProduto) {

    let listaProdutos = JSON.parse(localStorage.getItem("listaProdutos")) 

    for (let obj of listaProdutos){

        if (obj.codigo == codigoProduto){

            nome = obj.nome
            descricao = obj.descricao
            imagem = obj.imagem
            descricaoImagem = obj.descricaoImagem
            preco = obj.preco
            classificacao = obj.classificacao

            break

        }

    }
    
    const tituloProduto = document.getElementById("tituloProduto")
    const codigoElemento = document.getElementById("descricaoCodigo")
    const descricaoProduto = document.getElementById("informacoesProduto")
    const precoProduto = document.getElementById("alteracoesDescricaodivs")
    const imgProduto = document.getElementById("imagemProdutoIndividual")

    tituloProduto.textContent = nome
    codigoElemento.textContent = `Código: ${codigoProduto}`
    descricaoProduto.textContent = descricao
    precoProduto.textContent = `R$ ${preco.toFixed(2)}`
    imgProduto.src = imagem
    imgProduto.alt = descricaoImagem

    setStars(classificacao)
}


function setStars(classificacao) {
    const containerStars = document.getElementById("containerStars")
    containerStars.innerHTML = ""
    let stars = []

    for (let i = 0 ; i < classificacao ; i++) {
        stars.push("./imagens/estrela-cheia.png")
    }

    while (stars.length != 5) {
        stars.push("./imagens/estrela-vazia.png")
    }
    
    for (let star of stars) {
        let img = document.createElement("img")
        img.src = star

        if (star.indexOf("vazia") !== -1) {
            img.alt = "Estrela Cheia"
        } else {
            img.alt = "Estrela Vazia"
        }
        containerStars.appendChild(img)
    }
}

