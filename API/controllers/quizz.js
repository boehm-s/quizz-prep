import Quizz	from '../models/quizz';
import app	from '../../config/express';

function add(req, res, next) {
    var quizz = new Quizz();
    quizz = JSON.parse(req.body.quizz);
    quizz.state = 'waiting';
    quizz.save(err => {
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else {
	    res.json({ success: true, message: 'Quizz successfuly saved !'});
	}
    });
}

function update(req, res, next) {
    Quizz.findOne({name: req.body.quizzName}, (err, quizz) => {
	quizz = JSON.parse(req.body.quizz);
	quizz.save(err => {
	    if (err) {
		res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	    } else {
		res.json({ success: true, message: 'Quizz successfuly updated !'});
	    }
	});
	
    });
}

function remove(req, res, next) {
    Quizz.findOne({name: req.body.quizzName}).remove(err => {
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else {
	    res.json({ success: true, message: 'Quizz successfuly removed !'});
	}
    });
}

function getAll(req, res, next) {
    Quizz.find({}, (err, quizzs) => {
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else {
	    res.json({success: true, message: "Here are your quizzs !", quizzs: quizzs});
	}
    });
}

function getByState(req, res, next) {
    req.state = req.state || req.query.state;
    Quizz.find({state: req.state}, (err, quizzs) => {
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else {
	    res.json({success: true, message: "Here are your quizzs !", quizzs: quizzs});
	}
    });
}

export default {add, update, remove, getAll, getByState};










