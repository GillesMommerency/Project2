



const goPlayerSelect = function(){
    window.location.href = "http://127.0.0.1:5502/playerselect.html"

}



const logPlayer = function(){
    var text = `{
        "name": "Speler1",
        "avatar": "PNG/monsters/1.png",
        "score": 0
    }`;
    var obj = JSON.parse(text);
    console.log(obj)
}

const init = function() {
    title = document.querySelector('.c-title');
    title.innerHTML = localStorage.getItem('startQuizName');
    document.querySelector('.start').addEventListener('click', goPlayerSelect);
    logPlayer();
};

document.addEventListener('DOMContentLoaded', init);