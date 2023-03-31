password = document.getElementById('exampleInputPassword1');
email = document.getElementById('exampleInputEmail1');
form = document.getElementById('form');
parrafo =document.getElementById('warnings');

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let warnings = "";
    let expRegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let entrar = false;
    parrafo.innerHTML = '';
    if (!expRegEmail.test(email.value)) {
        warnings += `El correo no es valido <br>`
        entrar = true
    };
    if (password.value.length < 8) {
        warnings += `La contraseña no es valida <br>`
        entrar = true
    };
    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        setTimeout(function () {
            location.href = 'http://127.0.0.1:5500/team-8/inicio.html';
        }, 1000,);
    };
});


  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "950930800316-89b2reruqh07kqvv975hjabjmaq0egrt.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("butGoogle"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }
