import { produtos } from "./utils/produtos.js"
import { saveLocalStorage } from './utils/saveLocalStorage.js'
import { changeMonth } from './utils/forCalendar/changeMonth.js'
import { setDarkCellCalendar } from './utils/forCalendar/setDarkCellCalendar.js'
import { setMarkersCalendar } from './utils/forCalendar/setMarkersCalendar.js'
import { setCurrentDay } from './utils/forCalendar/setCurrentDay.js'
import { setDayTasks } from './utils/forCalendar/setDayTasks.js'

const btnAddPhoto = document.getElementById("btnAddPhoto")
const productName = document.getElementById("productName")
const productPrice = document.getElementById("productPrice")
const productStock = document.getElementById("productStock")
const productDescription = document.getElementById("productDescription")
const imageDescription = document.getElementById("imageDescription")
const btnAdicionar = document.getElementById("btnAdicionar")
const formAddProduct = document.getElementById("formAddProduct")
const productUniqueID = document.getElementById("productUniqueID")
const productViewPhoto = document.getElementById("productViewPhoto")
const productViewPrice = document.getElementById("productViewPrice")

formAddProduct.addEventListener("keyup", function () {

    if (photoProductReaded.length > 0 && productName.value.length > 0 && Number(productStock.value) > 0 && Number(productPrice.value) > 0 && productDescription.value.length > 0 && imageDescription.value.length > 0) {

        btnAdicionar.removeAttribute("disabled")
    } else {

        btnAdicionar.setAttribute("disabled", "true")
    }
})

btnAddPhoto.addEventListener("click", photoProductEvents)

productName.addEventListener("keyup", function () {

    let productNameView = document.getElementById("productNameView")
    productNameView.innerHTML = productName.value

    if (productName.value == "") {

        productNameView.innerHTML = `Nome do produto`

    }

})

productPrice.addEventListener("keyup", function () {

    let productPriceView = document.getElementById("productPriceView")
    let value = Number(productPrice.value).toFixed(2)

    productPriceView.innerHTML = `R$ ${value}`

})



let categoryTransations = JSON.parse(localStorage.getItem("compras"))

if (categoryTransations == null) {
    categoryTransations = [
        {
            identificacaoCategoria: "banhoETosa",
            valorVendido: 0
        },
        {
            identificacaoCategoria: "hospedagem",
            valorVendido: 0
        },
        {
            identificacaoCategoria: "brinquedos",
            valorVendido: 0
        },
        {
            identificacaoCategoria: "acessorios",
            valorVendido: 0
        },
        {
            identificacaoCategoria: "alimentacao",
            valorVendido: 0
        }
    ]
}

export let bodyCalendar = [...document.getElementById("calendar").lastElementChild.children]
let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

if (userID != 0) {
    window.location.href = "../index.html" 
}

function verifyUserOnline() {

    let userOnline
    if (users) {
        for (let obj of users) {
            if (obj.online) {
                userOnline = obj.id
            }
        }
    }
    return userOnline ?? undefined
}

for (let user of users) {
    if (user.lembrarDeMim == false) {
        user.online = false
        saveLocalStorage(users)
    }
}

function setPerfilOnline() {

    let imgUser
    for (let user of users) {
        if (user.id == userID) {
            imgUser = "." + user.img
            console.log(imgUser)
        }
    }

    if (imgUser) {
        let urlImagem = imgUser
        const fotoPerfil = document.getElementById("fotoPerfilOnline")
        fotoPerfil.src = urlImagem
    }

    const containerUser = document.getElementById("containerPerfil")
    containerUser.style.height = "110px"
    containerUser.style.width = "200px"
    containerUser.style.marginLeft = "-5px"
    const botaoLogar = document.getElementById("botaoLogar")
    const containerUserLogado = document.getElementById("userLogado")
    botaoLogar.style.display = "none"
    containerUserLogado.style.display = "flex"

    document.getElementById("botaoSair").addEventListener("click", function sair() {
        for (let user of users) {
            if (user.id == userID) {
                user.online = false
                user.lembrarDeMim = false
            }
        }

        if (window.location.pathname != '/index.html') {

            window.location.href = "../index.html"

        }
        saveLocalStorage(users)
    })

}

if (userID || userID == 0) {
    setPerfilOnline()

    const fotoPerfil = document.getElementById("fotoPerfilOnline")
    fotoPerfil.addEventListener("click", trocaFotoPerfil)
}

