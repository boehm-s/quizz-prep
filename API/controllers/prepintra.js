import request from 'request';

function connexion(req, res, next) {
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
	    "Accept-Encoding":"gzip, deflate",
	    "Accept-Language":"en-US,en;q=0.8",
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
	else if (response.statusCode === 200)
	    res.status(200).json({success: true, message: "Authentication succeeded", data: response, cookie: response.headers["set-cookie"]});
	else
	    res.status(401).json({success: false, message: "Wrong login/password combination"});
    });
    
}


export default {connexion};
