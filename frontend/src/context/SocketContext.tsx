import { PNodes } from "../types"
import { useNodes } from "./NodesContext"
import { io, Socket } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react"

interface SocketSet {
  ready: boolean
  loading: boolean
  socket: Socket | null
}

const SocketContext = createContext< SocketSet | undefined >( undefined )

export const SocketProvider = ({children}: { children : React.ReactNode }) => {
  const { setPNodes , setUpdated } = useNodes()
	const [ ready ,  setReady ] = useState(false)
	const [ loading ,  setLoading ] = useState(false)
	const [ socket ,  setSocket ] = useState< Socket | null >(null)

	useEffect(() => {
    if (socket) return
    const s = io( process.env.REACT_APP_API || "http://localhost:4000" , {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionAttempts: 12,
    })

    setSocket(s)

    s.on('connect', () => {
      setReady(true)
      setLoading(false)
    })
    
    s.on('disconnect', () => {
      setReady(false)
      setLoading(false)
    })

    s.on('connect_error', () => {
      setReady(false)
      setLoading(false)
    })

    s.on('reconnect', () => {
      setReady(false)
      setLoading(true)
    })

    s.on( "pnodes:update", (data) =>{
      let nodes: PNodes[] | never[] = []
      setPNodes((prev: PNodes[]) => {
        const NodeInstance = (node: PNodes) => {
          const n = data.find( ( n: PNodes ) => n.pubkey === node.pubkey )
          return n ? { ...node, ...n } : node
        }
        const socketInstance = ( nodes: PNodes[], node: PNodes) => {
          const n = !nodes.find( ( n: PNodes ) => n.pubkey === node.pubkey )
          return n && node.pubkey ? node : null
        }
        nodes = [
          ...prev.map(( node: PNodes ) => NodeInstance(node)),
          ...data.map( ( n: PNodes ) => socketInstance(prev, n))
        ].filter(( n: PNodes | null ) => n && n?.pubkey )
        return nodes
      })
      setUpdated(Date.now())
    })

    return ()=> {
      s.disconnect()
    }

	}, [ ])

	return (
		<SocketContext.Provider value={{ loading , socket , ready }}>
				{children}
		</SocketContext.Provider>
	)
}

export const useSocket = () => {
	const context = useContext(SocketContext)
	if (!context) throw new Error("useSocket must be used within a SocketProvider")
	return context
}