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
var filled = 0;
var straffen=[{
    titel : '10 Sec plank',
    img :'PNG/Straffen/plank.png'
},
{
    titel :'20 Jumping Jacks',
    img : 'PNG/Straffen/JumpingJack.gif'
},
{
    titel :'10 Push Ups',
    img :'PNG/Straffen/PushUp.gif'
},
{
    titel : '10 Burpees',
    img :'PNG/Straffen/Burpee.gif'
}
];
        
audio.oncanplaythrough = function(){
audio.play();
}

audio.loop = true;

audio.onended = function(){
audio.play();
}

const berekenscore = function(){
    pulse = parseInt(document.querySelector(`.hr${counter-1}`).innerHTML)
    quo = pulse/5
    returnscore = Math.round(200/quo*12)
    return returnscore;
}

const displayVraag = function(){
    aantal = localStorage.getItem('aantalSpelers')
    console.log(aantal)
    if(counter <= aantal)
    {
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
    else{
        if(ronde<4)
        {
            counter = 1;
            strafscherm.classList.remove('visible');
            strafscherm.classList.add('invisible');
            infoscherm.classList.remove('invisible');
            infoscherm.classList.add('visible');
            ronde++;
            showTimer();
            startTimer = setInterval(timerCountdown, 1000);
            console.log('ronde: '+ ronde)
            document.querySelector('.ronde').innerHTML = ` <h1 class="c-title">
                    Ronde: ${ronde}
            </h1>`
            // alert('nieuwe ronde')
        }else{
            window.location.href = "http://127.0.0.1:5502/podium.html";
        }
    }
}

const getPlayer = function(){
    
    console.log(counter)
    console.log(counter)
    console.log(counter)
    console.log(counter)
    console.log(JSON.parse(localStorage.getItem(`Speler${counter}`)))
    activePlayer = JSON.parse(localStorage.getItem(`Speler${counter}`))
    counter++;
    monsterimgholder = (document.querySelector('.monster'))
    let heartHolder = document.querySelector('.heartholder')
    heartHolder.innerHTML = `
        <div id="hartslag${counter-1}" class="c-button-center box">
                        <img class="c-monsters" src="https://i.giphy.com/media/dn07LBg1hpiVclEoQh/giphy.webp">
                        <div class="text">
                        <p class="hr${counter-1}"></p>
                        </div>   
                    </div> 
        `
    console.log(activePlayer)
    htmlcode = `<img class="c-monsters" src=${activePlayer.avatar}> `
    monsterimgholder.innerHTML = htmlcode;
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
        let plusscore = berekenscore();
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
        console.log(straffen)
        scoreholder.innerHTML=`
        <h1>${straffen[ronde-1].titel}</h1>
        <div class="c-button-center">
            <img src="${straffen[ronde-1].img}">
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
     secondsVraag = 10;
    vraagtimer = document.querySelector('.vraagtimer')
    vraagtimer.innerHTML = secondsVraag;
    VraagTimer = setInterval(showStartTimer, 1000);
 }

const showTimer = function(){
    timer = document.querySelector('.timer')
    seconds = 10;
    timer.innerHTML= seconds;
}



const getPlayers = function(){
    let domRondeHolder = document.querySelector('.ronde')
    let domMonsterHolder = document.querySelector('.monsters')
    let players = localStorage.getItem('aantalSpelers')
    if(ronde == 1){
       domRondeHolder.innerHTML = ` <h1 class="c-title">
        Ronde ${ronde}
            </h1>
            <h2>
            (Klik op hartjes om hartslagmeter te verbinden)
    </h2>
            `
        }else{
            domRondeHolder.innerHTML = `
            <h1 class="c-title">
            Ronde ${ronde}
                </h1>`
        }
            
    
    let playercounter = 0;
    while(playercounter < players){

        obj = JSON.parse(localStorage.getItem(`Speler${playercounter+1}`))
        console.log(obj)
        htmlcode = `
        <div class="c-button-center">
                        <img class="c-mo" src="${obj.avatar}">
                    </div>
                    <div id="hartslag${playercounter+1}" class="c-button-center box">
                        <img class="c-mo" src="https://i.giphy.com/media/dn07LBg1hpiVclEoQh/giphy.webp">
                        <div class="text">
                        <p class="hr${playercounter+1}"></p>
                        </div>     
                    </div>
        `
        playercounter = playercounter +1;
        domMonsterHolder.innerHTML += htmlcode;
    }
    listenToHartslag();
}

const checkHRDisplayfilled = function(){
    console.log('ye')
    var hartslagen = document.querySelectorAll("[class*=hr]")
        hartslagen.forEach(function(item) {
            console.log(item)
            if(item.innerHTML!="" && item.innerHTML!=0)
            {
                filled++;
                console.log(filled)
                console.log(hartslagen.length)
            }
          });
          if(filled == hartslagen.length)
          {
           showTimer();
           startTimer = setInterval(timerCountdown, 1000);
            clearInterval(startGame);
          }
          filled = 0;
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
    startGame = setInterval( checkHRDisplayfilled, 1000);
    getPlayers();

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

const listenToHartslag = function(){
    Hartslag1 = document.getElementById('hartslag1');
    Hartslag2 = document.getElementById('hartslag2');
    Hartslag3 = document.getElementById('hartslag3');
    Hartslag4 = document.getElementById('hartslag4'); 
    Hartslag1.addEventListener('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        let hrm1 = new HeartRateMonitor('hr1');
        hrm1.start();
    })
    Hartslag2.addEventListener('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        let hrm2 = new HeartRateMonitor('hr2');
        hrm2.start();
    })
    Hartslag3.addEventListener('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        let hrm3 = new HeartRateMonitor('hr3');
        hrm3.start();
    })
    Hartslag4.addEventListener('click',function(event){
        event.stopPropagation();
        event.preventDefault();
        let hrm4 = new HeartRateMonitor('hr4');
        hrm4.start();
    })
}