function trocaFotoPerfil() {
    const fileTrocaFoto = document.getElementById("inptTrocaFoto")

    fileTrocaFoto.click();
    fileTrocaFoto.addEventListener("change", readImage, false);
    const file = document.getElementById("fotoPerfilOnline")

    function readImage() {
        let fr = new FileReader();
        fr.onload = function (event) {
            file.src = event.target.result

        };
        fr.readAsDataURL(this.files[0]);

        fr.addEventListener("load", () => {
            for (let user of users) {
                if (user.id == userID) {
                    user.img = fr.result

                }
            }
            saveLocalStorage(users)
        })
    }
}

const iconeDoPerfil = document.getElementById("perfilIcon")
let telaPerfilVisibleOrNot = false
iconeDoPerfil.addEventListener("click", function () {
    const tabelaPerfil = document.getElementById("containerPerfil")

    function redirecionarCadastro() {
        window.location.href = "paginas/cadastro-login.html"
    }

    if (!telaPerfilVisibleOrNot) {
        telaPerfilVisibleOrNot = true
        tabelaPerfil.style.display = "flex"

        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.addEventListener("click", redirecionarCadastro)

    } else {
        telaPerfilVisibleOrNot = false
        const botaoLogar = document.getElementById("botaoLogar")
        botaoLogar.removeEventListener('click', redirecionarCadastro)
        tabelaPerfil.style.display = "none"
    }
})


const nav = document.querySelector("nav")
nav.addEventListener("click", function (event) {
    //let category
    switch (event.target.id) {
        case "forHome":

            window.location.href = "../index.html"

            break

        case "forAcessorios":

            localStorage.setItem("newPage", "acessorios")
            window.location.href = "../index.html"
            break

        case "forAlimentacao":

            localStorage.setItem("newPage", "alimentos")
            window.location.href = "../index.html"

            break

        case "forBrinquedos":

            localStorage.setItem("newPage", "brinquedos")
            window.location.href = "../index.html"

            break

        case "forSugestoes":

            localStorage.setItem("newPage", "sugestoes")
            window.location.href = "../index.html"

            break

        case "forAgendamento":

            localStorage.setItem("newPage", "agendamento")

            window.location.href = "../index.html"
            break
    }
})

const barra_pesquisa = document.getElementById("barraPesquisa")

barra_pesquisa.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {

        let stringSearch = barra_pesquisa.value
        stringSearch = stringSearch.trim()
        if (stringSearch == "") return

        localStorage.setItem("pesquisarPor", stringSearch)
        window.location.href = "../index.html"
    }
})

const telaAdmUtilities = document.getElementById("containerAdmUtilities")
const containerCalendar = document.getElementById("viewCalendar")
const containerProfiles = document.getElementById("viewProfiles")
const containerPayments = document.getElementById("viewPayments")
const containerProducts = document.getElementById("editProducts")


telaAdmUtilities.addEventListener("click", function (event) {
    let idBtn = event.target.id

    switch (idBtn) {
        case "btnCalendar":
            telaAdmUtilities.style.display = "none"
            containerCalendar.style.display = "flex"
            break
        case "btnUsers":
            telaAdmUtilities.style.display = "none"
            containerProfiles.style.display = "flex"
            break
        case "btnPayments":
            telaAdmUtilities.style.display = "none"
            containerPayments.style.display = 'flex'
            break
        case "btnEdit":
            telaAdmUtilities.style.display = "none"
            containerProducts.style.display = "flex"
    }
})

let btnsBackMenu = document.querySelectorAll(".backMenu")

    ;[...btnsBackMenu].forEach(btnBack => {
        btnBack.addEventListener("click", function (event) {
            telaAdmUtilities.style.display = "flex"

            let id = event.target.id

            switch (id) {
                case "btnBackCalendar":
                    containerCalendar.style.display = 'none'
                    break
                case "btnBackProfiles":
                    containerProfiles.style.display = 'none'
                    break
                case "btnBackPayments":
                    containerPayments.style.display = 'none'
                    break
                case "btnBackProducts":
                    containerProducts.style.display = 'none'
                    break
            }
        })
    })

const botoesTrocaMes = document.querySelectorAll(".trocaMes")
export let mesAtual

    ;[...botoesTrocaMes].forEach(botao => {
        botao.addEventListener("click", function (event) {
            let direction = event.target.textContent

            if (direction === "keyboard_arrow_left") {

                if (mesAtual != 0) {
                    mesAtual -= 1
                    changeMonth(mesAtual)
                } else {
                    mesAtual = 11
                    changeMonth(mesAtual)
                }

            } else if (direction === "keyboard_arrow_right") {

                if (mesAtual != 11) {
                    mesAtual += 1
                    changeMonth(mesAtual)

                } else {
                    mesAtual = 0
                    changeMonth(mesAtual)
                }
            }
        })
    })

