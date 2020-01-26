
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
    console.log(json)
    handleData( 
        localStorage.getItem('IP')+`/api/v1/checkLogin`,
        verwerkLogin,
        'POST',
        json
    )
};
 
const verwerkLogin = function(data){
    console.info('json object is aangemaakt');
    console.info('verwerken data');
    if(data[0]['Amount']){
        console.log('redirect')
        window.location.href = "http://127.0.0.1:5502/main.html";
    }
    else{
        alert('Onjuiste gegevens!');
        
    }
   
};

const goToRegisterPage = function(){
    window.location.href = "http://127.0.0.1:5502/register.html";
}

const init = function() {
	// Get some DOM, we created empty earlier.
    let buttonLogin = document.querySelector('.login')
    buttonLogin.addEventListener('click', login)
    let buttonRegister = document.querySelector('.register')
    buttonRegister.addEventListener('click', goToRegisterPage)
    localStorage.setItem('IP', IP);
    
};



document.addEventListener('DOMContentLoaded', init);