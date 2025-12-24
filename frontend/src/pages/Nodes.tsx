import { PNodes , FilterKeys } from '../types';
import { useNodes } from '../context/NodesContext';
import { useRef, useState , useEffect } from 'react';
import { startOfHour, startOfDay, startOfWeek, startOfYesterday } from 'date-fns';
import { PageFilters , NodeCard , ScrollToTop, NodeCardLabels } from './../components/pageParts';
import { Donnutsvg, Leftsvg, loaderCircleSvg, dblLeftsvg, TrackerSvg } from '../components/svgPack';
import { Trim , Ellipses , getNodeAge, online, used, efficiency, formatSmartDate } from '../components/functions';

const Nodes = () => {
  const before = useRef<number>(1)
  const [ eff , setEff ] = useState('')
  const [ use , setUse ] = useState('')
  const [ age , setAge ] = useState('')
  const [ time , setTime ] = useState('')
  const [ pub , setPublic ] = useState('')
  const [ rev , setRev ] = useState(false)
  const [ index , setIndex ] = useState( 0 )
  const [ status , setStatus ] = useState('')
  const [ filter , setFilter ] = useState('')
  const [ limit , setLimit ] = useState( 50 )
  const [ batches , setBatches ] = useState([0])
  const [ display , setDisplay ] = useState< PNodes[]>([])
  const [ screenBatches , setScreenBatches] = useState([0])
  const { pNodes , updated , error , loading } = useNodes()
  const [ current , setCurrent ] = useState<FilterKeys>('name')
  const [ lastUpdated , setLastUpdated ] = useState( formatSmartDate( updated ))
  const searched = age || use || status || eff || time || pub || status || filter

  const avgUptime = () => {
    let totalUptime: number = 0
    const length = pNodes.length
    const uptimes = pNodes.map(( nodes:PNodes) => { return nodes.uptime} )
    uptimes.forEach((val: number) =>{ totalUptime > 0 ? totalUptime = totalUptime + val : totalUptime = val })
    return ( length ? totalUptime / length : 0 ).toFixed(2)
  }

  const totalUsed = () => {
    let start: number = 0
    const committed = pNodes.map(( nodes:PNodes) => { return nodes.storage_used} )
    committed.forEach((val: number) =>{ start > 0 ? start = start + val : start = val })
    return start
  }

  const totalCommitted = () => {
    let start: number = 0
    const committed = pNodes.map(( nodes:PNodes) => { return nodes.storage_committed} )
    committed.forEach((val: number) =>{ start > 0 ? start = start + val : start = val })
    return start
  }

  const Filters = ( filter : string ) => {
    let filtered = pNodes
    const now = Date.now()
    const fil = Trim(filter)

    const startHour = startOfHour(now).getTime();
    const startToday = startOfDay(now).getTime();
    const startThisWeek = startOfWeek(now).getTime();
    const startYesterday = startOfYesterday().getTime();
    
    filtered = filtered.filter(( node:PNodes | undefined )=> node !== undefined )

    if ( fil ) filtered = filtered.filter(( nodes: PNodes | never ) => Trim(nodes[current]).includes(fil) )

    if ( pub ) filtered = filtered.filter(( nodes: PNodes | never ) => pub === "Public" ? Boolean(nodes.is_public) : !Boolean(nodes.is_public) )

    if ( age ) filtered = filtered.filter(( nodes: PNodes | never ) => getNodeAge( nodes , age ))

    if ( status ) filtered = filtered.filter(( nodes: PNodes | never ) => status === 'online' ? online(nodes, updated) : !online(nodes, updated) )

    if ( use ) filtered = filtered.filter(( nodes: PNodes | never ) => use === 'Heavy' ? used(nodes) > 75 
    : use === 'Medium' ? used(nodes) > 25 && used(nodes) < 75
    : used(nodes) <= 25 )

    if ( eff ) filtered = filtered.filter(( nodes: PNodes | never ) => eff === 'High' ?efficiency(nodes) > 75
    : eff === 'Medium' ? efficiency(nodes) > 25 && efficiency(nodes) < 75
    : efficiency(nodes) <= 25 )

    if ( time ) filtered = filtered.filter((node: PNodes) => {
      const lastSeen = node.last_seen || node.last_seen_timestamp
      switch (time) {
        case 'In an hour':
          return lastSeen >= startHour;
        case 'Today':
          return lastSeen >= startToday;
        case 'Yesterday':
          return lastSeen >= startYesterday && lastSeen < startToday;
        case 'This week':
          return lastSeen >= startThisWeek && lastSeen < startYesterday;
        case 'Earlier':
          return lastSeen < startThisWeek;
        default:
          return false;
      }
    });

    if ( rev && searched ) filtered = pNodes.filter(( nodes: PNodes | never ) => !filtered.find(( node: PNodes )=> nodes === node ))

    if (JSON.stringify(filtered) !== JSON.stringify(display)) setDisplay( filtered )

    const start = index * limit
    const end = start + limit > filtered.length ? filtered.length : start + limit

    filtered = filtered.length > 1 ? filtered.slice( start , end - 1 ) : filtered

     return filtered.length === 0 ? ( error ? (
      <div className="bg-set">
        <h2> Could not get pnodes from database. </h2>
        <p> Try restoring internet connection or refreshing nodes list.</p>
        <div> <img src='/network.png' alt='loading'></img></div>
      </div>
     ) : loading === 'fetching' ? (
      <div className="bg-set">
        <h2 style={{width: '275px'}}> {loaderCircleSvg()} Loading pnodes { loading && <Ellipses /> }</h2>
        <p> Getting node list from database.</p>
        <div> <img src='/looking.png' alt='loading'></img></div>
      </div>
     ) : searched ? (
      <div className="bg-set">
        <h2>No Pnodes found, matching your criteria.</h2>
        <p> Try changing filters or removing entirely.</p>
        <div> <img src='/notfound.png' alt='loading'></img></div>
      </div>
    ) : (
      <div className="bg-set">
        <h2>No Pnodes watched, wait for next poll.</h2>
        <p> We will be polling in the next 90 seconds.</p>
        <div> <img src='/chasing.png' alt='loading'></img></div>
      </div>
    )) : <div className="nodes">
      <NodeCardLabels limit={limit} handleLimit={(limit: number) => setLimit(limit)} />
        {filtered.map(( node: PNodes , i : number ) => <NodeCard key={node.name} tag={i} node={node} />)}
      </div>
  }
  
  useEffect(()=>{
    const length = display.length
    const oldlimit =  before?.current || 50
    setBatches( Array.from( { length: Math.ceil( length / limit ) }, ( _, i ) => i ) )
    setIndex((prev: number) => {
      const maxBatch = Math.floor( length / limit )
      const newIndex = Math.floor( oldlimit * prev / limit )
      return newIndex * limit >= length ? maxBatch : newIndex
    })
    before.current = limit
  }, [ display , limit , searched ])

  useEffect(()=>{
    const resizer = () => {
      const width = window.innerWidth
      if ( batches.length <= 2 ) setScreenBatches( batches )
      else {
        const w = width - 240 // width of other left / right buttons and screen padding
        const rate = ( w - (( batches.length - 1 ) * 10) ) / 40 // width of one button plus flex gap
        const allowance = Math.floor(rate) / 2
        if ( Math.floor(rate) >= batches.length ) setScreenBatches( batches )
        const min = Math.max( -1 , index - Math.floor(allowance))
        const max = Math.min( batches.length , index + Math.floor(allowance))
        const filtered = batches.filter((val: number ) => val > min && val < max )
        setScreenBatches( filtered.length > 1 ? filtered : [ index ] )
      }
    }
    resizer()
    window.addEventListener('resize', resizer)
    return () => window.removeEventListener('resize', resizer)
  }, [ batches , index ])

  useEffect(()=>{
    if ( !searched && rev ) setRev(false)
  }, [ searched , rev ])

  useEffect(()=>{
    const interval = setInterval(()=> setLastUpdated(formatSmartDate( updated )), 1000)
    return () => clearTimeout(interval)
  }, [ updated ])

  return (
    <main>
      <section className="page">
        <h2 className='title'> { TrackerSvg() } PNodes - Viewer </h2>
        <PageFilters
          pub={pub}
          use={use}
          eff={eff}
          age={age}
          rev={rev}
          time={time}
          filter={filter}
          status={status}
          setRev={setRev}
          setUse={setUse}
          setEff={setEff}
          setAge={setAge}
          current={current}
          setTime={setTime}
          location='pnodes'
          searched={searched}
          setFilter={setFilter}
          setPublic={setPublic}
          setStatus={setStatus}
          setCurrent={setCurrent}
     />
        <div className="details">
          <h3> PNodes information:  </h3>
          <h3> {Donnutsvg()} </h3>
          <div>
            <h4> { pNodes.length || 0 } Pnodes found { searched || rev ? ` , ${display.length || 0} shown` : '' } </h4>
            <h4> Last Updated: { lastUpdated }</h4>
          </div>
          <div>
            <h4>Total storage used: <span>{ ( totalUsed() / 1000000000 ).toFixed(3) } GB</span></h4>
            <h4>Total storage committed: <span> { ( totalCommitted() / 1000000000000 ).toFixed(3) } TB</span></h4>
            <h4>Total storage available: <span>{ (( totalCommitted() - totalUsed() ) / 1000000000000).toFixed(3) } TB</span></h4>
            <h4>Average uptime: <span>{ avgUptime() } s</span></h4>
          </div>
        </div>
        <ScrollToTop />
        { Filters( filter ) }
        { batches.length > 1 && <div className='indices'>
          { batches.length > 2 && <button disabled={ index === 0 } onClick={()=> setIndex(0)} > {dblLeftsvg('rotate-180deg')} </button>}
          <button disabled={ index === 0 } onClick={()=> setIndex((prev: number) =>  !prev ? 0 : prev - 1 )} > {Leftsvg('rotate-180deg ISBIG')} </button>
          { screenBatches.map((val: number)=> (
            <button key={val} onClick={()=> setIndex(val)} className={ index === val ? 'active' : ''}>{val + 1 }</button>
          ))}
          <button disabled={ index === batches.length - 1 } onClick={()=> setIndex((prev: number) => prev + 1 > batches.length -1 ? prev : prev + 1 )} > {Leftsvg('ISBIG')} </button>
          { batches.length > 2 && <button disabled={ index === batches.length - 1 } onClick={()=> setIndex(batches.length - 1 )} > {dblLeftsvg()} </button>}
        </div>}
      </section>
    </main>
  )
}

export default Nodes
