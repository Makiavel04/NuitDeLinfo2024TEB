// Liste des symboles pour les cartes
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
jeu=document.querySelector('#jeu');

let symbols = ["poisson.jpeg","poisson.jpeg","dechet.png","dechet.png","toxique.jpeg","toxique.jpeg","vague.jpeg","vague.jpeg","sirene.png","sirene.png","coquillage.jpeg","coquillage.jpeg"];
let path="../Site/Data/clickerPng/";
symbols.sort((a, b) => 0.5 - Math.random());
for(var i =1; i < symbols.length+1;i++){
        imgpoi=document.createElement("img");
        imgpoi.src=path+symbols[i-1];
        let tox=0;
        let box = document.createElement('div');
        box.className="item";
        box.style.gridArea ="l"+ i.toString();
        box.appendChild(imgpoi);
        box.onclick=function(){
          this.classList.add('Open')
          setTimeout(function(){
            if(document.querySelectorAll('.Open').length>1){
              console.log(document.querySelectorAll('.Open')[1].querySelector("img").attributes.src.value);
              if(document.querySelectorAll('.Open')[0].innerHTML==document.querySelectorAll('.Open')[1].innerHTML){
                if(((document.querySelectorAll('.Open')[1].querySelector("img").attributes.src.value)==(path+"toxique.jpeg"))&&((document.querySelectorAll('.Open')[0].querySelector("img").attributes.src.value)==(path+"toxique.jpeg"))){
                  console.log("caca");
                  window.location.reload();
                }
                if(((document.querySelectorAll('.Open')[1].querySelector("img").attributes.src.value)==(path+"poisson.jpeg"))&&((document.querySelectorAll('.Open')[0].querySelector("img").attributes.src.value)==(path+"poisson.jpeg"))){
                  console.log("caca");
                  document.querySelector("a").style.visibility="visible";
                }
                let e1=document.querySelectorAll('.Open')[0];
                let e2=document.querySelectorAll('.Open')[1];
                document.querySelectorAll('.Open')[1].classList="item";
                document.querySelectorAll('.Open')[0].classList="item";
                e1.classList.add('Match');
                e2.classList.add('Match');
                console.log( document.querySelectorAll('.Open').length);
                console.log( document.querySelectorAll('.Open')[0]);
                console.log( document.querySelectorAll('.Open')[1]);
                // console.log("caca")
                if(document.querySelectorAll('.Math').length==symbols.length){
                  alert("wins");
                }
              }else{
                document.querySelectorAll('.Open')[1].classList="item";
                document.querySelectorAll('.Open')[0].classList="item";             }
            }
              
            },1000);
          };
          document.querySelector('#jeu').appendChild(box);
        }

console.log(document.querySelector('#jeu'));