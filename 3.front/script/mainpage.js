
const IP = 'http://127.0.0.1:5000';
let socket;
socket = io(IP, {transports: ['websocket']});
	


const logout = function(){
    socket.emit('logout');
    window.location.href = "http://127.0.0.1:5502/login.html";
}

const goToQuizzes = function(){
    window.location.href = "http://127.0.0.1:5502/quizzes.html"
}


const init = function() {
    // Get some DOM, we created empty earlier.
    let buttonBeheer = document.querySelector('.beheer')
    buttonBeheer.addEventListener('click', goToQuizzes)
    let buttonQuestion = document.querySelector('.logout')
    buttonQuestion.addEventListener('click', logout)

};



document.addEventListener('DOMContentLoaded', init);