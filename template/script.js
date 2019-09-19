
document.getElementById('loginbtn').addEventListener('click',loginWithFacebook,false);

function loginWithFacebook() {
  FB.login( response => {
      const {authResponse:{accessToken,userID,email}} = response
      
      fetch('/login-with-facebook', {
          method:"POST",
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify({accessToken,userID,email})
      }).then(res => {
          console.log(res);
      })

      FB.api('/me?fields=name,id,email', function(response) {
          console.log(JSON.stringify(response));    
      })
  },{
    scope: 'email', 
    return_scopes: true
})
  return false
}