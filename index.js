// Rerquire Node JS module
var express = require("express");
var bodyParser = require("body-parser");

// Creat server app
var app = express();

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------- Router ---------------------------------- //

app.get("/call", function (req, res) {
	date = new Date()
	console.log(date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) + " Call request")
	console.log(req.query)
	let SSCO =
		[
			{
				action: "record",
				eventUrl: "http://202.191.56.251:3000/event",
				format: "mp3",
			},
			{
				action: "connect",

				from: {
					type: "internal",
					number: req.query.from,
					alias: "user_1",
				},

				to: {
					type: "external",
					number: req.query.to,
					alias: "phone_number",
				},
			},
		]
	;
	res.send(SSCO);
});

app.get("/event", function(req, res){
	date = new Date()
	console.log(date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) + " Call event get")
	console.log(req.query)
});
app.post("/event", function(req, res){
	date = new Date()
	console.log(date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) + " Call event post")
	console.log(req.body)
	
});


app.listen(process.env.PORT || 3000,  () =>
	console.log("Server is listenning in port 3000")
);
module.exports = app;
