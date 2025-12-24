import { Link } from 'react-router-dom';
import { Rocketsvg , Searchsvg ,  Comparesvg ,Watchsvg ,Chartsvg ,Alertsvg ,Exportsvg } from '../components/svgPack';

const Methods = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/docs/methods" className="docs-sidebar-home">
              {Rocketsvg()}
              <h2>Methods & Tools</h2>
            </Link>
            <p>Advanced features and analysis techniques</p>
          </div>
          
          <nav className="docs-nav">
            <a href="#search-filter" className="docs-nav-item">
              <span className="docs-nav-title">Search & Filter</span>
            </a>
            
            <a href="#watchlist" className="docs-nav-item">
              <span className="docs-nav-title">Watchlist Feature</span>
            </a>
            
            <a href="#comparison" className="docs-nav-item">
              <span className="docs-nav-title">Comparison Tools</span>
            </a>
            
            <a href="#analytics" className="docs-nav-item">
              <span className="docs-nav-title">Analytics Methods</span>
            </a>
            
            <a href="#monitoring" className="docs-nav-item">
              <span className="docs-nav-title">Monitoring Tools</span>
            </a>
            
            <a href="#integration" className="docs-nav-item">
              <span className="docs-nav-title">Integration Methods</span>
            </a>
          </nav>
          
          <div className="docs-sidebar-footer">
            <Link to="/nodes" className="docs-download-btn">
              {Rocketsvg()}
              <span>Try Methods</span>
            </Link>
            <Link to="/docs" className="docs-github-btn">
              <span>← Back to Docs</span>
            </Link>
          </div>
        </aside>

        <main className="docs-content">
          <div className="docs-content-header">
            <h1>Methods & Tools Guide</h1>
            <p className="docs-subtitle">
              Advanced features, analysis techniques, and tools for comprehensive pNode monitoring and optimization
            </p>
          </div>

          <section id="search-filter" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Searchsvg()}</div>
              <h2>Advanced Search & Filtering</h2>
            </div>
            
            <p>
              Our platform provides powerful search and filtering capabilities to help you find exactly 
              the pNodes you need to monitor or analyze.
            </p>
            
            <div className="docs-method-cards">
              <div className="docs-method-card">
                <div className="docs-method-number">1</div>
                <h3>Text Search</h3>
                <p>
                  Search across multiple pNode fields including name, pubkey, address, and version.
                  Supports partial matches and case-insensitive searching.
                </p>
                <ul className="docs-method-features">
                  <li>Real-time search as you type</li>
                  <li>Search across all text fields</li>
                  <li>Partial match support</li>
                  <li>Case-insensitive</li>
                </ul>
              </div>
              
              <div className="docs-method-card">
                <div className="docs-method-number">2</div>
                <h3>Advanced Filtering</h3>
                <p>
                  Filter pNodes by multiple criteria simultaneously using our comprehensive filter system.
                </p>
                <ul className="docs-method-features">
                  <li>Status (Online/Offline)</li>
                  <li>Efficiency score ranges</li>
                  <li>Storage usage levels</li>
                  <li>Node age categories</li>
                  <li>Public/Private status</li>
                  <li>Last seen time ranges</li>
                </ul>
              </div>
              
              <div className="docs-method-card">
                <div className="docs-method-number">3</div>
                <h3>Reverse Filtering</h3>
                <p>
                  Exclude nodes matching specific criteria to focus on outliers or problematic nodes.
                </p>
                <ul className="docs-method-features">
                  <li>Invert any filter criteria</li>
                  <li>Focus on problem areas</li>
                  <li>Identify outliers</li>
                  <li>Custom exclusion sets</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="watchlist" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Watchsvg()}</div>
              <h2>Watchlist Feature</h2>
            </div>
            
            <div className="docs-method-detail">
              <div className="docs-method-card">
                <div className="docs-method-number"></div>
                <h3>Personalized Monitoring</h3>
                <p>
                  Create custom watchlists to track specific pNodes that matter most to your operations.
                  Watchlists persist between sessions and provide focused monitoring.
                </p>
                
                <div className="docs-feature-list">
                  <h4>Watchlist Benefits:</h4>
                  <ul className="docs-method-features">
                    <li>Quick access to important nodes</li>
                    <li>Performance trend tracking</li>
                    <li>Custom alerts and notifications</li>
                    <li>Export watchlist data</li>
                    <li>Share with team members</li>
                  </ul>
                </div>
                
                <div className="docs-note">
                  <strong>Tip:</strong> Create separate watchlists for different purposes - 
                  one for your own nodes, one for top performers, and one for nodes you're considering partnering with.
                </div>
              </div>
            </div>
          </section>

          <section id="comparison" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Comparesvg()}</div>
              <h2>Comparison Tools</h2>
            </div>
            
            <div className="docs-method-cards">
              <div className="docs-method-card">
                <h3>Side-by-Side Comparison</h3>
                <p>
                  Compare up to 5 pNodes simultaneously to evaluate performance differences,
                  storage patterns, and efficiency metrics.
                </p>
                <ul className="docs-method-features">
                  <li>Multiple node comparison</li>
                  <li>Visual metrics comparison</li>
                  <li>Performance benchmarking</li>
                  <li>Export comparison data</li>
                </ul>
              </div>
              
              <div className="docs-method-card">
                <h3>Historical Comparison</h3>
                <p>
                  Track performance changes over time for individual nodes or groups of nodes.
                  Identify trends and predict future performance.
                </p>
                <ul className="docs-method-features">
                  <li>Time-series data analysis</li>
                  <li>Performance trend identification</li>
                  <li>Anomaly detection</li>
                  <li>Growth rate calculation</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="analytics" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Chartsvg()}</div>
              <h2>Analytics Methods</h2>
            </div>
            
            <div className="docs-method-detail">
              <div className="docs-method-card">
                <h3>Statistical Analysis</h3>
                <p>
                  Our platform provides comprehensive statistical analysis of pNode networks,
                  helping you understand overall health and identify optimization opportunities.
                </p>
                
                <div className="docs-stats-grid">
                  <div className="docs-stats-category">
                    <h4>Network-Level Analytics</h4>
                    <ul className="docs-method-features">
                      <li>Total storage capacity analysis</li>
                      <li>Average efficiency calculations</li>
                      <li>Uptime distribution analysis</li>
                      <li>Network growth trends</li>
                    </ul>
                  </div>
                  
                  <div className="docs-stats-category">
                    <h4>Individual Node Analytics</h4>
                    <ul className="docs-method-features">
                      <li>Performance scoring algorithms</li>
                      <li>Storage utilization patterns</li>
                      <li>Uptime reliability metrics</li>
                      <li>Predictive performance modeling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="monitoring" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Alertsvg()}</div>
              <h2>Monitoring Tools</h2>
            </div>
            
            <div className="docs-method-cards">
              <div className="docs-method-card">
                <h3>Real-Time Alerts</h3>
                <p>
                  Set up custom alerts for specific conditions like nodes going offline,
                  storage reaching capacity, or efficiency dropping below thresholds.
                </p>
                <ul className="docs-method-features">
                  <li>Custom alert conditions</li>
                  <li>Email notifications</li>
                  <li>Webhook integration</li>
                  <li>Alert history tracking</li>
                </ul>
              </div>
              
              <div className="docs-method-card">
                <h3>Batch Operations</h3>
                <p>
                  Perform operations on multiple nodes simultaneously for efficient management
                  of large node collections or network monitoring.
                </p>
                <ul className="docs-method-features">
                  <li>Bulk status checking</li>
                  <li>Group performance analysis</li>
                  <li>Batch data export</li>
                  <li>Multi-node comparisons</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="integration" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Exportsvg()}</div>
              <h2>Integration Methods</h2>
            </div>
            
            <div className="docs-info-box">
              <div className="docs-info-box-icon">{Exportsvg()}</div>
              <div className="docs-info-box-content">
                <h3>API Integration</h3>
                <p>
                  Integrate pNode data directly into your applications, dashboards, or monitoring systems
                  using our comprehensive REST API and WebSocket endpoints.
                </p>
                <div className="docs-feature-list">
                  <h4>Integration Options:</h4>
                  <ul className="docs-method-features">
                    <li>REST API for data queries</li>
                    <li>WebSocket for real-time updates</li>
                    <li>Webhook support for alerts</li>
                    <li>Data export in multiple formats</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="docs-important-notice">
              <h3>Best Practices</h3>
              <p>
                When implementing these methods, consider starting with basic search and filtering,
                then gradually incorporate more advanced tools as you become familiar with the platform.
                Regular monitoring and analysis using these tools can significantly improve your
                understanding of network performance and help optimize your storage operations.
              </p>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Ready to Use Advanced Methods?</h3>
            <p>Start exploring our comprehensive toolset for pNode analysis and optimization</p>
            <Link to="/nodes" className="docs-cta-button">
              Launch Methods Dashboard
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Methods;