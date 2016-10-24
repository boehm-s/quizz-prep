const quizz = {
    display	    : true,
    DOM		    : {
	bigContainer	 :	document.getElementById('add-quizz'),
	container	 :	document.getElementById('tmp-question'),
	nextQuestion	 :	document.getElementById('next-question'),
	previousQuestion :	document.getElementById('previous-question'),
	questionCounter	 :	document.getElementById('question-counter'),
	title		 :	document.getElementById('quizz-name'),
	validate	 :	document.getElementById('validate'),

	getQuestions		: ()		=> document.getElementsByClassName('question'),
	getMarginLeftStyleAttr	: node		=> {
	    let marginLeftAttr = (node.getAttribute('style') === null)
		    ? false
		    : node.getAttribute('style').match(/margin\-left.*([0-9]*)/g)[0];
	    if (!marginLeftAttr) {
		console.log(node, "This node has no margin-left in his style attribute");
		return false;
	    } else {
		return parseInt(marginLeftAttr.split(':')[1]);
	    }
	},
	getWidthStyleAttr	: node		=> {
	    let widthAttr = (node.getAttribute('style') === null)
		    ? false
		    : node.getAttribute('style').match(/width.*([0-9]*)/g)[0];
	    if (!widthAttr) {
		console.log(node, "This node has no width in his style attribute");
		return false;
	    } else {
		return parseInt(widthAttr.split(':')[1]);
	    }
	},
	getInputValue		: ()		=> {
	    let questions = Array.from(quizz.DOM.getQuestions());
	    let values = questions.map((elem, index) => {
		let question = elem.getElementsByTagName('input')[0].value;
		let image = elem.getElementsByTagName('input')[1].value;
		return {question, image};
	    });
	    return values;
	},
	setInputValues		: values	=> {
	    var questions = quizz.DOM.getQuestions();
	    values.forEach((value, index) => {
		questions[index].getElementsByTagName('input')[0].setAttribute('value', value.image);
		questions[index].getElementsByTagName('input')[1].setAttribute('value', value.question);
	    });
	}
    },
    maxQuestion     : 1,    
    currentQuestion : 1,

    refreshEvents	: ()	=> {
	let buttons = document.getElementsByClassName('add');
	let propositionButtons = document.getElementsByClassName('proposition-button');
	
	Array.from(buttons).forEach((elem, index) => {
	    elem.dataset.index = index;
	    elem.removeEventListener('click', quizz.addProposition);
	    elem.addEventListener('click', quizz.addProposition);
	});

	Array.from(propositionButtons).forEach(elem => {
	    elem.removeEventListener('click', quizz.validProposition);
	    elem.addEventListener('click', quizz.validProposition);
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
	    
	    if ((!containerML && quizz.currentQuestion === quizz.maxQuestion) || (Math.abs(containerML) === Math.abs((questions.length - 1) * 100) && quizz.currentQuestion === quizz.maxQuestion)) {
		quizz.addQuestion();
		quizz.nextQuestion();
	    } else if (Math.abs(containerML) === Math.abs((questions.length - 2)*100)) {
		nextQuestionButton.innerHTML = '+';
		quizz.nextQuestion();
	    } else
		quizz.nextQuestion();
	};
	
	quizz.DOM.validate.onclick = () => {
	    let data = quizz.getData();
	    let xhr = helpers.getXHR();
	    console.log(data);
	    console.log(API.url + '/quizz/add');
	    xhr.onreadystatechange = () => {
		if (xhr.readyState == 4 ) {
		    console.log(xhr.responseText); //todo
		}
	    };
	    
	    xhr.open("POST", API.url + '/quizz/add');
	    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
	    xhr.setRequestHeader('x-access-token', localStorage.getItem('token'));
	    xhr.send(JSON.stringify(data));
	};
    },
    addProposition	: event => {
	let button = event.target;
	let index = button.dataset.index;
	let proposition = document.getElementsByClassName('proposition')[index].value;
	let propositionList = document.getElementsByClassName('proposition-list')[index];
	propositionList.innerHTML+= '<div class="col-xs-5"><button class="btn btn-secondary proposition-button">' + proposition + '</button><button class="col-xs-1 btn btn-danger" onclick="quizz.removeProposition(this)">X</button></div>';

	let propositionButtons = document.getElementsByClassName('question')[index].getElementsByClassName('proposition-button');

	Array.from(propositionButtons).forEach((elem, index) => {
	    elem.dataset.index = index; 
	    elem.removeEventListener('click', quizz.validProposition);
	    elem.addEventListener('click', quizz.validProposition);
	});
    },
    validProposition	: event => {
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
    removeProposition	: elem	=> {
	let allButtons = elem.parentNode.parentNode.getElementsByClassName('proposition-button');
	elem.parentNode.parentNode.removeChild(elem.parentNode);

	Array.from(allButtons).forEach((elem, index) => {
	    elem.dataset.index = index;
	});
    },
    addQuestion		: ()	=> {
	let inputValues = quizz.DOM.getInputValue();
	console.log(inputValues);
	quizz.DOM.container.innerHTML+= '<div class="question"><button class="close-button" onclick="quizz.removeQuestion(this)">x</button><input type="text" placeholder="Question" class="col-xs-12"><input type="text" placeholder="Image URL" class="col-xs-12"><div class="image col-xs-12"></div><div class="row proposition-container"><div class="col-xs-10"><input type="text" placeholder="proposition" class="col-xs-12 proposition"></div><div class="col-xs-2"><button class="btn add" data-index="0">add</button></div><div class="col-xs-12 proposition-list"></div></div></div>';
	quizz.DOM.container.style.width =  Array.from(document.getElementsByClassName('question')).length*100 +"%";
	quizz.refreshEvents();
	quizz.DOM.setInputValues(inputValues);
    },
    removeQuestion	: elem	=> {
	let question = elem.parentNode;
	let questions = quizz.DOM.getQuestions();
	let container = quizz.DOM.container;
	let containerWidth = quizz.DOM.getWidthStyleAttr(container);

	question.parentNode.removeChild(question);
	if (containerWidth)
	    container.style.width = (containerWidth - 100) + '%';
	quizz.maxQuestion--;
	quizz.previousQuestion();
	quizz.refreshEvents();
	
	console.log("removed");
    },
    nextQuestion	: ()	=> {
	let newMarginLeft = parseInt(
	    quizz.DOM.container
		.getAttribute('style')
		.split(';')[1]
		.split(':')[1]
	) - 100 || -100; 
	quizz.DOM.container.style.marginLeft = newMarginLeft + "%";
	quizz.maxQuestion+= (quizz.maxQuestion === quizz.currentQuestion) ? 1 : 0;
	quizz.currentQuestion++;
	quizz.DOM.questionCounter.innerHTML = quizz.currentQuestion + ' / ' + quizz.maxQuestion;
    },
    previousQuestion	: ()	=> {
	let newMarginLeft = parseInt(
	    quizz.DOM.container
		.getAttribute('style')
		.split(';')[1]
		.split(':')[1]
	) + 100 || 0; 
	quizz.DOM.container.style.marginLeft = newMarginLeft + "%";
	quizz.currentQuestion--;
	quizz.DOM.questionCounter.innerHTML = quizz.currentQuestion + ' / ' + quizz.maxQuestion;
    },
    getData		: ()	=> {
	let questions = Array.from(quizz.DOM.getQuestions());
	let name = quizz.DOM.title.value;
	let state = "waiting";
	let data = questions.map((elem, index) => {
	    let question = elem.getElementsByTagName('input')[0].value;
	    let image = elem.getElementsByTagName('input')[1].value;
	    let propositions = Array.from(elem.getElementsByClassName('proposition-button'))
		    .map(elem => {return elem.innerHTML;});
	    
	    let answer = Array.from(document.getElementsByClassName('question')[index]
				    .getElementsByClassName('proposition-button'))
		    .map((elem, i) => {
			return (Array.from(elem.classList).indexOf('btn-success') != -1)
			    ? i
			    : 0;
		    }, 0)
		    .reduce((pv, cv) => pv + cv);

	    return {question, image, propositions, answer};
	}); 

	return {name, quizz: data, state};
    }

};

window.addEventListener('DOMContentLoaded', event => {
    console.log("loaded");
    quizz.refreshEvents();
    navigation.handleEvents();
    quizzList.getAllQuizzs(allQuizz => {quizzList.displayAllQuizz(allQuizz.quizzs); quizzList.handleEvents();});
});


const quizzList = {
    DOM: {
	container	 :  document.getElementById('list-quizz'),
	listContainer	 :  document.getElementById('list-quizz-ul'),

	getStateList	 :  () => document.getElementsByClassName('quizzList-item-state'),

	getDelButtonList :  () => document.getElementsByClassName('delete'),
	
	getEditButtonList:  () => document.getElementsByClassName('quizzList-item-edit')
    },
    getAllQuizzs	: callback	=> {
	let token = localStorage.getItem('token');
	let xhr	= helpers.getXHR();

	xhr.onreadystatechange = () => {
	    if (xhr.readyState == 4 )
		callback(JSON.parse(xhr.responseText));
	};

	xhr.open("GET", API.url+'/quizz');
	xhr.setRequestHeader('x-access-token', token);
	xhr.send();
    },
    displayAllQuizz	: allQuizz	=> {
	let container = quizzList.DOM.listContainer;
	container.innerHTML = allQuizz.map((elem, i, arr) => {
	    return '<li class="quizzList-item col-xs-12"><div class="row"><div class="col-xs-4 quizzList-item-name"> '+ elem.name +' </div><div class="col-xs-3 quizzList-item-state"> '+ elem.state +' </div><div class="col-xs-3 quizzList-item-questionsNumber"> '+ elem.quizz.length +' </div><div class="col-xs-2 quizzList-item-edit"> Edit <span class="delete">X</span></div></div></li>';
	}).join("");
    },
    changeState		: node		=> {
	node.innerHTML = '<select id="tmpSelectState"> <option value="todo"> Todo </option>   <option value="waiting"> Waiting </option>   <option value="done"> done </option></select>';
	let select = document.getElementById('tmpSelectState');
	let xhr = helpers.getXHR();
	
	select.oninput = e => {
	    let self = e.target;
	    let name = self.parentNode.parentNode.getElementsByClassName('quizzList-item-name')[0].innerHTML.trim();
	    let state = self.value;

	    xhr.onreadystatechange = () => {
		if (xhr.readyState == 4 ) {
		    console.log(xhr.responseText); //todo
		}
	    };

	    xhr.open("POST", API.url+'/quizz/setState');
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));
	    xhr.send("name="+ name +"&state=" + state);

	    node.innerHTML = select.value;
	};
    },
    removeQuizz		: node		=> {
	let container = node.parentNode.parentNode.parentNode;
	let quizzName = container.getElementsByClassName('quizzList-item-name')[0].innerHTML.trim();

	let xhr = helpers.getXHR();
	xhr.onreadystatechange = () => {
	    if (xhr.readyState == 4 ) {
		console.log(xhr.responseText); //todo
		container.parentNode.removeChild(container);
	    }
	};

	xhr.open("POST", API.url+'/quizz/remove');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));
	xhr.send("name="+ quizzName);
    },
    editQuizz		: node		=> {
	let container = node.parentNode.parentNode;
	let quizzName = container.getElementsByClassName('quizzList-item-name')[0].innerHTML.trim();
	let xhr = helpers.getXHR();
	xhr.onreadystatechange = () => {
	    if (xhr.readyState == 4 ) {
		let res = JSON.parse(xhr.responseText).quizz;
		console.log(res);
		quizzList.DOM.container.style.display = "none";
		quizz.DOM.bigContainer.style.display = "block";
		navigation.DOM.addQuizzButton.setAttribute("style", "background: rgb(75, 102, 115);");
		navigation.DOM.showQuizzButton.setAttribute("style", "background: rgb(39, 50, 56);");

		quizz.DOM.title.value = res.name;
		
		res.quizz.forEach((quest, i) => {
		    let questionDOM = quizz.DOM.container.childNodes[i];
		    let inputs = questionDOM.getElementsByTagName('input');
		    inputs[1].value = quest.question;
		    inputs[0].value = quest.image;
		    quest.propositions.forEach((proposition, j) => {
			let propositionList = document.getElementsByClassName('proposition-list')[i];
			propositionList.innerHTML+= (j === quest.answer)
			    ? '<div class="col-xs-5"><button class="btn btn-success proposition-button">' + proposition + '</button><button class="col-xs-1 btn btn-danger" onclick="quizz.removeProposition(this)">X</button></div>'
			    : '<div class="col-xs-5"><button class="btn btn-secondary proposition-button">' + proposition + '</button><button class="col-xs-1 btn btn-danger" onclick="quizz.removeProposition(this)">X</button></div>';
			let propositionButtons = document.getElementsByClassName('question')[i].getElementsByClassName('proposition-button');

			Array.from(propositionButtons).forEach((elem, index) => {
			    elem.dataset.index = index; 
			    elem.removeEventListener('click', quizz.validProposition);
			    elem.addEventListener('click', quizz.validProposition);
			});
		    });
		    if (res.quizz[i+1]) {
			quizz.addQuestion();
			quizz.DOM.nextQuestion.innerHTML = '+';
			quizz.nextQuestion();
		    }
		});
	    }
	};

	xhr.open("GET", API.url+'/quizz/getByName?name='+quizzName);
	xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));
	xhr.send();
    },
    
    handleEvents	: () => {
	let states = quizzList.DOM.getStateList();
	Array.from(states).forEach((elem, i) => {
	    elem.onclick = () => {quizzList.changeState(elem);};
	});

	let dels = quizzList.DOM.getDelButtonList();
	Array.from(dels).forEach((elem, i) => {
	    elem.onclick = () => {quizzList.removeQuizz(elem);};
	});

	let edits = quizzList.DOM.getEditButtonList();
	Array.from(edits).forEach((elem, i) => {
	    elem.onclick = () => {quizzList.editQuizz(elem);};
	});

    }
};