document.addEventListener("DOMContentLoaded", function () {
    let mes = new Date()
    mes = mes.getMonth()
    const mouthTitle = document.getElementById("mouthTitle")

    switch (mes) {
        case 0:
            changeMonth(0)
            mouthTitle.innerHTML = "Janeiro"
            mesAtual = 0
            break
        case 1:
            changeMonth(1)
            mouthTitle.innerHTML = "Fevereiro"
            mesAtual = 1
            break
        case 2:
            changeMonth(2)
            mouthTitle.innerHTML = "Março"
            mesAtual = 2
            break
        case 3:
            changeMonth(3)
            mouthTitle.innerHTML = "Abril"
            mesAtual = 3
            break
        case 4:
            changeMonth(4)
            mouthTitle.innerHTML = "Maio"
            mesAtual = 4
            break
        case 5:
            changeMonth(5)
            mouthTitle.innerHTML = "Junho"
            mesAtual = 5
            break
        case 6:
            changeMonth(6)
            mouthTitle.innerHTML = "Julho"
            mesAtual = 6
            break
        case 7:
            changeMonth(7)
            mouthTitle.innerHTML = "Agosto"
            mesAtual = 7
            break
        case 8:
            changeMonth(8)
            mouthTitle.innerHTML = "Setembro"
            mesAtual = 8
            break
        case 9:
            changeMonth(9)
            mouthTitle.innerHTML = "Outubro"
            mesAtual = 9
            break
        case 10:
            changeMonth(10)
            mouthTitle.innerHTML = "Novembro"
            mesAtual = 10
            break
        case 11:
            changeMonth(11)
            mouthTitle.innerHTML = "Dezembro"
            mesAtual = 11
            break
    }
    setDarkCellCalendar()
    setMarkersCalendar()
    setCurrentDay()
})

const telaCheckedTasks = document.getElementById("containerCheckedTasks")
const calendar = document.getElementById("tbody")
let flagCalendar = false

calendar.addEventListener("click", function (event) {

    if (flagCalendar) return

    flagCalendar = true

    const imgSemServico = document.getElementById("imgSemSevico")
    let target = event.target
    let day = target.textContent
    let atributos = event.target.getAttribute("escurecer")
    const container = document.getElementById("tasks")

    if (atributos != null) {

        if (day > 20) {
            if (mesAtual == 0) {

                mesAtual = 11

            } else {

                mesAtual -= 1

            }

            changeMonth(mesAtual)


        } else {
            mesAtual += 1
            changeMonth(mesAtual)

        }

    }

    //pegar e salvar os serviços desse dia

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos"))
    let flagEmptyDayTasks = true

    for (let obj of agendamentos) {

        let diaMarcado = obj.dia
        let mesMarcado = obj.mes
        let diaMarcadoSaida = obj.diaSaida
        let mesMarcadoSaida = obj.mesSaida


        if (mesMarcado == mesAtual && diaMarcado == day) {
            flagEmptyDayTasks = false
        }

        if (mesMarcadoSaida == mesAtual && diaMarcadoSaida == day) {
            flagEmptyDayTasks = false
        }

    }

    const dayH1 = document.getElementById("dayH1")
    dayH1.innerText = `Dia ${day}`

    if (flagEmptyDayTasks) {

        imgSemServico.style.display = "block"

        telaCheckedTasks.style.display = "flex"

    } else {

        container.style.display = "block"
        imgSemServico.style.display = "none"
        telaCheckedTasks.style.display = "flex"

        setDayTasks(day)
    }

})

const btnClose = document.getElementById("btnClose")
btnClose.addEventListener("click", function () {
    flagCalendar = false
    const container = document.getElementById("tasks")
    telaCheckedTasks.style.display = "none"
    container.style.display = "none"
    const containerCalendar = document.getElementById("containerCheckedTasks")
    containerCalendar.removeAttribute("style")
    localStorage.removeItem("deleteWarning")
})


/* containerProfiles */

loadProfiles()
function loadProfiles() {

    const containerUsers = document.getElementById("containerUsers")

    containerUsers.innerHTML = ""

    let users = JSON.parse(localStorage.getItem("users"))

    for (let user of users) {

        let id = user.id
        let nome = user.nome
        let dataObj = user.date
        let totalGasto = user.atividadeNoSite.totalGasto
        let imagem = user.img

        if (!imagem) {
            imagem = null
        }

        if (id == 0) continue

        let containerUser = constructorProfiles(id, nome, dataObj, totalGasto, imagem)

        containerUsers.appendChild(containerUser)
    }

    
}

