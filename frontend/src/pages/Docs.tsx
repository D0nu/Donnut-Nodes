import './../docs.css';
import { Link } from 'react-router-dom';
import {
  Booksvg,
  Devsvg,
  ChartSvg,
  SupportSvg,
  Rocketsvg,
  TrackerSvg,
  HistorySvg,
  MissionSvg,
  Eyesvg,
  SettingSvg,
  Donnutsvg,
} from '../components/svgPack';

const Docs = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <main className="docs-content docs-hub">

          {/* Header */}
          <div className="docs-content-header">
            <h1>Donnut-Nodes Documentation</h1>
            <p className="docs-subtitle">
              An independent analytics platform for observing, analyzing, and understanding
              Xandeum pNode behavior across the network.
            </p>
          </div>

          {/* Website Navigation Guide */}
          <section className="docs-section navigation-guide">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Rocketsvg()}</div>
              <h2>Website Navigation Guide</h2>
            </div>

            <p className="docs-navigation-intro">
              Here's how to navigate through Donnut-Nodes platform effectively:
            </p>

            <div className="navigation-cards">
              <div className="navigation-card">
                <div className="navigation-icon">{Donnutsvg()}</div>
                <div className="navigation-content">
                  <h3>Home Page</h3>
                  <p>Get an overview of network statistics, featured pNodes, and quick access to all platform features.</p>
                  <Link to="/" className="navigation-link">Go to Home →</Link>
                </div>
              </div>

              <div className="navigation-card">
                <div className="navigation-icon">{TrackerSvg()}</div>
                <div className="navigation-content">
                  <h3>PNodes Viewer</h3>
                  <p>Browse all available pNodes with advanced filtering options. View uptime, storage metrics, and status.</p>
                  <Link to="/nodes" className="navigation-link">Explore Nodes →</Link>
                </div>
              </div>

              <div className="navigation-card">
                <div className="navigation-icon">{Eyesvg()}</div>
                <div className="navigation-content">
                  <h3>Watchlist</h3>
                  <p>Track your favorite pNodes. Add nodes by clicking the plus icon (+) on any node card.</p>
                  <Link to="/watchlist" className="navigation-link">View Watchlist →</Link>
                </div>
              </div>

              <div className="navigation-card">
                <div className="navigation-icon">{ChartSvg()}</div>
                <div className="navigation-content">
                  <h3>Compare Nodes</h3>
                  <p>Compare two pNodes side-by-side. Select nodes using the search bars to view detailed comparisons.</p>
                  <Link to="/compare" className="navigation-link">Start Comparing →</Link>
                </div>
              </div>

              <div className="navigation-card">
                <div className="navigation-icon">{SettingSvg()}</div>
                <div className="navigation-content">
                  <h3>Account Settings</h3>
                  <p>Manage your account, update credentials, clear watchlist, or delete your account.</p>
                  <Link to="/settings" className="navigation-link">Go to Settings →</Link>
                </div>
              </div>

              <div className="navigation-card">
                <div className="navigation-icon">{HistorySvg()}</div>
                <div className="navigation-content">
                  <h3>Authentication</h3>
                  <p>Sign up with email, Google, or Twitter. Access your account from any device.</p>
                  <div className="auth-links">
                    <Link to="/signup" className="auth-link">Sign Up</Link>
                    <span className="auth-separator">|</span>
                    <Link to="/signin" className="auth-link">Sign In</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="navigation-tips">
              <h4>Quick Navigation Tips:</h4>
              <ul>
                <li>Use the <strong>navbar at the top</strong> to switch between main sections</li>
                <li>On nodes pages, use <strong>filters</strong> to narrow down results by status, age, usage, etc.</li>
                <li>Click on any <strong>node name</strong> to view detailed information</li>
                <li>Use <strong>pagination controls</strong> at the bottom of nodes lists to navigate through pages</li>
                <li>Add nodes to your watchlist by clicking the <strong>plus icon (+)</strong> on node cards</li>
                <li>On comparison page, <strong>select two different nodes</strong> from the dropdowns to compare</li>
              </ul>
            </div>
          </section>

          {/* What This Is */}
          <section className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{HistorySvg()}</div>
              <h2>What This Platform Is</h2>
            </div>

            <p>
              Donnut-Nodes is an analytics and observability layer built to track Xandeum pNodes
              as they appear on the network over time. It aggregates public network data and
              transforms raw pNode sightings into meaningful performance and availability insights.
            </p>

            <p>
              This project is built as part of a Xandeum pNode bounty and operates independently
              from the core protocol. It does not control nodes, assign rewards, or influence
              consensus — it observes and analyzes.
            </p>
          </section>

          {/* How Data Works */}
          <section className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{MissionSvg()}</div>
              <h2>How pNode Data Is Interpreted</h2>
            </div>

            <ul className="docs-mission-list">
              <li>
                <strong>Node Identity:</strong> Each pNode is identified by a cryptographic public key.
                Network addresses (IP / port) may change without affecting node identity.
              </li>
              <li>
                <strong>Instances vs Nodes:</strong> A single pNode may appear multiple times across
                the network due to restarts, NAT changes, or port rebinding.
              </li>
              <li>
                <strong>Uptime:</strong> Uptime reflects observed availability over time, not continuous
                process runtime. Temporary restarts do not reset long-term reliability.
              </li>
              <li>
                <strong>Sampling:</strong> Network data is collected periodically and normalized
                to reduce noise caused by transient network conditions.
              </li>
            </ul>
          </section>

          {/* Platform Overview */}
          <section className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Booksvg()}</div>
              <h2>Platform Capabilities</h2>
            </div>

            <div className="docs-platform-stats">
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Observed</div>
                <div className="docs-platform-stat-label">Network Data</div>
              </div>
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Normalized</div>
                <div className="docs-platform-stat-label">Node Identity</div>
              </div>
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Historical</div>
                <div className="docs-platform-stat-label">Performance</div>
              </div>
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Transparent</div>
                <div className="docs-platform-stat-label">Methodology</div>
              </div>
            </div>
          </section>

          {/* Docs Grid */}
          <section className="docs-section">
            <div className="docs-section-header">
              <h2>Documentation Sections</h2>
              <p className="docs-section-description">
                Detailed explanations of metrics, data sources, and tools
              </p>
            </div>

            <div className="docs-cards-grid">
              <Link to="/docs/api" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{Devsvg()}</div>
                  <h3>API Reference</h3>
                  <p>Endpoints, response formats, and integration details.</p>
                </div>
              </Link>

              <Link to="/docs/nodes" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{TrackerSvg()}</div>
                  <h3>pNodes Explained</h3>
                  <p>Identity, uptime, storage metrics, and availability scoring.</p>
                </div>
              </Link>

              <Link to="/docs/graphs" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{ChartSvg()}</div>
                  <h3>Analytics & Graphs</h3>
                  <p>How to read charts and interpret trends correctly.</p>
                </div>
              </Link>

              <Link to="/docs/terminologies" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{SupportSvg('big')}</div>
                  <h3>Terminology</h3>
                  <p>Clear definitions of network and storage concepts.</p>
                </div>
              </Link>
              
              <Link to="/docs/terms" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{SupportSvg('big')}</div>
                  <h3>Terms and Policies</h3>
                  <p>Our binding systems for use of data and information and other activities.</p>
                </div>
              </Link>
              
              <Link to="/docs/methods" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{Rocketsvg('big')}</div>
                  <h3>Methods</h3>
                  <p>Clear definitions of our call and render methods.</p>
                </div>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Docs;