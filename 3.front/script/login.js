
const IP = 'http://127.0.0.1:5000';

// const socket = io.connect(IP);
const backend = IP + '/api/v1';


const login = function(){
    var form = document.forms[0];
    var gebruikersnaam = form.querySelector('input[name="gebruikersnaam"]').value;
    var wachtwoord = form.querySelector('input[name="wachtwoord"]').value;
   
    if(gebruikersnaam !='' && wachtwoord !='')
    {
        let data =  [gebruikersnaam, wachtwoord]
        console.log(data)
        var json =JSON.stringify(data);
        console.log(json);
        checkLogin(json);
    }
    else{
        console.log('incomplete')
    }
   
}
const checkLogin = function(json) {
    fetch( `http://${window.location.hostname}:5000/api/v1/checkLogin`,
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
    let buttonLogin = document.querySelector('.login')
    buttonLogin.addEventListener('click', login)
    
};



document.addEventListener('DOMContentLoaded', init);