function constructorProfiles(id, nome, dataObj, totalGasto, imagem = null) {

    

    // paragrafos

    let paragrafoUserId = document.createElement("p")
    let paragrafoUserName = document.createElement("p")
    let paragrafoUserDate = document.createElement("p")
    let paragrafoUserSpending = document.createElement("p")

    let textUserId = document.createTextNode(id)
    let textUserName = document.createTextNode(nome)
    let textUserDate = document.createTextNode(dataObj.text)
    let textUserSpending = document.createTextNode(totalGasto)

    paragrafoUserId.classList.add("userId")
    paragrafoUserId.appendChild(textUserId)

    paragrafoUserName.classList.add("userName")
    paragrafoUserName.appendChild(textUserName)

    paragrafoUserDate.classList.add("userDate")
    paragrafoUserDate.appendChild(textUserDate)

    paragrafoUserSpending.classList.add("userSpending")
    paragrafoUserSpending.appendChild(textUserSpending)

    //article

    let article = document.createElement("article")
    article.appendChild(paragrafoUserId)
    article.appendChild(paragrafoUserName)
    article.appendChild(paragrafoUserDate)
    article.appendChild(paragrafoUserSpending)

    //btn excluir

    let btnExcluir = document.createElement("button")
    btnExcluir.classList.add("btnDeleteUser")
    let textDelete = document.createTextNode("Excluir")
    btnExcluir.appendChild(textDelete)
    btnExcluir.value = id

    //imagem user

    let img = document.createElement("img")

    if (imagem == null) {
        img.src = "../imagens/perfil-default.jpg"
    } else {
        img.src = imagem
    }

    img.alt = "Foto De Perfil"

    

    //div container user

    let divContainer = document.createElement("div")
    divContainer.classList.add("containerUser")

    divContainer.appendChild(img)
    divContainer.appendChild(article)
    divContainer.appendChild(btnExcluir)

    return divContainer
}

// payments

var ctx = document.getElementById("chart")


let valueAllTransations = 0

for (let obj of categoryTransations) {
    obj.valorVendido = Number(obj.valorVendido.toFixed(2))
    valueAllTransations += obj.valorVendido

    let id = document.getElementById(`${obj.identificacaoCategoria}-text`)
    id.innerHTML = `R$ ${obj.valorVendido.toFixed(2)}`
}

if (valueAllTransations > 0) {

    var chartGraph = new Chart(ctx, {
        type: "pie",
        data: {
            labels: [
                'Tosa e Banho',
                'Hospedagem',
                'Brinquedos',
                'Acessórios',
                'Alimentos'
            ],
            datasets: [{
                label: 'Rendimento Bruto',
                data: [categoryTransations[0].valorVendido, categoryTransations[1].valorVendido, categoryTransations[2].valorVendido, categoryTransations[3].valorVendido, categoryTransations[4].valorVendido],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(217, 94, 50)',
                    'rgb(255, 3, 33)'
                ],
                hoverOffset: 4
            }]
        }
    })
} else {
    const imgContainer = document.getElementById("semRedimentos")

    imgContainer.style.display = "flex"
}

/* edit products */

const editButtons = document.querySelectorAll(".btnEditProducts")
const screenButtons = document.getElementById("containerEditButtons")
const screenAddProducts = document.getElementById("screenAddProducts")
const screenEditProducts = document.getElementById("screenEditProduct")
const screenRemoveProdutcs = document.getElementById("screenRemoveProduct")

    ;[...editButtons].forEach(button => {
        button.addEventListener("click", function (event) {
            let text = event.target.textContent
            text = text.trim()

            switch (text) {
                case "add":
                    screenButtons.style.display = "none"
                    screenAddProducts.style.display = "flex"
                    break
                case "edit_square":
                    screenButtons.style.display = "none"
                    screenEditProducts.style.display = "flex"
                    break
                case "delete_forever":
                    screenButtons.style.display = "none"
                    screenRemoveProdutcs.style.display = "flex"
                    break
            }
        })
    })

