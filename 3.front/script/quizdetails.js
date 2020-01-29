

const getVragen = function(){
    quizid = localStorage.getItem("id");
     handleData(
		localStorage.getItem('IP')+`/api/v1/quiz/${quizid}`,
		verwerkVragen
    );
}

const verwerkVragen = function(data){
    let htmlcode = '';
	for (gegevens of data) {
        console.log(gegevens);
        id = gegevens.VraagId
        vraag = gegevens.vraaginhoud
        juist= gegevens.JuistAntwoord
        fout1= gegevens.VerkeerdAntwoord1
        fout2= gegevens.VerkeerdAntwoord2
        fout3= gegevens.VerkeerdAntwoord3

        htmlcode += `
        <div class="quiz">
        <h1>Vraag ${id}:</h1> <br>
        <h1>${vraag}</h1>
        <h1>${juist}</h1>
        <h1>${fout1}</h1>
        <h1>${fout2}</h1>
        <h1>${fout3}</h1>
        <div class='btns center'>
           <button onclick="editVraag(${id})" class="c-button-2">Edit</button>
           <button onclick="deleteVraag(${id})" class="c-button-2">Delete</button>
        </div>
        </div>
        `;

	}
    domVragenHolder = document.querySelector('.vragen');
	domVragenHolder.innerHTML = htmlcode;
}


const deleteVraag = function(id){
    var r = confirm("Ben je zeker?");
    if (r == true) {
        handleData(
            localStorage.getItem('IP')+`/api/v1/vraag/${id}`,
            getVragen,
            'DELETE'
        );
    }
    else{
        console.log('niet verwijderen');
    }
    
}

const newVraag = function(){
    localStorage.setItem('vraagid', "false");
    window.location.href = "./vraag.html";
}

const editVraag = function(id){
   localStorage.setItem('vraagid', id)
    window.location.href = "./vraag.html";
};

const init = function() {
    console.log("here")

    domVragenHolder = document.querySelector('.vragen');
    buttonNew = document.querySelector('.new').addEventListener('click',newVraag);
    getVragen();
    
};



document.addEventListener('DOMContentLoaded', init);