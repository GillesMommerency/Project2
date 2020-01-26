

const showQuizzes = function(data) {
	let htmlcode = '';

	for (gegevens of data) {
        console.log(gegevens);
        id = gegevens.QuizId
        naam = gegevens.Naam

        htmlcode += `
        <div class="quiz">
        <h2 style="float: left;">Quiz ${id}: ${naam}</h2>

        <div class='btns'>
           <button onclick="startQuiz('${id}','${naam}')" class="button">Start</button>
        </div>
    
        </div>
        `;

	}

	domQuizHolder.innerHTML = htmlcode;
	// listenToBestemmingen();
};

const startQuiz = function(id, naam){
    localStorage.setItem('startQuizId', id)
    localStorage.setItem('startQuizName', naam)
    window.location.href = "http://127.0.0.1:5502/startquizscreen.html";
}

const getQuizzes = function() {
	handleData(
		localStorage.getItem('IP')+`/api/v1/quiz`,
		showQuizzes
	);
    }


const init = function() {
    console.log("here")
    domQuizHolder = document.querySelector('.quizzes');
    getQuizzes();
};



document.addEventListener('DOMContentLoaded', init);