const buttonInternos = document.querySelectorAll(".backEditButtons")

    ;[...buttonInternos].forEach(button => {
        button.addEventListener("click", function (event) {
            let id = event.target.id

            clearInputs()

            switch (id) {
                case "internalAddButton":
                    screenAddProducts.style.display = "none"
                    screenButtons.style.display = "flex"
                    break
                case "internalEditButton":
                    screenEditProducts.style.display = "none"
                    screenButtons.style.display = "flex"
                    break
                case "internalRemoveButton":
                    screenRemoveProdutcs.style.display = "none"
                    screenButtons.style.display = "flex"
                    break
            }
        })
    })

let photoProductReaded = ""

function photoProductEvents() {

    const filePhotoProduct = document.getElementById("photoProduct")

    filePhotoProduct.click();
    filePhotoProduct.addEventListener("change", readImage, false);
    const file = document.getElementById("imgProduct")

    function readImage() {
        let fr = new FileReader();
        fr.onload = function (event) {
            file.src = event.target.result
            photoProductReaded = event.target.result

        };
        fr.readAsDataURL(this.files[0]);

        // fr.addEventListener("load", () => {

        // })
    }

}

const containerPreViewImage = document.getElementById("preViewImage")
const buttonAddPhotoEdit = document.getElementById("btnEditPhoto")
containerPreViewImage.addEventListener("click", addPhotoProductEdit)
buttonAddPhotoEdit.addEventListener("click", addPhotoProductEdit)

function addPhotoProductEdit() {
    const filePhotoProduct = document.getElementById("productChoosePhoto")

    filePhotoProduct.click();
    filePhotoProduct.addEventListener("change", readImage, false);
    const file = document.getElementById("imgPreView")

    function readImage() {
        let fr = new FileReader();
        fr.onload = function (event) {
            file.src = event.target.result
            photoProductReaded = event.target.result
            containerPreViewImage.style.display = "flex"

        };
        fr.readAsDataURL(this.files[0]);


    }
}

const btnEditEscProducts = document.getElementById("btnEscEdit")
const listaEditProducts = document.getElementById("listProductsEdit")
const listaRemoveProducts = document.getElementById("listProductsRemove")
const btnCloseEdit = document.getElementById("btnCloseEdit")
const btnCloseRemove = document.getElementById("btnCloseRemove")
const btnRemoveEscProducts = document.getElementById("btnEscRemove")

const productIDSelected = document.getElementById("productIDSelected")
const productViewName = document.getElementById("productViewName")
const productNewPrice = document.getElementById("productNewPrice")
const productNewStock = document.getElementById("productNewStock")
const imgPreView = document.getElementById("imgPreView")
const newDescImage = document.getElementById("newDescImage")
const productNewDescription = document.getElementById("productNewDescription")

btnEditEscProducts.addEventListener("click", function () {

    let tableProducts = document.querySelector("#listProductsEdit tbody")
    tableProducts.innerHTML = ""

    produtos.forEach(function (productIterable) {

        let newLine = document.createElement("tr")

        let nameProduct = document.createElement("td")
        nameProduct.textContent = productIterable.nome
        newLine.appendChild(nameProduct)

        let priceProduct = document.createElement("td")
        priceProduct.textContent = `R$ ${productIterable.preco.toFixed(2)}`
        newLine.appendChild(priceProduct)

        let idProduct = document.createElement("td")
        idProduct.textContent = productIterable.codigo
        newLine.appendChild(idProduct)

        let selectProduct = document.createElement("td")

        let buttonSelectProduct = document.createElement("button")
        buttonSelectProduct.className = "btnDeleteProduct"

        let iconSelectProduct = document.createElement("i")
        iconSelectProduct.className = "material-symbols-outlined"
        iconSelectProduct.textContent = "check"


        buttonSelectProduct.addEventListener("click", function () {
            
            productIDSelected.value = productIterable.codigo
            productViewName.value = productIterable.nome
            productNewPrice.value = productIterable.preco
            productNewStock.value = productIterable.estoque
            productNewDescription.value = productIterable.descricao
            imgPreView.src = `./imagens/${productIterable.imagem}`
            newDescImage.value = productIterable.descricaoImagem

            containerPreViewImage.style.display = "flex"


            btnSaveEditProduct.removeAttribute("disabled")
            listaEditProducts.style.display = "none"

        })
        buttonSelectProduct.appendChild(iconSelectProduct)
        selectProduct.appendChild(buttonSelectProduct)

        newLine.appendChild(selectProduct)

        tableProducts.appendChild(newLine)
    })



    listaEditProducts.style.display = "flex"
    btnCloseEdit.addEventListener("click", function () {
        listaEditProducts.style.display = "none"
    })
})

