let obj_cep

function enviar() {
   const input = document.getElementById("CEP").value
   validaCep(input)
}

export async function validaCep(cep) {

   await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(json => obj_cep = json)

   if (obj_cep.code) {
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: `${obj_cep.message}`
      })
   } else {
      //salvar o cep e calcular o frete
   }


}

export async function calcularFrete(cep) {
   const url = `https://www.cepcerto.com/ws/json-frete/88032005/${cep.value}/1000`;
   try {
      const response = await fetch(url, {
         headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
            'Accept-Language': 'pt-BR;q=0.8,en-US;q=0.6,en;q=0.4'
         }
      })

      const json = await response.json()
      console.log(json)
      alert("encontrado")
      return json
   } catch (error) {
      console.error(error);
      alert(`erro: ${error}`)
      return null
   }
}