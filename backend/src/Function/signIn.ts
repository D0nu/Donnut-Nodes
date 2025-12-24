import axios from "axios"
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../Model/User";
import validator from "validator";
import { Request , Response } from "express";
 import { OAuth2Client } from "google-auth-library";

const jwtSecret = process.env.JWT_SECRET!
const googleId = process.env.GOOGLE_CLIENT_ID!
const twitterId = process.env.TWITTER_CLIENT_ID!
const twitterSecret = process.env.TWITTER_CLIENT_SECRET!
const twitterRedirects =  process.env.TWITTER_REDIRECT_URI!

export async function signIn( req: Request , res: Response ) {

  const { email , password } = req.body;

  try {

    if (password?.trim().length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long" })

    if (!validator.isEmail(email)) return res.status(400).json({ error: "Invalid email submitted" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not found, sign up instead" });

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({
      email,
      id: user._id,
      name: user.name,
      provider: user.provider,
      watchlist: user.watchlist,
      updatedAt: user.updatedAt,
    }, jwtSecret, { expiresIn: "7d" } );

    res.status(201).json({ email , name: user.name , token });
  } catch (error) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
}

async function handleGoogleUser(email: string, name: string, googleUserId: string, res: Response) {
  console.log("Looking for existing user with email:", email);
  
  let user = await User.findOne({
    $or: [
      { email, provider: "google" },
      { id: googleUserId, provider: "google" }
    ]
  });

  const defaultPassword = email.split('@')[1];
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  if (!user) {
    console.log("Creating new Google user");
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      id: googleUserId,
      provider: "google",
    });
  } else {
    console.log("Found existing Google user");
  }

  const token = jwt.sign(
    {
      email,
      id: user._id,
      name: user.name,
      provider: user.provider,
      watchlist: user.watchlist,
      updatedAt: user.updatedAt,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );

  console.log("Google login successful for:", email);
  return res.status(200).json({
    token,
    name: user.name,
    email: user.email,
  });
}

export async function googleLogin(req: Request, res: Response) {
  const googleClient = new OAuth2Client(googleId); 

  try {
    const { access_token, user_info } = req.body;

    if (user_info) {
      const { email, name, sub: googleUserId } = user_info;
      
      if (!email || !name || !googleUserId) {
        return res.status(400).json({ error: "Invalid user info from Google" });
      }

       return await handleGoogleUser(email, name, googleUserId, res);
    }


    if (access_token) {
      
      const ticket = await googleClient.verifyIdToken({
        idToken: access_token,
        audience: googleId,
      });
 
      const payload = ticket.getPayload();
      
      if (!payload) {
        return res.status(400).json({ error: "Invalid Google token" });
      }
      
      const { email, name, sub: googleUserId } = payload;
      
      if (!email || !name || !googleUserId) {
        return res.status(400).json({ error: "Could not get Google user details" });
      }  return await handleGoogleUser(email, name, googleUserId, res);
    }
    
    return res.status(400).json({ error: "Missing Google token or user info" });

  } catch (err: any) {
    console.error("Google login error details:", err.message);
    res.status(500).json({ 
      error: "Google login failed",
      details: err.message 
    });
  }
}

function generatePKCE() {
  const verifier = crypto.randomBytes(32).toString("hex");

  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");

  return { verifier, challenge };
}

// Step 1: Redirect user to Twitter
export async function twitterRedirect( req: Request , res: Response ) {
  const { verifier , challenge } = generatePKCE()
  
  res.cookie("twitter_pkce", verifier, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
    secure: twitterRedirects.includes('https'),
  });

  const twitterAuthURL =
    `https://twitter.com/i/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${twitterId}` +
    `&redirect_uri=${encodeURIComponent(twitterRedirects)}` +
    `&scope=tweet.read%20users.read%20offline.access` +
    `&state=${crypto.randomUUID()}` +
    `&code_challenge=${challenge}` +
    `&code_challenge_method=S256`;

  res.redirect(twitterAuthURL);
};

export async function twitterCallback( req: Request, res: Response) {

  try {
    const { code } = req.query;
    const verifier = req.cookies.twitter_pkce

    if (!code || typeof code !== 'string' || !verifier ) 
    return res.redirect(`${process.env.clientUrl}/signin?token=failed`);
    // Exchange code for token
    const tokenRes = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        code,
        code_verifier: verifier,
        redirect_uri: twitterRedirects,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${twitterId}:${twitterSecret}`).toString("base64")}`,
        },
      }
    );

    const { access_token } = tokenRes.data;

    // Get Twitter user info
    const userRes = await axios.get(
      "https://api.twitter.com/2/users/me?user.fields=id,name,username,profile_image_url",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const twitterUser = userRes.data.data;
    const exists = await User.findOne({ id: twitterUser.id , provider: 'twitter' })
    const hashedPassword = await bcrypt.hash( twitterUser.username.trim() , 10 )
    
    const user = exists ?? await User.create({
      email: null,
      id: twitterUser.id,
      provider: 'twitter',
      name: twitterUser.name,
      password: hashedPassword,
    })

    const yourToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
        watchlist: user.watchlist,
        updatedAt: user.updatedAt,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Redirect back to frontend with token
    res.redirect(`${process.env.clientUrl}/signin?token=${yourToken}`);

  } catch (err) {
    return res.redirect(`${process.env.clientUrl}/signin?token=failed`);
  }
}