var connexionForm = document.getElementById('connexion');
var login = document.getElementById('login');
var password = document.getElementById('password');

var xhr = getXHR();

connexionForm.onsubmit = function(e) {
    e.preventDefault();

    transitionTrick1();
    
    xhr.open("POST", API.url+'/login');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("login="+login.value+"&password="+password.value);	

    xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 ) {
	    console.log(xhr.status);
	    if (xhr.status === 200) {
		transitionTrick2(Site.url+'/quizz', "Authentication successful !");
	    } else {
		transitionTrick2(Site.url, "Authentication failed !");
	    }
	}
    };    
    return false;
};









