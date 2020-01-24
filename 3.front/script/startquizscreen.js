

const init = function() {
    console.log("here")
    title = document.querySelector('.c-title');
    title.innerHTML = localStorage.getItem('startQuizName');
    document.querySelector('.start').addEventListener('click', goPlayerSelect);
};

const goPlayerSelect = function(){
    window.location.href = "http://127.0.0.1:5502/playerselect.html"
}

document.addEventListener('DOMContentLoaded', init);