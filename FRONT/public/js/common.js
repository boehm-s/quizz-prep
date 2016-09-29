var API = {
    url: 'http://localhost:3000/api'
};

var Site = {
    url: 'http://localhost:3000'
};

function getXHR() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
	if (window.ActiveXObject) {
	    try {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch(e) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	} else {
	    xhr = new XMLHttpRequest();
	}
    } else {
	alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
	return null;
    }
    return xhr;
}

function transitionTrick1() {
    var container = document.getElementsByClassName('container-fluid')[0];
    container.style.transition = "1s";
    container.style.opacity = 0;
}

function transitionTrick2(url, message) {
    var transitionDiv = document.getElementById('transitionTrick');
    transitionDiv.style.display = "flex";
    transitionDiv.innerHTML = message;

    setTimeout(function() {
        transitionDiv.style.opacity = 1;
    }, 500);

    setTimeout(function() {
        window.location.href = url;
    }, 2000);

}
