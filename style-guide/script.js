const botaoEscolha = document.getElementById("botaoEscolha")
const btnYes = document.getElementById("btnYes")
let btnBefore 

;[...document.styleSheets[4].cssRules].forEach( styleSheet => {
  if (styleSheet.selectorText == "#btnYes::before") {
    btnBefore = styleSheet
  }
  
})

botaoEscolha.addEventListener("click", function(event){
    let id = event.target.id

    switch(id) {
        case "btnYes":
            btnBefore.style.left = "3px"
            btnYes.dataset.content = "Sim"
            break
        case "btnNo":
            btnBefore.style.left = "102px"
            btnYes.dataset.content = "Não"
            break
    }
})


const botaoAlert = document.getElementById("btnAlert")

botaoAlert.addEventListener("click", function(){
  Swal.fire(
    'Olha esse alerta!',
    'Você clicou no botão!',
    'success'
  )
})

$('#carrossel').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500
});

var ctx = document.getElementById("chart")

var chartGraph = new Chart(ctx, {
  type: "pie",
  data: {
      labels: [
          'exemplo1',
          'exemplo2',
          'exemplo3',
          'exemplo4',
          'exemplo5'
      ],
      datasets: [{
          label: 'Rendimento Bruto',
          data: [300,100,100,100,50],
          backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(217, 94, 50)',
              'rgb(255, 3, 33)'
          ],
          hoverOffset: 4
      }]
  }
})