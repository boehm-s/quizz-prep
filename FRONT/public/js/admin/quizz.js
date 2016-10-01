console.log('quizz script');

function getAllQuizzs() {
    var token		= localStorage.getItem('token');
    var container	= document.getElementById('main');
    var xhr		= getXHR();

    xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 ) {
	    container.innerHTML+= xhr.responseText;
	}
    };
    
    xhr.open("GET", API.url+'/quizz');
    xhr.setRequestHeader('x-access-token', token);
    xhr.send();
}

getAllQuizzs();
