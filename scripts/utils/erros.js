export function Error(erro) {
    let containerErro
    let containerIcones
    let icon

    //erro no cadastro

    switch(erro) {
        case "#userName-vazio#":
            containerErro = document.getElementById("erroCadastroUserName")
            containerErro.innerHTML = `Este campo é obrigatório!`
            containerErro.style.marginLeft = "-195px"

            containerIcones = document.querySelectorAll(".visibility")
            ;[...containerIcones].forEach(elemento => {
                if (elemento.id === "iconVisibilityPassWord") {
                    elemento.style.top = "43.4%"
                }
            })
            break

        case "#passWord-vazio#":
            containerErro = document.getElementById("erroCadastroPassWord")
            containerErro.innerHTML = `Este campo é obrigatório!`
            containerErro.style.marginLeft = "-195px"

            break

        case "#senhas-diferentes#":
            containerErro = document.getElementById("erroCadastroConfirm")
            containerErro.innerHTML = `As senhas não estão iguais!`
            containerErro.style.marginLeft = "-185px"
            break

        case "#Nome-nao-disponivel#":
            containerErro = document.getElementById("erroCadastroUserName")
            containerErro.innerHTML = `Este nome não está disponível!`
            containerErro.style.marginLeft = "-160px"

            containerIcones = document.querySelectorAll(".visibility")
            ;[...containerIcones].forEach(elemento => {

                if (elemento.id === "iconVisibilityPassWord") {
                    elemento.style.top = "43.4%"
                } 
            })

            break
        case "#senha-invalida#":
            containerErro = document.getElementById("erroCadastroPassWord")
            containerErro.innerHTML = `A senha deve ter no mínimo 6 caracteres e 3 numeros!`
            containerErro.style.marginLeft = "-16px"

            break
    }

    //erro no login
    const iconePassword = document.getElementById("iconLoginVisibility")
    switch(erro) {
        case "#userName-vazio#":
            containerErro = document.getElementById("erroLoginConfirm")
            containerErro.innerHTML = `Este campo é obrigatório!`
            containerErro.style.marginLeft = "-190px"

            iconePassword.style.top = "58.5%"
        break

        case "#passWord-vazio#":
            containerErro = document.getElementById("erroLoginPassWord")
            containerErro.innerHTML = `Este campo é obrigatório!`
            containerErro.style.marginLeft = "-190px"



            break

        case "#senha-invalida#":
            containerErro = document.getElementById("erroLoginPassWord")
            containerErro.innerHTML = `A senha deve ter no mínimo 6 caracteres e 3 numeros!`
            containerErro.style.marginLeft = "-16px"


            break
        
        case "#usuario-inexistente#":
            containerErro = document.getElementById("erroLoginConfirm")
            containerErro.innerHTML = `Este usuário não existe!`
            containerErro.style.marginLeft = "-205px"

            iconePassword.style.top = "58.5%"

            break

        case "#senha-incorreta#":
            containerErro = document.getElementById("erroLoginPassWord")
            containerErro.innerHTML = `A senha está incorreta!`
            containerErro.style.marginLeft = "-215px"

    }

    //erro agendamento
    

    if (typeof erro != "object" || erro.length == 0) return

    do {
        const containerErroNome = document.getElementById("erroInptNome")
        const containerErroNiver = document.getElementById("erroInptAniversario")
        const containerErroRaca = document.getElementById("erroInptRaca")
        const containerErroPeso = document.getElementById("erroInptPeso")
        const containerErroAlergico= document.getElementById("erroBtnEscolha")

        const inptNome = document.getElementById("inputNome")
        const inptNiver = document.getElementById("inputAniver")
        const inptRaca = document.getElementById("inputRaca")
        const inptPeso = document.getElementById("inputPeso")
        const textAlergico = document.getElementById("quadro")

        switch (erro[0]) {
            case "#nome-vazio#":
                
                containerErroNome.style.display = "block"
                containerErroNome.textContent = "Este Campo é Obrigatório!"
                inptNome.addEventListener("keydown", () => {ocutarErro(containerErroNome)} )

                break
            case "#niver-vazio#":
                
                containerErroNiver.style.display = "block"
                containerErroNiver.textContent = "Este Campo é Obrigatório!"
                inptNiver.addEventListener("keydown", () => {ocutarErro(containerErroNiver)} )

                break
            case "#raca-vazio#":
                
                containerErroRaca.style.display = "block"
                containerErroRaca.textContent = "Este Campo é Obrigatório!"
                inptRaca.addEventListener("keydown", () => {ocutarErro(containerErroRaca)} )

                break
            case "#peso-vazio#":
                
                containerErroPeso.style.display = "block"
                containerErroPeso.textContent = "Este Campo é Obrigatório!"
                inptPeso.addEventListener("keydown", () => {ocutarErro(containerErroPeso)} )

                break
            case "#alergico-vazio#":
               
                containerErroAlergico.style.display = "block"
                containerErroAlergico.textContent = "Este Campo é Obrigatório!"
                textAlergico.addEventListener("keydown", () => {ocutarErro(containerErroAlergico)} )

                break
            case "#niver-invalido#":
        
                containerErroNiver.style.display = "block"
                containerErroNiver.textContent = "Data inválida!"
                inptNiver.addEventListener("keydown", () => {ocutarErro(containerErroNiver)} )

                break
            case "#peso-invalido#":
                containerErroPeso.style.display = "block"
                containerErroPeso.textContent = "Peso inválido!"
                inptPeso.addEventListener("keydown", () => {ocutarErro(containerErroPeso)} )
                break
        }

        erro.splice(0,1)

    } while (erro.length)
    
    
}

function ocutarErro(elemento) {
    elemento.style.display = "none"
    elemento.textContent = ""
}