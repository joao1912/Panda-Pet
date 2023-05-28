let users = JSON.parse(localStorage.getItem("users")) 
//[{nome: userName, senha: passWord, carrinho: [ cod: , quant: ], online: false, img: urlFotoPerfil}]
let userID

for (let obj of users) {
    if (obj.online) {
        userID = obj.id
        break
    }
}

import { produtos } from "../utils/produtos.js"


//Limpar o carrinho para testes
limpaCarrinho()


//Adicionar tudo no carrinho pra testar
listaProdutos.forEach((produto) => {
    //adicionaProdutoAoCarrinho(produto)
})
adicionaProdutoAoCarrinhoUsandoId(5)
adicionaProdutoAoCarrinhoUsandoId(6)
adicionaProdutoAoCarrinhoUsandoId(5)

function adicionaProdutoAoCarrinho(objProduto) {
    if (objProduto == null) {
        alert("Produto inválido. [1]")
        return
    }
    let carrinho = pegaCarrinho()
    //Verificar se o produto já existe e adicionar um amais 
    let produtoExistente = carrinho.find(produto => produto.id === objProduto.id)
    if (produtoExistente == undefined || produtoExistente == null) { //vamos ver se é necessario verificar se ja tem no carrinho
        objProduto.quantidade = 1
        carrinho.push(objProduto)
    } else {
        produtoExistente.quantidade++ //não é para acontecer
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}



function adicionaProdutoAoCarrinhoUsandoId(idProduto) {
    let carrinho = pegaCarrinho()
    //Verificar se o produto já existe e adicionar um amais 
    let produtoExistente = carrinho.find(produto => produto.id === idProduto)
    if (produtoExistente == undefined || produtoExistente == null) {
        let produto = listaProdutos.find(produto => produto.id === idProduto)
        if (produto == undefined || produto == null) {
            console.log(`Produto com o id ${idProduto} não encontrado.`)
            return
        }
        produto.quantidade = 1
        carrinho.push(produto)
    } else {
        produtoExistente.quantidade++ //não necessario
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}


function removeProdutoDoCarrinho(idProduto, quantidade = 1, deletaItem = false) {
    let carrinho = pegaCarrinho()
    // Obter o índice do produto no carrinho (-1 se não encontrar)
    let index = carrinho.findIndex(produto => produto.id === idProduto)

    if (index == -1) {
        console.log(`Produto com o id ${idProduto} não encontrado no carrinho.`)
        return
    }

    // Checar se deve remover completamente o item
    if (deletaItem) {
        carrinho.splice(index, 1)
    } else {
        // Diminuir a quantidade passada pela função
        carrinho[index].quantidade -= quantidade //não necessario
        // Verificar se é menor que 0 para remover o índice da lista
        if (carrinho[index].quantidade < 1) {
            carrinho.splice(index, 1) //a quantidade minima sera 1, o produto só podera ser removido apertando o botão excluir
        }
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}


function exibeCarrinho() {
    let carrinho = pegaCarrinho()
    
    containerCarrinho.innerHTML = ""

    carrinho.forEach((produto) => {
        if (produto == null) {
            alert("Produto nulo")
        }

        // Criar uma div para cada produto
        let divProduto = document.createElement("div")
        divProduto.id = "produto-" + produto.id

        let nome = document.createElement("h3")
        nome.textContent = produto.nome
        divProduto.appendChild(nome)

        let preco = document.createElement("p")
        preco.textContent = "R$ " + produto.preco
        divProduto.appendChild(preco)

        let imagem = document.createElement("img")
        imagem.src = produto.imagem
        divProduto.appendChild(imagem)

        let quantidade = document.createElement("p")
        quantidade.textContent = "QTD: " + produto.quantidade
        divProduto.appendChild(quantidade)

        containerCarrinho.appendChild(divProduto)

        containerCarrinho.appendChild(document.createElement("hr"))
    })
}

exibeCarrinho()

//Função criada para puxar o carrinho sempre que necessário
function pegaCarrinho() {
    //Criar o carrinho no localStorage se ele não existir
    if (!localStorage.getItem("carrinho")) {
        localStorage.setItem("carrinho", JSON.stringify([]))
    }
    let carrinho = JSON.parse(localStorage.getItem("carrinho"))
    if (carrinho == null) {
        //Carrinho vazio ou algum bug, criando um array sem elementos para retorno
        carrinho = []
    }
    return carrinho
}


function limpaCarrinho() {
    localStorage.removeItem("carrinho")
    //talvez tenha que exibir o carrinho vazio depois
}





function funcConstructorElements(cod) {
    // div valor do produto

    let divValorProduto = document.createElement("div")
    divValorProduto.classList = "valorProduto"
    let preco = document.createTextNode(`R$ ${(produtos[cod].preco).toFixed(2)}`)
    divValorProduto.appendChild(preco)

    // botao excluir

    let btnExcluir = document.createElement("button")
    btnExcluir.classList = "btnExcluir"
    let textBtnExcluir = document.createTextNode("Excluir")
    btnExcluir.appendChild(textBtnExcluir)

    // span icon add

    let iconAdd = document.createElement("span")
    iconAdd.classList = "material-symbols-outlined"
    let textIcon = document.createTextNode("add")
    iconAdd.appendChild(textIcon)

    // input de quantidade(Read Only)

    let inptQuant = document.createElement("input")
    inptQuant.type = "number"
    inptQuant.classList = "inptQuantProduto"
    inptQuant.value = "1"
    inptQuant.setAttribute("readonly")

    // span icon remove

    let iconRemove = document.createElement("span")
    iconRemove.classList = "material-symbols-outlined"
    let textIconRemove = document.createTextNode("remove")
    iconRemove.appendChild(textIconRemove)

    // div container quantidade

    let divContainerQuantidade = document.createElement("div")
    divContainerQuantidade.classList = "containerQuantidade"
    divContainerQuantidade.appendChild(iconRemove)
    divContainerQuantidade.appendChild(inptQuant)
    divContainerQuantidade.appendChild(iconAdd)

    //h1 nome do produto

    let h1Produto = document.createElement("h1")
    h1Produto.classList = "nomeProduto"
    let textNomeProduto = document.createTextNode(`${produtos[cod].nome}`)
    h1Produto.appendChild(textNomeProduto)

    //div container da quantidade, preço, nome, btnExcluir

    let divInterna = document.createElement("div")
    divInterna.appendChild(h1Produto)
    divInterna.appendChild(divContainerQuantidade)
    divInterna.appendChild(btnExcluir)

    //imagem do produto

    let imgProduto = document.createElement("img")
    imgProduto.src = `../imagens/${produtos[cod].imagem}`  
    imgProduto.alt = `${produtos[cod].descricaoImagem}`

    //div descrição do produto

    let divDescricaoProduto = document.createElement("div")
    divDescricaoProduto.classList = "descricaoProduto"
    divDescricaoProduto.appendChild(imgProduto)
    divDescricaoProduto.appendChild(divInterna)
    divDescricaoProduto.appendChild(divValorProduto)

    //div container produto

    let divProduto = document.createElement("div")
    divProduto.classList = "produto"
    divProduto.appendChild(divDescricaoProduto)
    
    return divProduto
}

function calcFinalizarCompra(quantidade) {
    let carrinho = users[userID].carrinho 
    let quantideDeProdutos = 0
    let valorTotal = 0
    const containerTotalValor = document.getElementById("totalValor")
    const containerQuantProdutos = document.getElementById("quantProdutos")

    for (let obj of carrinho) {
        quantideDeProdutos++
        valorTotal += produtos[obj.cod].preco
    }

    containerQuantProdutos.innerHTML = `${quantideDeProdutos} Produto(s)`
    containerTotalValor.innerHTML = `Total: R$ ${valorTotal}`
}