const btnSaveEditProduct = document.getElementById("btnSaveEditProduct")
btnSaveEditProduct.addEventListener("click", function () {

    let productIDSelected = document.getElementById("productIDSelected")
    let productNewPrice = document.getElementById("productNewPrice")
    let productNewStock = document.getElementById("productNewStock")
    let newDescImage = document.getElementById("newDescImage")
    let productNewDescription = document.getElementById("productNewDescription")

    if (Number(productNewPrice.value) == 0 || Number(productNewStock.value) == 0 || newDescImage.value == "" || productNewDescription.value == "") {
        Swal.fire("Erro", "Todos os campos precisam ser preenchidos para adicionar o produto.", "error")
    } else {
        let IDProductEditing = produtos.findIndex(produto => produto.codigo == Number(productIDSelected.value))

        if (photoProductReaded.length > 0) {
            produtos[IDProductEditing].imagem = photoProductReaded
        }

        produtos[IDProductEditing].preco = Number(productNewPrice.value)
        produtos[IDProductEditing].estoque = Number(productNewStock.value)
        produtos[IDProductEditing].descricaoImagem = newDescImage.value
        produtos[IDProductEditing].descricao = productNewDescription.value
        localStorage.setItem("listaProdutos", JSON.stringify(produtos))

        const inputs = [...document.querySelectorAll("#screenEditProduct input")]
        inputs.forEach(function (element) {
            element.value = ""
        })

        newDescImage.value = ""
        productNewDescription.value = ""
        containerPreViewImage.style.display = "none"

        btnSaveEditProduct.setAttribute("disabled", "true")

        Swal.fire("Produto editado com sucesso.", "O produto foi editado corretamente.", "success")

        //acaba aqui
    }


})

btnRemoveEscProducts.addEventListener("click", function () {

    let tableProducts = document.querySelector("#listProductsRemove tbody")
    tableProducts.innerHTML = ""

    produtos.forEach(function (productIterable) {

        let newLine = document.createElement("tr")

        let nameProduct = document.createElement("td")
        nameProduct.textContent = productIterable.nome
        newLine.appendChild(nameProduct)

        let priceProduct = document.createElement("td")
        priceProduct.textContent = `R$ ${productIterable.preco.toFixed(2)}`
        newLine.appendChild(priceProduct)

        let idProduct = document.createElement("td")
        idProduct.textContent = productIterable.codigo
        newLine.appendChild(idProduct)

        let selectProduct = document.createElement("td")

        let buttonSelectProduct = document.createElement("button")
        buttonSelectProduct.className = "btnDeleteProduct"

        let iconSelectProduct = document.createElement("i")
        iconSelectProduct.className = "material-symbols-outlined"
        iconSelectProduct.textContent = "check"

        buttonSelectProduct.addEventListener("click", function () {

            listaRemoveProducts.style.display = "none"


            productUniqueID.value = productIterable.codigo

            productViewPhoto.src = `./imagens/${productIterable.imagem}`
            productViewPhoto.alt = productIterable.descricaoImagem

            productViewName.innerHTML = productIterable.nome

            productViewPrice.innerHTML = `R$ ${productIterable.preco.toFixed(2)}`

            btnRemoveProduct.removeAttribute("disabled")

        })
        buttonSelectProduct.appendChild(iconSelectProduct)
        selectProduct.appendChild(buttonSelectProduct)

        newLine.appendChild(selectProduct)

        tableProducts.appendChild(newLine)
    })

    listaRemoveProducts.style.display = "flex"

    btnCloseRemove.addEventListener("click", function () {
        listaRemoveProducts.style.display = "none"
    })
})


/* USER */

let visibility

const btnMeuPerfil = document.getElementById("btnMeuPerfil")
const containerPerfil = document.getElementById("perfilUsuario")
const body = document.querySelector("body")
const tabelaPerfil = document.getElementById("containerPerfil")

btnMeuPerfil.addEventListener("click", function () {

    containerPerfil.style.display = "flex"
    tabelaPerfil.style.display = "none"
    visibility = false
    body.style.overflow = "hidden"

    pegarInfoUser()
})

const btnClosePerfil = document.querySelector("#botaoFechar > button")
btnClosePerfil.addEventListener("click", function () {
    containerPerfil.style.display = "none"
    body.removeAttribute("style")
})

