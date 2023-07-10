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
            //classificacao = obj.classificacao

            break

        }

    }

    let tituloProduto = document.getElementById("tituloProduto")
    let codigoElemento = document.getElementById("descricaoCodigo")
    let descricaoProduto = document.getElementById("informacoesProduto")
    let precoProduto = document.getElementById("alteracoesDescricaodivs")
    let imgProduto = document.getElementById("imagemProdutoIndividual")

    tituloProduto.textContent = nome
    codigoElemento.textContent = `Código: ${codigoProduto}`
    descricaoProduto.textContent = descricao
    precoProduto.textContent = `R$ ${preco.toFixed(2)}`
    imgProduto.src = imagem
    imgProduto.alt = descricaoImagem

}

