import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Model/User";
import validator from "validator";
import { verifyJWT } from "./Utils";
import { Request , Response } from "express"

export default async function signUp( req: Request , res: Response ) {

  const { email , name , password } = req.body;

  try {
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!name) return res.status(400).json({ error: "Name is required" });

    if (password?.trim().length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long" })

    if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email submitted" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "Email is already registered" });

    // if (!code) {
      
    //   // Here you would normally generate and send the OTP to the user's email.
    //   return res.status(400).json({ error: "OTP sent successfully to email" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      id: email,
      password: hashedPassword,
    })

    const token = jwt.sign({
      name,
      email,
      id: user._id,
      provider: user.provider,
      watchlist: user.watchlist,
      updatedAt: user.updatedAt,
    }, process.env.JWT_SECRET!, { expiresIn: "7d" } );

    res.status(201).json({ email , name , token });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

export async function Delete ( req: Request , res: Response) {

  const { pass } = req.body;
  
  if ( pass?.trim().length < 6 ) return res.status(400).json({ error: "Password must be at least 6 characters long" })

  try {
    const user = await verifyJWT( req )

    const isCorrect = await bcrypt.compare( pass , user.password )

    if ( !isCorrect ) return res.status(401).json({ error: "Incorrect password." });

    await User.deleteOne({ _id: user._id })
    res.status(200).json({ message: "Account deleted successfully." })
  } catch {
    res.status(500).json({ error: "Failed to delete. Please try again later." });
  }
}

export async function Settings ( req: Request , res: Response) {

  const { pass , email , name , password } = req.body;

  if ( !pass.trim() ) return res.status(400).json({ error: "Please enter passsword" })

  if ( password && password.trim().length < 6 ) return res.status(400).json({ error: "Password must be at least 6 characters long" })
    
  if ( name && name.length < 3 ) return res.status(400).json({ error: 'Name must be at least 3 characters long'})

  if ( email && !validator.isEmail(email)) return res.status(400).json({error: 'Enter a valid email address'})

  try {
    const user = await verifyJWT( req )
    const prov = user.provider

    const isCorrect = await bcrypt.compare( pass , user.password )

    if ( !isCorrect ) return res.status(401).json({ error: "Incorrect password." });

    if ( email && prov === 'google' ) return res.status(400).json({error: 'Google users cannot change their email address.'})

    if ( name && prov !== 'custom' ) return res.status(400).json({error: `${prov[0].toUpperCase()}${prov.slice(1)} users cannot change their username.`})

    user.name = name || user.name
    user.email = email || user.email
    user.password = password ? await bcrypt.hash( password.trim() , 10 ) : user.password

    await user.save()
    res.status(200).json({ message: "Settings updated successfully." })
  } catch {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}