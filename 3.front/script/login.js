
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
        alert('Vul gegevens in!')
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
        window.location.href = "./main.html";
    }
    else{
        alert('Onjuiste gegevens!');
        
    }
   
};

const goToRegisterPage = function(){
    window.location.href = "./register.html";
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


var crypt = {
    secret : "CIPHERKEY",
    encrypt : function (clear){

      var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
      cipher = cipher.toString();
      return cipher;
    }
  };