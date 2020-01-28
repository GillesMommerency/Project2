var holder;
var players= [];
var top3= [];

const klaarQuiz = function(){
    window.location.href = "http://127.0.0.1:5502/main.html";
}

const getAvatars = function(){
    players.forEach(element => {
        player = JSON.parse(element);
        htmlcode=`
        <div class="c-button-center">
                        <img style="margin-top: 5px;" class="c-mo" src=${player.avatar}>                
                    </div>
        `;
        holder.innerHTML += htmlcode; 
    });
       
}


const getScores = function(){
    players.forEach(element => {
        player = JSON.parse(element);
        top3.push(player.score);
        htmlcode=`
        <div>
            <h1>Score: </h1>  
            <h1>${player.score}</h1>     
        </div>
        `;
        holder.innerHTML += htmlcode; 
    });
       
}

const getMedals = function(){

    topValues = top3.sort((a,b) => b-a).slice(0,3);
    players.forEach(element => {
        player = JSON.parse(element);
        if(player.score == topValues[0])
        {
            htmlcode=`
            <div class="c-button-center">
                <img style="margin-top: 5px;" class="c-mo" src="PNG/medals/first.png">                
            </div>
            `;
        }else if(player.score == topValues[1])
        {
            htmlcode=`
            <div class="c-button-center">
                <img style="margin-top: 5px;" class="c-mo" src="PNG/medals/second.png">                
            </div>
            `;
        }else if(player.score == topValues[2])
        {
            htmlcode=`
            <div class="c-button-center">
                <img style="margin-top: 5px;" class="c-mo" src="PNG/medals/third.png">                
            </div>
            `;
        }else{
            htmlcode=`
            <div class="c-button-center">
                             
            </div>
            `;
        }
        holder.innerHTML += htmlcode; 
    });
       
}

const getInfo = function(){
    aantal = localStorage.getItem('aantalSpelers')
    counter = 1;
    while(counter <= aantal)
    {
        player = JSON.parse(localStorage.getItem(`Speler${counter}`))
        players.push(JSON.stringify(player));
        counter++;
    }
    // console.log(players)
}

const init = function() {
    holder = document.querySelector('.holder')
    spelers = localStorage.getItem('aantalSpelers')
    holder.classList.add(`c-grid-${spelers}`)
    getInfo();
    getAvatars();
    getScores();
    getMedals();
    console.log(top3);
};


document.addEventListener('DOMContentLoaded', init);

