let infoscherm;
let vraagscherm;
let strafscherm;
var audio = new Audio("PNG/Point-of-Clash.mp3" ) ;
var audioWrong = new Audio("PNG/wrong.mp3") ;
var audioGood = new Audio("PNG/good.mp3");
var startTimer;
let vraagtimer;
var vraag;
var JuistAntwoord;
var antwoord1;
var antwoord2;
var antwoord3;
var antwoord4;
var counter = 1;
var ronde = 1;
let VraagTimer;
var activePlayer;

        
audio.oncanplaythrough = function(){
audio.play();
}

audio.loop = true;

audio.onended = function(){
audio.play();
}

const displayVraag = function(){
    document.onkeydown = checkKey;
    clearInterval(startTimer);
    startVraagTimer();
    getVraag();
    getPlayer();
    strafscherm.classList.remove('visible');
    strafscherm.classList.add('invisible');
    infoscherm.classList.remove('visible');
    infoscherm.classList.add('invisible');
    vraagscherm.classList.remove('invisible');
    vraagscherm.classList.add('visible');
}

const getPlayer = function(){
    aantal = localStorage.getItem('aantalSpelers')
    console.log(aantal)
    if(counter <= aantal)
    {
        console.log(counter)
        console.log(counter)
        console.log(counter)
        console.log(counter)
        console.log(JSON.parse(localStorage.getItem(`Speler${counter}`)))
        activePlayer = JSON.parse(localStorage.getItem(`Speler${counter}`))
        counter++;
        monsterimgholder = (document.querySelector('.monster'))
        console.log(activePlayer)
        htmlcode = `<img class="c-monsters" src=${activePlayer.avatar}> `
        monsterimgholder.innerHTML = htmlcode;
    }
    else{
        alert('nieuwe ronde')
    }
}


const feedbackWindow = function(good){
    vraagscherm.classList.remove('visible');
    vraagscherm.classList.add('invisible');
    strafscherm.classList.remove('invisible');
    strafscherm.classList.add('visible')
    if(good){
        audioGood.play();
        var feedback = document.querySelector('.feedback');
        feedback.innerHTML = ` <h1 style="color: greenyellow;" class="c-title">
        Juist!
    </h1>`
        var monsterholder = document.querySelector('.c-monsterholder');
        monsterholder.innerHTML= `
        <div class="c-button-center">
                        <img class="c-monsters" src=${activePlayer.avatar}>                
         </div>
        `
        var scoreholder = document.querySelector('.c-scoreholder');
        let plusscore = 50;
        scoreholder.innerHTML=`
        <h1>+ ${plusscore} punten</h1>
        <div class="c-button-center">
          <h1 id="value">${activePlayer.score}</h1>
        </div>
        `
        animateValue("value", activePlayer.score, activePlayer.score+plusscore, 2000);
        activePlayer.score += plusscore; 
        localStorage.setItem(`Speler${counter-1}`, JSON.stringify(activePlayer));
        console.log(localStorage.getItem(`Speler${counter-1}`))

    }
    else{
        audioWrong.play();
        var feedback = document.querySelector('.feedback');
        feedback.innerHTML = ` <h1 style="color: red;" class="c-title">
        Fout!
    </h1>`
        var monsterholder = document.querySelector('.c-monsterholder');
        monsterholder.innerHTML= `
        <div class="c-button-center">
                        <img class="c-monsters" src=${activePlayer.avatar}>                
         </div>
        `
        var scoreholder = document.querySelector('.c-scoreholder');
        scoreholder.innerHTML=`
        <h1>10 sec Plank</h1>
        <div class="c-button-center">
            <img src="PNG/forearmplank_600x200.png">
        </div>
        `
        
    }
}

const getVraag = function(){
    quizid = localStorage.getItem('startQuizId');
    handleData(
        localStorage.getItem('IP')+`/api/v1/addVraag/${quizid}`,
        verwerkVraag,
            'GET'
    )
}

