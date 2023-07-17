import { verifyUserOnline } from './utils/verifyUserOnline.js'
import { Error } from './utils/erros.js'
import { saveLocalStorage } from './utils/saveLocalStorage.js'

let users = JSON.parse(localStorage.getItem("users"))
export let userID = verifyUserOnline()

const botaoEscolhaGenero = document.getElementById("botaoEscolhaGenero")
const btnMacho = document.getElementById("btnMacho")
let btnBeforeGenero 

;[...document.styleSheets[7].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnMacho::before") {
    btnBeforeGenero = styleSheet
  }
  
})

botaoEscolhaGenero.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnMacho":
            btnBeforeGenero.style.left = "3px"
            btnMacho.dataset.content = "Macho"
            break
        case "btnFemea":
            btnBeforeGenero.style.left = "102px"
            btnMacho.dataset.content = "Fêmea"
            break
    }
})

const botaoEscolha = document.getElementById("botaoEscolha")
const btnNo = document.getElementById("btnNo")
let btnBefore 



;[...document.styleSheets[7].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnNo::before") {
    btnBefore = styleSheet
  }
  
})

const areaText = document.getElementById("quadro")

botaoEscolha.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnNo":
            btnBefore.style.left = "3px"
            btnNo.dataset.content = "Não"
            areaText.setAttribute("disabled", true)
            areaText.value = ""
            break

        case "btnYes":
            btnBefore.style.left = "102px"
            btnNo.dataset.content = "Sim"
            areaText.removeAttribute("disabled")
            break
    }
})

const servicosElement = document.getElementById("inputServico")

servicosElement.addEventListener("focus", () => {dropDown(0)})

servicosElement.addEventListener("blur", () => {dropDown(1)})

function dropDown(p) {
  let element = document.getElementsByClassName("dropDown")[0]
  let disp = ["block", "none"]

  element.style.display = disp[p]

  let t = ["0px", "0px, -5px"]
  setTimeout(function(){
    element.style.transform = `translate(${t[p]})`
  }, 0)
  

}

let preco = undefined

const itensServices = document.querySelectorAll(".item")
itensServices.forEach( item => {
  item.addEventListener("mousedown", function(event){
    const containerPreco = document.getElementById("preco")
    let id = event.target.id
    let text = document.getElementById(`${id}`).textContent

    let span = document.createElement("span")
    span.classList.add("caronaPreco")

    if (preco == undefined) {
      preco = containerPreco.textContent
    }

    let precoTudo = 60
    let precoApenasBuscar = 30
    let apenasTrazer = 30

    switch (text) {
      case "Quero Tudo!":
        
        span.appendChild(document.createTextNode(` + R$ ${precoTudo}`))
        localStorage.setItem("precoCarona", JSON.stringify(precoTudo))

        break
      case "Apenas Buscar":
    
        span.appendChild(document.createTextNode(` + R$ ${precoApenasBuscar}`))
        localStorage.setItem("precoCarona", JSON.stringify(precoApenasBuscar))

        break
      case "Apenar Trazer":

        span.appendChild(document.createTextNode(` + R$ ${apenasTrazer}`))
        localStorage.setItem("precoCarona", JSON.stringify(apenasTrazer))
      

        break
      case "Não Quero":

      span.appendChild(document.createTextNode(``))
      localStorage.setItem("precoCarona", JSON.stringify(0))

        break
    }

    containerPreco.innerHTML = ""
    containerPreco.innerHTML = preco 
    containerPreco.appendChild(span)
   
   
    
    servicosElement.value = text

  })
})

let agendamento = {
  id: 1,
  service: "Hospedagem",
  dia: 10,
  mes: 11, //o mes vai de 0 a 11 !!!
  ano: null,
  diaSaida: null,
  mesSaida: null,
  anoSaida: null,
  horaEntrada: "15:30",
  horarioSaida: null,
  pet: {
    nome: undefined,
    idPET: undefined
  }
}

let cadastroPet = {
  idPET: undefined,
  nome: undefined,
  raca: undefined,
  aniversario: undefined,
  alergias: undefined,
  sexo: undefined,
  peso: undefined
}

const containerBotoesPerfilDoPet = document.getElementById("divDBaixo")
const containerBotoesServico = document.getElementById("divDBaixo2")
const containerBotoesPagamento = document.getElementById("divDBaixo3")

