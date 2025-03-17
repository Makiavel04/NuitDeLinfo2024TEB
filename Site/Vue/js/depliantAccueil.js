let titres=document.querySelectorAll("h2");
console.log(titres);
titres.forEach(e => {
    e.addEventListener("click",function(e){
        let cible = document.getElementById("infos"+this.id);
        if(cible.className=="replie")cible.className="deplie";
        else if (cible.className=="deplie") cible.className="replie";
    })
});