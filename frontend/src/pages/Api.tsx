import { ApiSvg, CodeSvg, TerminalSvg, DownloadSvg } from '../components/svgPack';
import { UptimeSvg } from './../components/svgPack';

const Api = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        
        <main className="docs-content">

          <section id="overview" className="docs-section">
            <h2>API Overview</h2>
            <p>
              Our REST API provides free access to all Xandeum pNode data. All endpoints 
              return JSON responses with real-time data updated every 90 seconds.
            </p>
            
            <div className="docs-info-box">
              <div className="docs-info-box-icon">{TerminalSvg()}</div>
              <div className="docs-info-box-content">
                <h3>Base URL</h3>
                <code className="docs-code-block">{process.env.REACT_APP_API || 'http://localhost:4000'}</code>
                <p className="docs-info-box-note">
                  All endpoints are free and require no authentication
                </p>
              </div>
            </div>
          </section>

          <section id="polling" className="docs-section">
            <h2>Data Polling</h2>
            <p>
              Our API polls Xandeum's pRPC endpoints every 90 seconds to fetch the latest pNode data. 
              This ensures you get near real-time information about the network.
            </p>
            
            <div className="docs-polling-info">
              <div className="docs-polling-item">
                <div className="docs-polling-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2"/>
                  </svg></div>
                <div className="docs-polling-content">
                  <h4>90-Second Polling</h4>
                  <p>Data refreshed every 90 seconds from Xandeum network</p>
                </div>
              </div>
              
              <div className="docs-polling-item">
                <div className="docs-polling-icon">
                  {UptimeSvg()}
                </div>
                <div className="docs-polling-content">
                  <h4>Real-Time Updates</h4>
                  <p>WebSocket connections for instant pNode updates</p>
                </div>
              </div>
              
              <div className="docs-polling-item">
                <div className="docs-polling-icon">{TerminalSvg()}</div>
                <div className="docs-polling-content">
                  <h4>Completely Free</h4>
                  <p>No rate limits, no authentication required</p>
                </div>
              </div>
            </div>
          </section>

          <section id="endpoints" className="docs-section">
            <h2>Endpoints</h2>
            
            <div className="docs-endpoint-group">
              <h3>pNodes Endpoints</h3>
              
              <div className="docs-endpoint">
                <div className="docs-endpoint-header">
                  <span className="docs-endpoint-method get">GET</span>
                  <code className="docs-endpoint-url">/pnodes</code>
                </div>
                <p className="docs-endpoint-description">
                  Retrieve all pNodes currently active in the Xandeum network.
                </p>
                
                <div className="docs-params">
                  <h4>Query Parameters</h4>
                  <table className="docs-params-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>limit</code></td>
                        <td>integer</td>
                        <td>Number of results (default: 50, max: 250)</td>
                      </tr>
                      <tr>
                        <td><code>status</code></td>
                        <td>string</td>
                        <td>Filter by status: "online" or "offline"</td>
                      </tr>
                      <tr>
                        <td><code>min_efficiency</code></td>
                        <td>number</td>
                        <td>Minimum efficiency score (0-100)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="docs-code-example">
                  <div className="docs-code-header">
                    <span>Example Request</span>
                  </div>
                  <pre className="docs-code-content">
{`curl -X GET "${process.env.REACT_APP_API || 'http://localhost:4000'}/pnodes?limit=10&status=online"`}
                  </pre>
                </div>

                <div className="docs-code-example">
                  <div className="docs-code-header">
                    <span>Example Response</span>
                  </div>
                  <pre className="docs-code-content">
{`{
  "data": [
    {
      "name": "pnode-001",
      "pubkey": "5FHwkrdx...",
      "address": "192.168.1.1:8899",
      "storage_committed": 1073741824000,
      "storage_used": 268435456000,
      "uptime": 604800,
      "last_seen": 1678901234567,
      "last_seen_timestamp": 1678901234,
      "first_seen": 1678291234567,
      "is_public": true,
      "version": "1.2.0",
      "rpc_port": 8899
    }
  ],
  "updated": 1678901234567,
  "count": 247
}`}
                  </pre>
                </div>
              </div>

              <div className="docs-endpoint">
                <div className="docs-endpoint-header">
                  <span className="docs-endpoint-method get">GET</span>
                  <code className="docs-endpoint-url">/pnodes/{'{pubkey}'}</code>
                </div>
                <p className="docs-endpoint-description">
                  Get detailed information for a specific pNode by its public key.
                </p>
              </div>
            </div>

            <div className="docs-endpoint-group">
              <h3>Network Health Endpoints</h3>
              
              <div className="docs-endpoint">
                <div className="docs-endpoint-header">
                  <span className="docs-endpoint-method get">GET</span>
                  <code className="docs-endpoint-url">/health</code>
                </div>
                <p className="docs-endpoint-description">
                  Get overall network health statistics and status.
                </p>
                
                <div className="docs-code-example">
                  <div className="docs-code-header">
                    <span>Example Response</span>
                  </div>
                  <pre className="docs-code-content">
{`{
  "status": "healthy",
  "total_nodes": 247,
  "online_nodes": 231,
  "offline_nodes": 16,
  "total_storage": "3.2PB",
  "used_storage": "1.1PB",
  "network_uptime": "99.8%",
  "last_updated": 1678901234567,
  "next_poll": 1678901234567
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section id="websocket" className="docs-section">
            <h2>WebSocket API</h2>
            <p>
              Connect to our WebSocket endpoint for real-time pNode updates. Receive instant 
              notifications when pNode data changes or new nodes join the network.
            </p>
            
            <div className="docs-endpoint">
              <div className="docs-endpoint-header">
                <span className="docs-endpoint-method ws">WS</span>
                <code className="docs-endpoint-url">/ws</code>
              </div>
              <p className="docs-endpoint-description">
                WebSocket endpoint for real-time pNode updates. Automatically reconnects 
                on disconnection with 5-second delay and 12 retry attempts.
              </p>
              
              <div className="docs-code-example">
                <div className="docs-code-header">
                  <span>WebSocket Connection Example</span>
                </div>
                <pre className="docs-code-content">
{`const socket = io('${process.env.REACT_APP_API || 'http://localhost:4000'}', {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 12
});

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('pnodes:update', (data) => {
  // Receive pNode updates
  console.log('pNode update:', data);
});

