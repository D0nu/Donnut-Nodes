import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Model/User";
import validator from "validator";
import { Request , Response } from "express";

export async function recovery( req: Request , res: Response ) {

  if ( !req.body ) return res.status(400).json({ error: 'Please pass in user credentials.' })
  const { email , code , password } = req.body;

  try {

    if (password?.trim().length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long" })

    if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email submitted" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not found" });

    if (!code) {
      
      // Here you would normally generate and send the OTP to the user's email.
      return res.status(400).json({ error: "OTP sent successfully to email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword,
    await user.save()

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET!, { expiresIn: "7d" } );

    res.status(201).json({ email , name: user.name , token });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

