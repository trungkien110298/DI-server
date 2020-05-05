// Rerquire Node JS module
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var cons = require('consolidate');


// Creat server app
var app = express();

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static(path.join(__dirname, 'public')));


// ----------------- Router ---------------------------------- //

var list_call = require('./routes/list_call');
app.use(list_call);

// Answer URL
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
	console.log('\n\n')
});


// Event URL
app.post("/event", function (req, res) {
	date = new Date()
	console.log(date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) + " Call event post")
	console.log(req.body)
	console.log('\n\n')

});


// Call center Event URL
app.post("/call-event", function (req, res) {
	date = new Date()
	console.log(date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) + " Call event post")
	console.log(req.body)
	console.log('\n\n')

});

// Call center call Answer URL
app.post("/callout-event", function (req, res) {
	date = new Date()
	console.log(date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) + " Call out event post")
	console.log(req.body)
	console.log('\n\n')

});

app.listen(process.env.PORT || 3000, () =>
	console.log("Server is listenning in port 3000")
);
module.exports = app;
