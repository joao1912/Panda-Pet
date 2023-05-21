import { Error } from "../utils/erros.js"

let cont = 1
const botaoTrocarlado = document.querySelectorAll(".btnTroca")
const botaoFotoPerfil = document.getElementById("containerFotoPerfil")

const inptUserNameCadastro = document.getElementById("nomeCadastro")
const inptPassWordCadastro = document.getElementById("senhaNovaCadastro")
const inptConfirmCadastro = document.getElementById("confirmarSenhaCadastro")

const inptUserNameLogin = document.getElementById("nomeLogin")
const inptPassWordLogin = document.getElementById("senhaLogin")

let divFile = document.getElementById("fileFotoPerfil")
let urlFotoPerfil

inptUserNameCadastro.addEventListener("keypress", function(){
    const containerErro = document.getElementById("erroCadastroUserName")
    containerErro.innerHTML = ""

    const icon = document.getElementById("iconVisibilityPassWord")
    const icon2 = document.getElementById("iconVisibilityConfirm")

    icon.style.top = "38.8%"
    icon2.style.top = "55.5%"

})

inptPassWordCadastro.addEventListener("keypress", function(){
    const containerErro = document.getElementById("erroCadastroPassWord")
    containerErro.innerHTML = ""

    let icon = document.getElementById("iconVisibilityConfirm")
    icon.style.top = "55.5%"
    
})

inptConfirmCadastro.addEventListener("keypress", function(){
    const containerErro = document.getElementById("erroCadastroConfirm")
    containerErro.innerHTML = ""
})

;[...botaoTrocarlado].forEach( botao => {

    botao.addEventListener("click", () => {

        const elemento = document.getElementById("container")
        const containerForm = document.getElementById("containerForm")
    
        const telaLogin = document.getElementById("formLogin")
        const telaCadastro = document.getElementById("formCadastro")
    
        if (cont == 1) {
            containerForm.style.marginLeft = "49.8%"
            
            telaCadastro.style.display = "none"
            telaLogin.style.display = "flex"
            botaoTrocarlado[0].setAttribute('disabled','disabled')
            setTimeout(function(){botaoTrocarlado[0].removeAttribute('disabled')},1000)
            
        } else {
            containerForm.style.marginRight = "49.8%"
    
            telaLogin.style.display = "none"
            telaCadastro.style.display = "flex"
    
            botaoTrocarlado[1].setAttribute('disabled','disabled')
            setTimeout(function(){botaoTrocarlado[1].removeAttribute('disabled')},1000)
        }
    
        
    
        setTimeout(function(){
            if (cont == 1) {
                cont = 0
                elemento.style.justifyContent = "end"
                containerForm.style.marginLeft = "30px"
                
            } else {
                cont = 1
                elemento.style.justifyContent = "flex-start"
                containerForm.style.marginRight = "30px"
    
            }
        },600)
    })
})

botaoFotoPerfil.addEventListener("click", () => {

    divFile.click();
    divFile.addEventListener("change", readImage, false);
    const file = document.getElementById("fotoPerfil")

    function readImage() {
        let fr = new FileReader();
        fr.onload = function(event) {
            file.src = event.target.result
            
        };       
        fr.readAsDataURL(this.files[0]);

        fr.addEventListener("load",() => {
            urlFotoPerfil = fr.result
        })
    }
})

const botaoCadastrar = document.getElementById("btnCadastrar")
let users = JSON.parse(localStorage.getItem("user")) 

botaoCadastrar.addEventListener('click',function(){
    const userName = inptUserNameCadastro.value
    const passWord = inptPassWordCadastro.value
    const confirmPassWord = inptConfirmCadastro.value
    
    if (userName == "") {
        Error("#userName-vazio#")
       
    } else if (passWord == "") {
        Error("#passWord-vazio#")

    } else if( detecNumbersAndCaracters(passWord) ) {

        Error("#senha-invalida#")

    } else if (passWord != confirmPassWord) {
        Error("#senhas-diferentes#")

    } else if (userName == "Admin") {
        Error("#Nome-nao-disponivel#")

    } else if (users != null) {
        
        let repeatUser = users.find( objUser => {
            return objUser.nome == userName
        })
        
        if (repeatUser != undefined) {
            Error("#Nome-nao-disponivel#")

        } else {
            saveUser(userName, passWord, false)
        }

    } else {
        saveUser(userName, passWord, true)
    }

})

function detecNumbersAndCaracters(password) {
    let contNumbers = 0
    let contCaracters = 0

    for (let c = 0 ; c < password.length ; c++) {
        console.log(Number(password[c]))
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

function saveUser(userName, passWord, firstUser) {

    if (firstUser) {

        if (urlFotoPerfil != undefined) {
            const jsonUsers = JSON.stringify([{nome: userName, senha: passWord, img: urlFotoPerfil}])
            localStorage.setItem("user", jsonUsers)
        } else {
            const jsonUsers = JSON.stringify([{nome: userName, senha: passWord}])
            localStorage.setItem("user", jsonUsers)
        }

    } else {
        if (urlFotoPerfil != undefined) {
            users.push({nome: userName, senha: passWord, img: urlFotoPerfil})
            const jsonUsers = JSON.stringify(users)
            localStorage.setItem("user", jsonUsers)

        } else {

            users.push({nome: userName, senha: passWord})
            const jsonUsers = JSON.stringify(users)
            localStorage.setItem("user", jsonUsers)

        }
    }
    
    window.location.href = "../index.html"
}

const iconsVisibility = document.querySelectorAll(".visibility")

;[...iconsVisibility].forEach(icone => {
    icone.addEventListener("click", function(){
        switch (icone.textContent) {
            case "visibility":
                icone.textContent = "visibility_off"

                if(icone.id == "iconVisibilityPassWord") {

                    inptPassWordCadastro.type = "password"

                } else if(icone.id == "iconVisibilityConfirm") {

                    inptConfirmCadastro.type = "password"
                }

                break

            case "visibility_off":
                icone.textContent = "visibility"

                if(icone.id == "iconVisibilityPassWord") {

                    inptPassWordCadastro.type = "text"

                } else if(icone.id == "iconVisibilityConfirm") {
                    
                    inptConfirmCadastro.type = "text"
                }

                break
        }
    })
})
