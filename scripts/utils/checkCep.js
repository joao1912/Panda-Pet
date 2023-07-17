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
   // try {
   // await fetch(`https://www.cepcerto.com/ws/json-frete/88032005/${cep.value}/1000`)
   // .then(response => response.json())
   //     .then(json => obj_cep = json) 
   //       console.log(obj_cep)
   //       alert("encontrado")
   // } catch {
   //    alert("erro ao carregar cep")
   //    return null
   // }




   let headers = new Headers();

   //headers.append('Content-Type', 'application/json');
   //headers.append('Accept', 'application/json');
   headers.append("user-agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")

   //headers.append('Access-Control-Allow-Origin', 'https://joao1912.github.io/Panda-Pet');
   //headers.append('GET', 'POST', 'OPTIONS');


   fetch(`https://www.cepcerto.com/ws/json-frete/88032005/${cep.value}/1000`, {
      method: 'GET',
      headers: headers
   })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log('Authorization failed : ' + error.message));


}
