


const init = function() {
    title = document.querySelector('.c-title');
    speler = parseInt(localStorage.getItem('playersInitialized'))+1
    title.innerHTML = 'Selecteer een avatar Speler '+ speler + ':'
    aantalSpelers = localStorage.getItem('aantalSpelers');
    console.log(speler)
};

const chooseAvatar = function(img){
    var getObject = JSON.parse(localStorage.getItem(`Speler${speler}`));
    let link = `PNG/monsters/${img}.png`
    getObject.avatar = link
    localStorage.setItem(`Speler${speler}`, JSON.stringify(getObject));
    console.log(localStorage.getItem('Speler1'))
    if(speler < aantalSpelers)
    {
        localStorage.setItem('playersInitialized', speler)
        window.location.href = "./selecteermonster.html"

    }
    else{
        console.log('Genoeg!!')
        window.location.href = "./quiz.html"
    }
}

document.addEventListener('DOMContentLoaded', init);