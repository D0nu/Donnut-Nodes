import { TerminalSvg , UptimeSvg } from '../components/svgPack';

const Api = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <main className="docs-content">

          {/* Overview */}
          <section id="overview" className="docs-section">
            <h2>API Overview</h2>
            <p>
              The Donnut-Nodes API provides free, read-only access to observed Xandeum pNode data.
              All responses are returned as JSON and reflect the most recently collected snapshot
              of the network.
            </p>

            <p>
              This API does not control pNodes or influence the Xandeum network. It aggregates,
              normalizes, and serves publicly observable data for analytics and monitoring purposes.
            </p>

            <div className="docs-info-box">
              <div className="docs-info-box-icon">{TerminalSvg()}</div>
              <div className="docs-info-box-content">
                <h3>Base URL</h3>
                <code className="docs-code-block">
                  {process.env.REACT_APP_API || 'http://localhost:4000'}
                </code>
                <p className="docs-info-box-note">
                  No authentication required. Free to use.
                </p>
              </div>
            </div>
          </section>

          {/* Polling */}
          <section id="polling" className="docs-section">
            <h2>Data Collection</h2>
            <p>
              pNode data is collected at fixed intervals and stored as a snapshot of the network
              at that point in time. This approach avoids noise caused by transient restarts,
              address changes, or short-lived network interruptions.
            </p>

            <div className="docs-polling-info">
              <div className="docs-polling-item">
                <div className="docs-polling-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="docs-polling-content">
                  <h4>90-Second Interval</h4>
                  <p>Network state is sampled every 90 seconds</p>
                </div>
              </div>

              <div className="docs-polling-item">
                <div className="docs-polling-icon">{UptimeSvg()}</div>
                <div className="docs-polling-content">
                  <h4>Observed Availability</h4>
                  <p>Uptime reflects observed presence over time, not continuous process runtime</p>
                </div>
              </div>

              <div className="docs-polling-item">
                <div className="docs-polling-icon">{TerminalSvg()}</div>
                <div className="docs-polling-content">
                  <h4>No Rate Limits</h4>
                  <p>Designed for dashboards, research, and monitoring tools</p>
                </div>
              </div>
            </div>
          </section>

          {/* Endpoints */}
          <section id="endpoints" className="docs-section">
            <h2>Endpoints</h2>

            <div className="docs-endpoint-group">
              <h3>pNodes</h3>

              <div className="docs-endpoint">
                <div className="docs-endpoint-header">
                  <span className="docs-endpoint-method get">GET</span>
                  <code className="docs-endpoint-url">/pnodes</code>
                </div>
                <p className="docs-endpoint-description">
                  Returns the latest snapshot of all observed pNodes.
                  Results are not filtered or paginated.
                </p>

                <div className="docs-code-example">
                  <div className="docs-code-header">
                    <span>Example Request</span>
                  </div>
                  <pre className="docs-code-content">
{`curl -X GET "${process.env.REACT_APP_API || 'http://localhost:4000'}/pnodes"`}
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
      "name": "Pnode-ABCD-1234",
      "pubkey": "5FHwkrdx...",
      "address": "192.0.2.12:8899",
      "storage_committed": 1073741824000,
      "storage_used": 268435456000,
      "uptime": 604800,
      "last_seen": 1718901234567,
      "last_seen_timestamp": 1718901234,
      "first_seen": 1718291234567,
      "is_public": true,
      "version": "1.2.0",
      "rpc_port": 8899
    }
  ],
  "success": true
}`}
                  </pre>
                </div>
              </div>

              <div className="docs-endpoint">
                <div className="docs-endpoint-header">
                  <span className="docs-endpoint-method get">GET</span>
                  <code className="docs-endpoint-url">/pnodes/:id</code>
                </div>
                <p className="docs-endpoint-description">
                  Returns historical statistics and metadata for a single pNode,
                  identified by its internal ID or public key.
                </p>
              </div>
            </div>

            <div className="docs-endpoint-group">
              <h3>System</h3>

              <div className="docs-endpoint">
                <div className="docs-endpoint-header">
                  <span className="docs-endpoint-method get">GET</span>
                  <code className="docs-endpoint-url">/health</code>
                </div>
                <p className="docs-endpoint-description">
                  Returns server health information, including uptime and timestamp.
                  This endpoint reflects the API service status, not network-wide pNode health.
                </p>

                <div className="docs-code-example">
                  <div className="docs-code-header">
                    <span>Example Response</span>
                  </div>
                  <pre className="docs-code-content">
{`{
  "status": "ok",
  "uptime": 123456.78,
  "timeStamp": 1718901234567
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* WebSocket */}
          <section id="websocket" className="docs-section">
            <h2>WebSocket API</h2>
            <p>
              The WebSocket connection provides push-based updates when a new pNode
              snapshot is processed. Clients receive the same normalized data served
              by the REST API.
            </p>

            <div className="docs-endpoint">
              <div className="docs-endpoint-header">
                <span className="docs-endpoint-method ws">WS</span>
                <code className="docs-endpoint-url">/socket.io</code>
              </div>

              <div className="docs-code-example">
                <div className="docs-code-header">
                  <span>Connection Example</span>
                </div>
                <pre className="docs-code-content">
{`const socket = io('${process.env.REACT_APP_API || 'http://localhost:4000'}');

socket.on('connect', () => {
  console.log('Connected');
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('pnodes:update', (data) => {
  console.log('Updated pNode snapshot:', data);
});`}
                </pre>
              </div>

              <div className="docs-ws-events">
                <h4>Emitted Events</h4>
                <ul>
                  <li><code>connect</code> – Connection established</li>
                  <li><code>disconnect</code> – Connection closed</li>
                  <li><code>pnodes:update</code> – New pNode snapshot available</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Structure */}
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
                    <tr><td><code>name</code></td><td>string</td><td>Generated human-readable identifier</td></tr>
                    <tr><td><code>pubkey</code></td><td>string</td><td>Stable cryptographic identity</td></tr>
                    <tr><td><code>address</code></td><td>string</td><td>Last observed network address</td></tr>
                    <tr><td><code>storage_committed</code></td><td>number</td><td>Committed storage (bytes)</td></tr>
                    <tr><td><code>storage_used</code></td><td>number</td><td>Used storage (bytes)</td></tr>
                    <tr><td><code>uptime</code></td><td>number</td><td>Reported uptime (seconds)</td></tr>
                    <tr><td><code>last_seen</code></td><td>number</td><td>Last observation (ms)</td></tr>
                    <tr><td><code>first_seen</code></td><td>number</td><td>First observation (ms)</td></tr>
                    <tr><td><code>is_public</code></td><td>boolean</td><td>Public accessibility flag</td></tr>
                    <tr><td><code>version</code></td><td>string</td><td>Reported node software version</td></tr>
                    <tr><td><code>rpc_port</code></td><td>number</td><td>RPC port number</td></tr>
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
