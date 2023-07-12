import { verifyUserOnline } from './utils/verifyUserOnline.js'
import { Error } from './utils/erros.js'

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

const itensServices = document.querySelectorAll(".item")
itensServices.forEach( item => {
  item.addEventListener("mousedown", function(event){

    let id = event.target.id
   
    let text = document.getElementById(`${id}`).textContent
    servicosElement.value = text

  })
})

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

    let agendamento = {
      id: 1,
      service: "Hospedagem",
      dia: 10,
      mes: 11, //o mes vai de 0 a 11 !!!
      hora: "15:30",
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


    switch(idElement) {
        case "petJaCadastrado":
            const containerPets = document.getElementById("containerPetJaCadastrado")
            containerPets.style.display = "flex"

            break
        case "botaoProximo":

          let inputNome = document.getElementById("inputNome")
          let inputAniversario = document.getElementById("inputAniver")   
          let inputRaca = document.getElementById("inputRaca")
          let inputPeso = document.getElementById("inputPeso")  

          let inputs = [inputNome,inputAniversario,inputRaca,inputPeso]

          erroOuNao = verificaErroForm1(inputs)

          if (!erroOuNao) {
              cadastroPet1.style.display = "none"
              cadastroPet2.style.display = "flex"
              arrayRadio.forEach( radio => {
                radio.classList.remove("marked")
              })
              inptRadioCadastro[1].classList.add("marked")
              imgPandaCadastro.style.backgroundImage = "url(../../imagens/pandaAgendamento.png)"
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
            imgPandaCadastro.style.backgroundImage = "url(../../imagens/pandaEpandav.png)"
            imgPandaCadastro.style.marginRight = "5px"

            break
        case "botaoProximo2":

            erroOuNao = verificaErroForm2()

            if (!erroOuNao) {

              cadastroPet2.style.display = "none"
              cadastroPet3.style.display = "flex"
              arrayRadio.forEach( radio => {
                radio.classList.remove("marked")
              })
              inptRadioCadastro[2].classList.add("marked")
              imgPandaCadastro.style.backgroundImage = "url(../../imagens/pandaPergunta.png)"
              imgPandaCadastro.style.marginRight = "0"
            }
            break
        case "botaoVoltar3":
            cadastroPet2.style.display = "flex"
            cadastroPet3.style.display = "none"
            arrayRadio.forEach( radio => {
              radio.classList.remove("marked")
            })
            inptRadioCadastro[1].classList.add("marked")
            imgPandaCadastro.style.backgroundImage = "url(../../imagens/pandaAgendamento.png)"
            imgPandaCadastro.style.marginRight = "20px"

            break
        case "botaoFinalizar":

            break
    }
}

const containerBotoesHospedagemETosa = document.getElementById('divDMeio2')
containerBotoesHospedagemETosa.addEventListener("click", function(event){

  let botao = event.target.id
  const elementoHorarioSaida = document.getElementById('inptHourExit')

  if(botao == 'botaoHospedar') {

    elementoHorarioSaida.removeAttribute("readonly")

  }else if (botao == 'botaoBanho'){
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

   if(ano < anoMinimo){
     erros.push("#niver-invalido#")
   }

   if(dia < 1 && dia <31){
    erros.push("#niver-invalido#")
   }

   if(mes < 1 && mes >12){
    erros.push("#niver-invalido#")
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
      return false
  }
}

function verificaErroForm2(){
  let erros =[]

  const elementoHorarioEntrada = document.getElementById('inptHourEntry')
  const elementoHorarioSaida = document.getElementById('inptHourExit')

  let horarioEntrada = elementoHorarioEntrada.value
  let horarioSaida = elementoHorarioSaida.value

  horarioEntrada = Number(horarioEntrada)
  horarioSaida = Number(horarioSaida)

  let data = document.getElementById("inptAgendamento")
  data = data.value

  let ano = `${data[0]}${data[1]}${data[2]}${data[3]}`
  ano = Number(ano)

  let date = new Date()
  let anoAtual = date.getFullYear()

  if(ano < anoAtual){
    erros.push("#agendamento-invalido#")
  }

 if(horarioEntrada < 7 || horarioSaida > 22){
  erros.push("#hora-entrada-invalida#")
 }

 


 if (erros.length != 0) {
    Error(erros)
  return true
} else {
  return false
}

}

