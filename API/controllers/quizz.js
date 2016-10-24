import Quizz from '../models/quizz';
import app from '../../config/express';

function add(req, res, next) {
    console.log(req.body);
    const quizz = new Quizz(JSON.parse(JSON.stringify(req.body)));

    quizz.save(err => {
	if (err) {
	    res.status(418).json({
		success: false, 
		error: err, 
		message: "Don't foute you de ma gueule"});
	} else {
	    res.json({ 
		success: true, 
		message: 'Quizz successfuly saved !'
	    });
	}
    });
}

function setState(req, res, next) {
    Quizz.update({name: req.body.name}, {state: req.body.state}, (err, numAffected) => {
	if (err) {
	    res.status(418).json({
		success: false, 
		error: err, 
		message: "Don't foute you de ma gueule"});
	} else {
	    res.json({ 
		success: true,
		message: 'State successfuly updated !',
		numAffected
	    });
	}
    });
}


function remove(req, res, next) {
    Quizz.findOne({name: req.body.name}).remove(err => {
	if (err) {
	    res.status(418).json({
		success: false, 
		error: err, 
		message: "Don't foute you de ma gueule"});
	} else {
	    res.json({ 
		success: true, 
		message: 'Quizz successfuly removed !'
	    });
	}
    });
}

function getAll(req, res, next) {
    Quizz.find({}, (err, quizzs) => {
	if (err) {
	    res.status(418).json({
		success: false, 
		error: err, 
		message: "Don't foute you de ma gueule"
	    });
	} else {
	    res.json({
		success: true, 
		message: "Here are your quizzs !", 
		quizzs: quizzs
	    });
	}
    });
}

function getByState(req, res, next) {
    const state = req.state || req.query.state;
    Quizz.find({state: state}, (err, quizzs) => {
	if (err) {
	    res.status(418).json({
		success: false, 
		error: err, 
		message: "Don't foute you de ma gueule"
	    });
	} else {
	    res.json({
		success: true, 
		message: "Here are your quizzs !", 
		quizzs: quizzs
	    });
	}
    });
}


function getByName(req, res, next) {
    const name = req.name || req.query.name;
    Quizz.findOne({name: name}, (err, quizz) => {
	if (err) {
	    res.status(418).json({
		success: false, 
		error: err, 
		message: "Don't foute you de ma gueule"
	    });
	} else {
	    res.json({
		success: true, 
		message: "Here is your quizz !", 
		quizz: quizz
	    });
	}
    });
}

export default {add, setState, remove, getAll, getByState, getByName};
