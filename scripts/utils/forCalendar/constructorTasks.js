

export function constructorTasks(id, nome, hora, servico) {
    //botao delete

    let deleteButton = document.createElement("button")
    deleteButton.classList.add('material-symbols-outlined')
    deleteButton.classList.add('btnCancel')

    let textBtnDelete = document.createTextNode('delete')
    deleteButton.appendChild(textBtnDelete)
    deleteButton.value = id

    //td do botao delete

    let tdDeleteButton = document.createElement("td")
    tdDeleteButton.appendChild(deleteButton)

    //td serviço

    let tdServico = document.createElement("td")
    let textServico = document.createTextNode(servico)
    tdServico.appendChild(textServico)

    //td horario

    let tdHora = document.createElement("td")
    tdHora.classList.add("hrCell")
    let textHora = document.createTextNode(hora)
    tdHora.appendChild(textHora)

    //td nome user

    let tdUserName = document.createElement("td")
    let textName = document.createTextNode(nome)
    tdUserName.appendChild(textName)

    // td userId

    let tdUserId = document.createElement("td")
    let textId = document.createTextNode(id)
    tdUserId.classList.add("idCell")
    tdUserId.appendChild(textId)

    // tr

    let tr = document.createElement("tr")
    tr.appendChild(tdUserId)
    tr.appendChild(tdUserName)
    tr.appendChild(tdHora)
    tr.appendChild(tdServico)
    tr.appendChild(tdDeleteButton)

    return tr
}