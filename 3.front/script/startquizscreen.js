



const goPlayerSelect = function(){
    window.location.href = "http://127.0.0.1:5502/playerselect.html"

}


function checkKey(e) {
    console.log('ggggg')
    e = e || window.event;

    if (e.keyCode == '38') {
       console.log("Up");
    }
    else if (e.keyCode == '40') {
        console.log("Down");
    }
    else if (e.keyCode == '37') {
        console.log("Left");
    }
    else if (e.keyCode == '39') {
        console.log("Right");
    }
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
    document.onkeydown = checkKey;
    title = document.querySelector('.c-title');
    title.innerHTML = localStorage.getItem('startQuizName');
    document.querySelector('.start').addEventListener('click', goPlayerSelect);
    logPlayer();
};

document.addEventListener('DOMContentLoaded', init);