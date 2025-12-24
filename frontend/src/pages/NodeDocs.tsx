import { Link } from 'react-router-dom';
import { TrackerSvg, StorageSvg, UptimeSvg, Sparksvg } from '../components/svgPack';

const Nodes = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        {/* Sidebar Navigation - Added for proper docs layout */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/docs/nodes" className="docs-sidebar-home">
              {TrackerSvg()} {/* Fixed: Added parentheses */}
              <h2>pNodes Guide</h2>
            </Link>
            <p>Understanding and monitoring Xandeum pNodes</p>
          </div>
          
          <nav className="docs-nav">
            <a href="#what-are-pnodes" className="docs-nav-item">
              <span className="docs-nav-title">What are pNodes?</span>
            </a>
            
            <a href="#metrics-explained" className="docs-nav-item">
              <span className="docs-nav-title">Metrics Explained</span>
            </a>
            
            <a href="#status-monitoring" className="docs-nav-item">
              <span className="docs-nav-title">Status Monitoring</span>
            </a>
            
            <a href="#performance-optimization" className="docs-nav-item">
              <span className="docs-nav-title">Performance Optimization</span>
            </a>
            
            <a href="#additional-resources" className="docs-nav-item">
              <span className="docs-nav-title">Additional Resources</span>
            </a>
          </nav>
          
          <div className="docs-sidebar-footer">
            <a href="/nodes" className="docs-download-btn">
              {TrackerSvg()} {/* Fixed: Added parentheses */}
              <span>View Live pNodes</span>
            </a>
            <Link to="/docs" className="docs-github-btn">
              <span>← Back to Docs</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="docs-content">
          {/* Header Section */}
          <div className="docs-content-header">
            <h1>pNodes Documentation</h1>
            <p className="docs-subtitle">
              Complete guide to understanding, monitoring, and optimizing Xandeum pNodes (Provider Nodes)
            </p>
          </div>

          <section id="what-are-pnodes" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{TrackerSvg()}</div>
              <h2>What are pNodes?</h2>
            </div>
            <p>
              pNodes (Provider Nodes) are the storage providers in the Xandeum network. They form a second tier
              of Solana accounts that can scale to exabytes and beyond, providing decentralized storage for dApps.
            </p>
            
            <div className="docs-feature-cards">
              <div className="docs-feature-card">
                <div className="docs-feature-icon">{StorageSvg()}</div>
                <h3>Storage Providers</h3>
                <p>Commit storage capacity to the network and store data for Solana dApps</p>
              </div>
              
              <div className="docs-feature-card">
                <div className="docs-feature-icon">{UptimeSvg()}</div>
                <h3>Network Participants</h3>
                <p>Participate in Xandeum's gossip network and respond to storage requests</p>
              </div>
              
              <div className="docs-feature-card">
                <div className="docs-feature-icon">{Sparksvg('big')}</div>
                <h3>Reward Earners</h3>
                <p>Earn rewards based on storage provided, uptime, and network participation</p>
              </div>
            </div>
          </section>

          <section id="metrics-explained" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{StorageSvg()}</div>
              <h2>pNode Metrics Explained</h2>
            </div>
            
            <div className="docs-metric-detail">
              <div className="docs-metric-header">
                <h3>Efficiency Score</h3>
                <span className="docs-metric-range">0-100%</span>
              </div>
              <p>
                The efficiency score measures how effectively a pNode utilizes its resources. 
                It combines storage usage rate with uptime reliability to provide a comprehensive performance metric.
              </p>
              
              <div className="docs-metric-formula">
                <h4>Calculation Formula</h4>
                <code className="docs-code-block">
                  efficiency = (storage_usage × 0.6 + uptime_score × 0.4) × 100
                </code>
                <p className="docs-formula-note">
                  Where storage_usage is (storage_used / storage_committed) and uptime_score is normalized uptime reliability.
                </p>
              </div>
              
              <div className="docs-metric-interpretation">
                <h4>Interpretation Guide</h4>
                <div className="docs-score-guide">
                  <div className="docs-score-tier">
                    <span className="docs-score-color excellent"></span>
                    <span className="docs-score-range">90-100%</span>
                    <span className="docs-score-label">Excellent</span>
                  </div>
                  <div className="docs-score-tier">
                    <span className="docs-score-color good"></span>
                    <span className="docs-score-range">70-89%</span>
                    <span className="docs-score-label">Good</span>
                  </div>
                  <div className="docs-score-tier">
                    <span className="docs-score-color average"></span>
                    <span className="docs-score-range">50-69%</span>
                    <span className="docs-score-label">Average</span>
                  </div>
                  <div className="docs-score-tier">
                    <span className="docs-score-color poor"></span>
                    <span className="docs-score-range">0-49%</span>
                    <span className="docs-score-label">Needs Improvement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="docs-metric-detail">
              <div className="docs-metric-header">
                <h3>Uptime</h3>
                <span className="docs-metric-unit">Seconds</span>
              </div>
              <p>
                Total time the pNode has been operational and responsive since it first appeared in the network.
                This metric indicates reliability and consistency.
                It is the total work time of a PNode
              </p>
              
              <div className="docs-uptime-examples">
                <div className="docs-uptime-example">
                  <div className="docs-uptime-value">86,400s</div>
                  <div className="docs-uptime-label">= 1 day</div>
                </div>
                <div className="docs-uptime-example">
                  <div className="docs-uptime-value">604,800s</div>
                  <div className="docs-uptime-label">= 1 week</div>
                </div>
                <div className="docs-uptime-example">
                  <div className="docs-uptime-value">2,592,000s</div>
                  <div className="docs-uptime-label">= 30 days</div>
                </div>
              </div>
            </div>

            <div className="docs-metric-detail">
              <div className="docs-metric-header">
                <h3>Storage Metrics</h3>
                <span className="docs-metric-unit">Bytes</span>
              </div>
              
              <div className="docs-storage-metrics">
                <div className="docs-storage-metric">
                  <h4>Storage Committed</h4>
                  <p>Total storage capacity the pNode has allocated to the network</p>
                </div>
                
                <div className="docs-storage-metric">
                  <h4>Storage Used</h4>
                  <p>Amount of committed storage currently utilized by network data</p>
                </div>
                
                <div className="docs-storage-metric">
                  <h4>Storage Available</h4>
                  <p>Unused capacity available for new data storage</p>
                  <code className="docs-inline-code">available = committed - used</code>
                </div>
                
                <div className="docs-storage-metric">
                  <h4>Usage Percentage</h4>
                  <p>Percentage of committed storage currently in use</p>
                  <code className="docs-inline-code">usage = (used / committed) × 100</code>
                </div>
              </div>
            </div>
          </section>

          <section id="status-monitoring" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{UptimeSvg()}</div>
              <h2>Status Monitoring</h2>
            </div>
            
            <div className="docs-status-guide">
              <div className="docs-status-item online">
                <div className="docs-status-indicator"></div>
                <div className="docs-status-content">
                  <h3>Online Status</h3>
                  <p>
                    A pNode is considered <strong>online</strong> if it has been seen within the last 90 seconds.
                    Online nodes are actively participating in the network and available for storage operations.
                  </p>
                </div>
              </div>
              
              <div className="docs-status-item offline">
                <div className="docs-status-indicator"></div>
                <div className="docs-status-content">
                  <h3>Offline Status</h3>
                  <p>
                    A pNode is marked <strong>offline</strong> if it hasn't been seen for more than 90 seconds.
                    This could indicate network issues, maintenance, or node failure.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="docs-note">
              <strong>Note:</strong> The "last seen" timestamp is updated every time a pNode participates in
              network gossip or responds to pRPC calls.
            </div>
          </section>

          <section id="performance-optimization" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Sparksvg()}</div>
              <h2>Performance Optimization</h2>
            </div>
            
            <div className="docs-optimization-tips">
              <div className="docs-tip">
                <div className="docs-tip-number">1</div>
                <div className="docs-tip-content">
                  <h3>Monitor Storage Usage</h3>
                  <p>
                    Keep storage usage between 25-75% for optimal efficiency scores.
                    Both underutilization and overutilization can negatively impact performance metrics.
                  </p>
                </div>
              </div>
              
              <div className="docs-tip">
                <div className="docs-tip-number">2</div>
                <div className="docs-tip-content">
                  <h3>Maintain High Uptime</h3>
                  <p>
                    Consistent uptime is crucial for reliability scores. Aim for 99%+ uptime
                    and minimize unnecessary restarts or maintenance windows.
                  </p>
                </div>
              </div>
              
              <div className="docs-tip">
                <div className="docs-tip-number">3</div>
                <div className="docs-tip-content">
                  <h3>Regular Updates</h3>
                  <p>
                    Keep your pNode software updated to the latest stable version.
                    Updates often include performance improvements and bug fixes.
                  </p>
                </div>
              </div>
              
              <div className="docs-tip">
                <div className="docs-tip-number">4</div>
                <div className="docs-tip-content">
                  <h3>Network Connectivity</h3>
                  <p>
                    Ensure stable internet connectivity with low latency to other network nodes.
                    Poor connectivity can affect response times and status reporting.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="additional-resources" className="docs-section docs-resources">
            <div className="docs-section-header">
              <h2>Additional Resources</h2>
            </div>
            
            <div className="docs-resource-links">
              <a href="https://xandeum.network" className="docs-resource-link" target="_blank" rel="noopener noreferrer">
                <h3>Xandeum Network Docs</h3>
                <p>Official Xandeum network documentation</p>
              </a>
              
              <a href="https://github.com/xandeum/pnode-setup" className="docs-resource-link" target="_blank" rel="noopener noreferrer">
                <h3>pNode Setup Guide</h3>
                <p>Step-by-step pNode deployment instructions</p>
              </a>
              
              <Link to="/docs/api" className="docs-resource-link">
                <h3>API Reference</h3>
                <p>Programmatic access to pNode data</p>
              </Link>
            </div>
            
            <div className="docs-cta">
              <h3>Ready to Monitor Your pNodes?</h3>
              <p>Start exploring real-time pNode data and performance metrics</p>
              <Link to="/nodes" className="docs-cta-button">
                View Live pNodes Dashboard
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Nodes;