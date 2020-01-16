'use strict';

const IP = 'http://127.0.0.1:5000';

// const socket = io.connect(IP);
const backend = IP + '/api/v1';





const addQuestion = function(){
    var form = document.forms[0];
    var vraag = form.querySelector('input[name="vraag"]').value;
    var antwoord1 = form.querySelector('input[name="antwoord1"]').value;
    var antwoord2 = form.querySelector('input[name="antwoord2"]').value;
    var antwoord3 = form.querySelector('input[name="antwoord3"]').value;
    var antwoord4 = form.querySelector('input[name="antwoord4"]').value;
    if(antwoord1 !='' && antwoord2 !='' && antwoord3 !='' && antwoord4 !='')
    {
        let data =  [vraag, antwoord1, antwoord2, antwoord3, antwoord4]
        console.log(data)
        var json =JSON.stringify(data);
        console.log(json);
        postQuestion(json);
    
    }
    else{
        console.log('incomplete')
    }
   
}

const postQuestion = function(json) {
    fetch( `http://${window.location.hostname}:5000/api/v1/addVraag`,
        {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: json
      });
      //const content = rawResponse.json();
    
      //console.log(content);
};

const init = function() {
	// Get some DOM, we created empty earlier.
    let buttonQuestion = document.querySelector('.dag')
    buttonQuestion.addEventListener('click', addQuestion)
    let buttonLogin = document.querySelector('.login')
    buttonLogin.addEventListener('click', login)
    
};



document.addEventListener('DOMContentLoaded', init);