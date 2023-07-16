import { Error } from "./utils/erros.js"
import { saveLocalStorage } from "./utils/saveLocalStorage.js"
import { getDate } from './utils/getDate.js'

let users = []
let maiorID = 0
users = JSON.parse(localStorage.getItem("users"))
let nextID = maiorID + 1

if (users == null) {
    users = [{
        id: 0 ,
        nome: "Admin",
        realName: null,
        senha: "administrador123", 
        carrinho: [], 
        lembrarDeMim: false,
        online: false, 
        date: getDate(), 
        atividadeNoSite: {totalGasto: 0, produtosComprados: []},
        contato: null,
        pets: [],
        img: '../../imagens/pandaCoroaRedondo.png'
    }]

    localStorage.setItem('users', JSON.stringify(users))
}
for (let user of users) {
    if (user.id > maiorID) {
        maiorID = user.id
    }
}


localStorage.removeItem("welcome")
let cont = 1
const botaoTrocarlado = document.querySelectorAll(".btnTroca")
const botaoFotoPerfil = document.getElementById("containerFotoPerfil")

const inptUserNameCadastro = document.getElementById("nomeCadastro")
const inptPassWordCadastro = document.getElementById("senhaNovaCadastro")
const inptConfirmCadastro = document.getElementById("confirmarSenhaCadastro")

let divFile = document.getElementById("fileFotoPerfil")
let urlFotoPerfil

inptUserNameCadastro.addEventListener("keypress", function () {
    const containerErro = document.getElementById("erroCadastroUserName")
    containerErro.innerHTML = ""

    const icon = document.getElementById("iconVisibilityPassWord")

    icon.style.top = "38.8%"


})

inptPassWordCadastro.addEventListener("keypress", function () {
    const containerErro = document.getElementById("erroCadastroPassWord")
    containerErro.innerHTML = ""

})

inptConfirmCadastro.addEventListener("keypress", function () {
    const containerErro = document.getElementById("erroCadastroConfirm")
    containerErro.innerHTML = ""
})

const inptUserNameLogin = document.getElementById("nomeLogin")
const inptPassWordLogin = document.getElementById("senhaLogin")

inptUserNameLogin.addEventListener("keypress", function () {
    const containerErro = document.getElementById("erroLoginConfirm")
    containerErro.innerHTML = ""

    let icon = document.getElementById("iconLoginVisibility")
    icon.style.top = "54%"
})

inptPassWordLogin.addEventListener("keypress", function () {
    const containerErro = document.getElementById("erroLoginPassWord")
    containerErro.innerHTML = ""

})

    ;[...botaoTrocarlado].forEach(botao => {

        botao.addEventListener("click", () => {

            const elemento = document.getElementById("container")
            const containerForm = document.getElementById("containerForm")

            const telaLogin = document.getElementById("formLogin")
            const telaCadastro = document.getElementById("formCadastro")
            const iconesVisibility = document.querySelectorAll(".visibility")

            const containerErros = document.querySelectorAll(".erroContainer")

                ;[...containerErros].forEach(container => {
                    container.innerHTML = ""
                    iconesVisibility[0].style.top = "38.8%"
                    iconesVisibility[1].style.top = "54%"
                })

            inptUserNameCadastro.value = ""
            inptPassWordCadastro.value = ""
            inptConfirmCadastro.value = ""

            inptUserNameLogin.value = ""
            inptPassWordLogin.value = ""

            if (cont == 1) {
                containerForm.style.marginLeft = "49.8%"

                telaCadastro.style.display = "flex"
                telaLogin.style.display = "none"
                botaoTrocarlado[0].setAttribute('disabled', 'disabled')



                iconesVisibility[0].style.display = "none"
                setTimeout(function () { iconesVisibility[1].style.display = "inline-block" }, 380)

                setTimeout(function () {
                    iconesVisibility[0].style.display = "inline-block"
                    iconesVisibility[1].style.display = "inline-block"
                }, 380)

                setTimeout(function () { botaoTrocarlado[0].removeAttribute('disabled') }, 1000)

            } else {
                containerForm.style.marginRight = "49.8%"

                telaLogin.style.display = "flex"
                telaCadastro.style.display = "none"

                botaoTrocarlado[1].setAttribute('disabled', 'disabled')

                iconesVisibility[1].style.display = "none"
                setTimeout(function () { iconesVisibility[1].style.display = "inline-block" }, 380)

                setTimeout(function () { botaoTrocarlado[1].removeAttribute('disabled') }, 1000)
            }



            setTimeout(function () {
                if (cont == 1) {
                    cont = 0
                    elemento.style.justifyContent = "end"
                    containerForm.style.marginLeft = "30px"

                } else {
                    cont = 1
                    elemento.style.justifyContent = "flex-start"
                    containerForm.style.marginRight = "30px"

                }
            }, 600)
        })
    })

botaoFotoPerfil.addEventListener("click", () => {

    divFile.click();
    divFile.addEventListener("change", readImage, false);
    const file = document.getElementById("fotoPerfil")

    function readImage() {
        let fr = new FileReader();
        fr.onload = function (event) {
            file.src = event.target.result

        };
        fr.readAsDataURL(this.files[0]);

        fr.addEventListener("load", () => {
            urlFotoPerfil = fr.result
        })
    }
})

const botaoCadastrar = document.getElementById("btnCadastrar")


