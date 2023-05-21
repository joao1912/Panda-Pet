import { Error } from "../utils/erros.js"



let cont = 1
const botaoTrocarlado = document.querySelectorAll(".btnTroca")
const botaoFotoPerfil = document.getElementById("containerFotoPerfil")

const inptUserNameCadastro = document.getElementById("nomeCadastro")
const inptPassWordCadastro = document.getElementById("senhaNovaCadastro")
const inptConfirmCadastro = document.getElementById("confirmarSenhaCadastro")

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

const inptUserNameLogin = document.getElementById("nomeLogin")
const inptPassWordLogin = document.getElementById("senhaLogin")

inptUserNameLogin.addEventListener("keypress",function(){
    const containerErro = document.getElementById("erroLoginConfirm")
    containerErro.innerHTML = ""

    let icon = document.getElementById("iconLoginVisibility")
    icon.style.top = "54%"
})

inptPassWordLogin.addEventListener("keypress",function(){
    const containerErro = document.getElementById("erroLoginPassWord")
    containerErro.innerHTML = ""

})

;[...botaoTrocarlado].forEach( botao => {

    botao.addEventListener("click", () => {

        const elemento = document.getElementById("container")
        const containerForm = document.getElementById("containerForm")
    
        const telaLogin = document.getElementById("formLogin")
        const telaCadastro = document.getElementById("formCadastro")
        const iconesVisibility = document.querySelectorAll(".visibility")
    
        if (cont == 1) {
            containerForm.style.marginLeft = "49.8%"
            
            telaCadastro.style.display = "none"
            telaLogin.style.display = "flex"
            botaoTrocarlado[0].setAttribute('disabled','disabled')

            iconesVisibility[2].style.display = "none"
            setTimeout(function(){iconesVisibility[2].style.display = "inline-block"}, 380)

            setTimeout(function(){botaoTrocarlado[0].removeAttribute('disabled')},1000)
            
        } else {
            containerForm.style.marginRight = "49.8%"
    
            telaLogin.style.display = "none"
            telaCadastro.style.display = "flex"
    
            botaoTrocarlado[1].setAttribute('disabled','disabled')

            iconesVisibility[0].style.display = "none"
            iconesVisibility[1].style.display = "none"

            setTimeout(function(){
                iconesVisibility[0].style.display = "inline-block"
                iconesVisibility[1].style.display = "inline-block"
            }, 380)

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
            const jsonUsers = JSON.stringify([{nome: userName, senha: passWord, carrinho: [], online: false, img: urlFotoPerfil}])
            localStorage.setItem("user", jsonUsers)
        } else {
            const jsonUsers = JSON.stringify([{nome: userName, senha: passWord, carrinho: [], online: false}])
            localStorage.setItem("user", jsonUsers)
        }

    } else {
        if (urlFotoPerfil != undefined) {
            users.push({nome: userName, senha: passWord, carrinho: [], online: false, img: urlFotoPerfil})
            const jsonUsers = JSON.stringify(users)
            localStorage.setItem("user", jsonUsers)

        } else {

            users.push({nome: userName, senha: passWord, carrinho: [], online: false})
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

                } else if (icone.id == "iconLoginVisibility"){
                    inptPassWordLogin.type = "password"
                }

                break

            case "visibility_off":
                icone.textContent = "visibility"

                if(icone.id == "iconVisibilityPassWord") {

                    inptPassWordCadastro.type = "text"

                } else if(icone.id == "iconVisibilityConfirm") {
                    
                    inptConfirmCadastro.type = "text"

                } else if (icone.id == "iconLoginVisibility"){

                    inptPassWordLogin.type = "text"

                }

                break
        }
    })
})


const botaoLogar = document.getElementById("btnLogar")

botaoLogar.addEventListener("click", function(){
    if (inptUserNameLogin.value === "") {

        Error("#userName-vazio#")  

    } else if (inptPassWordLogin.value === "") {
        
        Error("#passWord-vazio#")  

    } else if(detecNumbersAndCaracters(inptPassWordLogin.value)) {

        Error("#senha-invalida#")  

    } else if (validaLogin(inptUserNameLogin.value)) {

        Error("#usuario-inexistente#")

    } else {

        login(inptUserNameLogin.value, inptPassWordLogin.value)

    }
})

function validaLogin(userName) {
    
    let users = JSON.parse(localStorage.getItem('user'))

    if (!users) {return true}
   
    for (let obj of users) {
        if (obj.nome === userName) {
            return false
        } 
    }

}

function login(userName, passWord) {
    
    let users = JSON.parse(localStorage.getItem('user'))
    
    let checkedPassWord = false
   
    for (let obj of users) {
    
        if (obj.senha === passWord) {
            users.online = true
            checkedPassWord = true

            let usersJson = JSON.stringify(users)
            localStorage.setItem("user", usersJson)
            window.location.href = "../../index.html"
        }  
        
    }

    if (!checkedPassWord) {
        
        Error ("#senha-incorreta#")

    }

}