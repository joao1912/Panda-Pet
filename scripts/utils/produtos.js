function Produto(codigo, nome, descricao, imagem, preco, categoria, descricaoImagem, quantidade) {
    this.codigo = codigo
    this.nome = nome
    this.descricao = descricao
    this.imagem = imagem
    this.preco = preco
    this.categoria = categoria
    this.descricaoImagem = descricaoImagem
    this.quantidade = quantidade
}


const produtos = [
    //Categoria: Alimentação
    new Produto(1, "Royal Canin Maxi Adult", "Ração balanceada para cães adultos de raças grandes, fornecendo os nutrientes essenciais para sua saúde e bem-estar.", "racao1.jpg", 49.99, "alimentacao", "", 0),
    new Produto(2, "Ração Natural para Gatos", "Ração natural com ingredientes orgânicos para gatos.", "racao2.jpg", 29.99, "alimentacao", "", 0),
    new Produto(3, "Petisco Dental para Cães", "Petisco saboroso que auxilia na saúde bucal dos cães.", "petisco1.jpg", 12.99, "alimentacao", "", 0),
    new Produto(4, "Purina Pro Plan Focus", "Ração com fórmula especializada para fornecer nutrição de qualidade, ajudando a manter a saúde e o peso ideal dos cães adultos.", "racao3.jpg", 59.99, "alimentacao", "", 0),
    new Produto(5, "Petisco Orgânico para Gatos", "Petisco orgânico e livre de conservantes para gatos exigentes.", "petisco2.jpg", 14.99, "alimentacao", "", 0),
    new Produto(6, "Royal Canin Maxi Junior", "Ração especial para o crescimento saudável de filhotes de cães.", "racao4.jpg", 39.99, "alimentacao", "", 0),
    new Produto(7, "Petisco Vegetariano para Cães", "Petisco vegetariano e saudável para cães.", "petisco3.jpg", 8.99, "alimentacao", "", 0),
    new Produto(8, "Ração para Gatos Sênior", "Ração formulada para gatos idosos com necessidades especiais.", "racao5.jpg", 34.99, "alimentacao", "", 0),
    new Produto(9, "Golden Formula Frango e Arroz", "Ração com ingredientes selecionados, como frango e arroz, oferecendo uma nutrição completa e equilibrada para cães adultos.", "petisco4.jpg", 11.99, "alimentacao", "", 0),

    // Categoria: Brinquedos
    new Produto(10, "Bola para Cães", "Bola resistente e durável para cães se divertirem.", "bola1.jpg", 14.99, "brinquedos", "", 0),
    new Produto(11, "Corda para Cães", "Corda resistente para cães brincarem e exercitarem a mandíbula.", "corda1.jpg", 9.99, "brinquedos", "", 0),
    new Produto(12, "Arranhador para Gatos", "Arranhador com poste e plataforma para gatos afiarem as unhas.", "arranhador1.jpg", 29.99, "brinquedos", "", 0),
    new Produto(13, "Bola de Pelúcia para Gatos", "Bola de pelúcia macia e colorida para gatos se divertirem.", "bola2.jpg", 6.99, "brinquedos", "", 0),
    new Produto(14, "Osso de Borracha para Cães", "Osso de borracha resistente para cães brincarem e aliviarem o estresse.", "osso1.jpg", 12.99, "brinquedos", "", 0),
    new Produto(15, "Labirinto Interativo para Gatos", "Labirinto com brinquedos e obstáculos para gatos se entreterem.", "labirinto1.jpg", 39.99, "brinquedos", "", 0),
    new Produto(16, "Bola com Guizo para Gatos", "Bola com guizo para gatos perseguirem e se divertirem.", "bola3.jpg", 4.99, "brinquedos", "", 0),
    new Produto(17, "Pelúcia com Apito para Cães", "Pelúcia fofa com apito para cães se divertirem e estimularem o instinto de caça.", "pelucia1.jpg", 8.99, "brinquedos", "", 0),
    new Produto(18, "Bolinha de Tênis para Cães", "Bolinha de tênis durável para cães brincarem.", "bolinha1.jpg", 3.99, "brinquedos", "", 0),

    // Categoria: Acessórios
    new Produto(19, "Coleira ajustável de nylon", "Coleira durável e ajustável para passeios com cachorros.", "coleira1.jpg", 19.99, "acessorios", "", 0),
    new Produto(20, "Guia retrátil", "Guia de corda retrátil para oferecer mais liberdade de movimento durante os passeios.", "guia1.jpg", 29.99, "acessorios", "", 0),
    new Produto(21, "Caixa de areia", "Caixa de areia higiênica para gatos fazerem suas necessidades de forma adequada.", "caixa_areia1.jpg", 24.99, "acessorios", "", 0),
    new Produto(22, "Cama confortável", "Cama macia e aconchegante para proporcionar um lugar de descanso ao cachorro.", "cama1.jpg", 39.99, "acessorios", "", 0),
    new Produto(23, "Comedouro automático", "Comedouro programável para fornecer alimento automaticamente em horários determinados.", "comedouro1.jpg", 49.99, "acessorios", "", 0),
    new Produto(24, "Cama aquecida", "Cama macia e aquecida para proporcionar conforto extra ao gato durante o sono.", "cama2.jpg", 62.99, "acessorios", "", 0),
    new Produto(25, "Bebedouro automático", "Bebedouro com sistema de fluxo constante de água fresca para manter seu pet hidratado.", "bebedouro1.jpg", 45.99, "acessorios", "", 0),
    new Produto(26, "Escova de pelos", "Escova de pelos com cerdas macias para cuidar da pelagem do seu pet.", "escova1.jpg", 9.99, "acessorios", "", 0),
    new Produto(27, "Transportadora para Gatos", "Transportadora segura e confortável para transportar seu gato com facilidade.", "transportadora1.jpg", 49.99, "acessorios", "", 0)
]
