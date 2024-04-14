export async function calcularFrete(cep) {

   try {
      let response = await fetch(`https://cors.iamnd.eu.org/?url=https://www.cepcerto.com/ws/json-frete/88032005/${cep.value}/2300`)
      let result = await response.json()
      return result
   } catch (error) {
      return null
   }
}
                     