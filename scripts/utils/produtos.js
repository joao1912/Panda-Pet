function Produto(codigo, nome, descricao, imagem, preco, categoria, descricaoImagem, estoque, classificacao) {
    this.codigo = codigo
    this.nome = nome
    this.descricao = descricao
    this.imagem = imagem
    this.preco = preco
    this.categoria = categoria
    this.descricaoImagem = descricaoImagem
    this.estoque = estoque
    this.classificacao = classificacao
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

        new Produto(0, "Bifinho sabor carne", "Bifinho saudável para seu cachorro, sabor carne.", "../../imagens/alimentacao/bifinhoSaborCarne.png", 19.90, "alimentacao", "Bifinho para cães adultos com sabor de carne, contém 100 gramas.", 10,5),
        new Produto(1, "Ração para cachorro porte M", "Ração natural com ingredientes orgânicos para cachorros porte médio.", "../../imagens/alimentacao/gran-nature.png", 120.00, "alimentacao", "Ração para cachorros médio, feito com ingredientes orgânicos, contém 1 quilo.", 10,5),
        new Produto(2, "Sache para gatos", "Petisco saboroso que auxilia na saúde do seu gatinho.", "../../imagens/alimentacao/mik-cat-sache.png", 12.99, "alimentacao", "Sache para gatos filhotes, sabor de carne, contém 100 gramas.", 10,5),
        new Produto(3, "Sache para cachorros", "Petisco saboroso que auxilia na saúde do seu cachorro.", "../../imagens/alimentacao/mik-dog-sache-carne-filhote.png", 13.90, "alimentacao", "Sache para cachorro filhote, sabor carne, contém 85 gramas.", 10,5),
        new Produto(4, "Ossinhos", "Ossinhos orgânicos e livre de conservantes para cães.", "../../imagens/alimentacao/ossinhoDog.jpg", 14.99, "alimentacao", "Ossinhos comestivéis para cachorros, com essencia de sabor carne, contém em torno de 200 gramas.", 10,5),
        new Produto(5, "Peticos para gatos", "Peticos saudavéis sem conservantes.", "../../imagens/alimentacao/peticosCat.png", 19.99, "alimentacao", "Peticos para gatos adultos, sabor carne, contém 85 gramas.", 10,5),
        new Produto(6, "Ração para gatos", "Ração para seu gatinho que auxilia na sua saúde.", "../../imagens/alimentacao/racaoCat.png", 89.90, "alimentacao", "Ração para gatos adultos, sabor frango, contém 10 quilos", 10,5),
        new Produto(7, "Ração para gatos fihotes", "Ração formulada para gatinhos que acabaram de sair do leite.", "../../imagens/alimentacao/racaoFilhoteCat.jpg", 79.99, "alimentacao", "Ração para gatos filhotes, sabor carne, contém 500 gramas, ideal para gatinhos que acabaram de sair do leite.", 10,5),
        new Produto(8, "Ração para cachorro porte grande", "Ração com ingredientes selecionados, como frango e arroz, oferecendo uma nutrição completa e equilibrada para cães adultos.", "../../imagens/alimentacao/soft-dog-caes.png", 59.99, "alimentacao", "Ração para cachorros de porte grande, sabor frango, contém 10 quilos.", 10,5),

        // Categoria: Brinquedos
        new Produto(9, "Arranhador", "Arranhador resistente com plataforma para gatos afiarem as unhas.", "../../imagens/brinquedos/arranhador-brinquedo-cat.jpg", 59.99, "brinquedos", "Arranhador de cor rosa em formato de peixe, contém na parte de dentro um arranhador para as unhas e em volta bolinhas azuis para seu gatinho brincar.", 10,5),
        new Produto(10, "Bolinhas de borracha", "Bolinhas para cães brincarem e exercitarem a mandíbula.", "../../imagens/brinquedos/bolinhasCaes.png", 9.99, "brinquedos", "Bolinhas de borrachas de várias cores aleatórias, algumas com formato  mini de bola de fútbol e basquete.", 10,5),
        new Produto(11, "Arranhador com bolinhas", "Arranhador com poste e plataforma para gatos.", "../../imagens/brinquedos/brinquedo-c-arranhador-gatos.jpg", 45.90, "brinquedos", "Plataforma vertical forrada de barbante confortavel para seu gatinho arranhar as unhas e aspiral arredondado com bolinhas interativas para brincar.", 10,5),
        new Produto(12, "Brinquedo com penas", "penas coloridas para gatos se divertirem.", "../../imagens/brinquedos/brinquedo-gatos-penas.png", 29.99, "brinquedos", "Brinquedo redondo com uma bolinha interior que fica solta para fazer barulho, em cima contém uma mola vertical com penas, para distrair seu gatinho.", 10,5),
        new Produto(13, "Ratinhos", "Ratinho interativo e resistente para seus pets brincarem e aliviarem o estresse.", "../../imagens/brinquedos/brinquedo-gatos-ratinho.png", 12.99, "brinquedos", "Ratinhos de borracha com uma leva camurça em volta, de várias cores, como: Rosa, vermelho, cinza e amarelo.", 10,5),
        new Produto(14, "Hamburguer para morder", "Hamburguinho de borracha para seu cachorro morder sem medo!.", "../../imagens/brinquedos/hamburguer-dog.png", 12.90, "brinquedos", "Brinquedo de borracha em forma de hamburguer, para seu pet morder sem medo.", 10,5),
        new Produto(15, "Limpa dentes para cachorros", "O brinquedo ideal para seu pet se divertir e limpar seus dentinhos.", "../../imagens/brinquedos/limpadente.png", 22.90, "brinquedos", "Plataforma vertical de borracha, na cor verde, que contém superfície texturizada que ajuda a manter os dentes do seu cão limpos e saudáveis", 10,5),
        new Produto(16, "Mordedor para cães", "Mordedor ideal para seu pet se distrair.", "../../imagens/brinquedos/morderdorcaes.jpg", 35.99, "brinquedos", "Brinquedo de Latex, com modelo de Animais Boliche com apito. Kit de quatro unidades desenvolvido especialmente para proporcionar momentos de diversão e entretenimento para o seu pet.", 10,5),
        new Produto(17, "Osso de borracha", "Brinquedo durável para cães brincarem.", "../../imagens/brinquedos/osso-dog.jpg", 13.99, "brinquedos", "Osso de borracha de várias cores: verde, rosa e amarelo. Tem superfície texturizada que ajuda a manter os dentes limpos.", 10,5),

        // Categoria: Acessórios
        new Produto(18, "Casinha com arranhador", "Casinha e arranhador para seu gatinho brincar.", "../../imagens/acessorios/arranhadorCasaCat.jpg", 139.90, "acessorios", "Casinha em formato quadrado com textura peludinha na cor zebra, com plataforma vertical com barbante e um ratinho de plastico, ideal para seu gatinho brincar e dormir.", 10,4),
        new Produto(19, "Cama toca para pets", "Caminha estilo toca para deixar seu pet confortável.", "../../imagens/acessorios/cama-toca.png", 79.90, "acessorios", "Casinha em formato de toca na cor vermelha, por dentro é acolchoada. Confortável e quentinha para seu pet dormir e prática de levar para qualquer lugar, por ser um objeto leve.", 10,5),
        new Produto(20, "Comedouro para pets", "Acessório incrível para quando seu pet precisar ficar sozinho, serve como comedouro e bebedouro.", "../../imagens/acessorios/comedouro-bebedouro-automatico.jpg", 44.90, "acessorios", "Porta ração de 650ml, também serve para porta água, basta girar o reservatório para transformar no item que você preferir. O seu modelo automático permite que a ração ou a água desça gradativamente para a abertura conforme o animal for se alimentando.", 10,5),
        new Produto(21, "Comedouro", "Comedouro estilo cat.", "../../imagens/acessorios/comedouro-gatos.jpg", 22.99, "acessorios", "Comedouro ou potinho para ração do seu gato na cor azul petróleo. O objeto é de plástico com formato de cabeça de gato com orelhinhas.", 10,5),
        new Produto(22, "Comedouro interativo", "Comedouro para seu pet desestressar.", "../../imagens/acessorios/comedouro-interativo.png", 39.99, "acessorios", `Comedouro Lento Diet para cães, indicado para tornar a hora da refeição mais saudável e divertida, mantendo seu pet em forma.
        Ensina seu cão a comer devagar ao buscar o alimento em volta da patinha. Diminui os riscos de engasgos, vômitos, gastrite, dilatação e torção do estômago, obesidade e suas complicações. O comedouro é na cor azul, com patinhas dentro.`, 10,5),
        new Produto(23, "Guia retrátil", "Guia retrátil para deixar seu pet confortável na hora do passeio.", "../../imagens/acessorios/guia-retratil.png", 25.99, "acessorios", "Coleira ou guia retrátil, na cor azul com patinhas brancas desenhadas.  O mecanismo retrátil permite que a guia seja estendida ou recolhida com facilidade, proporcionando liberdade de movimento para o seu cão enquanto mantém o controle sobre ele. Além disso, a guia retrátil possui um sistema de travamento confiável, permitindo que você mantenha seu cão próximo quando necessário.", 10,5),
        new Produto(24, "Porta ração", "Mantenha a ração dos seus pets organizada, escolha o tamanho ideal para guardar a ração de maneira prática.", "../../imagens/acessorios/porta-racao-pet.jpg", 45.99, "acessorios", "Potes para guardar ração, potes de plástico com tampas de várias cores, como: Vermelho, amarelo, azul, rosa e laranja. Tamanhos: 1,5 litros, 3,5 litros, 8 litros, 25 litros e 40 litros.", 10,5),
        new Produto(25, "Casa tunel", "Casinha confortavél para seu gatinho.", "../../imagens/acessorios/toca-tunel-gato.jpg", 99.90, "acessorios", "Toca em formato triangular, almofadas por dentro e confortável. A toca é de cor branca com gatinhos coloridos desenhado, gatinhos azuis, lilás e amarelo.", 10,5),
        new Produto(26, "Cama pets", "Caminha ideal para seu pet, com o conforto que ele merece.", "../../imagens/acessorios/caminha-pet.png", 59.90, "acessorios", "Camisa preta em formato quadrado, com patinhas brancas desenhadas e almofada por dentro. ideal para pet de porte médio.", 10,5)
    ]

    localStorage.setItem("listaProdutos", JSON.stringify(initialProducts))

}

export let produtos = getAllProducts()