botaoCadastrar.addEventListener('click', function () {
    const userName = inptUserNameCadastro.value
    const passWord = inptPassWordCadastro.value
    const confirmPassWord = inptConfirmCadastro.value

    if (userName == "") {

        Error("#userName-vazio#")

    } else if (passWord == "") {

        Error("#passWord-vazio#")

    } else if (detecNumbersAndCaracters(passWord)) {

        Error("#senha-invalida#")

    } else if (passWord != confirmPassWord) {

        Error("#senhas-diferentes#")

    } else if (userName == "Admin") {

        Error("#Nome-nao-disponivel#")

    } else {

        let repeatUser = users.find(objUser => {
            return objUser.nome == userName
        })

        if (repeatUser != undefined) {

            Error("#Nome-nao-disponivel#")

        } else {
            saveUser(userName, passWord)
        }

    }

})

function detecNumbersAndCaracters(password) {
    let contNumbers = 0
    let contCaracters = 0

    for (let c = 0; c < password.length; c++) {

        if (Number(password[c])) {

            contNumbers++

        } else {
            contCaracters++
        }
    }

    if (contNumbers < 3 || contCaracters < 6) {
        return true
    } else {
        return false
    }
}

function saveUser(userName, passWord) {
    
    for (let user of users) {
        user.online = false
        user.lembrarDeMim = false
    }

    if (urlFotoPerfil != undefined) {

        users.push({
            id: nextID ,
            nome: userName, 
            realName: null,
            senha: passWord, 
            carrinho: [], 
            lembrarDeMim: false,
            online: true, 
            date: getDate(), 
            atividadeNoSite: {totalGasto: 0, produtosComprados: []},
            contato: null,
            pets: [],
            img: urlFotoPerfil
        })
        saveLocalStorage(users)
        
    } else {

        users.push({
            id: nextID ,
            nome: userName, 
            realName: null,
            senha: passWord, 
            carrinho: [], 
            lembrarDeMim: false,
            online: true, 
            date: getDate(), 
            atividadeNoSite: {totalGasto: 0, produtosComprados: []},
            contato: null,
            pets: []
        })
        saveLocalStorage(users)

    }

    window.location.href = "../index.html"
}

const iconsVisibility = document.querySelectorAll(".visibility")

    ;[...iconsVisibility].forEach(icone => {
        icone.addEventListener("click", function () {
            switch (icone.textContent) {
                case "visibility":
                    icone.textContent = "visibility_off"

                    if (icone.id == "iconVisibilityPassWord") {

                        inptPassWordCadastro.type = "password"
                        inptConfirmCadastro.type = "password"

                    } else if (icone.id == "iconLoginVisibility") {

                        inptPassWordLogin.type = "password"

                    }

                    break

                case "visibility_off":
                    icone.textContent = "visibility"

                    if (icone.id == "iconVisibilityPassWord") {

                        inptPassWordCadastro.type = "text"
                        inptConfirmCadastro.type = "text"

                    } else if (icone.id == "iconLoginVisibility") {

                        inptPassWordLogin.type = "text"

                    }
                    break
            }
        })
    })


const botaoLogar = document.getElementById("btnLogar")

botaoLogar.addEventListener("click", function () {
    if (inptUserNameLogin.value === "") {

        Error("#userName-vazio#")

    } else if (inptPassWordLogin.value === "") {

        Error("#passWord-vazio#")

    } else if (detecNumbersAndCaracters(inptPassWordLogin.value)) {

        Error("#senha-invalida#")

    } else if (validaUser(inptUserNameLogin.value)) {

        Error("#usuario-inexistente#")

    } else {

        login(inptPassWordLogin.value)

    }
})

function validaUser(userName) {

    let users = JSON.parse(localStorage.getItem('users'))

    if (users) {
        for (let obj of users) {
            if (obj.nome === userName) {
                return false
            }
        }
    }

    return true

}

function login(passWord) {

    let users = JSON.parse(localStorage.getItem('users'))
    let index = 0
    let checkedPassWord = false

    for (let obj of users) {

        if (obj.senha === passWord) {
         
            for (let user of users) {
                user.online = false
                user.lembrarDeMim = false
            }

            if (verificationRememberMe()) {
                users[index].lembrarDeMim = true
            }

            users[index].online = true
            checkedPassWord = true
            saveLocalStorage(users)
            window.location.href = "../../index.html"
            break
        } 

        index++

    }

    if (!checkedPassWord) {

        Error("#senha-incorreta#")

    }

}

function verificationRememberMe() {
    const checkbox = document.getElementById("lembrarDeMimLogin")

    return checkbox.checked
    
}

if (users == null) {
    users = [{
        id: 0 ,
        nome: "Admin",
        realName: null,
        senha: "administrador123",
        carrinho: [],
        lembrarDeMim: false,
        online: false,
        date: getDate(),
        atividadeNoSite: {totalGasto: 0, produtosComprados: []},
        contato: null,
        pets: [],
        img: '../../imagens/perfil-default.jpg'
    }]

    saveLocalStorage(users)
}

if (users.length < 10) {
    createNewUsers(10)
}


function User(nome, realName, senha, carrinho, lembrarDeMim, online, contato, pets, img) {

    this.id = nextID
    nextID++
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

function createNewUsers(quant) {

    for (let i = 0 ; i < quant ; i++) {
        let randomName = getRamdomName()
        let newUser = new User(randomName, null, "senhaBoa123", [], false, false, null, [], '../../imagens/perfil-default.jpg')
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
