import User from "../Model/User"
import { Request } from "express"
import jwt , { JwtPayload } from "jsonwebtoken"

interface AuthTokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export async function verifyJWT ( req: Request ){

	try {
		const { authorization } = req.headers
		const authKey = authorization?.split(' ')[1] || ''

		const token = jwt.verify( authKey , process.env.JWT_SECRET!) as AuthTokenPayload

		if (!token) throw new Error('Unauthorized attempt declined' )

		const user = await User.findById( token.id )

		if (!user) throw new Error( 'User account not found' )

		return user
	} catch {
		throw new Error('Failed to authorize user. Try again later' )
	}
}