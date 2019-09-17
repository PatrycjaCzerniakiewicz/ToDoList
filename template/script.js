document.getElementById('loginbtn').addEventListener('click',loginWithFacebook,false);

function loginWithFacebook() {
    FB.login(response => {
        console.log(response)
    },{scope: 'public_profile,email'})
    return false;
}