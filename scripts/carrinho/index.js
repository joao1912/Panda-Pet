//Container do carrinho
let containerCarrinho = document.getElementById("container-carrinho")


//Lista dos produtos em um array de objetos
//P. S: Não me julguem, sou horrível para nomes.

const listaProdutos = [
    //Categoria: Alimentação
    {
        id: 1,
        nome: "Royal Canin Maxi Adult",
        descricao: "Ração balanceada para cães adultos de raças grandes, fornecendo os nutrientes essenciais para sua saúde e bem-estar.",
        imagem: "racao1.jpg",
        preco: 49.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 2,
        nome: "Ração Natural para Gatos",
        descricao: "Ração natural com ingredientes orgânicos para gatos.",
        imagem: "racao2.jpg",
        preco: 29.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 3,
        nome: "Petisco Dental para Cães",
        descricao: "Petisco saboroso que auxilia na saúde bucal dos cães.",
        imagem: "petisco1.jpg",
        preco: 12.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 4,
        nome: "Purina Pro Plan Focus",
        descricao: "Ração com fórmula especializada para fornecer nutrição de qualidade, ajudando a manter a saúde e o peso ideal dos cães adultos.",
        imagem: "racao3.jpg",
        preco: 59.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 5,
        nome: "Petisco Orgânico para Gatos",
        descricao: "Petisco orgânico e livre de conservantes para gatos exigentes.",
        imagem: "petisco2.jpg",
        preco: 14.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 6,
        nome: "Royal Canin Maxi Junior",
        descricao: "Ração especial para o crescimento saudável de filhotes de cães.",
        imagem: "racao4.jpg",
        preco: 39.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 7,
        nome: "Petisco Vegetariano para Cães",
        descricao: "Petisco vegetariano e saudável para cães.",
        imagem: "petisco3.jpg",
        preco: 8.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 8,
        nome: "Ração para Gatos Sênior",
        descricao: "Ração formulada para gatos idosos com necessidades especiais.",
        imagem: "racao5.jpg",
        preco: 34.99,
        quantidade: 0,
        categoria: "alimentacao"
    },
    {
        id: 9,
        nome: "Golden Formula Frango e Arroz",
        descricao: "Ração com ingredientes selecionados, como frango e arroz, oferecendo uma nutrição completa e equilibrada para cães adultos.",
        imagem: "petisco4.jpg",
        preco: 11.99,
        quantidade: 0,
        categoria: "alimentacao"
    },

    // Categoria: Brinquedos
    {
        id: 10,
        nome: "Bola para Cães",
        descricao: "Bola resistente e durável para cães se divertirem.",
        imagem: "bola1.jpg",
        preco: 14.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 11,
        nome: "Corda para Cães",
        descricao: "Corda resistente para cães brincarem e exercitarem a mandíbula.",
        imagem: "corda1.jpg",
        preco: 9.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 12,
        nome: "Arranhador para Gatos",
        descricao: "Arranhador com poste e plataforma para gatos afiarem as unhas.",
        imagem: "arranhador1.jpg",
        preco: 29.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 13,
        nome: "Bola de Pelúcia para Gatos",
        descricao: "Bola de pelúcia macia e colorida para gatos se divertirem.",
        imagem: "bola2.jpg",
        preco: 6.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 14,
        nome: "Osso de Borracha para Cães",
        descricao: "Osso de borracha resistente para cães brincarem e aliviarem o estresse.",
        imagem: "osso1.jpg",
        preco: 12.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 15,
        nome: "Labirinto Interativo para Gatos",
        descricao: "Labirinto com brinquedos e obstáculos para gatos se entreterem.",
        imagem: "labirinto1.jpg",
        preco: 39.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 16,
        nome: "Bola com Guizo para Gatos",
        descricao: "Bola com guizo para gatos perseguirem e se divertirem.",
        imagem: "bola3.jpg",
        preco: 4.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 17,
        nome: "Pelúcia com Apito para Cães",
        descricao: "Pelúcia fofa com apito para cães se divertirem e estimularem o instinto de caça.",
        imagem: "pelucia1.jpg",
        preco: 8.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    {
        id: 18,
        nome: "Bolinha de Tênis para Cães",
        descricao: "Bolinha de tênis durável para cães brincarem.",
        imagem: "bolinha1.jpg",
        preco: 3.99,
        quantidade: 0,
        categoria: "brinquedos"
    },
    // Categoria acessórios
    {
        id: 19,
        nome: "Coleira ajustável de nylon",
        descricao: "Coleira durável e ajustável para passeios com cachorros.",
        imagem: "coleira1.jpg",
        preco: 19.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 20,
        nome: "Guia retrátil",
        descricao: "Guia de corda retrátil para oferecer mais liberdade de movimento durante os passeios.",
        imagem: "guia1.jpg",
        preco: 29.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 21,
        nome: "Caixa de areia",
        descricao: "Caixa de areia higiênica para gatos fazerem suas necessidades de forma adequada.",
        imagem: "caixa_areia1.jpg",
        preco: 24.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 22,
        nome: "Cama confortável",
        descricao: "Cama macia e aconchegante para proporcionar um lugar de descanso ao cachorro.",
        imagem: "cama1.jpg",
        preco: 39.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 23,
        nome: "Comedouro automático",
        descricao: "Comedouro programável para fornecer alimento automaticamente em horários determinados.",
        imagem: "comedouro1.jpg",
        preco: 49.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 24,
        nome: "Cama aquecida",
        descricao: "Cama macia e aquecida para proporcionar conforto extra ao gato durante o sono.",
        imagem: "cama2.jpg",
        preco: 62.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 25,
        nome: "Bebedouro automático",
        descricao: "Bebedouro com sistema de fluxo constante de água fresca para manter seu pet hidratado.",
        imagem: "bebedouro1.jpg",
        preco: 45.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 26,
        nome: "Escova de pelos",
        descricao: "Escova de pelos com cerdas macias para cuidar da pelagem do seu pet.",
        imagem: "escova1.jpg",
        preco: 9.99,
        quantidade: 0,
        categoria: "acessorios"
    },
    {
        id: 27,
        nome: "Transportadora para Gatos",
        descricao: "Transportadora segura e confortável para transportar seu gato com facilidade.",
        imagem: "transportadora1.jpg",
        preco: 49.99,
        quantidade: 0,
        categoria: "acessorios"
    }
]


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