socket.on('network:health', (data) => {
  // Receive network health updates
  console.log('Network health:', data);
});`}
                </pre>
              </div>
              
              <div className="docs-ws-events">
                <h4>WebSocket Events</h4>
                <ul>
                  <li><code>pnodes:update</code> - Real-time pNode data updates</li>
                  <li><code>network:health</code> - Network health status updates</li>
                  <li><code>system:alert</code> - System alerts and notifications</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="data-structure" className="docs-section">
            <h2>Data Structure</h2>
            
            <div className="docs-data-structure">
              <div className="docs-data-item">
                <h3>pNode Object</h3>
                <table className="docs-params-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>name</code></td>
                      <td>string</td>
                      <td>pNode identifier (e.g., "pnode-001")</td>
                    </tr>
                    <tr>
                      <td><code>pubkey</code></td>
                      <td>string</td>
                      <td>Public key identifier</td>
                    </tr>
                    <tr>
                      <td><code>address</code></td>
                      <td>string</td>
                      <td>IP address and port</td>
                    </tr>
                    <tr>
                      <td><code>storage_committed</code></td>
                      <td>number</td>
                      <td>Total committed storage in bytes</td>
                    </tr>
                    <tr>
                      <td><code>storage_used</code></td>
                      <td>number</td>
                      <td>Used storage in bytes</td>
                    </tr>
                    <tr>
                      <td><code>uptime</code></td>
                      <td>number</td>
                      <td>Uptime in seconds</td>
                    </tr>
                    <tr>
                      <td><code>last_seen</code></td>
                      <td>number</td>
                      <td>Last seen timestamp (milliseconds)</td>
                    </tr>
                    <tr>
                      <td><code>last_seen_timestamp</code></td>
                      <td>number</td>
                      <td>Last seen timestamp (seconds)</td>
                    </tr>
                    <tr>
                      <td><code>first_seen</code></td>
                      <td>number</td>
                      <td>First seen timestamp (milliseconds)</td>
                    </tr>
                    <tr>
                      <td><code>is_public</code></td>
                      <td>boolean</td>
                      <td>Public access status</td>
                    </tr>
                    <tr>
                      <td><code>version</code></td>
                      <td>string</td>
                      <td>pNode software version</td>
                    </tr>
                    <tr>
                      <td><code>rpc_port</code></td>
                      <td>number</td>
                      <td>RPC port number</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="docs-section docs-downloads">
            <h2>Resources</h2>
            <div className="docs-downloads-grid">
              <a href={`${process.env.REACT_APP_API || 'http://localhost:4000'}/pnodes`} className="docs-download-card" target="_blank" rel="noopener noreferrer">
                <div className="docs-download-icon">{TerminalSvg()}</div>
                <div className="docs-download-content">
                  <h3>Test API Endpoint</h3>
                  <p>Try our live pNodes endpoint in your browser</p>
                </div>
              </a>
              
              <a href="https://www.postman.com/" className="docs-download-card" target="_blank" rel="noopener noreferrer">
                <div className="docs-download-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="1" y="4" width="22" height="16" rx="2" strokeWidth="2"/>
                    <line x1="1" y1="10" x2="23" y2="10" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="docs-download-content">
                  <h3>Postman Collection</h3>
                  <p>Import our endpoints into Postman</p>
                </div>
              </a>
              
              <a href="https://xandeum.network" className="docs-download-card" target="_blank" rel="noopener noreferrer">
                <div className="docs-download-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="docs-download-content">
                  <h3>Xandeum Network</h3>
                  <p>Official Xandeum documentation</p>
                </div>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Api;