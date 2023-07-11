import { produtos } from "./utils/produtos.js"
import { showProducts } from './utils/forProducts/showProducts.js'
import { saveLocalStorage } from './utils/saveLocalStorage.js'
import { changeMonth } from './utils/forCalendar/changeMonth.js'
import { setDarkCellCalendar } from './utils/forCalendar/setDarkCellCalendar.js'
import { setMarkersCalendar } from './utils/forCalendar/setMarkersCalendar.js'
import { setCurrentDay } from './utils/forCalendar/setCurrentDay.js'
import { setDayTasks } from './utils/forCalendar/setDayTasks.js'

/* --- TEMPORARIO --- */


const agendamentos = []
agendamentos.push(
    {
        id: 1,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 2,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 3,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    },
    {
        id: 4,
        service: "Hospedagem",
        dia: 10,
        mes: 11,//o mes vai de 0 a 11 !!!
        hora: "15:30"
    }
)

localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
/* ------------------ */

const btnAddPhoto = document.getElementById("btnAddPhoto")
const productName = document.getElementById("productName")
const productPrice = document.getElementById("productPrice")
const productStock = document.getElementById("productStock")
const productDescription = document.getElementById("productDescription")
const imageDescription = document.getElementById("imageDescription")
const btnAdicionar = document.getElementById("btnAdicionar")
const formAddProduct = document.getElementById("formAddProduct")

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
    Swal.fire(
        'Produto Adicionado!',
        'Ele ja está disponivel na loja!',
        'success'
    )

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
    // window.location.href = "../../index.html" 
    //descomentar quando a pagina do adm estiver totalmente pronta
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
            imgUser = user.img
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

            window.location.href = "../../index.html"

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
        window.location.href = "../../paginas/cadastro-login.html"
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

            window.location.href = "../../index.html"

            break

        case "forAcessorios":

            localStorage.setItem("newPage", "acessorios")
            window.location.href = "../../index.html"
            break

        case "forAlimentacao":

            localStorage.setItem("newPage", "alimentos")
            window.location.href = "../../index.html"

            break

        case "forBrinquedos":

            localStorage.setItem("newPage", "brinquedos")
            window.location.href = "../../index.html"

            break

        case "forSugestoes":

            localStorage.setItem("newPage", "sugestoes")
            window.location.href = "../../index.html"

            break

        case "forAgendamento":

            localStorage.setItem("newPage", "agendamento")

            window.location.href = "../../index.html"
            break
    }
})

const barra_pesquisa = document.getElementById("barraPesquisa")

/* fazer aqui o evendo do enter funcionar */

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

        if (mesMarcado == mesAtual && diaMarcado == day) {
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
    localStorage.removeItem("deleteWarning")
})


/* containerProfiles */

loadProfiles()
function loadProfiles() {
    let elementos = containerProfiles.childNodes

    for (let i = 7; i < elementos.length; i++) {

        elementos[i].remove()
    }

    let users = JSON.parse(localStorage.getItem("users"))

    if (users.length == 1 || users.length == 0) {

        //por imagem

    } else {

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

            containerProfiles.appendChild(containerUser)
        }

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

    //imagem user

    let img = document.createElement("img")

    if (imagem == null) {
        img.src = "../../imagens/perfil-default.jpg"
    } else {
        img.src = imagem
    }

    img.alt = "Foto De Perfil"

    //div container user

    let divContainer = document.createElement("div")
    divContainer.classList.add("containerUser")

    divContainer.appendChild(img)
    divContainer.appendChild(article)

    return divContainer
}

// payments

var ctx = document.getElementById("chart")


let valueAllTransations = 0

for (let obj of categoryTransations) {
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

            let inputs = [...document.querySelectorAll("input")]
            inputs.forEach(function (element) {
                element.value = ""
            })

            inputs = [...document.querySelectorAll("textarea")]
            inputs.forEach(function (element) {
                element.value = ""
            })

            containerPreViewImage.src = ""
            containerPreViewImage.style.display = "none"

            let productNameView = document.getElementById("productNameView")
            productNameView.innerHTML = `Nome do produto`

            let productPriceView = document.getElementById("productPriceView")
            productPriceView.innerHTML = `R$ 0,00`


    

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
            let productIDSelected = document.getElementById("productIDSelected")
            let productViewName = document.getElementById("productViewName")
            let productNewPrice = document.getElementById("productNewPrice")
            let productNewStock = document.getElementById("productNewStock")
            let imgPreView = document.getElementById("imgPreView")
            let newDescImage = document.getElementById("newDescImage")
            let productNewDescription = document.getElementById("productNewDescription")


            productIDSelected.value = productIterable.codigo
            productViewName.value = productIterable.nome
            productNewPrice.value = productIterable.preco
            productNewStock.value = productIterable.estoque
            productNewDescription.value = productIterable.descricao
            imgPreView.src = productIterable.imagem
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
        alert("Todos os campos precisam ser preenchidos!")
    } else {
        let IDProductEditing = Number(productIDSelected.value)

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

        btnSaveEditProduct.setAttribute("disabled", "true")

        Swal.fire("Produto editado com sucesso.", "O produto foi editado corretamente.", "success")

        //acaba aqui
    }


})



btnRemoveEscProducts.addEventListener("click", function () {

    let tableProducts = document.querySelector("#listProductsRemove tbody")

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

            let indexProduct = produtos.findIndex(produto => produto.codigo == productIterable.codigo)
            produtos.splice(indexProduct, 1)

            localStorage.setItem("listaProdutos", JSON.stringify(produtos))

            newLine.remove()

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


