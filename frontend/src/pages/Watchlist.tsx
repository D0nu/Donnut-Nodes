import { useState , useEffect } from 'react';
import { PNodes , FilterKeys } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNodes } from '../context/NodesContext';
import { loaderCircleSvg, Eyesvg } from '../components/svgPack';
import { PageFilters , NodeCard, NodeCardLabels } from './../components/pageParts';
import { startOfHour, startOfDay, startOfWeek, startOfYesterday } from 'date-fns';
import { Trim , Ellipses , getNodeAge, online, efficiency, used } from '../components/functions';

const Nodes = () => {
  const { user } = useAuth()
  const [ eff , setEff ] = useState('')
  const [ use , setUse ] = useState('')
  const [ age , setAge ] = useState('')
  const [ time , setTime ] = useState('')
  const [ pub , setPublic ] = useState('')
  const [ rev , setRev ] = useState(false)
  const [ status , setStatus ] = useState('')
  const [ filter , setFilter ] = useState('')
  const { watchlistNodes , updated , loading } = useNodes()
  const [ display , setDisplay ] = useState< PNodes[]>([])
  const [ current , setCurrent ] = useState<FilterKeys>('name')
  const searched = age || use || status || eff || time || pub || status || filter

  const Filters = ( filter : string ) => {
    const now = Date.now()
    const fil = Trim(filter)
    let filtered = watchlistNodes

    const startHour = startOfHour(now).getTime();
    const startToday = startOfDay(now).getTime();
    const startThisWeek = startOfWeek(now).getTime();
    const startYesterday = startOfYesterday().getTime();
    
    filtered = filtered.filter(( node: PNodes | undefined )=> node !== undefined )

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

    if ( rev && searched ) filtered = watchlistNodes.filter(( nodes: PNodes | never ) => !filtered.find(( node:PNodes )=> nodes === node ))

    if (JSON.stringify(filtered) !== JSON.stringify(display)) setDisplay( filtered )

     return filtered.length === 0 ? loading === 'fetching' ? (
      <div className="bg-set">
        <h2 style={{width: '275px'}}> {loaderCircleSvg()} Loading pnodes { loading && <Ellipses /> }</h2>
        <p> Getting watchlist, Formatting watchlist to node items.</p>
        <div> <img src='/looking.png' alt='loading'></img></div>
      </div>
     ) : searched ? (
      <div className="bg-set">
        <h2>No item found, matching your criteria.</h2>
        <p> Try changing filters or removing entirely.</p>
        <div> <img src='/notfound.png' alt='loading'></img></div>
      </div>
    ) : (
      <div className="bg-set">
        <h2>No Pnodes watched, waiting for your call.</h2>
        <p> Add a pnode to your watchlist by clicking the plus icon.</p>
        <div> <img src='/chasing.png' alt='loading'></img></div>
      </div>
    ) : <div className="nodes">
        <NodeCardLabels />
        {filtered.map(( node: PNodes , i : number ) => <NodeCard key={i} tag={i} node={node} />)}
      </div>
  }

  useEffect(()=>{
    if ( !searched && rev ) setRev(false)
  }, [ searched , rev ])

  return (
    <main>
      <section className="page">
        <h2 className='title'> { Eyesvg() } Watchlist </h2>
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
         <h3> { user?.watchlist.length || 0 } items found </h3>
        { Filters( filter ) }
      </section>
    </main>
  )
}

export default Nodes
