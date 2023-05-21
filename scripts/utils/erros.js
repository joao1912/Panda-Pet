export function Error(erro) {
    let containerErro
    let containerIcones
    let icon

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
}