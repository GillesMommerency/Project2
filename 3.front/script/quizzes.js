

const editQuiz = function(id){
   
    localStorage.setItem("id", id)
    window.location.href = "http://127.0.0.1:5502/quizdetails.html";
}

const deleteQuiz = function(id){
    var r = confirm("Ben je zeker?");
    if (r == true) {
        handleData(
            `http://127.0.0.1:5000/api/v1/quiz/${id}`,
            getQuizzes,
            'DELETE'
        );
    }
    else{
        console.log('niet verwijderen');
    }
    
}

const verwerkQuizzes = function(data) {
	let htmlcode = '';

	for (gegevens of data) {
        console.log(gegevens);
        id = gegevens.QuizId
        naam = gegevens.Naam

        htmlcode += `
        <div class="quiz">
        <h2 style="float: left;">Quiz ${id}: ${naam}</h2>

        <div class='btns'>
           <button onclick="editQuiz(${id})" class="button">Edit</button>
           <button onclick="deleteQuiz(${id})" class="button">Delete</button>
        </div>
    
        </div>
        `;

	}

	domQuizHolder.innerHTML = htmlcode;
	// listenToBestemmingen();
};

const getQuizzes = function() {
	handleData(
		`http://${window.location.hostname}:5000/api/v1/quiz`,
		verwerkQuizzes
	);
    }

const addQuiz = function(){
    var form = document.forms[0];
    var naam = form.querySelector('input[name="naam"]').value;
    if(naam !='')
    {
        let data =  [naam]
        console.log(data)
        var json =JSON.stringify(data);
        console.log(json);
        handleData(
            `http://${window.location.hostname}:5000/api/v1/adding`,
            getQuizzes,
            'POST',
            JSON.stringify(data)
        );
    }
    else{
        console.log('incomplete')
    }
}

const init = function() {
    console.log("here")
    getQuizzes();
    domQuizHolder = document.querySelector('.quizzes');
    buttonAddQuiz = document.querySelector('.newQuiz');
    buttonAddQuiz.addEventListener('click', addQuiz);
};



document.addEventListener('DOMContentLoaded', init);