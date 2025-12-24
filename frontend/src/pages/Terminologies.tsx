import '../Terminology.css'
import { Link } from 'react-router-dom';
import {  Booksvg , Devsvg , ChartSvg ,TrackerSvg ,StorageSvg ,UptimeSvg ,Sparksvg ,NetworkSvg } from '../components/svgPack';

const Terminologies = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/docs/terminologies" className="docs-sidebar-home">
              {Booksvg()}
              <h2>Terminologies</h2>
            </Link>
            <p>Complete glossary of Xandeum and pNode terms</p>
          </div>
          
          <nav className="docs-nav">
            <a href="#network-terms" className="docs-nav-item">
              <span className="docs-nav-title">Network Terms</span>
            </a>
            
            <a href="#storage-terms" className="docs-nav-item">
              <span className="docs-nav-title">Storage Terms</span>
            </a>
            
            <a href="#performance-terms" className="docs-nav-item">
              <span className="docs-nav-title">Performance Terms</span>
            </a>
            
            <a href="#monitoring-terms" className="docs-nav-item">
              <span className="docs-nav-title">Monitoring Terms</span>
            </a>
            
            <a href="#technical-terms" className="docs-nav-item">
              <span className="docs-nav-title">Technical Terms</span>
            </a>
          </nav>
          
          <div className="docs-sidebar-footer">
            <Link to="/docs" className="docs-download-btn">
              {Booksvg()}
              <span>Back to Docs Hub</span>
            </Link>
          </div>
        </aside>

        <main className="docs-content">
          <div className="docs-content-header">
            <h1>Terminologies & Glossary</h1>
            <p className="docs-subtitle">
              Comprehensive dictionary of terms, definitions, and concepts used throughout the Xandeum ecosystem
              and Donnut-Nodes platform.
            </p>
          </div>

          <section id="network-terms" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{NetworkSvg()}</div>
              <h2>Network Terms</h2>
            </div>
            
            <div className="docs-definition-grid">
              <div className="docs-definition">
                <div className="docs-definition-term">
                  {NetworkSvg()}
                  <span>Xandeum Network</span>
                </div>
                <div className="docs-definition-content">
                  A decentralized storage network built on Solana that provides scalable storage solutions 
                  for dApps through a tiered system of storage providers.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  {TrackerSvg()}
                  <span>pNode (Provider Node)</span>
                </div>
                <div className="docs-definition-content">
                  Storage providers in the Xandeum network that commit storage capacity and participate 
                  in network gossip and data storage operations.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>gRPC / pRPC</span>
                </div>
                <div className="docs-definition-content">
                  Remote Procedure Call protocols used by Xandeum nodes for communication. 
                  pRPC is specifically optimized for provider node communication.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 1018.001 0A9 9 0 003 12z" strokeWidth="2"/>
                    <path d="M12 8v8M8 12h8" strokeWidth="2"/>
                  </svg>
                  <span>Solana Account</span>
                </div>
                <div className="docs-definition-content">
                  A data structure on the Solana blockchain that can store arbitrary data. 
                  Xandeum pNodes are implemented as specialized Solana accounts.
                </div>
              </div>
            </div>
          </section>

          <section id="storage-terms" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{StorageSvg()}</div>
              <h2>Storage Terms</h2>
            </div>
            
            <div className="docs-definition-grid">
              <div className="docs-definition">
                <div className="docs-definition-term">
                  {StorageSvg()}
                  <span>Storage Committed</span>
                </div>
                <div className="docs-definition-content">
                  The total amount of storage capacity a pNode has allocated and made available 
                  to the Xandeum network for data storage.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  {StorageSvg()}
                  <span>Storage Used</span>
                </div>
                <div className="docs-definition-content">
                  The actual amount of storage currently occupied by network data on a pNode. 
                  This represents active utilization of committed capacity.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                    <path d="M2 9h20M9 21V9" strokeWidth="2"/>
                  </svg>
                  <span>Storage Utilization Rate</span>
                </div>
                <div className="docs-definition-content">
                  The percentage of committed storage currently in use: 
                  (Storage Used ÷ Storage Committed) × 100
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"/>
                  </svg>
                  <span>Data Redundancy</span>
                </div>
                <div className="docs-definition-content">
                  The practice of storing multiple copies of data across different pNodes to ensure 
                  availability and durability in case of node failure.
                </div>
              </div>
            </div>
          </section>

          <section id="performance-terms" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Sparksvg()}</div>
              <h2>Performance Terms</h2>
            </div>
            
            <div className="docs-definition-grid">
              <div className="docs-definition">
                <div className="docs-definition-term">
                  {Sparksvg()}
                  <span>Efficiency Score</span>
                </div>
                <div className="docs-definition-content">
                  A composite metric (0-100%) that evaluates pNode performance based on 
                  storage utilization and uptime reliability.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  {UptimeSvg()}
                  <span>Uptime</span>
                </div>
                <div className="docs-definition-content">
                  The total duration a pNode has been operational and responsive since it 
                  first joined the network, measured in seconds.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2"/>
                  </svg>
                  <span>Response Time</span>
                </div>
                <div className="docs-definition-content">
                  The time taken by a pNode to respond to network queries and storage requests, 
                  indicating network connectivity quality.
                </div>
              </div>
              
              <div className="docs-definition">
                <div className="docs-definition-term">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2"/>
                  </svg>
                  <span>Throughput</span>
                </div>
                <div className="docs-definition-content">
                  The rate at which a pNode can process storage operations, typically measured 
                  in operations per second or data transferred per second.
                </div>
              </div>
            </div>
          </section>

          <section id="monitoring-terms" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{ChartSvg()}</div>
              <h2>Monitoring Terms</h2>
            </div>
            
            <div className="docs-glossary">
              <div className="docs-glossary-header">
                <h3>Monitoring & Analytics Terms</h3>
              </div>
              <div className="docs-glossary-content">
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">Last Seen</div>
                  <div className="docs-glossary-definition">
                    The timestamp when a pNode was last active in the network gossip. 
                    Used to determine online/offline status.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">First Seen</div>
                  <div className="docs-glossary-definition">
                    The timestamp when a pNode first appeared in the network. 
                    Used to calculate node age and track network growth.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">Network Health</div>
                  <div className="docs-glossary-definition">
                    Overall status of the Xandeum network based on metrics like total nodes online, 
                    total storage available, and average response times.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">Polling Interval</div>
                  <div className="docs-glossary-definition">
                    The time period (90 seconds) between data collection cycles when the system 
                    queries Xandeum pRPC endpoints for updated node information.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">Real-Time Monitoring</div>
                  <div className="docs-glossary-definition">
                    Continuous observation of pNode metrics with minimal delay, providing 
                    up-to-date information on network status and performance.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="technical-terms" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Devsvg()}</div>
              <h2>Technical Terms</h2>
            </div>
            
            <div className="docs-category-grid">
              <div className="docs-category">
                <h4>JSON</h4>
                <p>JavaScript Object Notation - Lightweight data interchange format used by our API</p>
              </div>
              
              <div className="docs-category">
                <h4>REST API</h4>
                <p>Representational State Transfer API - Architectural style for web services</p>
              </div>
              
              <div className="docs-category">
                <h4>WebSocket</h4>
                <p>Communication protocol providing full-duplex communication channels</p>
              </div>
              
              <div className="docs-category">
                <h4>HTTP Methods</h4>
                <p>GET, POST, PUT, DELETE - Standard operations for API interactions</p>
              </div>
              
              <div className="docs-category">
                <h4>Query Parameters</h4>
                <p>URL parameters used to filter, sort, or paginate API responses</p>
              </div>
              
              <div className="docs-category">
                <h4>Endpoints</h4>
                <p>Specific URLs that accept API requests and return responses</p>
              </div>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Need More Help?</h3>
            <p>Explore our other documentation sections for detailed guides and tutorials</p>
            <div className="docs-section-nav">
              <Link to="/docs/api">API Reference</Link>
              <Link to="/docs/nodes">pNodes Guide</Link>
              <Link to="/docs/methods">Methods & Tools</Link>
              <Link to="/docs/policies">Privacy & Terms</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Terminologies;