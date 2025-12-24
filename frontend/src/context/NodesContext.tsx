import { List, PNodes } from "../types"
import { useAuth } from "./AuthContext"
import { createContext, useContext, useEffect, useState } from "react"

interface Nodes {
	error: boolean
	updated: number
	loading: string
	pNodes: PNodes[]
	watchlistNodes: PNodes[] | never[]
	setUpdated: React.Dispatch<React.SetStateAction<number>>
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>
	setPNodes: React.Dispatch<React.SetStateAction<PNodes[] | never[]>>
	setWatchlistNodes: React.Dispatch<React.SetStateAction<PNodes[] | never[]>>
}

const NodeContext = createContext< Nodes | undefined >( undefined )

export const NodeProvider = ({children}: { children: React.ReactNode}) => {
	const { user } = useAuth()
	const [ error ,  setError ] = useState(false)
	const [ refresh ,  setRefresh ] = useState(false)
	const [ loading ,  setLoading ] = useState('false')
	const [ updated , setUpdated ] = useState(Date.now())
	const [ pNodes ,  setPNodes ] = useState<PNodes[]>([])
	const [ watchlistNodes ,  setWatchlistNodes ] = useState<PNodes[] | never[]>([])

	const cachedLastUpdated = () => {
		try {
			const raw = localStorage.getItem("updatedAt")
			if (!raw)  return Date.now()
			return Number(JSON.parse(raw))
		} catch (error) { return Date.now() }
	}

	const cachedPNodes = () => {
		try {
			const raw = localStorage.getItem("nodes")
			if (!raw) return []
			return JSON.parse(raw) as PNodes[]
		} catch (error) { return [] }
	}

	const cachedWatchlist = () => {
		try {
			const raw = localStorage.getItem("watchlist")
			return raw ? JSON.parse(raw) as PNodes[] : []
		} catch { return [] }
	}

	const SaveWatchListNodes = () => {
		if ( !user || typeof window === "undefined") return setWatchlistNodes([])

		const prev = cachedWatchlist()

		const nodes = new Map<string, PNodes>( [...pNodes, ...prev].map(node => [node.name, node]) );

		const watchlist: PNodes[] = user.watchlist
			.map((item: List) =>nodes.get(item.pnodeId))
			.filter((node): node is PNodes => Boolean(node));

		localStorage.setItem('watchlist', JSON.stringify( watchlist ))
		setWatchlistNodes( watchlist )
	}

	useEffect(() => {
		const fetchPNodes = async () => {
			setError(false)
			setLoading('fetching')
			try {
				const res = await fetch(`${process.env.REACT_APP_API}/pnodes`)
				if (!res.ok) {
					setError(true)
					setLoading('false')
					setPNodes(cachedPNodes())
					setUpdated(cachedLastUpdated())
					return
				}
				const data = await res.json()
				setError(false)
				setLoading('false')
				setPNodes(data.data)
				setUpdated(Date.now())
				localStorage.setItem("nodes", JSON.stringify(data.data))
				localStorage.setItem("updatedAt", JSON.stringify(Date.now()))
				SaveWatchListNodes()
			} catch (err) {
				setError(true)
				setLoading('error')
			}
		}
		fetchPNodes()
	}, [ refresh ])

	useEffect(()=>{
		SaveWatchListNodes()
		localStorage.setItem("nodes", JSON.stringify(pNodes))
		localStorage.setItem("updatedAt",  JSON.stringify(Date.now()))
	}, [ user , pNodes ])

	return (
		<NodeContext.Provider value={{ loading , setUpdated , updated , setPNodes , pNodes , error , setRefresh , watchlistNodes ,setWatchlistNodes }}>
				{children}
		</NodeContext.Provider>
	)
}

export const useNodes = () => {
	const context = useContext(NodeContext)
	if (!context) throw new Error("useNodes must be used within a NodeProvider")
	return context
}
