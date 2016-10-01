var connexionForm = document.getElementById('connexion');
var login = document.getElementById('login');
var password = document.getElementById('password');

var xhr = getXHR();

connexionForm.onsubmit = function(e) {
    e.preventDefault();

    transitionTrick1();
    
    xhr.open("POST", API.url+'/connexion');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("login="+login.value+"&password="+password.value);	

    xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 ) {
	    console.log(xhr.status);
	    if (xhr.status === 200) {
		localStorage.setItem('token', JSON.parse(xhr.responseText).token);
		transitionTrick2(Site.url+'/admin/quizz', "Authentication successful !");
	    } else {
		transitionTrick2(Site.url+'/admin', "Authentication failed !");
	    }
	}
    };    
    return false;
};









