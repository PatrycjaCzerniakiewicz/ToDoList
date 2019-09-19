
document.getElementById('loginbtn').addEventListener('click',loginWithFacebook,false);

function loginWithFacebook() {
  FB.login( response => {
      const {authResponse:{accessToken,userID}} = response
      
      fetch('/login-with-facebook', {
          method:"POST",
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify({accessToken,userID})
      }).then(res => {
          console.log(res);
      })

      FB.api('/me', function(response) {
          console.log(JSON.stringify(response));    
      })
  }, {
    scope: 'email', 
    return_scopes: true
})
  return false
}