containerBotoesPerfilDoPet.addEventListener("click", (event) => { trocarPagina(event) })
containerBotoesServico.addEventListener("click", (event) => { trocarPagina(event) })
containerBotoesPagamento.addEventListener("click", (event) => { trocarPagina(event) })

function trocarPagina(event) {
    let idElement = event.target.id
    const imgPandaCadastro = document.getElementById("divEBaixo")
    const cadastroPet1 = document.getElementById("cadastroPet")
    const cadastroPet2 = document.getElementById("cadastroPet2")
    const cadastroPet3 = document.getElementById("cadastroPet3")
    const inptRadioCadastro = document.querySelectorAll(".inptEstilizado")
    const arrayRadio = [...inptRadioCadastro]
    let erroOuNao

    


    switch(idElement) {
        case "petJaCadastrado":
            const containerPets = document.getElementById("containerPetJaCadastrado")
            containerPets.style.display = "flex"
            let petsArray = JSON.parse(localStorage.getItem("pets"))
            let petsUser 
           
            if (petsArray != null && petsArray.length != 0) {
             
              for (let user of users) {
                  if (user.id == userID) {
                    petsUser = user.pets
                    break
                  }
              }
            }


            loadTablePets(petsUser)
            const botoesSelect = document.querySelectorAll(".selectPet")



            ;[...botoesSelect].forEach(botao => {

              if (!botao.getAttribute("active")) {
                botao.setAttribute("active",true)
                botao.addEventListener("click", function(event){
                let idPet = event.target.value
                const containerPets = document.querySelector("#containerPetJaCadastrado")
                idPet = `PET-${idPet}`
                localStorage.setItem("petEscolhido", JSON.stringify(idPet))
                

                containerPets.style.display = "none"
                cadastroPet1.style.display = "none"
                cadastroPet2.style.display = "flex"
                arrayRadio.forEach( radio => {
                  radio.classList.remove("marked")
                })
                inptRadioCadastro[1].classList.add("marked")
                imgPandaCadastro.style.backgroundImage = "url(./imagens/pandaAgendamento.png)"
                imgPandaCadastro.style.marginRight = "20px"
              })
              }

            })

          
            break
        case "botaoProximo":

          let inputNome = document.getElementById("inputNome")
          let inputAniversario = document.getElementById("inputAniver")   
          let inputRaca = document.getElementById("inputRaca")
          let inputPeso = document.getElementById("inputPeso")  

          let inputs = [inputNome,inputAniversario,inputRaca,inputPeso]

          erroOuNao = verificaErroForm1(inputs)

          users = JSON.parse(localStorage.getItem("users"))

          for (let user of users) {
            if (user.id == userID) {
              let userPets = user.pets
              if (userPets.length == 5) {
                erroOuNao = true
                Swal.fire({
                  icon: "error",
                  title: 'Oops...',
                  text: 'Você já tem o nûmero maximo de pets cadastrados.',
                  showConfirmButton: true,
                })
                break
              }
            }
          }

          if (!erroOuNao) {

              cadastroPet1.style.display = "none"
              cadastroPet2.style.display = "flex"
              arrayRadio.forEach( radio => {
                radio.classList.remove("marked")
              })
              inptRadioCadastro[1].classList.add("marked")
              imgPandaCadastro.style.backgroundImage = "url(./imagens/pandaAgendamento.png)"
              imgPandaCadastro.style.marginRight = "20px"

          } 
            break

        case "botaoVoltar":
            cadastroPet1.style.display = "flex"
            cadastroPet2.style.display = "none"
            arrayRadio.forEach( radio => {
              radio.classList.remove("marked")
            })
            inptRadioCadastro[0].classList.add("marked")
            imgPandaCadastro.style.backgroundImage = "url(./imagens/pandaEpandav.png)"
            imgPandaCadastro.style.marginRight = "5px"

            break
        case "botaoProximo2":

            erroOuNao = verificaErroForm2()

            if (!erroOuNao) {
              setPrice()


              cadastroPet2.style.display = "none"
              cadastroPet3.style.display = "flex"
              arrayRadio.forEach( radio => {
                radio.classList.remove("marked")
              })
              inptRadioCadastro[2].classList.add("marked")
              imgPandaCadastro.style.backgroundImage = "url(./imagens/pandaPergunta.png)"
              imgPandaCadastro.style.marginRight = "0"

              const inptNomeUser = document.getElementById('inputSeuNome')

              for(let user of users){
                if(user.id == userID){

                  if(user.realName == null) {
                   inptNomeUser.value = user.nome
                  } else {
                    inptNomeUser.value = user.realName
                  }
                }
              }
            }
            break
        case "botaoVoltar3":
            cadastroPet2.style.display = "flex"
            cadastroPet3.style.display = "none"
            arrayRadio.forEach( radio => {
              radio.classList.remove("marked")
            })
            inptRadioCadastro[1].classList.add("marked")
            imgPandaCadastro.style.backgroundImage = "url(./imagens/pandaAgendamento.png)"
            imgPandaCadastro.style.marginRight = "20px"

            break
        case "botaoFinalizar":

            const inputServico = document.getElementById("inputServico")
            const inptNome = document.getElementById("inputSeuNome")
            
            let pets = JSON.parse(localStorage.getItem("pets"))
            let agendamentos = JSON.parse(localStorage.getItem("agendamentos"))

            if (inputServico.value == "") {
              Error(["#insira-carona#"])
            
            } else if (inptNome.value == "") {
              Error(["#nome-vazio#"])
            } else {

              
                        
              //entrou para salvar
              let petEscolhido = JSON.parse(localStorage.getItem("petEscolhido"))
              localStorage.removeItem("petEscolhido")

              if (cadastroPet.idPET == undefined) {
                //se um pet ja escolhido for selecionado vai vir aqui   
                for (let pet of pets) {
                  if (pet.idPET == petEscolhido){
                    agendamento.pet.idPET = petEscolhido
                    agendamento.pet.nome = pet.nome
                    break
                  }
                }
            
              } else {

                //se o pet foi cadastrado

                if (pets == null) {
                  //primeiro pet a ser cadastrado
                  pets = [cadastroPet]
                  localStorage.setItem("pets", JSON.stringify(pets))
                  
                } else {

                  //não é o primeiro a ser cadastrado
                  pets.push(cadastroPet)

                }

                for (let pet of pets) {
                  if (pet.idPET == cadastroPet.idPET){
                    agendamento.pet.idPET = cadastroPet.idPET
                    agendamento.pet.nome = pet.nome
                    break
                  }
                }

                for (let user of users) {
                  if (user.id == userID) {
                    agendamento.id = userID
                    let objPet = {
                      nome: cadastroPet.nome,
                      idPET: cadastroPet.idPET,
                      raca: cadastroPet.raca
                    }
                    user.pets.push(objPet)
                    break
                  }
                }
                
              }
              
              if (agendamentos == null) {
                agendamento.id = userID
                agendamento = [agendamento]
                localStorage.setItem("agendamentos", JSON.stringify(agendamento))
              } else {
                agendamento.id = userID
                agendamentos.push(agendamento)
                localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
              }

              saveLocalStorage(users)
              localStorage.setItem("pets", JSON.stringify(pets))

              

              let precoServico = JSON.parse(localStorage.getItem("precoServico"))
              let precoCarona = JSON.parse(localStorage.getItem("precoCarona"))
              localStorage.removeItem("precoServico")
              localStorage.removeItem("precoCarona")

              let compras = JSON.parse(localStorage.getItem("compras"))
              let servico = agendamento.service
            
              if (servico == "Hospedagem") {
                  for (let obj of compras) {
                    if (obj.identificacaoCategoria == "hospedagem") {
                      obj.valorVendido += (precoServico + precoCarona) //prov
                      break
                    }
                  }
              } else {
                for (let obj of compras) {
                  if (obj.identificacaoCategoria == "banhoETosa") {
                    obj.valorVendido += (precoServico + precoCarona) //prov
                    break
                  }
                }
              }

              localStorage.setItem("compras", JSON.stringify(compras))

              Swal.fire({
                title: 'Agendado com Sucesso!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            })

            setTimeout(function(){
              location.reload()
            }, 1400)
            
            }
            break
    }
}

const containerBotoesHospedagemETosa = document.getElementById('divDMeio2')
containerBotoesHospedagemETosa.addEventListener("click", function(event){

  const labelSaida = document.getElementById("labelSaida")
  const labelEntrada = document.getElementById("labelEntrada")
  const elementoHorarioSaida = document.getElementById('inptHourExit')
  const elementoHorarioEntrada = document.getElementById("inptHourEntry")

  const containerCheckOut = document.getElementById("containerCheckOut")
  const labelCheckIn = document.getElementById("labelCheckIn")

  labelEntrada.style.textDecoration = "none"
  labelSaida.style.textDecoration = "none"
  elementoHorarioSaida.style.cursor = "text"
  elementoHorarioEntrada.style.cursor = "text"
  elementoHorarioEntrada.removeAttribute("readonly")

  let botao = event.target.id

  let botaoEscolhido, outroBotao

  if(botao == 'botaoHospedar') {
    botaoEscolhido = document.getElementById("botaoHospedar") 
    outroBotao = document.getElementById("botaoBanho") 

    outroBotao.removeAttribute("style")

    botaoEscolhido.style.transform = "scale(1.2)"
    botaoEscolhido.style.color = "white"
    labelSaida.style.textDecoration = "none"

    containerCheckOut.style.display = "flex"
    labelCheckIn.style.display = "inline-block"

    elementoHorarioSaida.removeAttribute("readonly")


  }else if (botao == 'botaoBanho'){

    botaoEscolhido = document.getElementById("botaoBanho") 
    outroBotao = document.getElementById("botaoHospedar") 

    outroBotao.removeAttribute("style")

    botaoEscolhido.style.transform = "scale(1.2)"
    botaoEscolhido.style.color = "white"

    labelSaida.style.textDecoration = "line-through"

    containerCheckOut.style.display = "none"
    labelCheckIn.style.display = "none"

    elementoHorarioSaida.style.cursor = "default"
    elementoHorarioSaida.setAttribute('readonly', true)
    elementoHorarioSaida.value = ""

  }

})

function verificaErroForm1(useInputs) {

  let erros = []
  
  for (let i = 0 ; i < useInputs.length ; i++) {
    
    if (useInputs[i].value.length ==0){
      
      switch(i) {
        case 0:
            erros.push("#nome-vazio#")
            break
        case 1:
            erros.push("#niver-vazio#")
            break
        case 2:
            erros.push("#raca-vazio#")
            break
        case 3:
            erros.push("#peso-vazio#")
            break    
      }
    }
  }

  let btnEscolha = document.getElementById("btnNo")
  if(btnEscolha.dataset.content == "Sim"){
  
    let quadro = document.getElementById("quadro")
    if(quadro.value.trim().length == 0){
      erros.push("#alergico-vazio#")
    }
    
  }
   let inputPeso = document.getElementById("inputPeso")  
   let inputAniver = document.getElementById("inputAniver")
   let data = inputAniver.value
   data = data.replaceAll("/","")
   let dia , mes, ano

  
   if (data[0] != 0){
    dia = `${data[0]}${data[1]}`
   }else{
      dia=data[1]
   }

   if (data[2] != 0){
    mes = `${data[2]}${data[3]}`
   }else{
      mes=data[3]
   }

   ano = `${data[4]}${data[5]}${data[6]}${data[7]}`

   let date = new Date()
   let anoAtual = date.getFullYear()
   let expecVida = 25

   dia = Number(dia)
   ano = Number(ano)
   mes = Number(mes)

   
   let anoMinimo = anoAtual - expecVida

   if(ano < anoMinimo || ano > (anoAtual + 1)){
     erros.push("#niver-invalido#")
   }

   if(dia < 1 || dia > 31){
    erros.push("#niver-invalido#")
   }

   if(mes < 1 || mes > 12){
    erros.push("#niver-invalido#")
   }

   if (Number(inputPeso.value) > 50) {
    erros.push("#peso-invalido#")
   }

   switch(mes){
    case 4:
    case 6:
    case 9:
    case 11:
    
      if(dia > 30){
        erros.push("#niver-invalido#")
      }  
      break
    
    case 2:
      if(dia > 28){
        erros.push("#niver-invalido#")
      }  
      break
      
   }

  if (erros.length != 0) {
      Error(erros)
      return true
  } else {

    let nomePet = document.getElementById("inputNome")
    nomePet = nomePet.value

    let niverPet = document.getElementById("inputAniver")
    niverPet = niverPet.value

    let racaPet = document.getElementById("inputRaca")
    racaPet = racaPet.value

    let pesoPet = document.getElementById("inputPeso")
    pesoPet = pesoPet.value

    let btnGenero = document.getElementById("btnMacho")
    btnGenero = btnGenero.dataset.content

    let btnAlergico = document.getElementById("btnNo")
    btnAlergico = btnAlergico.dataset.content
    
    if (btnAlergico == "Não") {
      btnAlergico = false
    } else {

      let textAlergias = document.getElementById("quadro")
      btnAlergico = textAlergias.value
    }

      saveForm1(nomePet, niverPet,racaPet,pesoPet,btnGenero, btnAlergico)

      return false
  }
}

function verificaErroForm2(){
  let errosForm2 =[]

  const elementoHorarioEntrada = document.getElementById('inptHourEntry')
  const elementoHorarioSaida = document.getElementById('inptHourExit')

  let horarioEntrada = elementoHorarioEntrada.value
  let horarioSaida = elementoHorarioSaida.value

  let data1 = document.getElementById("inptAgendamento")
  let data2 = document.getElementById("inptSaida")
  data1 = data1.value
  data2 = data2.value

  let ano1 = `${data1[0]}${data1[1]}${data1[2]}${data1[3]}`
  let ano2
  ano1 = Number(ano1)
  
  if (isNaN(ano1)) {
    errosForm2.push("#agendamento-invalido#")
  }

  
  ano2 = `${data2[0]}${data2[1]}${data2[2]}${data2[3]}`
  ano2 = Number(ano2)

  let dia1 = `${data1[8]}${data1[9]}`
  let dia2 = `${data2[8]}${data2[9]}`
  let mes1 = `${data1[5]}${data1[6]}`
  let mes2 = `${data2[5]}${data2[6]}`
 

  let date = new Date()
  let anoAtual = date.getFullYear()

  if(ano1 < anoAtual){
    errosForm2.push("#agendamento-invalido#")
  }


  let btnServicoHospedagem = document.getElementById("botaoHospedar")
  let btnServicoBanho = document.getElementById("botaoBanho")

  if (!btnServicoHospedagem.getAttribute("style") && !btnServicoBanho.getAttribute("style")) {
    errosForm2.push("#servico-obrigatorio#")
  
  }


  if (btnServicoHospedagem.getAttribute("style")) {
     
      if(ano2 < anoAtual){
          errosForm2.push("#agendamento-invalido#")
          
      }

      if (ano2 < ano1) {
        errosForm2.push("#agendamento-invalido#")
        
      }

      if (mes1 > mes2) {
        errosForm2.push("#agendamento-invalido#")
      } else {
        if (dia1 > dia2 && mes1 == mes2) {
          errosForm2.push("#agendamento-invalido#")
        }
      }

      if (mes1 == mes2 && dia1 == dia2) {
        errosForm2.push("#agendamento-invalido#")
      }

      

      if (isNaN(ano2) && btnServicoHospedagem.getAttribute("style")) {
        errosForm2.push("#agendamento-invalido#")
        
      }

  }

  
  if (horarioEntrada.length == 0) {
    errosForm2.push("#horario-entrada-vazio#") 
  }  

 if (horarioEntrada.length == 5) {
    let minutos = `${horarioEntrada[3]}${horarioEntrada[4]}`

    if (Number(minutos) > 60 || Number(minutos) < 0) {
      errosForm2.push("#hora-entrada-invalida#")
    }

    let hora = `${horarioEntrada[0]}${horarioEntrada[1]}`
    hora = Number(hora)

    if (hora > 22 || hora < 7) {
      errosForm2.push("#hora-entrada-invalida#")
    }
 } else if (horarioEntrada.length == 2 || horarioEntrada.length == 1) {
    if (Number(horarioEntrada) > 22 || Number(horarioEntrada) < 7) {
      errosForm2.push("#hora-entrada-invalida#")
    }
 }
 
  if (errosForm2.length == 0) {
    let agendamentosJson = JSON.parse(localStorage.getItem("agendamentos"))

    if (agendamentosJson) {
      for (let agendamento of agendamentosJson) {
        let dia = agendamento.dia
        let mes = agendamento.mes
        let horaEntrada = agendamento.horaEntrada

        if (dia == dia1 && (mes + 1) == mes1 && btnServicoBanho.getAttribute("style")) {
          if (horaEntrada == horarioEntrada) {
            errosForm2.push("#horario-ocupado#")
          }
        }
      }
    }
  }

 /* hora de saida */



 if (btnServicoHospedagem.getAttribute("style")) {
    if (horarioSaida.length == 0) {
      errosForm2.push("#horario-saida-vazio#") 
    }  
    if (horarioSaida.length == 5) {
        let minutos = `${horarioSaida[3]}${horarioSaida[4]}`

        if (Number(minutos) > 60 || Number(minutos) < 0) {
          errosForm2.push("#hora-saida-invalida#")
        }

        let hora = `${horarioSaida[0]}${horarioSaida[1]}`
        hora = Number(hora)

        if (hora > 22 || hora < 7) {
          errosForm2.push("#hora-saida-invalida#")
        }
    } else if (horarioSaida.length == 2 || horarioSaida.length == 1) {
        if (Number(horarioSaida) > 22 || Number(horarioSaida) < 7) {
          errosForm2.push("#hora-saida-invalida#")
        }
    } else if ( Number(horarioEntrada) <= Number(horarioSaida) ) {
        errosForm2.push("#horarios-invalidos#")
    } 

 }
 
 if (errosForm2.length != 0) {
    Error(errosForm2)
  return true
} else {

  saveForm2(horarioEntrada, horarioSaida)

  return false
}

}

function saveForm1(nomePet, niver, raca, peso, genero, alergico) {

    let pets = JSON.parse(localStorage.getItem("pets")) 
    let nextPetID
    let maiorId = 0

    if (pets == null) {
      pets = []
    }

    if (pets.length == 0) {
      nextPetID = `PET-${1}`
    } else {
      
      for (let pet of pets) {
        let petId = pet.idPET
        let numberId = petId.slice(4)
        numberId = Number(numberId)

          if (numberId > maiorId) {
            maiorId = numberId
          }
        
      }

      nextPetID = `PET-${maiorId + 1}`

    }

    cadastroPet.idPET = nextPetID
    cadastroPet.nome = nomePet
    cadastroPet.aniversario = niver
    cadastroPet.raca = raca
    cadastroPet.peso = peso
    cadastroPet.sexo = genero
    cadastroPet.alergias = alergico
}

function saveForm2(horarioEntrada, horarioSaida) {
    if (horarioEntrada.length == 5) {

      agendamento.horaEntrada = horarioEntrada

    } else if (horarioEntrada.length == 2) {

      agendamento.horaEntrada = `${horarioEntrada}:00`

    }if (horarioEntrada.length == 1) {

      agendamento.horaEntrada = `0${horarioEntrada}:00`

    }

    if (horarioSaida.length == 5) {

      agendamento.horarioSaida = horarioSaida

    } else if (horarioSaida.length == 2) {

      agendamento.horarioSaida = `${horarioSaida}:00`

    }if (horarioSaida.length == 1) {

      agendamento.horarioSaida = `0${horarioSaida}:00`

    }


    let btnServicoBanho = document.getElementById("botaoBanho")
    if (btnServicoBanho.getAttribute("style")) {

      agendamento.service = "Tosa e Banho"

    } else {

      agendamento.service = "Hospedagem"

    }

    const btnServicoHospedagem = document.getElementById("botaoHospedar")

    let data1 = document.getElementById("inptAgendamento")
    let data2 = document.getElementById("inptSaida")
    data1 = data1.value
    data2 = data2.value
    let dia1, dia2, mes1, mes2, ano1, ano2
    
    if (btnServicoHospedagem.getAttribute("style")) {
      dia2 = `${data2[8]}${data2[9]}` 
      mes2 = `${data2[5]}${data2[6]}` 
      ano2 = `${data2[0]}${data2[1]}${data2[2]}${data2[3]}` 

      if (dia2.indexOf(0) == 0) {
        dia2 = dia2[1]
      }

      if (mes2.indexOf(0) == 0) {
        mes2 = mes2[1]
      }

      agendamento.diaSaida = Number(dia2) 
      agendamento.mesSaida = Number((mes2) - 1)
      agendamento.anoSaida = Number(ano2) 
    }

    dia1 = `${data1[8]}${data1[9]}` 
    mes1 = `${data1[5]}${data1[6]}` 
    ano1 = `${data1[0]}${data1[1]}${data1[2]}${data1[3]}` 

    if (dia1.indexOf(0) == 0) {
      dia1 = dia1[1]
    }

    if (mes1.indexOf(0) == 0) {
      mes1 = mes1[1]
    }

    agendamento.dia = Number(dia1)
    agendamento.mes = Number((mes1) - 1)
    agendamento.ano = Number(ano1)

}

const inptHoraEntrada = document.getElementById("inptHourEntry")
const inptHoraSaida = document.getElementById("inptHourExit")

inptHoraEntrada.addEventListener("keyup", (event) => {insertTwoPoints(event)})
inptHoraSaida.addEventListener("keyup", (event) => {insertTwoPoints(event)})

function insertTwoPoints(event) {

  let id = event.target.id

  if (id == "inptHourEntry") {

    if (inptHoraEntrada.value.length == 2) {
      inptHoraEntrada.value += ":"
    }

  } else if( id == "inptHourExit") {
    if (inptHoraSaida.value.length == 2) {
      inptHoraSaida.value += ":"
    }
  }

}

function setPrice() {
  let servico = agendamento.service
  let price
  let mesEntrada = (agendamento.mes) + 1
  let mesSaida = (agendamento.mesSaida) + 1
  let diaInicio = agendamento.dia
  let diaFinal = agendamento.diaSaida
  let totDias = 0
  let dias31 = 31
  let dias29 = 29
  let dias32 = 32
  let diaStart = diaInicio
  let flag = true

  let precoDiaria = 60
  let priceTosaEBanho = 80

  if (servico == "Hospedagem") {

    for (let m = mesEntrada ; m <= mesSaida ; m++) {

      switch(m){
        case 4:
        case 6:
        case 9:
        case 11:

          for (let contDia = diaStart ; contDia < dias31 ; contDia++) {

            if (m == mesSaida) {
              
              if (flag) {
                dias31 = diaFinal
                flag = false
              }
              totDias++

            } else {
              totDias++
            }
            
          }

          if (diaStart == diaInicio) {
            diaStart = 1
          }
          
          break
        
        case 2:
          
          for (let contDia = diaStart ; contDia < dias29 ; contDia++) {

            if (m == mesSaida) {
              
              if (flag) {
                dias31 = diaFinal
                flag = false
              }
              totDias++

            } else {
              totDias++
            }
            
          }

          if (diaStart == diaInicio) {
            diaStart = 1
          }  
          break
         
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:

            for (let contDia = diaStart ; contDia < dias32 ; contDia++) {

              if (m == mesSaida) {
                
                if (flag) {
                  dias32 = diaFinal
                  flag = false
                }
                totDias++

              } else {
                totDias++
              }
              
            }

            if (diaStart == diaInicio) {
              diaStart = 1
            }  
            break
       }
        
    }

    totDias++

    price = precoDiaria * totDias

  } else {
    price = priceTosaEBanho 
  }

  localStorage.setItem("precoServico", JSON.stringify(price))
  
  const elementPrice = document.getElementById("preco")
  elementPrice.textContent = `R$ ${price.toFixed(2)}`

}

function loadTablePets(petsUser) {

  const tbody = document.querySelector("#containerPetJaCadastrado tbody")
  tbody.innerHTML = ""

  for (let pet of petsUser) {

    let element = createTablePet(pet.idPET, pet.nome, pet.raca)

    tbody.appendChild(element)
  }

}

function createTablePet(id, nome, raca) {

  let numberId = Number(id.slice(4))

  let btnSelect = document.createElement("button")
  btnSelect.classList.add("material-symbols-outlined")
  btnSelect.classList.add("selectPet")
  let textIcon = document.createTextNode("check")
  btnSelect.appendChild(textIcon)
  btnSelect.value = numberId



  let tdSelect = document.createElement("td")
  tdSelect.classList.add("select")
  tdSelect.appendChild(btnSelect)

  let tdRaca = document.createElement("td")
  let textRaca = document.createTextNode(raca)
  tdRaca.appendChild(textRaca)

  let tdNome = document.createElement("td")
  tdNome.classList.add("nomePet")
  let textNome = document.createTextNode(nome)
  tdNome.appendChild(textNome)

  let tdId = document.createElement("td")
  tdId.classList.add("idPet")
  let textId = document.createTextNode(id)
  tdId.appendChild(textId)

  let tr = document.createElement("tr")

  tr.appendChild(tdId)
  tr.appendChild(tdNome)
  tr.appendChild(tdRaca)
  tr.appendChild(tdSelect)

  return tr
}

const btnClosePets = document.getElementById("btnClosePetCadastrado")
btnClosePets.addEventListener("click", function(){
  const telaPets = document.getElementById("containerPetJaCadastrado")
  telaPets.style.display = "none"
})

