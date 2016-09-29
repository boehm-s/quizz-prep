import request from 'request';
import User from '../models/user';

function registerUser(req, res, next) {

    var options = {
	method: 'GET',
	url: 'https://prepintra-api.etna-alternance.net/users/'+req.user, 
	headers:{
	    "Accept":"application/json, text/plain, *//*",
	    "Accept-Language":"en-US,en;q=0.8",
	    "Connection":"keep-alive",
	    "Cookie": req.cookie,
	    "Content-Type":"application/json;charset=UTF-8",
	    "Host":"prepintra-api.etna-alternance.net",
	    "Origin":"https://prepintra.etna-alternance.net",
	    "Referer":"https://prepintra.etna-alternance.net/",
	    "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"
	}
    };

    // check if user is in the DB
    User.findOne({'profile.username': req.user}, (err, user) => { 
	if (err) {
	    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
	} else if (user !== null) {
	    res.status(200).json(req.jsonFromConnexion);
	} else {
	    request(options, (err, response, body) => {
		if (err) {
		    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
		} else if (response.statusCode === 200) {
		    // add user to the DB
		    let userInfo = JSON.parse(response.body);
		    let user = new User();		    
		    user.profile.email = userInfo.email;
		    user.profile.firstName = userInfo.firstname;
		    user.profile.lastName = userInfo.lastname;
		    user.profile.username = userInfo.login;
		    user.quizz = [];

		    user.save(err => {
			if (err) {
			    res.status(418).json({success: false, error: err, message: "Don't foute you de ma gueule"});
			} else {
			    res.json({ success: true, message: 'Authentication succeeded and user created in our DB !'});
			}
		    });
		    
		} else {
		    res.status(401).json({success: false, message: "Authentication didn't work out well, maybe a problem with the cookie"});
		}
	    });	    
	}
    });
    

    
}


export default {registerUser};










