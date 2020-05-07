var express = require("express");
var request = require('request');
var list_call = express.Router();
var config_stringee = require('../config/stringee');
list_call.get("/", function (req, res) {
	const options = {
		url: config_stringee.call_log_url,
		headers: {
			'X-STRINGEE-AUTH': config_stringee["X-STRINGEE-AUTH"]
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