function pegarInfoUser() {

    let nome
    let realName
    let img
    let pets = []
    let data
    let contato

    for (let obj of users) {

        if (userID == obj.id) {
            nome = obj.nome
            realName = obj.realName
            img = obj.img
            data = obj.date.text
            contato = obj.contato
            pets = obj.pets
        }
    }

    const inputNome = document.getElementById("nomeUser")
    const inputData = document.getElementById("contaUser")
    const inputContato = document.getElementById("contatoUser")
    const inputImagem = document.getElementById("imagem")

    if (img) {
        inputImagem.src = img

    }

    if (realName == undefined) {
        inputNome.value = nome
    } else {
        inputNome.value = realName
    }

    inputContato.value = contato
    inputData.value = data

}

const imagem = document.getElementById("imagem")
imagem.addEventListener("click", () => { trocaFotoPerfil("imagem", "userImg") })

/* ----------- */

const containerBtnsPerfilUser = document.getElementById("excluirEeditar")
const containerUser = document.getElementById("perfilUsuario")
containerBtnsPerfilUser.addEventListener("click", function (event) {
    let id = event.target.id
    const telaMinhasCompras = document.getElementById("containerMinhasCompras")
    const btnEditarEexcluir = document.getElementById("btnEditUser")

    switch (id) {
        case "btnExcluirUser":
            if (userID == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'O admin não pode ser deletado!'
                })
            } else {

                let indexUser

                for (let i = 0; i < users.length; i++) {
                    if (users[i].id == userID) {
                        indexUser = i
                        break
                    }
                }

                users.splice(indexUser, 1)
                saveLocalStorage(users)

                containerUser.style.display = "none"
                location.reload()

            }

            break
        case "btnEditUser":
            let textoBotao = event.target.textContent

            if (textoBotao == "Editar") {
                const inputNome = document.getElementById("nomeUser")
                const inputContato = document.getElementById("contatoUser")

                inputNome.removeAttribute("readonly")
                inputContato.removeAttribute("readonly")

                btnEditarEexcluir.textContent = "Salvar"


            } else if (textoBotao == "Salvar") {
                const inputNome = document.getElementById("nomeUser")
                const inputContato = document.getElementById("contatoUser")

                inputNome.setAttribute("readonly", true)
                inputContato.setAttribute("readonly", true)

                btnEditarEexcluir.textContent = "Editar"
                let antigoNome
                for (let obj of users) {

                    if (userID == obj.id) {
                        antigoNome = obj.nome

                    }
                }

                let nome, contato
                let verifyName = false


                nome = inputNome.value

                if (nome == antigoNome) {
                    verifyName = true
                }

                contato = inputContato.value

                for (let obj of users) {

                    if (userID == obj.id) {
                        if (!verifyName) {
                            obj.realName = nome
                        } else {
                            obj.nome = nome
                        }

                        obj.contato = contato

                    }
                }
                saveLocalStorage(users)
            }
            break
        case "btnMyShopping":
            setTableMyShopping()
            telaMinhasCompras.style.display = "flex"

            break
    }
})

export function setTableMyShopping() {

    let totCompras
    let produtos = JSON.parse(localStorage.getItem("listaProdutos"))
    const tbody = document.querySelector("#containerTable > table > tbody")
    tbody.innerHTML = ""
    for (let obj of users) {
        if (obj.id === userID) {
            totCompras = obj.atividadeNoSite.produtosComprados
            break
        }
    }


    if (totCompras.length == 0) {
        const containerTable = document.getElementById("containerTable")
        const table = document.querySelector("#containerTable > table")

        let span = document.createElement("span")
        span.className = "messageNoShopping"
        let text = document.createTextNode("Lamento, você não possui historico de compras.")
        span.appendChild(text)
        containerTable.appendChild(span)
        table.style.display = "none"
    }

    for (let i = 0; i < totCompras.length; i++) {

        let nomeProd, codigoProd, precoProd

        for (let prod of produtos) {
            if (prod.codigo == totCompras[i]) {
                nomeProd = prod.nome
                codigoProd = prod.codigo
                precoProd = prod.preco
                break
            }
        }

        let tr = constructorTableMyShopping(codigoProd, nomeProd, precoProd)
        tbody.appendChild(tr)
    }
}

function constructorTableMyShopping(cod, nome, preco) {

    let tdCodigo = document.createElement("td")
    let tdNome = document.createElement("td")
    let tdPreco = document.createElement("td")

    let textCodigo = document.createTextNode(`${cod}`)
    let textNome = document.createTextNode(`${nome}`)
    let textPreco = document.createTextNode(`R$ ${preco.toFixed(2)}`)

    tdCodigo.appendChild(textCodigo)
    tdCodigo.classList.add("tdCodProduct")

    tdNome.appendChild(textNome)

    tdPreco.appendChild(textPreco)
    tdPreco.classList.add("tdPrecoProduct")

    let tr = document.createElement("tr")
    tr.appendChild(tdCodigo)
    tr.appendChild(tdNome)
    tr.appendChild(tdPreco)

    return tr
}

