const quizz = {    
    helpers: {
    },

    DOM: {
	container: document.getElementById('tmp-question'),

	nextQuestion: document.getElementById('next-question'),

	previousQuestion: document.getElementById('previous-question'),

	questionCounter: document.getElementById('question-counter'),
	
	getQuestions : () => document.getElementsByClassName('question'),
	
	getMarginLeftStyleAttr : node => {
	    let marginLeftAttr = (node.getAttribute('style') === null)
		    ? false
		    : node.getAttribute('style').match(/margin\-left.*([0-9]*)/g)[0];
	    if (!marginLeftAttr) {
		console.log(node, "This node has no margin-left in his style attribute");
		return false;
	    } else {
		return parseInt(marginLeftAttr.split(':')[1]);
	    }
	}
    },
       
    refreshEvents: () => {
	let buttons = document.getElementsByClassName('add');

	Array.from(buttons).forEach((elem, index) => {
	    elem.dataset.index = index;
	    elem.removeEventListener('click', quizz.addProposition);
	    elem.addEventListener('click', quizz.addProposition);
	});

	quizz.DOM.previousQuestion.onclick = () => {
	    let containerML = quizz.DOM.getMarginLeftStyleAttr(quizz.DOM.container);
	    
	    ((containerML + 100 > 0)
	     ? console.log("There is no previous question")
	     : quizz.previousQuestion());
	    
	    quizz.DOM.nextQuestion.innerHTML = '>';
	};
	quizz.DOM.nextQuestion.onclick = () => {
	    let nextQuestionButton = quizz.DOM.nextQuestion;
	    let containerML = quizz.DOM.getMarginLeftStyleAttr(quizz.DOM.container);
	    let questions = quizz.DOM.getQuestions();
	    
	    console.log("margin-left : ", containerML);

	    if (!containerML || Math.abs(containerML) === Math.abs((questions.length - 1) * 100)) {
		quizz.addQuestion();
		quizz.nextQuestion();
	    } else if (Math.abs(containerML) === Math.abs((questions.length - 2)*100)) {
		nextQuestionButton.innerHTML = '+';
		quizz.nextQuestion();
	    } else {
		quizz.nextQuestion();
	    }
	    
	    
	};
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
	quizz.DOM.container.innerHTML+= '<div class="question"><input type="text" placeholder="Question" class="col-xs-12"><input type="text" placeholder="Image URL" class="col-xs-12"><div class="image col-xs-12"></div><div class="row proposition-container"><div class="col-xs-10"><input type="text" placeholder="proposition" class="col-xs-12 proposition"></div><div class="col-xs-2"><button class="btn add" data-index="0">add</button></div><div class="col-xs-12 proposition-list"></div></div></div>';
	quizz.DOM.container.style.width =  Array.from(document.getElementsByClassName('question')).length*100 +"%";
	quizz.refreshEvents();
    },

    nextQuestion: () => {
	let newMarginLeft = parseInt(
	    quizz.DOM.container
		.getAttribute('style')
		.split(';')[1]
		.split(':')[1]
	) - 100 || -100; 
	quizz.DOM.container.style.marginLeft = newMarginLeft + "%";
    },

    previousQuestion: () => {
	let newMarginLeft = parseInt(
	    quizz.DOM.container
		.getAttribute('style')
		.split(';')[1]
		.split(':')[1]
	) + 100 || 0; 
	quizz.DOM.container.style.marginLeft = newMarginLeft + "%";
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
