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
                } else if (elemento.id === "iconVisibilityConfirm") {
                    elemento.style.top = "60%"
                }
            })
            break

        case "#passWord-vazio#":
            containerErro = document.getElementById("erroCadastroPassWord")
            containerErro.innerHTML = `Este campo é obrigatório!`
            containerErro.style.marginLeft = "-195px"


            icon = document.getElementById("iconVisibilityConfirm")
            icon.style.top = "60%"

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
                } else if (elemento.id === "iconVisibilityConfirm") {
                    elemento.style.top = "60%"
                }
            })

            break
        case "#senha-invalida#":
            containerErro = document.getElementById("erroCadastroPassWord")
            containerErro.innerHTML = `A senha deve ter no mínimo 6 caracteres e 3 numeros!`
            containerErro.style.marginLeft = "-16px"

            icon = document.getElementById("iconVisibilityConfirm")
            icon.style.top = "60%"
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

            break

        case "#senha-incorreta#":
            containerErro = document.getElementById("erroLoginPassWord")
            containerErro.innerHTML = `A senha está incorreta!`
            containerErro.style.marginLeft = "-215px"

    }
}