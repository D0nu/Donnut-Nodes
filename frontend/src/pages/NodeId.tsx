import './../node.css'
import { useEffect, useState } from "react"
import { format, isSameDay } from 'date-fns'
import { useParams } from "react-router-dom"
import { PNodes , Histories } from "./../types"
import { useNodes } from '../context/NodesContext'
import { loaderCircleSvg, TrackerSvg } from "../components/svgPack"
import { ChartComponent, WatchListHandler } from '../components/pageParts'
import { Ellipses, formatSmartDate, online, used } from "../components/functions"

type NodeResponse = {
  data?: PNodes
  error?: string
  histories: Histories[] | never[]
}

type DataType = 'uptime' | 'storage_used' | 'storage_committed' | 'storage_usage_percent'

const NodeId = () => {
  const { id } = useParams()
  const [ err , setErr ] = useState('')
  const [ retry , setRetry ] = useState(false)
  const [ isLoading , setIsLoading ] = useState(true)
  const { pNodes , updated , loading , error } = useNodes()
  const [ histories , setHistories ] = useState< never[] | Histories[]>([])
  const [ context , setContext ] = useState( pNodes.find(( node: PNodes )=> node.pubkey === id ) )

  const [ status , setStatus ] = useState( context ? online( context , updated ) ? 'Online' : 'Offline' : 'Offline' )
  const [ lastSeen , setLastSeen ] = useState(formatSmartDate(context ? context.last_seen || context.last_seen_timestamp * 1000 : Date.now()))
  
  const uptimes = context?.uptime || 0
  const isMobile = window.innerWidth < 640;
  const storage = context ? context.storage_used / 1000000 : 0
  const uptime = `${ Math.floor(uptimes / 3600) > 0 ? `${Math.floor(uptimes / 3600)} hrs,` : ''} ${ uptimes % 60 } minutes, ${ uptimes % 60 } seconds`

  const dataFormer = ( value: DataType , divisor = 1 ) => histories.map((hist: Histories) => {
    const val: number = hist[value] / divisor

    let lastDate: Date | null = null
    const date = new Date(hist.observed_at);
    const showDate = !lastDate || !isSameDay(date, lastDate);

    lastDate = date;
    const dateDisplay = showDate ?  format(date, "dd MMM, yy HH:mm:ss") : format(new Date(hist.observed_at), "HH: mm:ss")
    return { time: dateDisplay, value: val }
  })

  // const onlineData = dataFormer('online')
  const uptimeData = dataFormer('uptime')
  const storageData = dataFormer('storage_used', 1000000)
  const committedData = dataFormer('storage_committed', 1000000)
  const percentData = dataFormer('storage_usage_percent')

  const dataDisplay = () => {
    return !context ? ( loading === 'fetching' ? (
      <div className="bg-set">
        <h2 style={{width: '275px'}}> {loaderCircleSvg()} Loading data { loading && <Ellipses /> }</h2>
        <p> Getting node list from database.</p>
        <div> <img src='/chasing.png' alt='loading'></img></div>
      </div>
      ) :  error ? (
        <div className="bg-set">
        <h2> Could not get pnode from nodelist. </h2>
        <p> Try restoring internet connection or refreshing nodes data.</p>
        <div> <img src='/network.png' alt='loading'></img></div>
      </div>
      ) :(
      <div className="bg-set">
        <h2> Could not find pnode data.</h2>
        <p> Try getting details for a valid pnode from node list.</p>
        <div> <img src='/empty.png' alt='loading'></img></div>
      </div>
    )) : <div className="data">
        <h2>{TrackerSvg()} {context?.name} <WatchListHandler node={context} /> </h2>
        <div>
          <span>Port: <strong>{context.rpc_port}</strong></span>
          <span> Status: <strong>{ status }</strong></span>
          <span>Node access: <strong>{Boolean(context.is_public) ? 'Public' : 'Private'}</strong></span>
          <span>Address: <strong>{context.address}</strong></span>
          <span> Storage used: <strong>{ storage < 0.0005 ? '< 0.0005' : storage } MB</strong></span>
          <span> Storage committed: <strong>{context.storage_committed / 1000000} MB</strong></span>
          <span> Storage use rate: <strong>{used(context) > 75 ? 'Heavy' : used(context) > 25 && used(context) < 75 ? 'Medium' : 'Low'} </strong></span>
          <span> Last seen: <strong>{ lastSeen }</strong></span>
          <span> First seen: <strong>{formatSmartDate(context.first_seen || ( context.last_seen_timestamp - context.uptime ) * 1000 )}</strong></span>
          <span> Uptime: <strong>{uptime}</strong></span>
          <span> Version: <strong>{context.version}</strong></span>
          { context.is_public && <span> Public key: <strong style={{ wordBreak: 'break-all' }}>{context.pubkey}</strong></span>}
        </div>
      </div>
  }

  const HistoryDisplay = () => {
    return !histories.length ? (isLoading ? (
      <div className="bg-set">
        <h2 style={{width: '275px'}}> {loaderCircleSvg()} Loading history { loading && <Ellipses /> }</h2>
        <p> Getting node history from database.</p>
        <div> <img src='/graphs.png' alt='loading'></img></div>
      </div>
      ) : err && context ? (
        <div className="bg-set">
        <h2> Could not get pnode history data. </h2>
        <p> { err } </p>
        <div> <img src='/charts.png' alt='loading'></img></div>
      </div>
      ) : context && (
      <div className="bg-set">
        <h2> Pnode history unavailable.</h2>
        <p> We could not find any instance of pnode from our database.</p>
        <div> <img src='/graphs.png' alt='loading'></img></div>
      </div>
    )) : <div className="histories">
      <ChartComponent data={uptimeData} isMobile={isMobile} unit='s' name='uptime' />
      <ChartComponent data={storageData} isMobile={isMobile} unit='MB' name='storage used' />
      <ChartComponent data={committedData} isMobile={isMobile} unit='MB' name='storage committed' />
      <ChartComponent data={percentData} isMobile={isMobile} unit='%' name='storage used percent' />
    </div>
  }

  useEffect(()=>{
    ( async() => {
      setIsLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/pnodes/${id}`)
        const node: NodeResponse = await res.json()
        if (!res.ok) {
          setIsLoading(false)
          setErr( node.error || 'Failed to get pnode histories')
        } else {
          setErr('')
          setIsLoading(false)
          setContext( node.data )
          setHistories( node.histories )
        }
      } catch {
        setErr('Error occured connecting to the database') 
      } finally {
        setIsLoading(false)
      }
    })()
  }, [ retry , id ])

  useEffect(()=>{
    setContext((prev: PNodes | undefined ) => pNodes.find(( node: PNodes )=> node.pubkey === id ) || prev )
    if ( !histories.length ) setRetry((prev: boolean) => !prev )
  }, [ pNodes ])

  useEffect(()=>{
    const interval = setInterval(()=> {
      if (!context) return
      setStatus(online( context , updated ) ? 'Online' : 'Offline' )
      setLastSeen(formatSmartDate(context ? context.last_seen || context.last_seen_timestamp * 1000 : Date.now()))
    }, 1000)
    return () => clearTimeout(interval)
  }, [ updated ])

  return (
    <main>
      <section className="page">
        {dataDisplay()}
        {HistoryDisplay()}
      </section>
    </main>
  )
}

export default NodeId
