

const startGame = function(spelers){
    console.log(spelers)
    localStorage.setItem('aantalSpelers', spelers);
    var counter = 0;
    while(counter < spelers) 
    {
        var speler = `{
            "name": "Speler${counter+1}",
            "avatar": "",
            "score": 0
        }`;
        var obj = JSON.parse(speler);
        console.log(obj)       
        counter= counter +1 ;
        localStorage.setItem('Speler'+counter, JSON.stringify(obj))
    }
    console.log(localStorage.getItem('Speler1'))
    console.log(localStorage.getItem('Speler2'))
    console.log(localStorage.getItem('Speler3'))
    console.log(localStorage.getItem('Speler4'))
    localStorage.setItem('playersInitialized', 0);
    window.location= "./selecteermonster.html"
}

const init = function() {
    console.log("here")    
};



document.addEventListener('DOMContentLoaded', init);