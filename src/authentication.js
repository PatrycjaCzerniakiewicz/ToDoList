var reg = document.querySelector("form");
reg.addEventListener("submit", register);

function register(e)
{
    e.preventDefault();

    var password = document.getElementById("inputPassword");
    var passRepeat = document.getElementById("inputPasswordRepeat");
    if(password.value != passRepeat.value)
    {
        alert("Passwords are different!");
        return;
    }    
    var name = document.getElementById("inputUsername");
    var email = document.getElementById("inputEmail");

    const Url = "https://fathomless-chamber-33667.herokuapp.com/api/users";

    var data =  
    {
        email: email.value, 
        name: name.value, 
        password: password.value
    };

    const params = 
    {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        mode: 'no-cors',
        method: 'POST'
    };
    console.log(params.body);
    fetch(Url, params)
        .then(res => res.json())
        .then(response => console.log(JSON.stringify(response)))
        .catch(error => console.log(error));
}