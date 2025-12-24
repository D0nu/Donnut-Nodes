import { useNodes } from "./NodesContext"
import { useSocket } from "./SocketContext"
import React , { createContext , useContext , useEffect , useState } from "react"
import { CheckIncludes, classRemove, Ellipses, pickAll } from "../components/functions"

interface Notifiers {
	nReason: string
	sReason: string
	uReason: string[] | never[]
	setUReason: React.Dispatch<React.SetStateAction<string[] | never[]>>
}

const NotifierContext = createContext< Notifiers | undefined >( undefined )

export const NotifierProvider = ({children}: { children: React.ReactNode}) => {
  const { pNodes , error } = useNodes()
  const { ready , loading } = useSocket()
	const [ nReason ,  setNReason ] = useState('') // for nodes
	const [ sReason ,  setSReason ] = useState('') // for sockets
	const [ uReason ,  setUReason ] = useState<string[] | never[]>([ ]) // for settings

	useEffect(()=>{
		let timeout: NodeJS.Timeout | number | undefined

		if ( loading ) setSReason((prev: string )=>`${prev} Retrying socket connection${<Ellipses />}`)
		else if ( ready ) setSReason('Socket connected.')
		else if ( !ready ) setSReason('Socket disconnected.')

		if ( !loading ) timeout = setTimeout(()=> setSReason(''), 2500)
		return ()=> clearTimeout(timeout)
	}, [ ready , loading ])

	useEffect(()=>{
		if ( error && pNodes.length ) setNReason('Failed to fetch nodes, displaying cached data')
		else if ( pNodes.length ) setNReason('PNodes polled')

		const timeout = setTimeout(()=> setNReason(''), 2500)
		return ()=> clearTimeout(timeout)
	}, [ pNodes ])

	useEffect(() => {
		const removeClasses = ( e: MouseEvent ) => {
			const targets = [ '.filters menu' , '.nodeCard menu' , '.searchbars menu' ]
			targets.map( target => {
				pickAll(target).forEach( el => {
					if (e.target !== el && !el?.contains(e.target as Node)) el.classList.remove('inView');
				})
			})
			if (!CheckIncludes( e , '.controls button:last-child' ) && !CheckIncludes( e , 'section.user' )) classRemove('section.user' , 'inView' )
			if (!CheckIncludes( e , '.limit')) classRemove('.limit', 'inView')
		}
		window.addEventListener('click', removeClasses)
		return () => window.removeEventListener('click', removeClasses)
	}, [ ])

	return (
		<NotifierContext.Provider value={{ nReason , sReason , uReason , setUReason }}>
				{children}
		</NotifierContext.Provider>
	)
}

export const useNotifiers = () => {
	const context = useContext(NotifierContext)
	if (!context) throw new Error("useNotifiers must be used within a NotifierProvider")
	return context
}