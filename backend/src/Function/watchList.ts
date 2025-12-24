import { List } from "../types"
import { verifyJWT } from "./Utils"
import { Request , Response } from "express"

export async function AddToWatchlist ( req: Request , res:Response ){

	const { itemId } = req.body
	if ( typeof itemId !== 'string' || !itemId.trim() ) return res.status( 400 ).json({ error: 'Item id should be a non-empty string text' })

	try {
		const user = await verifyJWT( req )

		if (user.watchlist.find(( item: List ) => item.pnodeId === itemId.trim() )) return res.status( 400 ).json({ error: 'Item added to watchlist already' })

		user.watchlist.push({ pnodeId: itemId.trim() })
		await user.save()

		return res.status( 200 ).json({ message: 'Item added to watchlist successfully' })
	} catch (error) {
		return res.status( 500 ).json({ message: 'Failed to add item to watchlist. Try again later' })
	}
}

export async function RemoveFromWatchlist ( req: Request , res:Response ){

	const { itemId } = req.body

	if ( typeof itemId !== 'string' || !itemId.trim() ) return res.status( 400 ).json({ error: 'Item id should be a string text' })

	try {
		const user = await verifyJWT( req )

		if ( itemId === "all" ) {
			user.watchlist = []
			await user.save()
			return res.status( 200 ).json({ message: 'Watchlist cleared successfully' })
		}

		const exists = user.watchlist.some(( item: List ) => item.pnodeId === itemId.trim() )

		if (!exists) return res.status( 400 ).json({ error: "Item does not exist in user's  watchlist" })

		user.watchlist = user.watchlist.filter(( set: List ) => set.pnodeId !== itemId.trim() )
		await user.save()

		return res.status( 200 ).json({ message: 'Item removed from watchlist successfully' })
	} catch (error) {
		return res.status( 500 ).json({ message: 'Failed to remove item from watchlist. Try again later' })
	}
}