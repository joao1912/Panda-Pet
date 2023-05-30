import { produtos } from "../utils/produtos.js"

let users = JSON.parse(localStorage.getItem("users"))
//[{nome: userName, senha: passWord, carrinho: [ cod: , quant: ], online: false, img: urlFotoPerfil}]
let userID

for (let obj of users) {
    if (obj.online) {
        userID = obj.id
        break
    }
}


//Limpar o carrinho para testes
limpaCarrinho()


adicionaProdutoAoCarrinhoUsandoCodigo(5)
adicionaProdutoAoCarrinhoUsandoCodigo(6)
adicionaProdutoAoCarrinhoUsandoCodigo(5)
//removeProdutoDoCarrinho(5, -1, true)
//removeProdutoDoCarrinho(6, -1, true)


function adicionaProdutoAoCarrinhoUsandoCodigo(codigo) {
    let carrinho = pegaCarrinho()
    //Verificar se o produto já existe e adicionar um amais 
    let produtoExistente = carrinho.find(produto => produto.codigo === codigo)
    if (produtoExistente == undefined || produtoExistente == null) {
        let produto = produtos.find(produto => produto.codigo === codigo)
        if (produto == undefined || produto == null) {
            console.log(`Produto com o id ${codigo} não encontrado.`)
            return
        }
        let produtoAdd = {
            codigo: produto.codigo,
            quantidade: 1 
        }
        carrinho.push(produtoAdd)
    } else {
        produtoExistente.quantidade++ //não necessario
    }

    users[userID].carrinho = carrinho
    localStorage.setItem("users", JSON.stringify(users))
}


function removeProdutoDoCarrinho(codigoProduto, quantidade = 1, deletaItem = false) {
    let carrinho = pegaCarrinho()
    // Obter o índice do produto no carrinho (-1 se não encontrar)
    let index = carrinho.findIndex(produto => produto.codigo === codigoProduto)

    if (index == -1) {
        console.log(`Produto com o id ${idProduto} não encontrado no carrinho.`) // esta variavel não existe(idProduto)
        return
    }

    // Checar se deve remover completamente o item
    if (deletaItem) {
        carrinho.splice(index, 1)
    } else {
        // Diminuir a quantidade passada pela função
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade -= quantidade //não necessario
        }
    }
    users[userID].carrinho = carrinho
    //quando houver alteração no carrinho, salvar no localStorage
}


function exibeCarrinho() {
    let carrinho = pegaCarrinho()

    containerCarrinho.innerHTML = "" //esta variável não existe(containerCarrinho)

    carrinho.forEach((produto) => {
        if (produto == null) {
            alert("Produto nulo")
        }

        let elementoProduto = funcConstructorElements(produto.codigo, produto.quantidade)
        containerCarrinho.appendChild(elementoProduto) //esta variável não existe(containerCarrinho)

    })
}

exibeCarrinho()

//Função criada para puxar o carrinho sempre que necessário
function pegaCarrinho() {
    // Verificar se existe o carrinho no usuário atual
    let carrinho = users[userID].carrinho
    if (carrinho == null) {
        //Carrinho vazio ou algum bug, criando um array sem elementos para retorno
        users[userID].carrinho = []
    }
    return carrinho
}


function limpaCarrinho() {
    users[userID].carrinho = []
    localStorage.setItem("users", JSON.stringify(users))
    //talvez tenha que exibir o carrinho vazio depois
}





function funcConstructorElements(cod, quantity) {
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
    inptQuant.value = quantity
    inptQuant.setAttribute("readonly", true)

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