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
        if (document.getElementById('antwoord1').checked) {
            let data =  [vraag, antwoord1, antwoord2, antwoord3, antwoord4]
        var json =JSON.stringify(data);
        postQuestion(json);
          }
          if (document.getElementById('antwoord2').checked) {
            let data =  [vraag, antwoord2, antwoord3, antwoord4, antwoord1]
        var json =JSON.stringify(data);
        postQuestion(json);
          }
          if (document.getElementById('antwoord3').checked) {
            let data =  [vraag, antwoord3, antwoord4, antwoord1, antwoord2]
        var json =JSON.stringify(data);
        postQuestion(json);
          }
          if (document.getElementById('antwoord4').checked) {
            let data =  [vraag, antwoord4, antwoord1, antwoord2, antwoord3]
        var json =JSON.stringify(data);
        postQuestion(json);
          }
    }
    else{
        console.log('incomplete')
    }
   
}

const changeQuestion = function(){
  var form = document.forms[0];
    var vraag = form.querySelector('input[name="vraag"]').value;
    var antwoord1 = form.querySelector('input[name="antwoord1"]').value;
    var antwoord2 = form.querySelector('input[name="antwoord2"]').value;
    var antwoord3 = form.querySelector('input[name="antwoord3"]').value;
    var antwoord4 = form.querySelector('input[name="antwoord4"]').value;
    if(antwoord1 !='' && antwoord2 !='' && antwoord3 !='' && antwoord4 !='')
    {
        if (document.getElementById('antwoord1').checked) {
            let data =  [vraag, antwoord1, antwoord2, antwoord3, antwoord4]
        var json =JSON.stringify(data);
        putQuestion(json);
          }
          if (document.getElementById('antwoord2').checked) {
            let data =  [vraag, antwoord2, antwoord3, antwoord4, antwoord1]
        var json =JSON.stringify(data);
        putQuestion(json);
          }
          if (document.getElementById('antwoord3').checked) {
            let data =  [vraag, antwoord3, antwoord4, antwoord1, antwoord2]
        var json =JSON.stringify(data);
        putQuestion(json);
          }
          if (document.getElementById('antwoord4').checked) {
            let data =  [vraag, antwoord4, antwoord1, antwoord2, antwoord3]
        var json =JSON.stringify(data);
        putQuestion(json);
          }
    }
    else{
        console.log('incomplete')
    }
}

const postQuestion = function(json) {
  let id = localStorage.getItem("id");
  handleData(
    localStorage.getItem('IP')+`/api/v1/addVraag/${id}`,
      verwerkAdd,
        'POST',
        json
  )
};
const putQuestion = function(json) {
  let id = localStorage.getItem("vraagid");
  handleData(
    localStorage.getItem('IP')+`/api/v1/vraag/${id}`,
    verwerkPut,
      'PUT',
      json
)
};

const verwerkAdd = function(json) {
  alert('Vraag toegevoegd!');
  window.location.href = "http://127.0.0.1:5502/quizdetails.html";
};
const verwerkPut = function(json) {
  alert('Vraag aangepast!');
  window.location.href = "http://127.0.0.1:5502/quizdetails.html";
};


const getVraag = function(){
  var vraagid = localStorage.getItem('vraagid')
  handleData(
    localStorage.getItem('IP')+`/api/v1/vraag/${vraagid}`,
		toonInput
	);
}

const toonInput = function(data){
  var form = document.forms[0];
  form.querySelector('input[name="vraag"]').value = data[0].vraaginhoud;
  form.querySelector('input[name="antwoord1"]').value =  data[0].JuistAntwoord;
  form.querySelector('input[name="antwoord2"]').value =  data[0].VerkeerdAntwoord1;
  form.querySelector('input[name="antwoord3"]').value =  data[0].VerkeerdAntwoord2;
  form.querySelector('input[name="antwoord4"]').value =  data[0].VerkeerdAntwoord3;
}

const init = function() {
	// Get some DOM, we created empty earlier.
    let buttonQuestion = document.querySelector('.dag')
    var id = localStorage.getItem("vraagid")
    console.log(id)
      if(id == "false"){
        buttonQuestion.addEventListener('click', addQuestion)
        }
      else{
          getVraag();
          buttonQuestion.addEventListener('click', changeQuestion)
        }
    
};



document.addEventListener('DOMContentLoaded', init);