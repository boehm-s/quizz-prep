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

getAllQuizzs();

function addButtonEvents() {
    var addButtons = Array.prototype.slice.call(
	document.getElementsByClassName('add')
    );
 <
    addButtons.forEach(function(button, i, arr) {
	console.log(button);
//	var proposition = document.getElementsByClassName('proposition')[i].value;
	var propositionList = document.getElementsByClassName('proposition-list')[i];
	button.onclick = function() {
	    var proposition = "testtest";
	    propositionList.innerHTML+= '<div class="col-xs-5"><button class="btn btn-secondary">' + proposition + '</button><button class="col-xs-1" onclick="this.parentNode.parentNode.removeChild(this.parentNode)"></button></div>';
	};
    });
}
*/

function addButtonEvents() {
    let buttons = document.getElementsByClassName('add');

    Array.from(buttons).forEach((elem, index) => {
	elem.dataset.index = index;
	elem.removeEventListener('click', add);
	elem.addEventListener('click', add);
    });
}

function add(event) {
    let button = event.target;
    let index = button.dataset.index;
    let proposition = document.getElementsByClassName('proposition')[index].value;
    let propositionList = document.getElementsByClassName('proposition-list')[index];
    propositionList.innerHTML+= '<div class="col-xs-5"><button class="btn btn-secondary proposition-button">' + proposition + '</button><button class="col-xs-1 btn btn-danger" onclick="removeButton(this)">X</button></div>';

    
    let propositionButtons = document.getElementsByClassName('proposition-button');

    Array.from(propositionButtons).forEach((elem, index) => {
	elem.dataset.index = index;
	elem.removeEventListener('click', validAnswer);
	elem.addEventListener('click', validAnswer);
    });
    console.log("done");
    
}

function validAnswer(event) {
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
}

window.addEventListener('DOMContentLoaded', event => {
    console.log("loaded");
    addButtonEvents();
});


function removeButton(elem) {
    let allButtons = elem.parentNode.parentNode.getElementsByClassName('proposition-button');
    elem.parentNode.parentNode.removeChild(elem.parentNode);

    Array.from(allButtons).forEach((elem, index) => {
	elem.dataset.index = index;
    });
}
