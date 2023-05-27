let obj_cep

function enviar() {
    const input = document.getElementById("CEP").value
    validaCep(input)
}

async function validaCep(cep) {

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(json => obj_cep = json)

     if(obj_cep.code) {
        Swal.fire({icon: 'error',
        title: 'Oops...',
        text: `${obj_cep.message}`})
     } else {
        //salvar o cep e calcular o frete
     }
    

}