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
	let SSCO = {
		SSCO: [
			{
				action: "record",
				eventUrl: "https://example.com/recording",
				format: "mp3",
			},
			{
				action: "connect",

				from: {
					type: "internal",
					number: "user_1",
					alias: "user_1",
				},

				to: {
					type: "external",
					number: "phone_number",
					alias: "phone_number",
				},
			},
		],
	};
	res.send(SSCO);
});

app.listen(process.env.PORT || 3000, () =>
	console.log("Server is listenning in port 3000")
);
module.exports = app;
