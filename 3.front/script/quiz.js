

const init = function() {
    showPlayers();
    timer = document.querySelector('.timer')
    seconds = 9999;
    timer.innerHTML= seconds;
    setInterval(makeAlert, 1000);
};

function makeAlert(){ 
    if(seconds!=0)
    {
    seconds--;
    timer.innerHTML= seconds;
    }
    else
    {
        alert('jipla!!!')
    }
};

const showPlayers = function(){
    let domMonsterHolder = document.querySelector('.monsters')
    let players = localStorage.getItem('aantalSpelers')
    let counter = 0;
    while(counter < players){
        obj = JSON.parse(localStorage.getItem(`Speler${counter+1}`))
        console.log(obj)
        htmlcode = `
        <div class="c-button-center">
                        <img class="c-mo" src="${obj.avatar}">
                    </div>
                    <div class="c-button-center">
                        <img class="c-mo" src="https://i.giphy.com/media/dn07LBg1hpiVclEoQh/giphy.webp">     
                    </div>
        `
        counter = counter +1;
        domMonsterHolder.innerHTML += htmlcode;
    }
}

document.addEventListener('DOMContentLoaded', init);