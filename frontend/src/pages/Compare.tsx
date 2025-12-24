import { format, isSameDay } from "date-fns"
import { PNodes , Histories } from './../types'
import { useNodes } from "./../context/NodesContext"
import { ChartComponent, DoubleChartComponent, InputsPack } from "../components/pageParts"
import { useComparison } from "./../context/CompareContext"
import { useState , useEffect, SetStateAction } from "react"
import { loaderCircleSvg, Refreshsvg, Searchsvg } from "../components/svgPack"
import { used , online , Trim , Ellipses , classAdd , formatSmartDate } from "../components/functions"

type NodeResponse = {
  data?: PNodes
  error?: string
  histories: Histories[] | never[]
}

type DataType = 'uptime' | 'storage_used' | 'storage_committed' | 'storage_usage_percent'

const Compare = () => {
  const isMobile = window.innerWidth < 640;
  const [ contextError , setContextError ] = useState('')
  const [ compareError , setCompareError ] = useState('')
  const [ searchCompare , setSearchCompare ] = useState('')
  const [ searchContext , setSearchContext ] = useState('')
  const { pNodes , error  , loading , updated } = useNodes()
  const [ contextRetry , setContextRetry ] = useState(false)
  const [ compareRetry , setCompareRetry ] = useState(false)
  const [ isContextLoading , setIsContextLoading ] = useState(false)
  const [ isCompareLoading , setIsCompareLoading ] = useState(false)
  const { context , compare  , setContext, setCompare } = useComparison()
  const [ contextHistories , setContextHistories ] = useState< never[] | Histories[]>([])
  const [ compareHistories , setCompareHistories ] = useState< never[] | Histories[]>([])

  const dataFormer = ( value: DataType , histories: Histories[] , divisor = 1 ) => histories.map((hist: Histories) => {
    const val: number = hist[value] / divisor

    let lastDate: Date | null = null
    const date = new Date(hist.observed_at);
    const showDate = !lastDate || !isSameDay(date, lastDate);

    lastDate = date;
    return { time: showDate ?  format(date, "dd MMM, yy HH:mm:ss") : format(new Date(hist.observed_at), "HH: mm:ss"), value: val }
  })

  const useContextHistories = () => {
    const uptimeData = dataFormer('uptime', contextHistories )
    const storageData = dataFormer('storage_used', contextHistories , 1000000)
    const percentData = dataFormer('storage_usage_percent', contextHistories )
    const committedData = dataFormer('storage_committed', contextHistories , 1000000000)

    return { uptimeData , storageData , committedData , percentData }
  }

  const useCompareHistories = () => {
    const uptimeData = dataFormer('uptime', compareHistories )
    const storageData = dataFormer('storage_used', compareHistories , 1000000)
    const percentData = dataFormer('storage_usage_percent', compareHistories )
    const committedData = dataFormer('storage_committed', compareHistories , 1000000000)

    return { uptimeData , storageData , committedData , percentData }
  }

  const useContextData = () => {
    const uptimes = context?.uptime || 0
    const storage = context ? context.storage_used / 1000000 : 0
    const uptime = context ? `${ Math.floor(uptimes / 3600) > 0 ? `${Math.floor(uptimes / 3600)} hrs,` : ''} ${ uptimes % 60 } minutes, ${ uptimes % 60 } seconds` : 'Not set'

    const [ status , setStatus ] = useState( context ? online( context , updated ) ? 'Online' : 'Offline' : 'Not set' )
    const [ lastSeen , setLastSeen ] = useState(context ? formatSmartDate(context.last_seen || context.last_seen_timestamp * 1000 ) : 'Not set' )
    
    useEffect(()=>{
      const interval = setInterval(()=> {
        if (!context) return
        setStatus(online( context , updated ) ? 'Online' : 'Offline' )
        setLastSeen(formatSmartDate(context ? context.last_seen || context.last_seen_timestamp * 1000 : Date.now()))
      }, 1000)
      return () => clearTimeout(interval)
    }, [ updated ])
    
    return {
      status,
      uptime,
      lastSeen,
      port: context?.rpc_port || 'Not set',
      version: context?.version || 'Not set',
      address: context?.address || 'Not set',
      name: context ? context.name : 'Not set',
      pubkey: context ? context.is_public ? context?.pubkey : 'Hidden' : 'Not set',
      access: context ? Boolean(context.is_public) ? 'Public' : 'Private' : 'Not set',
      storage:  `${context ? storage < 0.0005 ? '< 0.0005' : storage : 'Not set' } ${ context ? 'MB' : '' }`,
      committed: `${ context ? context.storage_committed / 1000000000 : 'Not set' } ${ context ? 'GB' : '' }`,
      used: context ? used(context) > 75 ? 'Heavy' : used(context) > 25 && used(context) < 75 ? 'Medium' : 'Low' : 'Not set',
      firstSeen: context ? formatSmartDate(context.first_seen || ( context.last_seen_timestamp - context.uptime ) * 1000 ) : 'Not set',
    }
  }

  const useCompareData = () => {
    const uptimes = compare?.uptime || 0
    const storage = compare ? compare.storage_used / 1000000 : 0
    const uptime = compare ? `${ Math.floor(uptimes / 3600) > 0 ? `${Math.floor(uptimes / 3600)} hrs,` : ''} ${ uptimes % 60 } minutes, ${ uptimes % 60 } seconds` : 'Not set'

    const [ status , setStatus ] = useState( compare ? online( compare , updated ) ? 'Online' : 'Offline' : 'Not set' )
    const [ lastSeen , setLastSeen ] = useState(compare ? formatSmartDate(compare.last_seen || compare.last_seen_timestamp * 1000 ) : 'Not set' )
    
    useEffect(()=>{
      const interval = setInterval(()=> {
        if (!compare) return
        setStatus(online( compare , updated ) ? 'Online' : 'Offline' )
        setLastSeen(formatSmartDate( compare ? compare.last_seen || compare.last_seen_timestamp * 1000 : Date.now() ))
      }, 1000)
      return () => clearTimeout(interval)
    }, [ updated ])

    return {
      status,
      uptime,
      lastSeen,
      port: compare?.rpc_port || 'Not set',
      version: compare?.version || 'Not set',
      address: compare?.address || 'Not set',
      name: compare ? compare.name : 'Not set',
      pubkey: compare ? compare.is_public ? compare?.pubkey : 'Hidden' : 'Not set',
      access: compare ? Boolean(compare.is_public) ? 'Public' : 'Private' : 'Not set',
      storage:  `${compare ? storage < 0.0005 ? '< 0.0005' : storage : 'Not set' } ${ compare ? 'MB' : '' }`,
      committed: `${ compare ? compare.storage_committed / 1000000000 : 'Not set' } ${ compare ? 'GB' : '' }`,
      used: compare ? used(compare) > 75 ? 'Heavy' : used(compare) > 25 && used(compare) < 75 ? 'Medium' : 'Low' : 'Not set',
      firstSeen: compare ? formatSmartDate(compare.first_seen || ( compare.last_seen_timestamp - compare.uptime ) * 1000 ) : 'Not set',
    }
  }

  const NodeList = ({ search , value , setValue } : { search: string , value: PNodes | undefined , setValue: React.Dispatch<SetStateAction<PNodes | undefined >>}) => {
    const list = search ? pNodes.filter((node: PNodes) => Trim(node.name).includes(Trim(search))) : pNodes
    return (
      <div className='nodesList'>
        { list.length ? list.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '')).map(( node: PNodes, i: number ) => (
          <span key={i} onClick={()=> node !== value && setValue( node )}> { node.name } </span>
        )) : <p> No matching pnode. </p> }
      </div>
    )
  }
  
  const contexts = useContextHistories()
  const compares = useCompareHistories()

  const Resolve = () => {
    const comparedata = useCompareData()
    const contextdata = useContextData()

    return loading === 'fetching' ? (
      <div className="bg-set">
        <h2 style={{width: '275px'}}> {loaderCircleSvg()} Loading nodes {  <Ellipses /> }</h2>
        <p> Getting node list from database.</p>
        <div> <img src='/chasing.png' alt='loading'></img></div>
      </div>
      ) : !pNodes.length && error ? (
        <div className="bg-set">
        <h2> Could not get pnodes from database. </h2>
        <p> Try restoring internet connection or refreshing nodes data.</p>
        <div> <img src='/network.png' alt='network_error'></img></div>
      </div>
      ) : !context && !compare ? (
        <div className="bg-set">
        <h2> Select nodes for comparison. </h2>
        <p> No nodes selected. Search for nodes from searchbars or seletct from dropdown.</p>
        <div> <img src='/empty.png' alt='idle_comparison'></img></div>
      </div>
      ) : (
      <section className="datas">
        <p> <span>Name:</span> <span>{contextdata.name}</span> <span>{comparedata.name}</span> </p>
        <p> <span>Port:</span> <span>{contextdata.port}</span> <span>{comparedata.port}</span> </p>
        <p> <span> Status:</span> <span>{contextdata.status}</span> <span>{comparedata.status}</span> </p>
        <p> <span>Access:</span> <span>{contextdata.access}</span> <span>{comparedata.access}</span> </p>
        <p> <span>Address:</span> <span style={{ wordBreak: 'break-all' }}>{contextdata.address}</span> <span style={{ wordBreak: 'break-all' }}>{comparedata.address}</span> </p>
        <p> <span> Storage used:</span> <span>{contextdata.storage}</span> <span>{comparedata.storage}</span> </p>
        <p> <span> Storage committed:</span> <span>{contextdata.committed}</span> <span>{comparedata.committed}</span> </p>
        <p> <span> Storage use rate:</span><span>{contextdata.used}</span> <span>{comparedata.used}</span>  </p>
        <p> <span> Last seen:</span> <span>{contextdata.lastSeen}</span> <span>{comparedata.lastSeen}</span> </p>
        <p> <span> First seen:</span> <span>{contextdata.firstSeen}</span> <span>{comparedata.firstSeen}</span> </p>
        <p> <span> Uptime:</span> <span>{contextdata.uptime}</span> <span>{comparedata.uptime}</span> </p>
        <p> <span> Version:</span> <span style={{ wordBreak: 'break-all' }}>{contextdata.version}</span> <span style={{ wordBreak: 'break-all' }}>{comparedata.version}</span> </p>
        <p> <span> Public key</span> <span style={{ wordBreak: 'break-all' }}>{contextdata.pubkey}</span> <span style={{ wordBreak: 'break-all' }}>{comparedata.pubkey}</span> </p>
      </section>
    )
  }

  const Histories = () => {
    const loading = isCompareLoading || isContextLoading
    const noNodes = compareHistories.length < 1 || contextHistories.length < 1

    const Loads =  () => {
      if (!loading) return <></>
      return (
        <div className="bg-set">
          <h2 style={{width: '275px'}}> {loaderCircleSvg()} Loading { isCompareLoading && isContextLoading ? 'nodes' : isContextLoading ? 'context' : 'compare' } {  <Ellipses /> }</h2>
          <p> Getting node list from database.</p>
          <div> <img src='/graphs.png' alt='loading'></img></div>
        </div>
      )
    }

    const Errors = () => {
      if ( !noNodes ) return <></>
      return compareError && contextError ? (
        <div className="bg-set">
          <h2> Failed to get either node history </h2>
          <p> Try restoring internet connection or refreshing nodes data.</p>
          <div> <img src='/network.png' alt='loading'></img></div>
          <button onClick={()=>{ setCompareRetry((prev: boolean) => !prev) ; setContextRetry((prev: boolean) => !prev)  }}>{Refreshsvg()}</button>
        </div>
      ) : contextError ? (
        <div className="bg-set">
          <h2> Could not get context node</h2>
          <p> Try restoring internet connection or refreshing nodes data.</p>
          <div> <img src='/network.png' alt='loading'></img></div>
          <button onClick={()=>setContextRetry((prev: boolean) => !prev)}>{Refreshsvg()}</button>
        </div>
      ) : compareError ? (
        <div className="bg-set">
          <h2> Could not get compare node</h2>
          <p> Try restoring internet connection or refreshing nodes data.</p>
          <div> <img src='/network.png' alt='loading'></img></div>
          <button onClick={()=>setCompareRetry((prev: boolean) => !prev)}>{Refreshsvg()}</button>
        </div>
      ) : <></>
    }

    const Stales = () => {
      if ( !noNodes || loading) return <></>
      return !compare && !context ? (
        <></>
      ) : ( compare && !compareHistories.length ) && ( context && !contextHistories.length ) ? (
        <div className="bg-set">
          <h2> Pnodes histories unavailable.</h2>
          <p> { compare.name } and { context.name} do not have any history with Donnut-nodes. These may be new nodes, wait for next poll</p>
          <div> <img src='/shaky.png' alt='loading'></img></div>
          <button onClick={()=>setContextRetry((prev: boolean) => !prev)}>{Refreshsvg()}</button>
        </div>
      ) : compare && !compareHistories.length ? (
        <div className="bg-set">
          <h2> Compare history unavailable.</h2>
          <p> Pnode does not have any history with Donnut-nodes. This may be a new node, wait for next poll</p>
          <div> <img src='/shaky.png' alt='loading'></img></div>
          <button onClick={()=>setContextRetry((prev: boolean) => !prev)}>{Refreshsvg()}</button>
        </div>
      ) : context && !contextHistories.length ? (
        <div className="bg-set">
          <h2> Context history unavailable.</h2>
          <p> Pnode does not have any history with Donnut-nodes. This may be a new node, wait for next poll</p>
          <div> <img src='/shaky.png' alt='loading'></img></div>
          <button onClick={()=>setContextRetry((prev: boolean) => !prev)}>{Refreshsvg()}</button>
        </div>
      ) : <></>
    }

    return (
      <>
        <Loads />
        <Errors />
        <Stales />
      </>
    )
  }

  useEffect(()=>{
    const contextNow = pNodes.find(( node: PNodes )=> node.pubkey === context?.pubkey ) || context 
    const compareNow = pNodes.find(( node: PNodes )=> node.pubkey === compare?.pubkey ) || compare 
    setContext( contextNow )
    setCompare( compareNow )
  }, [ pNodes ])

  useEffect(()=>{
    const contextNow = pNodes.find(( node: PNodes )=> node.pubkey === context?.pubkey ) || context 
    const compareNow = pNodes.find(( node: PNodes )=> node.pubkey === compare?.pubkey ) || compare

    const contextTry = context || contextNow
    const compareTry = compare || compareNow
    if ( !contextHistories.length && contextTry ) setContextRetry((prev: boolean) => !prev )
    if ( !compareHistories.length && compareTry ) setCompareRetry((prev: boolean) => !prev )
  }, [ pNodes , compare , context ])
    
  useEffect(()=>{
    ( async() => {
      if (!compare || isCompareLoading ) return
      setIsCompareLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/pnodes/${compare.pubkey}`)
        const node: NodeResponse = await res.json()
        if (!res.ok) {
          setIsCompareLoading(false)
          setCompareError( node.error || 'Failed to get pnode histories')
        } else {
          setCompareError('')
          setCompare( node.data )
          setIsCompareLoading(false)
          setCompareHistories( node.histories )
        }
      } catch {
        setCompareError('Error occured connecting to the database') 
      } finally {
        setIsCompareLoading(false)
      }
    })()
  }, [ compareRetry ])

  useEffect(()=>{
    ( async() => {
      if (!context || isContextLoading ) return
      setIsContextLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_API || 'http://localhost:4000'}/pnodes/${context.pubkey}`)
        const node: NodeResponse = await res.json()
        if (!res.ok) {
          setIsContextLoading(false)
          setContextError( node.error || 'Failed to get pnode histories')
        } else {
          setContextError('')
          setContext( node.data )
          setIsContextLoading(false)
          setContextHistories( node.histories )
        }
      } catch {
        setContextError('Error occured connecting to the database') 
      } finally {
        setIsContextLoading(false)
      }
    })()
  }, [ contextRetry ])

  return (
    <main>
      <section className='page'>
        { pNodes.length > 0 && (
          <div className='searchbars'>
            <menu id='context'>
              <InputsPack name='context' svg={Searchsvg()} classes='left' value={searchContext} placeholder='Search pnodes' onClick={()=> classAdd('#context', 'inView')} onChange={( e: React.ChangeEvent<HTMLInputElement> )=> { classAdd('#context', 'inView') ; setSearchContext( e.target.value )}}/>
              <NodeList search={searchContext} value={compare} setValue={setContext}/>
            </menu>
            <menu id='compare'>
              <InputsPack name='compare' svg={Searchsvg()} classes='left' value={searchCompare} placeholder='Search pnodes' onClick={()=> classAdd('#compare', 'inView')} onChange={( e: React.ChangeEvent<HTMLInputElement> )=> { classAdd('#compare', 'inView') ; setSearchCompare( e.target.value )}}/>
              <NodeList search={searchCompare} value={context} setValue={setCompare}/>
            </menu>
          </div>
        )}
        <Resolve />
        <Histories />
        {compareHistories.length && contextHistories.length ? (
          <div className="histories">
            <DoubleChartComponent name='uptime' data={contexts.uptimeData} secondData={compares.uptimeData} isMobile={isMobile} unit='s' names={[context?.name || 'uptime' , compare?.name || 'uptime']} />
            <DoubleChartComponent name='storage used' data={contexts.storageData} secondData={compares.uptimeData} isMobile={isMobile} unit='MB' names={[context?.name || 'storage used' , compare?.name || 'storage used']} />
            <DoubleChartComponent name='storage committed' data={contexts.committedData} secondData={compares?.uptimeData || 'uptime'} isMobile={isMobile} unit='GB' names={[context?.name || 'storage committed' , compare?.name || 'storage committed']} />
            <DoubleChartComponent name='storage used percent' data={contexts.percentData} secondData={compares.uptimeData} isMobile={isMobile} unit='%' names={[context?.name || 'storage used percent' , compare?.name || 'storage used percent']} />
          </div>
        ) : contextHistories.length ? (
          <div className="histories">
            <ChartComponent data={contexts.uptimeData} isMobile={isMobile} unit='s' name='uptime' />
            <ChartComponent data={contexts.storageData} isMobile={isMobile} unit='MB' name='storage used' />
            <ChartComponent data={contexts.committedData} isMobile={isMobile} unit='GB' name='storage committed' />
            <ChartComponent data={contexts.percentData} isMobile={isMobile} unit='%' name='storage used percent' />
          </div>
        ) : compareHistories.length ? (
          <div className="histories">
            <ChartComponent data={compares.uptimeData} isMobile={isMobile} unit='s' name='uptime' />
            <ChartComponent data={compares.storageData} isMobile={isMobile} unit='MB' name='storage used' />
            <ChartComponent data={compares.committedData} isMobile={isMobile} unit='GB' name='storage committed' />
            <ChartComponent data={compares.percentData} isMobile={isMobile} unit='%' name='storage used percent' />
          </div>
        ) : <></>
      }
      </section>
    </main>
  )
}

export default Compare
