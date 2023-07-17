let obj_cep

function enviar() {
    const input = document.getElementById("CEP").value
    validaCep(input)
}

export async function validaCep(cep) {

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

export async function calcularFrete(cep) {
   try {
   await fetch(`https://www.cepcerto.com/ws/json-frete/88032005/${cep.value}/1000`)
   .then(response => response.json())
       .then(json => obj_cep = json) 
         console.log(obj_cep)
         alert("encontrado")
   } catch {
      return null
   }
}