const verwerkVraag = function(data){
    vraag.innerHTML = data[0].vraaginhoud
    JuistAntwoord = data[0].JuistAntwoord;
    var antwoorden = [data[0].JuistAntwoord, data[0].VerkeerdAntwoord1, data[0].VerkeerdAntwoord2, data[0].VerkeerdAntwoord3]
    antwoordenRandom = shuffle(antwoorden)
    antwoord1.innerHTML = antwoordenRandom[0]
    antwoord2.innerHTML = antwoordenRandom[1]
    antwoord3.innerHTML = antwoordenRandom[2]
    antwoord4.innerHTML = antwoordenRandom[3]
}

function timerCountdown(){ 
    if(seconds!=0)
    {
    seconds--;
    timer.innerHTML= seconds;
    }
    else
    {
        audio.play();
        displayVraag();
        
    }
};

const showStartTimer = function(){

    if(secondsVraag!=0)
    {
        secondsVraag--;
        vraagtimer.innerHTML = secondsVraag;
    }
    else{
        console.log('stop');
        clearInterval(VraagTimer);
        // displayVraag();
        feedbackWindow(false);
    }

      
}

 const startVraagTimer = function(){
     secondsVraag = 5;
    vraagtimer = document.querySelector('.vraagtimer')
    vraagtimer.innerHTML = secondsVraag;
    VraagTimer = setInterval(showStartTimer, 1000);
 }

const showTimer = function(){
    timer = document.querySelector('.timer')
    seconds = 5;
    timer.innerHTML= seconds;
}



const showPlayers = function(){
    let domMonsterHolder = document.querySelector('.monsters')
    let players = localStorage.getItem('aantalSpelers')
    let playercounter = 0;
    while(playercounter < players){
        obj = JSON.parse(localStorage.getItem(`Speler${playercounter+1}`))
        htmlcode = `
        <div class="c-button-center">
                        <img class="c-mo" src="${obj.avatar}">
                    </div>
                    <div class="c-button-center">
                        <img class="c-mo" src="https://i.giphy.com/media/dn07LBg1hpiVclEoQh/giphy.webp">     
                    </div>
        `
        playercounter = playercounter +1;
        domMonsterHolder.innerHTML += htmlcode;
    }
}

const init = function() {
    infoscherm = document.querySelector('.infoscherm')
    vraagscherm = document.querySelector('.vraagscherm')
    strafscherm = document.querySelector('.strafscherm')
    vraag = document.querySelector('.vraagInhoud')
    antwoord1 = document.querySelector('.c-antwoord-1')
    antwoord2 = document.querySelector('.c-antwoord-2')
    antwoord3 = document.querySelector('.c-antwoord-3')
    antwoord4 = document.querySelector('.c-antwoord-4')
    showPlayers();
    showTimer();
    startTimer = setInterval(timerCountdown, 1000);
};

document.addEventListener('DOMContentLoaded', init);

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function checkKey(e) {
    e = e || window.event;
    document.onkeydown = "";
    if (e.keyCode == '38') {
        if(antwoord1.innerHTML == JuistAntwoord)
        {
            clearInterval(VraagTimer);
            feedbackWindow(true)
            
        }
        else{
            clearInterval(VraagTimer);
            feedbackWindow(false)
        }
     
    }
    else if (e.keyCode == '37') {
        if(antwoord2.innerHTML == JuistAntwoord)
        {
            clearInterval(VraagTimer);
            feedbackWindow(true)
        }
        else{
            clearInterval(VraagTimer);
            feedbackWindow(false)
        }
    }
    else if (e.keyCode == '39') {
        if(antwoord3.innerHTML == JuistAntwoord)
        {
            clearInterval(VraagTimer);
            feedbackWindow(true)
        }
        else{
            clearInterval(VraagTimer);
            feedbackWindow(false)
        }
    }
    else if (e.keyCode == '40') {
        if(antwoord4.innerHTML == JuistAntwoord)
        {
            clearInterval(VraagTimer);
            feedbackWindow(true)
        }
        else{
            clearInterval(VraagTimer);
            feedbackWindow(false)
        }
    }
}

function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = "Totale Score: "+ current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
