function Produto(codigo, nome, descricao, imagem, preco, categoria, descricaoImagem, estoque, classificacao) {
    this.codigo = codigo
    this.nome = nome
    this.descricao = descricao
    this.imagem = imagem
    this.preco = preco
    this.categoria = categoria
    this.descricaoImagem = descricaoImagem
    this.estoque = estoque
    this.cassificacao = classificacao
}

export function getAllProducts() {
    if (!localStorage.hasOwnProperty("listaProdutos")) {
        initializeProducts()
    }

    let listaProdutos = JSON.parse(localStorage.getItem("listaProdutos"))

    return listaProdutos
}

function initializeProducts() {

    const initialProducts = [
        //Categoria: Alimentação

        new Produto(0, "Bifinho sabor carne", "Bifinho saudável para seu cachorro, sabor carne.", "../../imagens/alimentacao/bifinhoSaborCarne.png", 19.90, "alimentacao", "", 10,5),
        new Produto(1, "Ração para cachorro porte M", "Ração natural com ingredientes orgânicos para cachorros porte médio.", "../../imagens/alimentacao/gran-nature.png", 120.00, "alimentacao", "", 10,5),
        new Produto(2, "Sache para gatos", "Petisco saboroso que auxilia na saúde do seu gatinho.", "../../imagens/alimentacao/mik-cat-sache.png", 12.99, "alimentacao", "", 10,5),
        new Produto(3, "Sache para cachorros", "Petisco saboroso que auxilia na saúde do seu cachorro.", "../../imagens/alimentacao/mik-dog-sache-carne-filhote.png", 13.90, "alimentacao", "", 10,5),
        new Produto(4, "Ossinhos", "Ossinhos orgânicos e livre de conservantes para cães.", "../../imagens/alimentacao/ossinhoDog.jpg", 14.99, "alimentacao", "", 10,5),
        new Produto(5, "Peticos para gatos", "Peticos saudavéis sem conservantes.", "../../imagens/alimentacao/peticosCat.png", 19.99, "alimentacao", "", 10,5),
        new Produto(6, "Ração para gatos", "Ração para seu gatinho que auxilia na sua saúde.", "../../imagens/alimentacao/racaoCat.png", 89.90, "alimentacao", "", 10,5),
        new Produto(7, "Ração para gatos fihotes", "Ração formulada para gatinhos que acabaram de sair do leite.", "../../imagens/alimentacao/racaoFilhoteCat.jpg", 79.99, "alimentacao", "", 10,5),
        new Produto(8, "Ração para cachorro porte grande", "Ração com ingredientes selecionados, como frango e arroz, oferecendo uma nutrição completa e equilibrada para cães adultos.", "../../imagens/alimentacao/soft-dog-caes.png", 59.99, "alimentacao", "", 10,5),

        // Categoria: Brinquedos
        new Produto(9, "Arranhador", "Arranhador resistente com plataforma para gatos afiarem as unhas.", "../../imagens/brinquedos/arranhador-brinquedo-cat.jpg", 59.99, "brinquedos", "", 10,5),
        new Produto(10, "Bolinhas de borracha", "Bolinhas para cães brincarem e exercitarem a mandíbula.", "../../imagens/brinquedos/bolinhasCaes.png", 9.99, "brinquedos", "", 10,5),
        new Produto(11, "Arranhador com bolinhas", "Arranhador com poste e plataforma para gatos.", "../../imagens/brinquedos/brinquedo-c-arranhador-gatos.jpg", 45.90, "brinquedos", "", 10,5),
        new Produto(12, "Brinquedo com penas", "penas coloridas para gatos se divertirem.", "../../imagens/brinquedos/brinquedo-gatos-penas.png", 29.99, "brinquedos", "", 10,5),
        new Produto(13, "Ratinhos", "Ratinho interativo e resistente para seus pets brincarem e aliviarem o estresse.", "../../imagens/brinquedos/brinquedo-gatos-ratinho.png", 12.99, "brinquedos", "", 10,5),
        new Produto(14, "Hamburguer para morder", "Hamburguinho de borracha para seu cachorro morder sem medo!.", "../../imagens/brinquedos/hamburguer-dog.png", 12.90, "brinquedos", "", 10,5),
        new Produto(15, "Limpa dentes para cachorros", "O brinquedo ideal para seu pet se divertir e limpar seus dentinhos.", "../../imagens/brinquedos/limpadente.png", 22.90, "brinquedos", "", 10,5),
        new Produto(16, "Mordedor para cães", "Mordedor ideal para seu pet se distrair.", "../../imagens/brinquedos/morderdorcaes.jpg", 35.99, "brinquedos", "", 10,5),
        new Produto(17, "Osso de borracha", "Brinquedo durável para cães brincarem.", "../../imagens/brinquedos/osso-dog.jpg", 13.99, "brinquedos", "", 10,5),

        // Categoria: Acessórios
        new Produto(18, "Casinha com arranhador", "Casinha e arranhador para seu gatinho brincar", "../../imagens/acessorios/arranhadorCasaCat.jpg", 139.90, "acessorios", "", 10,5),
        new Produto(19, "Cama toca para pets", "Caminha estilo toca para deixar seu pet confortável.", "../../imagens/acessorios/cama-toca.png", 79.90, "acessorios", "", 10,5),
        new Produto(20, "Comedouro para pets", "Acessório incrivel para quando seus pets ficarem sozinhos, serve ocmo comedouro e bebedouro.", "../../imagens/acessorios/comedouro-bebedouro-automatico.jpg", 44.90, "acessorios", "", 10,5),
        new Produto(21, "Comedouro", "Comedouro estilo cat.", "../../imagens/acessorios/comedouro-gatos.jpg", 22.99, "acessorios", "", 10,5),
        new Produto(22, "Comedouro interativo", "Comedouro para seu pet desestressar.", "../../imagens/acessorios/comedouro-interativo.png", 39.99, "acessorios", "", 10,5),
        new Produto(23, "Guia retrátil", "Guia retrátil para deixar seu pet confortável na hora do passeio.", "../../imagens/acessorios/guia-retratil.png", 25.99, "acessorios", "", 10,5),
        new Produto(24, "Porta ração", "Mantenha a ração dos seus pets organizada, escolha o tamanho ideal para guardar a ração de maneira prática.", "../../imagens/acessorios/porta-racao-pet.jpg", 45.99, "acessorios", "", 10,5),
        new Produto(25, "Casa tunel", "Casinha confortavél para seu gatinho.", "../../imagens/acessorios/toca-tunel-gato.jpg", 99.90, "acessorios", "", 10,5),
        new Produto(26, "Cama pets", "Caminha ideal para seu pet, com o conforto que ele merece.", "../../imagens/acessorios/caminha-pet.png", 59.90, "acessorios", "", 10,5)
    ]

    localStorage.setItem("listaProdutos", JSON.stringify(initialProducts))

}

export let produtos = getAllProducts()