var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CallSchema = new Schema({
	call_id: {
		type: String,
		required: true,
		unique: true
	},
	project_id: Number,
	start_time: String,
	end_time: String,
	from_number: String,
	hotline: String,
	agent_number: String,
	agent_id: String,
	recording_url: String,
	recording_file_path: String 

});

module.exports = mongoose.model("Call", CallSchema);
