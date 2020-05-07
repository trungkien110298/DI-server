// Rerquire Node JS module
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var config_database = require("./config/database");
var config_stringee = require("./config/stringee");
var fs = require("fs");
var request = require("request-promise");
var mongoose = require("mongoose");
var Call = require("./models/call");

// Creat server app
var app = express();

// Connect database
mongoose.connect(config_database.database, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

// ----------------- Router ---------------------------------- //

var list_call = require("./routes/list_call");
app.use(list_call);

// Answer URL
app.get("/call", function (req, res) {
	date = new Date();
	console.log(
		date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) +
		" Call request"
	);
	console.log(req.query);
	let SSCO = [
		{
			action: "record",
			eventUrl: "http://27.72.147.196:33333/event",
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
	];
	res.send(SSCO);
	console.log("\n\n");
});

// Event URL
app.post("/event", function (req, res) {
	date = new Date();
	console.log(
		date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) +
		" Call event post"
	);
	console.log(req.body);
	console.log("\n\n");
});

// Call center Event URL
app.post("/call-event", async function (req, res) {
	date = new Date();
	console.log(
		date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) +
		" Call event post"
	);
	console.log(req.body);
	console.log("\n\n");

	let body = req.body;
	let call_id = body.call_id;

	let call = await Call.findOne({ call_id: call_id }).exec();
	if (!call) {
		call = new Call({ call_id: call_id, project_id: body.project_id });
		//call.save();
	}

	let call_status = body.call_status;

	// Create Event
	if (call_status && call_status.localeCompare("created") == 0) {
		call.from_number = body.from.number;
		call.hotline = body.to.number;
	}

	// Start Event
	if (call_status && call_status.localeCompare("started") == 0) {
		let agent_number = body.to.number;

		call.agent_number = agent_number;
		const options = {
			url: config_stringee.list_agent_url,
			headers: {
				"X-STRINGEE-AUTH": config_stringee["X-STRINGEE-AUTH"],
			},
		};

		await request
			.get(options)
			.then(function (response) {
				response = JSON.parse(response);
				if (response.data) {
					let agents = response.data.agents;

					for (i in agents) {
						agent = agents[i];
						if (agent_number.localeCompare(agent.phone_number) == 0) {
							call.agent_id = agent.id;
							break;
						}
					}
				}
			})
			.catch(function (err) {
				console.log(err);
				// API call failed...
			});
	}

	// Recording Event
	if (body.recording_url) {
		const options = {
			url: body.recording_url,
			headers: {
				"X-STRINGEE-AUTH": config_stringee["X-STRINGEE-AUTH"],
			},
		};
		let file_path = "data/" + body.call_id + ".mp3";
		request
			.get(options, function (err, response) {
				if (!err && response.statusCode == 200) {
					console.log("Save record file success");
				} else {
					console.log("Error");
				}
			})
			.pipe(fs.createWriteStream(file_path));
		call.recording_url = body.recording_url;
		call.recording_file_path = file_path;
	}

	call.save();
});

// Call center call Answer URL
app.post("/callout-event", function (req, res) {
	date = new Date();
	console.log(
		date.toLocaleString("vi-GB", { timeZone: "Asia/Ho_Chi_Minh" }) +
		" Call out event post"
	);
	console.log(req.body);
	console.log("\n\n");
});

app.listen(process.env.PORT || 3000, () =>
	console.log("Server is listenning in port 33333")
);
module.exports = app;
