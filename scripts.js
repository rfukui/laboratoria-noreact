function getUser(user,password){
    
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://reactbook-9c220.firebaseio.com/users.json?orderBy="user_id"&equalTo="'+user+'"';
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
            var keys = Object.keys(users);
            for(var i=0;i<keys.length;i++){
                var key = keys[i];
                if (users[key].user_id === user_id.value && users[key].password === password) {
                    document.cookie = "id="+key;
                    window.open("/wall.html","_self");
                }
            }   
            var msgErroSenha = document.getElementById("pwd_error");
            msgErroSenha.innerHTML = "";  
            msgErroSenha.innerHTML = "e-mail ou senha inválidos";
            return false;    
        }
    }
    xmlhttp.open ("GET", url, false);
    xmlhttp.send();
}


var form = document.getElementById("login_form");

form.onsubmit = function func() {
    var usrError = document.getElementById("usr_error");
    usrError.innerHTML = "";  
    var user_id = document.getElementById("user_id");
    var password = document.getElementById("password");

    if (user_id.value.length == 0){
        usrError.innerHTML = "preencha o e-mail";
        return false;
    }
    var tst = getUser(user_id.value,password.value);
    return false;
    
    
}
