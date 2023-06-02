import { saveLocalStorage } from "../utils/saveLocalStorage.js"
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


// limpaCarrinho()
// adicionaProdutoAoCarrinho(5)
// adicionaProdutoAoCarrinho(6)
// adicionaProdutoAoCarrinho(5)


function adicionaProdutoAoCarrinho(codigo) {
    let carrinho = pegaCarrinho()
    //Verificar se o produto já existe e adicionar um amais 
    let produtoExistente = carrinho.find(produto => produto.codigo === codigo)
    if (produtoExistente == undefined || produtoExistente == null) {
        let produto = produtos.find(produto => produto.codigo === codigo)
        if (produto == undefined || produto == null) {
            console.log(`Produto com o código ${codigo} não encontrado.`)
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
    calcFinalizarCompra()
    saveLocalStorage(users)
}


function removeProdutoDoCarrinho(codigoProduto, quantidade = 1, deletaItem = false) {
    let carrinho = pegaCarrinho()
    // Obter o índice do produto no carrinho (-1 se não encontrar)
    let index = carrinho.findIndex(produto => produto.codigo === codigoProduto)

    if (index == -1) {
        console.log(`Produto com o código ${codigoProduto} não encontrado no carrinho.`)
        return
    }

    // Checar se deve remover completamente o item
    if (deletaItem) {
        carrinho.splice(index, 1)
    } else {
        // Diminuir a quantidade passada pela função
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade -= quantidade
        }
    }
    users[userID].carrinho = carrinho
    saveLocalStorage(users)
    calcFinalizarCompra()
}


function exibeCarrinho() {
    let carrinho = pegaCarrinho()
    let containerCarrinho = document.getElementById("containerCarrinho")

    containerCarrinho.innerHTML = ""

    carrinho.forEach((produto) => {
        if (produto == null) {
            console.log("Produto nulo no carrinho")
        } else {
            let elementoProduto = funcConstructorElements(produto.codigo, produto.quantidade)
            containerCarrinho.appendChild(elementoProduto)
        }
    })

    const listaProdutos = document.querySelectorAll('.produto')

    listaProdutos.forEach((produto) => {
        const id = Number(produto.id)
        const btnExcluir = produto.querySelector('.btnExcluir')
        const btnAdd = produto.querySelector('.btnAdd')
        const btnRemove = produto.querySelector('.btnRemove')
        btnExcluir.addEventListener('click', () => {
            removeProdutoDoCarrinho(id, -1, true)
            produto.remove()
        })
        btnAdd.addEventListener('click', () => {
            adicionaProdutoAoCarrinho(id)
            let inptQuantProduto = produto.querySelector(".inptQuantProduto")
            inptQuantProduto.value++
        })
        btnRemove.addEventListener('click', () => {
            removeProdutoDoCarrinho(id, 1)
            let inptQuantProduto = produto.querySelector(".inptQuantProduto")
            if (inptQuantProduto.value > 1) {
                inptQuantProduto.value--
            }
        })
    })
    calcFinalizarCompra()
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
    return users[userID].carrinho
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


    let btnExcluir = document.createElement("button")
    btnExcluir.classList = "btnExcluir"
    let textBtnExcluir = document.createTextNode("Excluir")
    btnExcluir.appendChild(textBtnExcluir)

    // span icon add

    let iconAdd = document.createElement("button")
    iconAdd.classList = "btnAdd"
    let textIcon = document.createTextNode("add")
    iconAdd.appendChild(textIcon)

    // input de quantidade(Read Only)

    let inptQuant = document.createElement("input")
    inptQuant.type = "number"
    inptQuant.classList = "inptQuantProduto"
    inptQuant.value = quantity
    inptQuant.setAttribute("readonly", true) // Alterei essa linha porque tava faltando um parâmetro no setAttribute

    // span icon remove

    let iconRemove = document.createElement("button")
    iconRemove.classList = "btnRemove"
    let textIconRemove = document.createTextNode("remove")
    iconRemove.appendChild(textIconRemove)

    // div container quantidade

    let divContainerQuantidade = document.createElement("div")
    divContainerQuantidade.classList = "containerQuantidade"
    divContainerQuantidade.appendChild(iconAdd)
    divContainerQuantidade.appendChild(inptQuant)
    divContainerQuantidade.appendChild(iconRemove)

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
    divProduto.id = `${produtos[cod].codigo}`;
    divProduto.appendChild(divDescricaoProduto)

    return divProduto
}

function calcFinalizarCompra() {
    let carrinho = users[userID].carrinho
    let quantideDeProdutos = 0
    let valorTotal = 0
    const containerTotalValor = document.getElementById("totalValor")
    const containerQuantProdutos = document.getElementById("quantProdutos")

    carrinho.forEach((obj) => {
        quantideDeProdutos++
        valorTotal += obj.quantidade*produtos[obj.codigo].preco
    });

    containerQuantProdutos.innerHTML = `${quantideDeProdutos} Produto(s)`
    containerTotalValor.innerHTML = `Total: R$ ${valorTotal}`
}