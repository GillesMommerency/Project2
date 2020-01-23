
const IP = 'http://127.0.0.1:5000';

// const socket = io.connect(IP);
const backend = IP + '/api/v1';

const register = function(){
    var form = document.forms[0];
    var gebruikersnaam = form.querySelector('input[name="gebruikersnaam"]').value;
    var wachtwoord = form.querySelector('input[name="wachtwoord"]').value;
   
    if(gebruikersnaam !='' && wachtwoord !='')
    {
        let data =  [gebruikersnaam, wachtwoord]
        console.log(data)
        var json =JSON.stringify(data);
        console.log(json);
        checkRegister(json);
    }
    else{
        console.log('Vul gebruikersnaam en wachtwoord in!')
    }
   
}

const checkRegister = function(json) {
    fetch( `http://${window.location.hostname}:5000/api/v1/Register`,
        {
        method: 'POST',
        body: json,
        headers: {
        'Access-Control-Allow-Origin': '*',
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
        console.info(jsonObject);
       if(!jsonObject){
        window.location.href = "http://127.0.0.1:5502/login.html";
        alert('Account aangemaakt je kunt nu inloggen!')
       }
       else{
           alert('Gebruikersnaam bestaat al!');
           
       }
    })
    .catch(function(error) {
        console.error(`fout bij verwerken json ${error}`);
    });
};

const init = function() {
    let buttonRegister = document.querySelector('.register')
    buttonRegister.addEventListener('click', register)
    
};



document.addEventListener('DOMContentLoaded', init);