const botaoFecharMinhasCompras = document.getElementById("btnCloseMinhasCompras")
botaoFecharMinhasCompras.addEventListener("click", function () {
    const telaMinhasCompras = document.getElementById("containerMinhasCompras")

    if (telaMinhasCompras.style.display === "none") {
        telaMinhasCompras.style.display = "flex"
    } else {
        telaMinhasCompras.style.display = "none"
    }
})

const btnRemoveProduct = document.getElementById("btnRemoveProduct")
btnRemoveProduct.addEventListener("click", deleteProduct)

async function deleteProduct() {
    const ask = await askForDeletion("Deletar produto", "Tem certeza que deseja deletar este produto? Esta ação não poderá ser desfeita.")

    if (ask == 1) {

        let index = produtos.findIndex(produto => produto.codigo == Number(productUniqueID.value))
        if (index < 0) {
            return
        }

        produtos.splice(index, 1)
        localStorage.setItem("listaProdutos", JSON.stringify(produtos))

        productViewPhoto.src = "../imagens/pet-recomendações.png"
        productViewPhoto.alt = "Foto do produto"
        productViewPrice.textContent = "R$ 0,00"
        productViewName.textContent = "Nome do produto"
        btnRemoveProduct.setAttribute("disabled", "true")
    }
}

let showMessageOrNot = true

async function askForDeletion(Title, Text) {
    let action = -1

    if (showMessageOrNot) {
        await Swal.fire({
            title: Title,
            icon: 'warning',
            text: Text,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Deletar',
            denyButtonText: `Sim, não me avise de novo`,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed || result.isDenied) {
                action = 1 // Deletar

                if (result.isDenied) {
                    showMessageOrNot = false
                }
            }
        })

        if (action == 1 && !showMessageOrNot) {
            Swal.fire({
                title: 'Deletado!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            })
        }
    } else {
        action = 1 // Deletar sem confirmação, definida previamente
    }

    return action
}


btnAdicionar.addEventListener("click", function () {

    const category1 = document.getElementById("brinquedo")
    const category2 = document.getElementById("alimento")
    const category3 = document.getElementById("acessorio")
    let categoryName

    if (category1.checked) {

        categoryName = "brinquedos"

    } else if (category2.checked) {

        categoryName = "alimentacao"

    } else {

        categoryName = "acessorios"

    }

    const productAdd = {
        codigo: (produtos[produtos.length - 1].codigo) + 1,
        nome: productName.value,
        descricao: productDescription.value,
        imagem: photoProductReaded,
        preco: Number(productPrice.value),
        categoria: categoryName,
        descricaoImagem: imageDescription.value,
        estoque: parseInt(productStock.value)
    }

    produtos.push(productAdd)
    localStorage.setItem("listaProdutos", JSON.stringify(produtos))

    clearInputs()
    btnAdicionar.setAttribute("disabled", "true")

    Swal.fire(
        'Produto Adicionado!',
        'Ele já está disponível na loja!',
        'success'
    )

})


function clearInputs() {

    let inputs = [...document.querySelectorAll("input")]
    inputs.forEach(function (element) {
        element.value = ""
    })

    inputs = [...document.querySelectorAll("textarea")]
    inputs.forEach(function (element) {
        element.value = ""
    })

    containerPreViewImage.style.display = "none"


    let productNameView = document.getElementById("productNameView")
    productNameView.innerHTML = `Nome do produto`

    let productPriceView = document.getElementById("productPriceView")
    productPriceView.innerHTML = `R$ 0,00`

    let imgProduct = document.getElementById("imgProduct")
    imgProduct.src = "../imagens/pet-recomendações.png"
    imgProduct.alt = "Foto do produto"

    let imgPreview = document.getElementById("imgPreView")
    imgPreview.src = ""
    imgPreview.alt = ""

    photoProductReaded = ""
    
}

const btnsDeleteUser = document.querySelectorAll(".btnDeleteUser")
;[...btnsDeleteUser].forEach( btn => {
    btn.addEventListener("click", function(event){
        
        let id = event.target.value

        users = JSON.parse(localStorage.getItem("users"))

        for (let i = 0 ; i <  users.length ; i++) {
            if (users[i].id == id) {
                users.splice(i, 1)
                break
            }
        }

        localStorage.setItem("users", JSON.stringify(users))
        loadProfiles()
    })
})