const navigation = {
    DOM		: {
	addQuizzButton: document.getElementsByClassName('add-quizz')[0],
	showQuizzButton: document.getElementsByClassName('show-quizz')[0],
	waitingQuizz: document.getElementsByClassName('waiting')[0],
	todoQuizz: document.getElementsByClassName('todo')[0],
	doneQuizz: document.getElementsByClassName('done')[0],
	QuizzContainer: document.getElementById('add-quizz'),
	QuizzListContainer: document.getElementById('list-quizz'),
	QuizzListUl: document.getElementById('list-quizz-ul')
    },
    helpers	: {
	displayByState: state => {
	    let nodeList = document.getElementsByClassName('quizzList-item-state');
	    return Array.from(nodeList)
		.forEach((elem, i) => elem.parentNode.parentNode.style.display = (elem.innerHTML.includes(state)) ? "block" : "none" );
	}
    },
    addQuizz	: () => {
	navigation.DOM.QuizzContainer.style.display = "block";
	navigation.DOM.QuizzListContainer.style.display = "none";
	navigation.DOM.addQuizzButton.style.background = "#4b6673";
	navigation.DOM.showQuizzButton.style.background = "#273238";
    },
    showQuizz	: () => {
	navigation.DOM.QuizzContainer.style.display = "none";
	navigation.DOM.QuizzListContainer.style.display = "block";
	navigation.DOM.addQuizzButton.style.background = "#273238";
	navigation.DOM.showQuizzButton.style.background = "#4b6673";
    },
    waitingQuizz: () => navigation.helpers.displayByState('waiting'),
    todoQuizz	: () => navigation.helpers.displayByState('todo'),
    doneQuizz	: () => navigation.helpers.displayByState('done'),
    handleEvents: () => {
	navigation.DOM.addQuizzButton.onclick = () => navigation.addQuizz();
	navigation.DOM.showQuizzButton.onclick = () => navigation.showQuizz();

	navigation.DOM.waitingQuizz.onclick = () => navigation.waitingQuizz();
	navigation.DOM.todoQuizz.onclick = () => navigation.todoQuizz();
	navigation.DOM.doneQuizz.onclick = () => navigation.doneQuizz();

    }
};


const helpers = {
    getXHR : () => {
	let xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
	    if (window.ActiveXObject) {
		try {
		    xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
		    xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	    } else
		xhr = new XMLHttpRequest();
	} else {
	    alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
	    return null;
	}
	return xhr;
    }
};
