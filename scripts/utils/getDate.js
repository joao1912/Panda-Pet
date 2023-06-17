export function getDate() {
    let data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    let hora = data.getHours()
    let textDataCadastro

    if (mes > 9) {
        textDataCadastro = `${dia}/${mes}/${ano}`
    } else {
        textDataCadastro = `${dia}/0${mes}/${ano}`
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