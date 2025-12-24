import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useNodes } from "../context/NodesContext"
import { FilterKeys , PNodes , List } from '../types';
import { useNotifiers } from "../context/NotifierContext"
import React , { SetStateAction , useEffect , useRef , useState , useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { classRemove , classToggle , RemoveOtherClass , formatSmartDate , pick , AddToWatchList , RemoveFromWatchList, efficiency, online, Ellipses } from "./functions";
import { AppSvg , Moresvg , Linksvg , Backsvg , cancelSvg , cloudSvg , Donnutsvg , Eyesvg , GlobeSvg , HistorySvg , LogInSvg , LogoutSvg , Menusvg , NetworkSvg , Nightsvg , Padlocksvg , Searchsvg , SettingSvg , Sparksvg , Sunsvg , loaderCircleSvg , AddSvg , UptimeSvg , StorageSvg , ArrowUpSvg , Leftsvg , ChartSvg , Booksvg , SupportSvg , Rocketsvg , Devsvg , TrackerSvg, MinusSvg, CircleMinusSvg, Exportsvg, BoxSvg } from './svgPack';


type Data = {
  time: string
  value: number
}

type FilterTypes = {
  pub: string
  eff: string
  age: string
  use: string
  rev: boolean
  time: string
  filter: string
  status: string
  current: string
  location: string
  searched: string | boolean
  setRev: React.Dispatch<SetStateAction<boolean>>
  setAge: React.Dispatch<SetStateAction<string>>
  setEff: React.Dispatch<SetStateAction<string>>
  setUse: React.Dispatch<SetStateAction<string>>
  setTime: React.Dispatch<SetStateAction<string>>
  setFilter: React.Dispatch<SetStateAction<string>>
  setPublic: React.Dispatch<SetStateAction<string>>
  setStatus: React.Dispatch<SetStateAction<string>>
  setCurrent: React.Dispatch<SetStateAction<FilterKeys>>
}

type NodeItem = {
  id: string
  label: string
  value: string | number
}

type buttons = {
  text: string ,
  func: () => void,
}

type FilterSet = {
  id?: string
  text: string
  ignore?: boolean
  setQuery: () => void
  svg?: React.ReactNode
  buttons?: buttons[] | never[]
  query: string | boolean | null
}

export function Header () {
  const { user , logout , toggle } = useAuth()

  return (
    <header>
      <Link to='/' className='logo'><h2> {Donnutsvg()} <p> <span>Donnut-</span>nodes</p> </h2></Link>
      <nav>
        <section>
          <Link to='/docs'> Docs </Link>
          <Link to='/nodes'> Nodes </Link>
          <Link to='/compare'> Compare </Link>
        </section>
        <section className="user">
          { !user ? (
            <>
            <Link to='/signin'> {LogInSvg()} Sign in </Link>
            <Link to='/signup'> {AppSvg()} Sign up </Link>
            <Link to='/recovery'> {Padlocksvg()} Recover </Link>
            </>
          ) : (
            <>
            <Link to='/watchlist'> {Eyesvg()} Watchlist </Link>
            <Link to='/settings'> {SettingSvg()} Settings </Link>
            <button onClick={ logout } style={{ color: 'var(--error)'}}> {LogoutSvg()} Logout </button>
            </>
          )}
          <div className='theme'> <menu onClick={toggle}> <span></span> {Sunsvg()} {Nightsvg()} </menu> </div>
        </section>
        <p> { user?.name || 'Guest' } </p>
      </nav>
      <div className='controls'>
        <button className='toggle' onClick={()=> classToggle(' header', 'inView')}> { Menusvg() } </button>
        <button onClick={()=> classToggle(' header nav .user', 'inView')}> { user?.name[0].toUpperCase() || 'G' } </button>
      </div>
      <div className="mask" onClick={()=> classRemove(' header', 'inView')}></div>
    </header>
  )
}

export function Footer() {
  return (
    <footer>
      <div>
        <Link to='/' className='logo'><h2> {Donnutsvg()} <p> <span>Donnut-</span>nodes</p> </h2></Link>
        <h3 style={{ paddingLeft: '40px' }}>Copyright {new Date().getFullYear()}</h3>
      </div>
      <section>
        <div>
          <Link to='/docs/terms'>Terms</Link>
          <Link to='/docs/policies'>Policies</Link>
        </div>
        <div>
          <Link to='/docs/api'>{Devsvg()} API</Link>
          <Link to='/docs/graphs'>{ChartSvg()}Graphs</Link>
          <Link to='/docs/terminologies'>{SupportSvg('big')}Terminologies</Link>
          <Link to='/docs/methods'>{Rocketsvg('big')} Methods</Link>
          <Link to='/docs/NodeDocs'>{TrackerSvg()} Nodes</Link>
        </div>
        <div>
          <Link to='/docs'>{Booksvg('BIG')} Documentations</Link>
          <Link to='/docs/resources'>{StorageSvg()} Resources</Link>
        </div>
      </section>
      <div className='devs'>
        <p> Built by </p><a href='https://cod-en-ywpx.vercel.app' target='_blank' rel="noreferrer noopener">Cod-en+</a> <a href='https://cod-en-ywpx.vercel.app' target='_blank' rel="noreferrer noopener">Donnutman</a>
      </div>
    </footer>
  )
}

export const NetworkOverview = () => {
  const { pNodes, updated } = useNodes();
  
  const calculateStats = useMemo(() => {
    const totalNodes = pNodes.length;
    const onlineNodes = pNodes.filter(node => online(node, updated)).length;
    const offlineNodes = totalNodes - onlineNodes;
    
    // Calculate total storage committed and used (in bytes)
    const totalCommittedBytes = pNodes.reduce((sum, node) => 
      sum + (node.storage_committed || 0), 0);
    
    const totalUsedBytes = pNodes.reduce((sum, node) => 
      sum + (node.storage_used || 0), 0);
    
    // Calculate storage available (same as Nodes page)
    const totalAvailableBytes = totalCommittedBytes - totalUsedBytes;
    
    // Calculate average efficiency
    const avgEfficiency = pNodes.length > 0 
      ? pNodes.reduce((sum, node) => sum + efficiency(node), 0) / pNodes.length 
      : 0;
    
    // Format storage for display
    const formatStorage = (bytes: number) => {
      const tb = bytes / 1000000000000; // Convert to TB
      const gb = bytes / 1000000000; // Convert to GB
      
      if (tb >= 1) {
        return `${tb.toFixed(1)} TB`;
      } else if (gb >= 1) {
        return `${gb.toFixed(1)} GB`;
      } else {
        const mb = bytes / 1000000;
        return `${mb.toFixed(1)} MB`;
      }
    };
    
    // Calculate storage usage percentage
    const storagePercent = totalCommittedBytes > 0 
      ? ((totalUsedBytes / totalCommittedBytes) * 100).toFixed(1) 
      : '0';
    
    // Calculate storage available percentage
    const availablePercent = totalCommittedBytes > 0 
      ? ((totalAvailableBytes / totalCommittedBytes) * 100).toFixed(1) 
      : '0';
    
    return {
      totalNodes,
      onlineNodes,
      offlineNodes,
      totalCommittedBytes,
      totalUsedBytes,
      totalAvailableBytes,
      formattedCommitted: formatStorage(totalCommittedBytes),
      formattedUsed: formatStorage(totalUsedBytes),
      formattedAvailable: formatStorage(totalAvailableBytes),
      storagePercent,
      availablePercent,
      avgEfficiency: avgEfficiency.toFixed(1),
      onlinePercentage: totalNodes > 0 ? ((onlineNodes / totalNodes) * 100).toFixed(1) : '0'
    };
  }, [pNodes, updated]);

  return (
    <section className="network-overview-section">
      <div className="section-header">
        <h2>Network Overview</h2>
        <p>Real-time statistics of the Xandeum pNodes network</p>
      </div>
      
      <div className="network-stats-grid">
        {/* Network Health Card (Large) */}
        <div className="network-stat-card large">
          <div className="network-stat-header">
            {GlobeSvg()}
            <h3>Network Health</h3>
          </div>
          <div className="network-stat-value">
            {calculateStats.onlinePercentage}%
          </div>
          <div className="network-stat-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${calculateStats.onlinePercentage}%` }}
            ></div>
          </div>
          <div className="network-stat-details">
            <span>{calculateStats.onlineNodes} Online</span>
            <span>{calculateStats.offlineNodes} Offline</span>
          </div>
        </div>
        
        {/* Storage Available Card (NEW) */}
        <div className="network-stat-card">
          <div className="network-stat-header">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 17l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12v9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Storage Available</h3>
          </div>
          <div className="network-stat-value">
            {calculateStats.formattedAvailable}
          </div>
          <div className="network-stat-progress">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${calculateStats.availablePercent}%`,
                background: 'linear-gradient(90deg, var(--nodespack), var(--highlight))'
              }}
            ></div>
          </div>
          <div className="network-stat-details">
            <span>{calculateStats.availablePercent}% available</span>
            <span>{calculateStats.storagePercent}% used</span>
          </div>
        </div>
        
        {/* Average Efficiency Card */}
        <div className="network-stat-card">
          <div className="network-stat-header">
            {Sparksvg('big')}
            <h3>Avg Efficiency</h3>
          </div>
          <div className="network-stat-value">
            {calculateStats.avgEfficiency}%
          </div>
          <div className="network-stat-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${calculateStats.avgEfficiency}%` }}
            ></div>
          </div>
          <div className="network-stat-details">
            <span>Performance score</span>
            <span>Based on usage & uptime</span>
          </div>
        </div>
        
        {/* Node Distribution Card */}
        <div className="network-stat-card">
          <div className="network-stat-header">
            {ChartSvg()}
            <h3>Node Distribution</h3>
          </div>
          <div className="network-stat-value">
            {calculateStats.totalNodes}
          </div>
          <div className="network-stat-details" style={{ flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Online:</span>
              <span style={{ color: 'var(--highlight)', fontWeight: '700' }}>
                {calculateStats.onlineNodes}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Offline:</span>
              <span style={{ color: 'var(--error)', fontWeight: '700' }}>
                {calculateStats.offlineNodes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const QuickStatsBar = () => {
  const { pNodes, updated } = useNodes();
  
  const stats = React.useMemo(() => {
    const totalNodes = pNodes.length;
    const onlineNodes = pNodes.filter(node => online(node, updated)).length;
    
    // Calculate total storage in TB (same as Nodes.tsx)
    const totalCommitted = () => {
      let start = 0;
      pNodes.forEach(node => { start += node.storage_committed || 0 });
      return start;
    };
    
    // Calculate total used storage in GB (same as Nodes.tsx)
    const totalUsed = () => {
      let start = 0;
      pNodes.forEach(node => { start += node.storage_used || 0 });
      return start;
    };
    
    // Calculate average uptime in seconds (same as Nodes.tsx)
    const avgUptime = () => {
      let totalUptime = 0;
      pNodes.forEach(node => { totalUptime += node.uptime || 0 });
      return totalNodes ? (totalUptime / totalNodes).toFixed(0) : '0';
    };
    
    // Calculate network uptime percentage
    const networkUptime = totalNodes > 0 
      ? ((onlineNodes / totalNodes) * 100).toFixed(1)
      : '0';
    
    // Calculate efficiency
    const avgEfficiency = totalNodes > 0 
      ? (pNodes.reduce((sum, node) => sum + efficiency(node), 0) / totalNodes).toFixed(1)
      : '0';
    
    // Format storage
    const formatTB = (bytes: number) => {
      const tb = bytes / 1000000000000;
      return tb >= 1 ? `${tb.toFixed(1)}TB` : `${(tb * 1000).toFixed(0)}GB`;
    };
    
    const formatGB = (bytes: number) => {
      const gb = bytes / 1000000000;
      return `${gb.toFixed(1)}GB`;
    };
    
    return {
      onlineNodes,
      totalNodes,
      totalCommitted: formatTB(totalCommitted()),
      totalUsed: formatGB(totalUsed()),
      avgUptime: avgUptime() + 's',
      networkUptime: networkUptime + '%',
      avgEfficiency: avgEfficiency + '%',
    };
  }, [pNodes, updated]);

  return (
    <div className="quick-stats-bar">
      <div className="quick-stats-container">
        <div className="quick-stats-scroller">
          <div className="quick-stat-item">
            <div className="quick-stat-icon">
              {GlobeSvg()}
            </div>
            <div className="quick-stat-content">
              <div className="quick-stat-value">{stats.onlineNodes}/{stats.totalNodes}</div>
              <div className="quick-stat-label">pNodes Online</div>
            </div>
          </div>
          
          <div className="quick-stat-item">
            <div className="quick-stat-icon">
              {UptimeSvg()}
            </div>
            <div className="quick-stat-content">
              <div className="quick-stat-value">{stats.avgUptime}</div>
              <div className="quick-stat-label">Avg Uptime</div>
            </div>
          </div>
          
          <div className="quick-stat-item">
            <div className="quick-stat-icon">
              {StorageSvg()}
            </div>
            <div className="quick-stat-content">
              <div className="quick-stat-value">{stats.totalCommitted}</div>
              <div className="quick-stat-label">Total Storage</div>
            </div>
          </div>
          
          <div className="quick-stat-item">
            <div className="quick-stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="quick-stat-content">
              <div className="quick-stat-value">{stats.avgEfficiency}</div>
              <div className="quick-stat-label">Avg Efficiency</div>
            </div>
          </div>
          
          <div className="quick-stat-item">
            <div className="quick-stat-icon">
              {ChartSvg()}
            </div>
            <div className="quick-stat-content">
              <div className="quick-stat-value">{stats.networkUptime}</div>
              <div className="quick-stat-label">Network Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  return (
    <section className="hero-section">
    <div className="hero-content">
    <h1 className="hero-title">
      Decentralized Storage<br/>
    <span style={{ fontSize: "0.7em" }}>for Solana dApps</span>

    </h1>
    
    <p className="hero-subtitle">
      Monitor and analyze Xandeum's scalable storage layer in real-time. 
      Track pNode performance, network health, and storage metrics across 
      the Solana ecosystem.
    </p>
    
    <div className="cta-buttons">
      <Link to ="/nodes">
      <button className="cta-button">Explore pNodes Dashboard</button>
      </Link>
      <button className="cta-button secondary" style={{  color: 'var(--highlight) !important', border: '2px solid var(--highlight) !important'}}>View Documentation</button>
    </div>
    </div>
  </section>
  )
}

export const Stats = () => {
  const { pNodes, updated } = useNodes();

  // Calculate statistics using useMemo for better performance
  const stats = useMemo(() => {
    const totalNodes = pNodes.length;
    const onlineNodes = pNodes.filter(node => online(node, updated)).length;
    
    // Calculate total storage committed and used (in bytes) - same as Nodes.tsx
    const totalCommittedBytes = pNodes.reduce((sum, node) => 
      sum + (node.storage_committed || 0), 0);
    
    const totalUsedBytes = pNodes.reduce((sum, node) => 
      sum + (node.storage_used || 0), 0);
    
    // Calculate network uptime percentage (nodes online)
    const networkUptime = totalNodes > 0 
      ? (onlineNodes / totalNodes) * 100
      : 0;
    
    // Calculate average efficiency
    const avgEfficiency = totalNodes > 0 
      ? pNodes.reduce((sum, node) => sum + efficiency(node), 0) / totalNodes
      : 0;
    
    // Convert to TB (1 TB = 1,000,000,000,000 bytes)
    const totalCommittedTB = totalCommittedBytes / 1000000000000;
    const totalUsedTB = totalUsedBytes / 1000000000000;
    const totalAvailableTB = totalCommittedTB - totalUsedTB;
    
    // Calculate storage used percentage
    const storageUsedPercentage = totalCommittedTB > 0 
      ? (totalUsedTB / totalCommittedTB) * 100 
      : 0;
    
    // Calculate storage available percentage
    const storageAvailablePercentage = totalCommittedTB > 0 
      ? (totalAvailableTB / totalCommittedTB) * 100 
      : 0;
    
    // Format TB to display with appropriate decimal places
    const formatTB = (tb: number) => {
      if (tb >= 1000) {
        return `${(tb / 1000).toFixed(1)}PB`; // Only show PB if >= 1000TB
      } else if (tb >= 1) {
        return `${tb.toFixed(1)}TB`;
      } else {
        const gb = tb * 1000;
        return `${gb.toFixed(1)}GB`;
      }
    };
    
    // Format GB for used storage (consistent with Nodes.tsx)
    const formatGB = (bytes: number) => {
      const gb = bytes / 1000000000;
      return `${gb.toFixed(3)}GB`;
    };
    
    // Simplified trend data (in a real app, this would come from historical data)
    const getTrendData = () => {
      return {
        nodesTrend: totalNodes > 0 ? '+12' : '0', // Would come from API
        storageTrend: totalCommittedTB > 1000 ? '+450PB' : '+450TB',
        uptimeTrend: '99.5%', // Last month's uptime
        efficiencyTrend: '+2.5%',
      };
    };

    const trends = getTrendData();
    
    return {
      totalNodes,
      onlineNodes,
      totalCommittedBytes,
      totalUsedBytes,
      totalCommittedTB,
      totalUsedTB,
      totalAvailableTB,
      formattedCommitted: formatTB(totalCommittedTB),
      formattedUsed: formatGB(totalUsedBytes), // Matches Nodes.tsx format
      formattedAvailable: formatTB(totalAvailableTB),
      storageUsedPercentage,
      storageAvailablePercentage,
      networkUptime,
      avgEfficiency,
      trends,
    };
  }, [pNodes, updated]);

  return (
    <section className="stats-overview">
      <div className="stats-grid">
        {/* Total pNodes Card */}
        <div className="stat-card">
          <div className="stat-icon">
            {ChartSvg()}
          </div>
          <div className="stat-content">
            <h3>Total pNodes</h3>
            <div className="stat-value">{stats.totalNodes}</div>
            <div className="stat-change positive">
              {ArrowUpSvg()}
              <span>+{stats.trends.nodesTrend} this week</span>
            </div>
          </div>
        </div>

        {/* Storage Capacity Card - Now in TB */}
        <div className="stat-card">
          <div className="stat-icon">
            {StorageSvg()}
          </div>
          <div className="stat-content">
            <h3>Storage Capacity</h3>
            <div className="stat-value">{stats.formattedCommitted}</div>
            <div className="stat-change positive">
              {ArrowUpSvg()}
              <span>Used: {stats.storageUsedPercentage.toFixed(1)}%</span>
            </div>
            <div className="stat-trend">
              <small>{stats.formattedAvailable} available</small>
            </div>
          </div>
        </div>

        {/* Network Uptime Card */}
        <div className="stat-card">
          <div className="stat-icon">
            {UptimeSvg()}
          </div>
          <div className="stat-content">
            <h3>Network Uptime</h3>
            <div className="stat-value">{stats.networkUptime.toFixed(1)}%</div>
            <div className="stat-change positive">
              {ArrowUpSvg()}
              <span>{stats.trends.uptimeTrend} last month</span>
            </div>
          </div>
        </div>

        {/* Average Efficiency Card */}
        <div className="stat-card">
          <div className="stat-icon">
            {GlobeSvg()}
          </div>
          <div className="stat-content">
            <h3>Avg Efficiency</h3>
            <div className="stat-value">{stats.avgEfficiency.toFixed(1)}%</div>
            <div className="stat-change positive">
              {ArrowUpSvg()}
              <span>{stats.trends.efficiencyTrend} this week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function ScrollToTop(){
  const handleScroll = () => window.scroll({ top: 0 , behavior: 'smooth' })
  const [ hasScrolled , setHasScrolled ] = useState( window.scrollY >= window.innerHeight * 0.5 )

  useEffect(()=>{
    const checkScroll = () => setHasScrolled(window.scrollY >= window.innerHeight * 0.5)
    window.addEventListener("scroll", checkScroll)
    return ()=> window.removeEventListener("scroll", checkScroll)
  }, [])

  return hasScrolled ? <button onClick={handleScroll} className='scroll-help'>{Leftsvg('rotate-270deg')}</button> : <></>
}

export const InputsPack = ({
  name = '',
  value = '',
  show = true,
  svg = <></>,
  classes = '',
  type = 'text',
  placeholder = '',
  onClick = () => {},
  onChange = (e: React.ChangeEvent<HTMLInputElement> ) => {},
}) => {
  return (
    <div className={`input ${classes}`}>
      <input type={type} name={ name || type } value={value} placeholder={placeholder} onChange={onChange}/>
      { show && <span onClick={onClick}> { svg } </span> }
    </div>
  )
}

export const WatchListHandler = ({ node }: { node: PNodes }) => {
  const goTo = useNavigate()
  const { updated } = useNodes()
  const { setUReason } = useNotifiers()
  const { user , token , setUser } = useAuth()

  const [ error , setError ] = useState('')
  const [ loading , setLoading ] = useState(false)

  const exists = user?.watchlist.find(( list: List ) => list.pnodeId === node?.name )
  
  const handleWatch = () => {
    if ( loading ) return
    if ( !user ) goTo('/signin')
    if ( exists ) RemoveFromWatchList( token , user , node , setError , setLoading , setUser , setUReason )
    else AddToWatchList( node , token , user , setLoading , setUser , setUReason )
  }

  return (
    <button onClick={handleWatch}>{ loading ? loaderCircleSvg('big') : exists ? MinusSvg() : AddSvg() }{`${ !exists ? 'Add' :  loading ? 'Remov' : 'Remove' }${ loading ? 'ing' : ''} ${ exists ? ' from ' : ' to '}`} watchlist </button>
  )
}

export function NodeCardLabels({ limit = 50 , handleLimit = ( n: number ) => {} } ){
  const [ verySmall , setVerySmall ] = useState( window.innerWidth < 400 )
  const [ shownItems , setShownItems ] = useState<string[] | never[]>([])
  
  const items = [ 'Address' , 'Uptime' , 'Used storage', 'Access' , 'Committed storage' , 'Port' , 'Last seen' , 'First seen' , 'Status', 'Version', 'Efficiency' ];

  useEffect(()=>{
    const distribute = () => {
      const width = pick('.nodeList')?.clientWidth || 0
      const length = Math.floor( width / 105 )
      setShownItems( items.slice(0, length) )
      setVerySmall( window.innerWidth < 400 )
    }
    distribute()
    window.addEventListener( 'resize', distribute )
    return ()=> {
      window.removeEventListener( 'resize', distribute )
    }
  }, [])

  return (
    <div className="nodeCard labels">
      <h3 style={{ justifyContent: 'center'}}>Name</h3>
      <div className='nodeList'>
        { shownItems.map((val: string) => <span key={val} title={val}>{val}</span>)}
      </div>
      <div className='limit' style={{ minWidth : verySmall ? '60px' : '115px'}}>
        <button onClick={()=>classToggle('.limit', 'inView')}>{limit}</button>
        <div>
          <span onClick={()=>handleLimit( 50 )}>50</span>
          <span onClick={()=>handleLimit( 100 )}>100</span>
          <span onClick={()=>handleLimit( 150 )}>150</span>
          <span onClick={()=>handleLimit( 200 )}>200</span>
          <span onClick={()=>handleLimit( 250 )}>250</span>
        </div>
      </div>
    </div>
  )
}

export function NodeCard({ node , tag }: { node: PNodes ; tag: number }) {
  const goTo = useNavigate()
  const { updated } = useNodes()
  const { setUReason } = useNotifiers()
  const { user , token , setUser } = useAuth()
  const [ verySmall , setVerySmall ] = useState( window.innerWidth < 400 )

  const storage = node.storage_used / 1000000
  const committed= node.storage_committed / 1000000
  const access: "Public" | "Private" = Boolean(node.is_public) === true ? "Public" : "Private"
  const [ lastSeen , setLastSeen ] = useState(formatSmartDate(node.last_seen || node.last_seen_timestamp))
  const [ name , setName ] = useState( window.innerWidth > 500 ? node?.name || "Pnode-Unknown" : node?.name?.replace('Pnode-', '') || 'Unknown' )

  const status = online(node, updated) ? 'Online' : 'Offline'
  const exists = user?.watchlist.find(( list: List ) => list.pnodeId === node.name )

  const items = [
    { id: 'address', label: 'Address', value: node.address },
    { id: 'uptime', label: 'Uptime', value: `${node.uptime}s` },
    { id: 'storage_used', label: 'Storage used', value: `${ storage < 0.0005 ? '< 0.0005' : storage } MB` },
    { id: 'public', label: 'Node access', value: access },
    { id: 'storage_committed', label: 'Storage committed', value: `${ committed } MB` },
    { id: 'port', label: 'Port', value: node.rpc_port },
    { id: 'last_seen', label: 'Last seen', value: lastSeen },
    { id: 'first_seen', label: 'First seen', value: formatSmartDate(node.first_seen || (node.last_seen_timestamp - node.uptime) * 1000) },
    { id: 'status', label: 'Status', value: status },
    { id: 'version', label: 'Version', value: node.version },
    { id: 'efficiency', label: 'Efficiency', value: `${efficiency(node).toFixed(2)}%` },
  ];

  const [ error , setError ] = useState('')
  const [ loading , setLoading ] = useState(false)
  const [ shownItems , setShownItems ] = useState< NodeItem[] | never[] >([])
  const [ hiddenItems , setHiddenItems ] = useState< NodeItem[] | never[] >([])

  const handleWatch = () => {
    if ( loading ) return
    if ( !user ) goTo('/signin')
    if ( exists ) RemoveFromWatchList( token , user , node , setError , setLoading , setUser , setUReason )
    else AddToWatchList( node , token , user , setLoading , setUser , setUReason )
  }
  
  useEffect(()=>{
    const distribute = () => {
      const width = pick('.nodeList')?.clientWidth || 0
      const length = Math.floor( width / 105 )
      setShownItems( items.slice(0, length) )
      setHiddenItems( items.slice(length) )
      setVerySmall( window.innerWidth < 400 )
      setName( window.innerWidth > 500 ? node?.name || "Pnode-Unknown" : node?.name?.replace('Pnode-', '') || 'Unknown' )
    }
    distribute()
    window.addEventListener( 'resize', distribute )
    const interval = setInterval(()=> setLastSeen(formatSmartDate(node.last_seen || node.last_seen_timestamp)), 1000)
    return ()=> {
      clearTimeout(interval)
      window.removeEventListener( 'resize', distribute )
    }
  }, [])

  return (
    <div className="nodeCard">
      <h3>{Donnutsvg()} {name} </h3>
      <div className="nodeList" style={{ gridTemplateColumns: `repeat(${shownItems.length}, minmax(90px, 90px))` }}>
        { shownItems.map(( item: NodeItem , i: number ) => <span key={i}>{item.value}</span> )}
      </div>
      <div className="nodeActions">
        { !verySmall && <>
          <button onClick={handleWatch}>{ loading ? loaderCircleSvg('big') : exists ? MinusSvg() : AddSvg() }</button>
          <Link to={`/nodes/${node.pubkey}`}>{Linksvg()}</Link>
        </>}
        { hiddenItems.length > 0 && (
          <menu id={`drop-${tag}`}>
            <button onClick={()=>  classToggle(`#drop-${tag}`, 'inView')}>{Moresvg()}</button>
            <div className='nodeDrop'>
              { hiddenItems.map(( item: NodeItem , i: number ) => <p key={i}>{item.label}:<span>{item.value}</span></p> )}
              { verySmall && <>
                <button onClick={handleWatch}>{ loading ? loaderCircleSvg('big') : exists ? cancelSvg('isBig') : AddSvg() }{`${ !exists ? 'Add' :  loading ? 'Remov' : 'Remove' }${ loading ? 'ing' : ''} ${ exists ? ' from ' : ' to '}`} watchlist </button>
                <Link to={`/nodes/${node.pubkey}`} style={{color: 'inherit'}}>{Linksvg()} View node</Link>
              </>}
            </div>
          </menu>
        )}
      </div>
    </div>
  )

}

export const PageFilters = ({ pub, use, eff, rev, age, time, filter, status, setRev, setAge, setUse, setEff, current, setTime, location, searched, setFilter, setPublic, setStatus, setCurrent }: FilterTypes ) => {
  const FilterPack = ({ svg = <></> , query , id = `${query}` , text , setQuery , buttons = [], ignore = false }: FilterSet ) => {
    return (
      <menu id={id} onClick={()=>{ classToggle(`#${id}`, 'inView') ; RemoveOtherClass('.filters menu', `#${id}`, 'inView') }}>
        <p style={ ignore || !query ? {borderTopRightRadius: '20px'} : {}}> {svg}  { text } { query && ` - ${query}`}</p> { query && !ignore && <span className='cancel' onClick={setQuery}>{cancelSvg('BIG')}</span>}
        { buttons.length && (
          <div>
            {buttons.map((btn: buttons, i: number)=><span key={i} onClick={btn.func}>{btn.text}</span>)}
          </div>
        )}
      </menu>
    )
  }
  return (
    <div className="search">
      <InputsPack
        classes='left'
        value={filter}
        svg={Searchsvg()}
        placeholder={`Search ${location} by ${current}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value )}
      />
      <div className="filters">
        <FilterPack
          id='search'
          ignore={true}
          query={current}
          text='Search by'
          svg={Menusvg()}
          setQuery={()=> setCurrent('name')}
          buttons={[
            { text: 'Name', func: ()=> setCurrent('name')},
            { text: 'Version', func: ()=> setCurrent('version')},
            { text: 'Public key', func: ()=> setCurrent('pubkey')},
            { text: 'Pnode address', func: ()=> setCurrent('address')},
          ]}
        />
        <FilterPack
          id='pub'
          query={pub}
          svg={GlobeSvg()}
          text='Accessibility'
          setQuery={()=> setPublic('')}
          buttons={[
            { text: 'Public access', func: ()=> setPublic('Public')},
            { text: 'Private access', func: ()=> setPublic('Private')},
          ]}
        />
        <FilterPack
          id='status'
          text='Status'
          query={status}
          svg={NetworkSvg()}
          setQuery={()=> setStatus('')}
          buttons={[
            { text: 'Online', func: ()=> setStatus('online')},
            { text: 'Offline', func: ()=> setStatus('offline')},
          ]}
        />
        <FilterPack
          id='use'
          query={use}
          svg={cloudSvg()}
          text='Storage used'
          setQuery={()=> setUse('')}
          buttons={[
            { text: 'Heavy', func: ()=> setUse('Heavy')},
            { text: 'Medium', func: ()=> setUse('Medium')},
            { text: 'Light', func: ()=> setUse('Light')},
          ]}
        />
        <FilterPack
          id='time'
          query={time}
          text='Last seen'
          svg={HistorySvg()}
          setQuery={()=> setTime('')}
          buttons={[
            { text: 'In an hour', func: ()=> setTime('In an hour')},
            { text: 'Today', func: ()=> setTime('Today')},
            { text: 'Yesterday', func: ()=> setTime('Yesterday')},
            { text: 'This week', func: ()=> setTime('This week')},
            { text: 'Earlier', func: ()=> setTime('Earlier')},
          ]}
        />
        <FilterPack
          id='age'
          query={age}
          text='Pnode age'
          svg={Donnutsvg()}
          setQuery={()=> setAge('')}
          buttons={[
            { text: 'Hours old', func: ()=> setAge('Hours old')},
            { text: 'Days old', func: ()=> setAge('Days old')},
            { text: 'Weeks old', func: ()=> setAge('Weeks old')},
            { text: 'Months old', func: ()=> setAge('Months old')},
            { text: 'Years old', func: ()=> setAge('Years old')},
            { text: 'Older', func: ()=> setAge('Older')},
          ]}
        />
        <FilterPack
          query={eff}
          id='efficiency'
          text='Efficiency'
          svg={Sparksvg('big')}
          setQuery={()=> setEff('')}
          buttons={[
            { text: 'High efficiency', func: ()=> setEff('High')},
            { text: 'Medium efficiency', func: ()=> setEff('Medium')},
            { text: 'Low efficiency', func: ()=> setEff('Low')},
          ]}
        />
        <menu id='rev' onClick={()=> RemoveOtherClass('.filters menu', '#rev', 'inView') }>
          <p onClick={()=> searched && setRev(true)} style={ !rev ? { borderTopRightRadius: '20px'} : { backgroundColor: 'var(--sweet)', color: 'var(--white)'}}> {Backsvg()} Reverse filters { rev ? '- On' : '- Off' }</p> { rev && <span className='cancel' onClick={()=>setRev(false)}>{cancelSvg('BIG')}</span>}
        </menu>
      </div>
    </div>
    )
}

function useChartZoom({ minZoom = 1 , maxZoom = 10 , zoomStep = 0.2 } = {}) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Wheel zoom (scoped)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      setZoom((z) =>
        Math.min( Math.max(z + (e.deltaY > 0 ? -zoomStep : zoomStep), minZoom), maxZoom )
      );
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ minZoom , maxZoom , zoomStep ]);

  // Mobile pinch zoom
  const lastDistance = useRef<number | null>(null);

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();

    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientX - e.touches[1].clientX;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (lastDistance.current) {
      const scale = distance / lastDistance.current;
      setZoom((z) =>
        Math.min(Math.max(z * scale, minZoom), maxZoom)
      );
    }

    lastDistance.current = distance;
  };

  const onTouchEnd = () => {
    lastDistance.current = null;
  };

  return {
    containerRef,
    zoom,
    offset,
    setOffset,
    resetZoom: () => {
      setZoom(1);
      setOffset(0);
    },
    touchHandlers: {
      onTouchMove,
      onTouchEnd,
    },
  };
}

// export function ChartComponent ({ data , isMobile , unit , name }: { data: Data[] , isMobile: boolean , name: string , unit: string }) {
//   const { containerRef , zoom , offset , setOffset , resetZoom , touchHandlers } = useChartZoom()

//   const visibleCount = Math.floor(data.length / zoom);
//   const visibleData = data.slice(offset, offset + visibleCount);
  
//   const getYDomain = (data: { value: number }[]): [number, number] => {
//     if (!data.length) return [0, 1];

//     const values = data.map(d => d.value);
//     const min = Math.min(...values);
//     const max = Math.max(...values);

//     if (min === max) {
//       const buffer = Math.abs(min) > 1 ? Math.abs(min) * 0.1 : 1;

//       return [min - buffer, max + buffer];
//     }

//     const range = max - min;

//     const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
//     const padding = Math.max(range * 0.1, magnitude * 0.1);

//     return [ min - padding ,  max + padding ];
//   };


//   return (
//     <div className='chart'
//       ref = {containerRef}
//       {... touchHandlers }
//       style={{ width: "100%", touchAction: 'none', height: 400 , overflow: "hidden" }}>
//       <ResponsiveContainer width='100%' height='100%'>
//         <LineChart
//           margin={{ top: 7, right: 7, left: 15, bottom: 7 }}
//           data={visibleData}>
//           <Tooltip />
//           <CartesianGrid strokeDasharray="3 3" />
//           <YAxis
//             width={60}
//             strokeWidth={2}
//             domain={getYDomain(data)}
//             tick={{ fontSize: 12 , fontWeight: 600 }}
//             tickFormatter={(value: number) => `${Math.round(value)}${unit}`}
//           />
//           <XAxis
//             dataKey="time"
//             strokeWidth={2}
//             tickFormatter={(value) =>
//               new Date(value).toLocaleDateString("en-US", {
//                 day: "numeric",
//                 month: isMobile ? "short" : "long",
//                 year: !isMobile ? "numeric" : undefined,
//               })
//             }
//             minTickGap={30}
//             tick={{ fontSize: 12 , fontWeight: 600 }}
//           />
//           <Line
//             name={name}
//             type="monotone"
//             dataKey="value"
//             strokeWidth={1.5}
//             stroke="var(--highlight)" dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

export function ChartComponent ({ data , isMobile , unit , name }: { data: Data[] , isMobile: boolean , name: string , unit: string }) {
  const offsetRef = useRef(0)
  const [ zoom , setZoom ] = useState(1)
  const [ offset , setOffset ] = useState(1)
  const [ zooming , setZooming ] = useState(false)
  const [ scrolling , setScrolling ] = useState(false)
  const [ displayedData , setDisplaedData ] = useState( data )
  const visibleCount = Math.floor( displayedData.length / zoom );
  const visibleData = displayedData.slice( offset , offset + visibleCount );
  
  const values = data.map( d => d.value );
  const min = Math.min(...values);
  const max = Math.max(...values);

  const zoomStart = () => setZooming(true)

  const zoomOn = (e: React.MouseEvent<HTMLElement>) => {
    if (!zooming) return
    const { offsetX } = e.nativeEvent
    const resolution = Math.min( 20 , offsetX / 7 )
    setZoom( Math.max( 1 , resolution ))
  }

  const zoomEnd = () => setZooming(false)

  const zoomIn = () => setZoom((prev: number) => prev - 1 <= 0 ? 1 : prev - 1 )

  const zoomOut = () => setZoom((prev: number) => prev + 1 >= 20 ? 20 : prev + 1 )

  const scrollStart = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setScrolling(true)

    if ('touches' in e.nativeEvent) {
      offsetRef.current = e.nativeEvent.touches[0].clientX
    } else {
      offsetRef.current = e.nativeEvent.clientX
    }
  }

  const scrollOn = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, rev = true ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!scrolling) return;
    
    // Get the correct X position
    let clientX: number;
    
    if ('changedTouches' in e && e.touches.length > 0 ) {
      // For touch move events
      clientX = e.changedTouches[0].clientX;
    } else if ('touches' in e) {
      // Alternative for touch move
      clientX = e.touches[0].clientX;
    } else {
      // For mouse events
      clientX = e.clientX;
    }
    
    const delta = clientX - offsetRef.current;
    offsetRef.current = clientX;
    
    // Update offset based on delta
    const scrollAmount = rev  ? -delta / 3 : delta / 3; // Adjust sensitivity
    
    setOffset(prev => {
      const maxOffset = Math.max(0, data.length - visibleCount);
      const newOffset = prev + scrollAmount;
      
      // Keep within bounds
      if (newOffset < 0) return 0;
      if (newOffset > maxOffset) return maxOffset;
      
      return Math.round(newOffset);
    });
  };
  
  const scrollEnd = () => setScrolling(false)

  const getYDomain = (): [number, number] => {
    if (!data.length) return [ 0 , 1 ];

    if (min === max) {
      const buffer = Math.abs(min) !== 0 ? Math.abs(min) * 0.1 : 0.5;

      return [min - buffer, max + buffer];
    }

    const range = max - min ;

    const magnitude = Math.pow(10, Math.floor(Math.log10(range)));

    const padding = Math.max(range * 0.1, magnitude * 0.1);

    return [ min - padding ,  max + padding ];
  };

  const getScrollIndicatorStyle = () => {
    const totalItems = displayedData.length;
    
    // Handle edge cases
    if (totalItems === 0 || zoom < 1) {
      return { left: "0%", width: "100%" };
    }
    
    // Calculate visible items based on zoom
    const visibleItems = Math.max(1, Math.floor(totalItems / zoom));
    
    // Calculate max possible offset
    const maxOffset = Math.max(0, totalItems - visibleItems);
    
    // Clamp offset to valid range
    const clampedOffset = Math.max(0, Math.min(maxOffset, offset));
    
    // Calculate indicator width (inverse proportion to zoom)
    const widthPercent = Math.min(100, Math.max(0, (visibleItems / totalItems) * 100));
    
    // Calculate indicator position
    let leftPercent = 0;
    if (maxOffset > 0) {
      leftPercent = (clampedOffset / maxOffset) * (100 - widthPercent);
    }
    
    // Clamp left position
    leftPercent = Math.max(0, Math.min(100 - widthPercent, leftPercent));
    
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  return (
    <div className='chart' style={{ width: "100%", overflow: "hidden" }}>
      <div className='chart-info'>
        <h3>{`${ name } (${unit})`}</h3>
        <section>
          <button>{Exportsvg()}</button>
        </section>
        <div className='chart-zoom'>
          <menu className='zoom-scroll' onMouseDown={zoomStart} onMouseMove={zoomOn} onMouseUp={zoomEnd} onMouseLeave={zoomEnd}>
            <span style={{ left: `${ 85 / 20 * zoom }px` }}>{zoom.toFixed(2)}</span>
          </menu>
          <menu className="zoom-controls">
            <button onClick={zoomOut}>{
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 1018.001 0A9 9 0 003 12z" strokeWidth="2"/>
                    <path d="M12 8v8M8 12h8" strokeWidth="2"/>
                  </svg>}</button>
            <button onClick={()=> setZoom(1)}>{BoxSvg()}</button>
            <button onClick={zoomIn}>{CircleMinusSvg()}</button>
          </menu>
        </div>
      </div>
      <div className='chart-holder' onMouseDown={scrollStart} onMouseMove={(e: React.MouseEvent<HTMLElement>)=> scrollOn(e)} onMouseUp={scrollEnd} onMouseLeave={scrollEnd} onTouchStart={scrollStart} onTouchMove={(e: React.TouchEvent<HTMLElement>)=> scrollOn(e)} onTouchEnd={scrollEnd} style={{ touchAction: 'none' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            margin={{ top: 7, right: 7, left: 15, bottom: 7 }}
            data={visibleData}>
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              width={60}
              strokeWidth={2}
              domain={getYDomain()}
              tick={{ fontSize: 12 , fontWeight: 600 }}
              tickFormatter={(value: number) => `${min > 0.5 ? value.toFixed(1) : value.toFixed(3)}${unit}`}
            />
            <XAxis
              dataKey="time"
              strokeWidth={2}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: isMobile ? "short" : "long",
                  year: !isMobile ? "numeric" : undefined,
                })
              }
              minTickGap={30}
              tick={{ fontSize: 12 , fontWeight: 600 }}
            />
            <Line
              name={name}
              type="monotone"
              dataKey="value"
              strokeWidth={1.5}
              animationDuration={300}
              animationEasing='linear'
              stroke="var(--highlight)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <menu className="zoom-scroll" onMouseDown={scrollStart} onMouseUp={scrollEnd} onMouseLeave={scrollEnd} onTouchStart={scrollStart} onTouchEnd={scrollEnd} onMouseMove={(e: React.MouseEvent<HTMLElement>)=> scrollOn(e, false)} onTouchMove={(e: React.TouchEvent<HTMLElement>)=> scrollOn(e, false)} style={{ width: '90%' , marginInline: 'auto' }}>
        <p style={ getScrollIndicatorStyle() } ></p>
      </menu>
    </div>
  )
}

export function DoubleChartComponent ({ name , data , isMobile  ,unit , names , secondData }: { name?: string | undefined , data: Data[] , isMobile: boolean , names: string[] , unit: string , secondData: Data[] }) {
  const offsetRef = useRef(0)
  const [ zoom , setZoom ] = useState(1)
  const [ offset , setOffset ] = useState(1)
  const [ zooming , setZooming ] = useState(false)
  const [ scrolling , setScrolling ] = useState(false)

  const combinedData = data.map(( d: Data , i: number ) => ({
    time: d.time,
    primaryValue: d.value,
    secondaryValue: secondData?.[i]?.value || null
  }))

  const [ displayedData , setDisplaedData ] = useState( combinedData )
  const visibleCount = Math.floor( displayedData.length / zoom );
  const visibleData = combinedData.slice( offset , offset + visibleCount )
  
 const getYDomain = (): [number, number] => {
    if (!data.length && !secondData?.length) return [ 0 , 1 ];

    // Get all values from both datasets
    const allValues: number[] = [];
    
    // Add primary data values
    data.forEach(d => {
      if (d.value !== undefined && d.value !== null) {
        allValues.push(d.value);
      }
    });
    
    // Add secondary data values
    secondData?.forEach(d => {
      if (d.value !== undefined && d.value !== null) {
        allValues.push(d.value);
      }
    });

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);

    if (min === max) {
      const buffer = Math.abs(min) !== 0 ? Math.abs(min) * 0.1 : 0.5;
      return [min - buffer, max + buffer];
    }

    const range = max - min;
    const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
    const padding = Math.max(range * 0.1, magnitude * 0.1);

    return [min - padding, max + padding];
  };

  const zoomStart = () => setZooming(true)

  const zoomOn = (e: React.MouseEvent<HTMLElement>) => {
    if (!zooming) return
    const { offsetX } = e.nativeEvent
    const resolution = Math.min( 20 , offsetX / 7 )
    setZoom( Math.max( 1 , resolution ))
  }

  const zoomEnd = () => setZooming(false)

  const zoomIn = () => setZoom((prev: number) => prev - 1 <= 0 ? 1 : prev - 1 )

  const zoomOut = () => setZoom((prev: number) => prev + 1 >= 20 ? 20 : prev + 1 )

  const scrollStart = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setScrolling(true)

    if ('touches' in e.nativeEvent) {
      offsetRef.current = e.nativeEvent.touches[0].clientX
    } else {
      offsetRef.current = e.nativeEvent.clientX
    }
  }

  const scrollOn = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, rev = true) => {
    e.preventDefault();
    e.stopPropagation();

    if (!scrolling) return;
    
    // Get the correct X position
    let clientX: number;
    
    if ('changedTouches' in e && e.touches.length > 0 ) {
      // For touch move events
      clientX = e.changedTouches[0].clientX;
    } else if ('touches' in e) {
      // Alternative for touch move
      clientX = e.touches[0].clientX;
    } else {
      // For mouse events
      clientX = e.clientX;
    }
    
    const delta = clientX - offsetRef.current;
    offsetRef.current = clientX;
    
    // Update offset based on delta
    const scrollAmount = rev  ? -delta / 3 : delta / 3; // Adjust sensitivity
    
    setOffset(prev => {
      const maxOffset = Math.max(0, combinedData.length - visibleCount);
      const newOffset = prev + scrollAmount;
      
      // Keep within bounds
      if (newOffset < 0) return 0;
      if (newOffset > maxOffset) return maxOffset;
      
      return Math.round(newOffset);
    });
  };
  
  const scrollEnd = () => setScrolling(false)

  const getScrollIndicatorStyle = () => {
    const totalItems = displayedData.length;
    
    // Handle edge cases
    if (totalItems === 0 || zoom < 1) {
      return { left: "0%", width: "100%" };
    }
    
    // Calculate visible items based on zoom
    const visibleItems = Math.max(1, Math.floor(totalItems / zoom));
    
    // Calculate max possible offset
    const maxOffset = Math.max(0, totalItems - visibleItems);
    
    // Clamp offset to valid range
    const clampedOffset = Math.max(0, Math.min(maxOffset, offset));
    
    // Calculate indicator width (inverse proportion to zoom)
    const widthPercent = Math.min(100, Math.max(0, (visibleItems / totalItems) * 100));
    
    // Calculate indicator position
    let leftPercent = 0;
    if (maxOffset > 0) {
      leftPercent = (clampedOffset / maxOffset) * (100 - widthPercent);
    }
    
    // Clamp left position
    leftPercent = Math.max(0, Math.min(100 - widthPercent, leftPercent));
    
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  return (
    <div className='chart' style={{ width: "100%", overflow: "hidden" }}>
      <div className='chart-info'>
        <h3>{`${ name } (${unit})`}</h3>
        <section>
          <button>{Exportsvg()}</button>
        </section>
        <div className='chart-zoom'>
          <menu className='zoom-scroll' onMouseDown={zoomStart} onMouseMove={zoomOn} onMouseUp={zoomEnd} onMouseLeave={zoomEnd}>
            <span style={{ left: `${ 85 / 20 * zoom }px` }}>{zoom.toFixed(2)}</span>
          </menu>
          <menu className="zoom-controls">
            <button onClick={zoomOut}>{
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 1018.001 0A9 9 0 003 12z" strokeWidth="2"/>
                    <path d="M12 8v8M8 12h8" strokeWidth="2"/>
                  </svg>}</button>
            <button onClick={()=> setZoom(1)}>{BoxSvg()}</button>
            <button onClick={zoomIn}>{CircleMinusSvg()}</button>
          </menu>
        </div>
      </div>
      <div className='chart-holder' onMouseDown={scrollStart} onMouseMove={(e: React.MouseEvent<HTMLElement>)=> scrollOn(e)} onMouseUp={scrollEnd} onMouseLeave={scrollEnd} onTouchStart={scrollStart} onTouchMove={(e: React.TouchEvent<HTMLElement>)=> scrollOn(e)} onTouchEnd={scrollEnd} style={{ touchAction: 'none' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            margin={{ top: 7, right: 7, left: 15, bottom: 7 }}
            data={visibleData}>
            <Tooltip 
              animationDuration={300}
              formatter={(value, name) => [
                `${value}${unit}`,
                name === 'primaryValue' ? names[0] : names[1]
              ]}
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              width={60}
              strokeWidth={2}
              domain={getYDomain()}
              tick={{ fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value: number) => 
                `${Math.abs(value) > 0.5 ? value.toFixed(1) : value.toFixed(3)}${unit}`
              }
            />
            
            <XAxis
              dataKey="time"
              strokeWidth={2}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: isMobile ? "short" : "long",
                  year: !isMobile ? "numeric" : undefined,
                })
              }
              minTickGap={30}
              tick={{ fontSize: 12, fontWeight: 600 }}
            />

            <Line
              name={names[0]}
              type="monotone"
              strokeWidth={1.5}
              dataKey="primaryValue"
              animationDuration={300}
              animationEasing='linear'
              stroke="var(--highlight)" dot={false} />

              {secondData && (
                <Line
                  dot={false}
                  name={names[1]}
                  type="monotone"
                  strokeWidth={1.5}
                  animationDuration={400}
                  dataKey="secondaryValue"
                  stroke='var(--a)'
                  animationBegin={100} // Stagger animation
                />
              )}

          </LineChart>
        </ResponsiveContainer>
      </div>
      <menu className="zoom-scroll" onMouseDown={scrollStart} onMouseUp={scrollEnd} onMouseLeave={scrollEnd} onTouchStart={scrollStart} onTouchEnd={scrollEnd} onMouseMove={(e: React.MouseEvent<HTMLElement>)=> scrollOn(e, false)} onTouchMove={(e: React.TouchEvent<HTMLElement>)=> scrollOn(e, false)} style={{ width: '90%' , marginInline: 'auto' }}>
        <p style={ getScrollIndicatorStyle() } ></p>
        </menu>
    </div>
  )
}

export const FeaturedPNodes = () => {
  const { pNodes, updated } = useNodes();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  
  const featuredNodes = React.useMemo(() => {
    return [...pNodes]
      .sort((a, b) => efficiency(b) - efficiency(a))
      .slice(0, 6);
  }, [pNodes]);

  const FeaturedNodeCard = ({ node, index }: { node: PNodes; index: number }) => {
    const { setUReason } = useNotifiers();
    const { user, token, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const nodeEfficiency = efficiency(node);
    const status = online(node, updated) ? 'online' : 'offline';
    const storageUsed = node.storage_used / 1000000;
    const storageCommitted = node.storage_committed / 1000000;
    const usagePercent = storageCommitted > 0 ? (storageUsed / storageCommitted) * 100 : 0;
    
    const exists = user?.watchlist.find((list: List) => list.pnodeId === node.name);
    
    const handleWatch = () => {
      if (loading) return;
      if (!user) {
        navigate('/signin');
        return;
      }
      if (exists) {
        RemoveFromWatchList(token, user, node, setError, setLoading, setUser, setUReason);
      } else {
        AddToWatchList(node, token, user, setLoading, setUser, setUReason);
      }
    };

    return (
      <div className="featured-pnode-card">
        <div className="featured-pnode-badge">
          #{index + 1}
        </div>
        <div className="featured-pnode-header">
          <div className="featured-pnode-icon">
            {Donnutsvg()}
          </div>
          <div>
            <h3 className="featured-pnode-name">{node.name || 'Unknown'}</h3>
            <div className="featured-pnode-status">
              <span className={`status-indicator ${status}`}></span>
              <span>{status === 'online' ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        
        <div className="featured-pnode-stats">
          <div className="featured-pnode-stat">
            <span>Efficiency</span>
            <div className="stat-value">
              {nodeEfficiency > 0.005 ? nodeEfficiency.toFixed(3) : '< 0.005'}%
            </div>
            <div className="stat-bar">
              <div 
                className="stat-bar-fill" 
                style={{ width: `${Math.min(nodeEfficiency, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="featured-pnode-stat">
            <span>Storage Usage</span>
            <div className="stat-value">
              {usagePercent.toFixed(4)}%
            </div>
            <div className="stat-bar">
              <div 
                className="stat-bar-fill" 
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="featured-pnode-stat">
            <span>Uptime</span>
            <div className="stat-value">
              {formatUptime(node.uptime)}
            </div>
          </div>
        </div>
        
        <div className="featured-pnode-actions">
          <button 
            className="view-details-btn"
            onClick={() => navigate(`/nodes/${node.pubkey}`)}
          >
            {Linksvg()} Details
          </button>
          
          {user && (
            <button 
              className="watchlist-btn"
              onClick={handleWatch}
              disabled={loading}
            >
              {loading ? loaderCircleSvg('big') : exists ? MinusSvg() : AddSvg()}
              {exists ? loading ? 'Removing' : 'Remove' : loading ? 'Adding' : 'Watch'}{ loading && <Ellipses />}
            </button>
          )}
        </div>
      </div>
    );
  };

  // Helper function to format uptime
  const formatUptime = (seconds: number) => {
    if (!seconds) return '0s';
    
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <section className="featured-pnodes-section">
      <div className="section-header">
        <h2>Top Performing pNodes</h2>
        <p>Nodes with the highest efficiency scores in the network</p>
      </div>
      
      <div className="featured-pnodes-grid">
        {featuredNodes.map((node, index) => (
          <FeaturedNodeCard key={node.pubkey} node={node} index={index} />
        ))}
      </div>
    </section>
  );
};