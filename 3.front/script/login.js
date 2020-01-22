
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
        body: json,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if (!response.ok) {
            throw Error(
                `Probleem bij de fetch(). Status Code: ${response.status}`
            );
        } else {
            console.info('Er is een response teruggekomen van de server');
            return response.json();
        }
    })
    .then(function(jsonObject) {
        console.info('json object is aangemaakt');
        console.info('verwerken data');
       if(jsonObject[0]['Amount']){
        window.location.href = "http://127.0.0.1:5500/main.html";
       }
       else{
           alert('Onjuiste gegevens!');
           
       }
    })
    .catch(function(error) {
        console.error(`fout bij verwerken json ${error}`);
    });
};

const goToRegisterPage = function(){
    window.location.href = "http://127.0.0.1:5500/register.html";
}

const init = function() {
	// Get some DOM, we created empty earlier.
    let buttonLogin = document.querySelector('.login')
    buttonLogin.addEventListener('click', login)
    let buttonRegister = document.querySelector('.register')
    buttonRegister.addEventListener('click', goToRegisterPage)
};



document.addEventListener('DOMContentLoaded', init);