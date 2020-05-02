var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Phần này chưa sửa dụng vì có thể lấy log cuộc gọi từ Stringee
// Hướng dẫn ở README

var CallSchema = new Schema({
	actorType: String,
	original: Boolean,
	peerToPeer: Boolean,
	timestamp_ms: Number,
	customData: String,
	type: String,
	call_id: String,
	actor: String,
	callCreatedReason: String,
	call_status: String,
	event_id: String,
	project_id: Number,
	serial: Number,
	account_sid: String,
	from: {
		number: String,
		alias: String,
		is_online: false,
		type: String,
	},
	to: {
		number: String,
		alias: String,
		is_online: false,
		type: String,
	},
	direction: String,
});

module.exports = mongoose.model("Call", CallSchema);
