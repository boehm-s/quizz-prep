const quizz = {
    refreshEvents: () => {
	let buttons = document.getElementsByClassName('add');

	Array.from(buttons).forEach((elem, index) => {
	    elem.dataset.index = index;
	    elem.removeEventListener('click', quizz.addProposition);
	    elem.addEventListener('click', quizz.addProposition);
	});
    },

    addProposition: event => {
	let button = event.target;
	let index = button.dataset.index;
	let proposition = document.getElementsByClassName('proposition')[index].value;
	let propositionList = document.getElementsByClassName('proposition-list')[index];
	propositionList.innerHTML+= '<div class="col-xs-5"><button class="btn btn-secondary proposition-button">' + proposition + '</button><button class="col-xs-1 btn btn-danger" onclick="quizz.removeProposition(this)">X</button></div>';

	
	let propositionButtons = document.getElementsByClassName('proposition-button');

	Array.from(propositionButtons).forEach((elem, index) => {
	    elem.dataset.index = index;
	    elem.removeEventListener('click', quizz.validProposition);
	    elem.addEventListener('click', quizz.validProposition);
	});
	console.log("done");
    },

    validProposition: event => {
	let button = event.target;
	let index = button.dataset.index;
	let pageIndex = button.parentNode.parentNode.parentNode.getElementsByClassName('add')[0].dataset.index;
	Array.from(
	    document
		.getElementsByClassName('question')[pageIndex]
		.getElementsByClassName('proposition-button'))
	    .forEach((elem, i) => {
		elem.className = (i == index)
		    ? 'btn btn-success proposition-button'
		    : 'btn btn-secondary proposition-button';
	    });
    },

    removeProposition: elem => {
	let allButtons = elem.parentNode.parentNode.getElementsByClassName('proposition-button');
	elem.parentNode.parentNode.removeChild(elem.parentNode);

	Array.from(allButtons).forEach((elem, index) => {
	    elem.dataset.index = index;
	});
    },

    addQuestion: () => {
	
    }

};

window.addEventListener('DOMContentLoaded', event => {
    console.log("loaded");
    quizz.refreshEvents();
//    getAllQuizzs();
});


/*

function getAllQuizzs() {
    var token		= localStorage.getItem('token');
    var container	= document.getElementById('display');
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

*/
