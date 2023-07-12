import { getDate } from "./getDate.js"
import { saveLocalStorage } from "./saveLocalStorage.js"

let users = JSON.parse(localStorage.getItem("users"))
let maiorId = 0
let todosId = []
function User(quantidade,nome, realName, senha, carrinho, lembrarDeMim, online, contato, pets, img) {

    if (todosId.length == 0) {
       for (let obj of users) {
            if ( obj.id > maiorId  || obj.id == 0) {
                maiorId = obj.id

                do {
                    maiorId += 1
                    todosId.push(maiorId)
                } while (todosId.length != quantidade)
                break

            }
        } 
    }

    this.id = todosId.splice(0,1)[0]
    this.nome = nome
    this.realName = realName
    this.senha = senha
    this.carrinho = carrinho
    this.lembrarDeMim = lembrarDeMim
    this.online = online
    this.date = getDate()
    this.atividadeNoSite = {totalGasto: 0, produtosComprados: []}
    this.contato = contato
    this.pets = pets
    this.img = img

}

export function createNewUsers(quant) {

    for (let i = 0 ; i < quant ; i++) {
        let randomName = getRamdomName()
        let newUser = new User(quant,randomName, null, "senhaBoa123", [], false, false, null, [], '../../imagens/perfil-default.jpg')
        users.push(newUser)
    }

    saveLocalStorage(users)
}

function getRamdomName() {
    let nomes = [
        "Nina",
        "Malafaia",
        "Brum",
        "Abílio",
        "Ramalho",
        "Jeremias",
        "Belo",
        "Élton",
        "Aleixo",
        "Polina",
        "Veiga",
        "Lidiana",
        "Carrasqueira",
        "Aliya",
        "Franqueira",
        "Elielson",
        "Pegado",
        "Elielson",
        "Pegado",
        "Mariama",
        "Condorcet"
    ]

    let randomNumer = (Math.floor(Math.random() * 20) + 1)
    return nomes[randomNumer]
}
