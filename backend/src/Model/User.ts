import mongoose from "mongoose"

const Schema = mongoose.Schema

const watchListSchema = new Schema({
	pnodeId:  String,
}, {timestamps: true})

const userSchema = new Schema({
	id: {
		unique: true,
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		trim: true,
		type: String,
		minlength: 6,
		required: true,
	},
	email: {
		trim: true,
		type: String,
		lowercase: true,
	},
	provider: {
		type: String,
		default: "custom",
	},
	watchlist: {
		default: [],
		type: [ watchListSchema ],
	}
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User