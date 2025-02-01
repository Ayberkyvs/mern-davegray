// @ts-nocheck
import mongoose from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncerement = Inc(mongoose);
const NoteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

NoteSchema.plugin(AutoIncerement, {
	inc_field: "ticket",
	id: "ticketNums",
	start_seq: 500,
});

export default mongoose.model("Note", NoteSchema);
