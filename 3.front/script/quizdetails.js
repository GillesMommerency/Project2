

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
        <h2">Vraag ${id}:</h2"> <br>
        <h4>${vraag}</h4>
        <h5>${juist}</h5>
        <h5>${fout1}</h5>
        <h5>${fout2}</h5>
        <h5>${fout3}</h5>
        <div class='btns'>
           <button onclick="editVraag(${id})" class="button">Edit</button>
           <button onclick="deleteVraag(${id})" class="button">Delete</button>
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
    window.location.href = "http://127.0.0.1:5502/admin.html";
}

const editVraag = function(id){
   localStorage.setItem('vraagid', id)
    window.location.href = "http://127.0.0.1:5502/admin.html";
};

const init = function() {
    console.log("here")

    domVragenHolder = document.querySelector('.vragen');
    buttonNew = document.querySelector('.new').addEventListener('click',newVraag);
    getVragen();
    
};



document.addEventListener('DOMContentLoaded', init);