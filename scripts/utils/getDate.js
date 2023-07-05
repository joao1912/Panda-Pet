export function getDate() {
    let data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    let hora = data.getHours()
    let textDataCadastro

    if (mes > 9 && dia > 9) {
        textDataCadastro = `${dia}/${mes}/${ano}`
    } else {
        textDataCadastro = `0${dia}/0${mes}/${ano}`
    }

    if (mes < 9 && dia > 9) {
        textDataCadastro = `${dia}/0${mes}/${ano}`
    }

    if (mes > 9 && dia < 9) {
        textDataCadastro = `0${dia}/${mes}/${ano}`
    }
    
    let dataCompletaCadastro = {
        day: dia,
        month: mes,
        year: ano,
        hours: hora,
        text: textDataCadastro
    }
    
    return dataCompletaCadastro
}