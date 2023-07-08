$('#containerCarrossel').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
});

let nome 
let dataConta
let img

function puxarInfos(){
   
    let users=localStorage.getItem("users")
    users=JSON.parse(users) 

    for(let obj of users){
       

        if(obj.id == userID){
            nome=obj.nome
            dataConta=obj.date.text
            img=obj.img
        
        }
    }
   inserirInfo()
}

function inserirInfo(){
   let nomeUser = document.getElementById("nomeUser")
   let contaUser= document.getElementById("contaUser")
   let imagem=document.getElementById("imagem")

   nomeUser.value=nome
   contaUser.value=dataConta
   imagem.src=img

   const imgUser = document.getElementById("imagem")
   imgUser.addEventListener(() => {trocaFotoPerfil("imagem", "userImg")})

}

