var express = require("express");
var request = require('request');
var list_call = express.Router();

list_call.get("/", function (req, res) {
	const options = {
		url: 'https://api.stringee.com/v1/call/log',
		headers: {
			'X-STRINGEE-AUTH': 'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1dpNGpRbDZpcXpNeXp5VjVrV1lDNGtBZjRnUjFJNnBGLTE1ODg2MTY3OTIiLCJpc3MiOiJTS1dpNGpRbDZpcXpNeXp5VjVrV1lDNGtBZjRnUjFJNnBGIiwiZXhwIjoxNTkxMjA4NzkyLCJyZXN0X2FwaSI6dHJ1ZX0.jmnbSkwQiXhfzWVRQe2Bv4q6hR5B5xVC5EfqiDPhOCU'
		}
	}
	request.get(options, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			body = JSON.parse(body)
			var calls = body.data.calls;
			return res.render('index', { calls: calls })
		} else {
			return res.status(400).send({ error: "error" });
		}
	})
	
});

module.exports = list_call;