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
    }else{
        console.log('incomplete')
    }
   
}

const init = function() {
	// Get some DOM, we created empty earlier.
    // let button = document.querySelector('.dag')
    // button.addEventListener('click', addQuestion)
    
};



document.addEventListener('DOMContentLoaded', init);