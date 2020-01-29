
const IP = 'http://127.0.0.1:5000';
let socket;
socket = io(IP, {transports: ['websocket']});
	


const logout = function(){
    socket.emit('logout');
    window.location.href = "./login.html";
}

const goToQuizzes = function(){
    window.location.href = "./quizzes.html"
}

const startQuiz = function(){
    window.location.href = "./startquizsummary.html"
}


const init = function() {
    // Get some DOM, we created empty earlier.
    let buttonBeheer = document.querySelector('.beheer')
    buttonBeheer.addEventListener('click', goToQuizzes)
    let buttonQuestion = document.querySelector('.logout')
    buttonQuestion.addEventListener('click', logout)
    let buttonQuiz = document.querySelector('.start')
    buttonQuiz.addEventListener('click', startQuiz)

};



document.addEventListener('DOMContentLoaded', init);