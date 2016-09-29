var connexionForm = document.getElementById('connexion');
var login = document.getElementById('login');
var password = document.getElementById('password');

var xhr = getXHR();

connexionForm.onsubmit = function(e) {
    e.preventDefault();
    xhr.open("POST", API.url+'/prepintra/connexion');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("login="+login.value+"&password="+password.value);	

    xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 ) {
	    console.log(xhr.status);
	    console.log(JSON.parse(xhr.response));
	}
    };    
    return false;
};









