import mongoose from "mongoose"

const Schema = mongoose.Schema

const OTPSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    expiry: {
        type: Number,
        required: true,
        default: 300000,
    },
    email: {
        trim: true,
        type: String,
        required: true,
        lowercase: true,
    },
    expired: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const OTP = mongoose.models.OTP || mongoose.model("OTP", OTPSchema)

export default OTP