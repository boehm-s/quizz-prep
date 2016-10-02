import request	from 'request';
import jwt	from 'jsonwebtoken';
import User	from '../models/user';
import admin	from '../../config/admin';
import app	from '../../config/express';

function connectToPrepIntra(req, res, next) {
    var auth = {
	login: req.body.login,
	password: req.body.password
    };

    var options = {
	method: 'POST',
	url: 'https://auth.etna-alternance.net/identity', 
	json: auth,
	headers:{
	    "Accept":"application/json, text/plain, *//*",
	    "Connection":"keep-alive",
	    "Content-Length": auth.length,
	    "Content-Type":"application/json;charset=UTF-8",
	    "Host":"auth.etna-alternance.net",
	    "Origin":"https://prepintra.etna-alternance.net",
	    "Referer":"https://prepintra.etna-alternance.net/",
	    "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"
	}
    };

    request(options, (err, response, body) => {
	if (err)
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	else if (response.statusCode === 200) {
	    req.user = auth.login;
	    req.cookie = response.headers["set-cookie"];
	    req.jsonRes = {success: true, message: "Authentication succeeded", cookie: response.headers["set-cookie"]};
	    
	    next();
	}
	else
	    res.status(401).json({success: false, message: "Wrong login/password combination"});
    });    
}



function findUser(req, res, next) {
    req.user = (req.user) ? req.user : req.body.user || req.body.username;

    User.findOne({'profile.username': req.user}, (err, user) => { 
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else if (user !== null) {
	    let token = jwt.sign(user, app.get('superSecret'), {
		expiresIn: 60 * 60 * 24 * 15
	    });
	    res.status(200).json({success: true, message: 'Authentication succeeded and user was already in our DB !', token: token});
	} else {
	    next();
	}
    });
}


function userInfoFromPrepIntra(req, res, next) {
    var options = {
	method: 'GET',
	url: 'https://prepintra-api.etna-alternance.net/users/'+req.user, 
	headers:{
	    "Accept":"application/json, text/plain, *//*",
	    "Connection":"keep-alive",
	    "Cookie": req.cookie,
	    "Content-Type":"application/json;charset=UTF-8",
	    "Host":"prepintra-api.etna-alternance.net",
	    "Origin":"https://prepintra.etna-alternance.net",
	    "Referer":"https://prepintra.etna-alternance.net/",
	    "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"
	}
    };

    request(options, (err, response, body) => {
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else if (response.statusCode === 200) {
	    req.userInfo = JSON.parse(response.body);
	    next();
	} else {
	    res.status(401).json({success: false, message: "Authentication didn't work out well, maybe a problem with the cookie"});
	}
    });
}


function createUser(req, res, next) {

    var user = new User();		    
    user.profile.email = req.userInfo.email;
    user.profile.firstName = req.userInfo.firstname;
    user.profile.lastName = req.userInfo.lastname;
    user.profile.username = req.userInfo.login;
    user.quizz = [];

    user.save(err => {
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else {
	    
	    let token = jwt.sign(user, app.get('superSecret'), {
		expiresIn: 60 * 60 * 24 * 15
	    });
	    
	    res.json({ success: true, message: 'Authentication succeeded and user created in our DB !', token: token});
	}
    });
    

}

function isConnected(req, res, next) {
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token) {
	jwt.verify(token, app.get('superSecret'), (err, decoded) => {
	    if (err) {
		res.json({ success: false, message: 'Failed to authenticate token.' });
	    } else {
		req.decoded = decoded;
		next();
	    }
	});
    } else {
	res.status(401).send({
	    success: false,
	    message: 'No token provided.'
	});
    }
}


function isAdmin(req, res, next) {
    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token) {
	jwt.verify(token, app.get('superSecret'), function(err, decoded) {
	    decoded = (decoded.profile) ? decoded : decoded._doc;
	    console.log(decoded);
	    if (err) {
		res.json({ success: false, message: 'Failed to authenticate token.' });
	    } else {
		if (admin.indexOf(decoded.profile.username) !== -1)
		    next();
		else {
		    res.status(403).send({
			success: false,
			message: 'You are not admin ... '
		    });
		}
	    }
	});
    } else {
	return res.status(403).send({
	    success: false,
	    message: 'No token provided.'
	});
    }
}


export default {connectToPrepIntra, findUser, userInfoFromPrepIntra, createUser, isConnected, isAdmin};
