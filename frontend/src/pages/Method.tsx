import { Link } from 'react-router-dom';
import {
  Rocketsvg,
  Searchsvg,
  Comparesvg,
  Watchsvg,
  Chartsvg,
  Alertsvg,
  Exportsvg
} from '../components/svgPack';

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
            <p>How to analyze, compare, and monitor pNodes effectively</p>
          </div>

          <nav className="docs-nav">
            <a href="#search-filter" className="docs-nav-item">
              <span className="docs-nav-title">Search & Filter</span>
            </a>

            <a href="#watchlist" className="docs-nav-item">
              <span className="docs-nav-title">Watchlist Monitoring</span>
            </a>

            <a href="#comparison" className="docs-nav-item">
              <span className="docs-nav-title">Node Comparison</span>
            </a>

            <a href="#analytics" className="docs-nav-item">
              <span className="docs-nav-title">Analytics Approach</span>
            </a>

            <a href="#monitoring" className="docs-nav-item">
              <span className="docs-nav-title">Live Monitoring</span>
            </a>

            <a href="#integration" className="docs-nav-item">
              <span className="docs-nav-title">Integration</span>
            </a>
          </nav>

          <div className="docs-sidebar-footer">
            <Link to="/nodes" className="docs-download-btn">
              {Rocketsvg()}
              <span>Open Dashboard</span>
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
              Practical tools for inspecting pNode behavior, comparing performance,
              and tracking selected nodes over time.
            </p>
          </div>

          {/* SEARCH & FILTER */}
          <section id="search-filter" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Searchsvg()}</div>
              <h2>Search & Filtering</h2>
            </div>

            <p>
              Use search and filters to narrow down the pNode set and focus on nodes
              relevant to your analysis.
            </p>

            <div className="docs-method-cards">
              <div className="docs-method-card">
                <h3>Text Search</h3>
                <p>
                  Quickly locate pNodes by name, public key, version, or address.
                  Search is client-side and updates instantly.
                </p>
                <ul className="docs-method-features">
                  <li>Case-insensitive matching</li>
                  <li>Partial string matches</li>
                  <li>No server queries required</li>
                </ul>
              </div>

              <div className="docs-method-card">
                <h3>Attribute Filters</h3>
                <p>
                  Refine the visible node set using common operational attributes.
                </p>
                <ul className="docs-method-features">
                  <li>Online / Offline status</li>
                  <li>Efficiency ranges</li>
                  <li>Storage usage levels</li>
                  <li>Public visibility flag</li>
                </ul>
              </div>
            </div>
          </section>

          {/* WATCHLIST */}
          <section id="watchlist" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Watchsvg()}</div>
              <h2>Watchlist Monitoring</h2>
            </div>

            <p>
              Watchlists allow you to keep an eye on specific pNodes without tracking
              the entire network.
            </p>

            <div className="docs-method-card">
              <h3>Focused Node Tracking</h3>
              <p>
                Adding a pNode to your watchlist enables lightweight monitoring of
                its availability and recent activity.
              </p>

              <ul className="docs-method-features">
                <li>Persistent across sessions</li>
                <li>Quick access to selected nodes</li>
                <li>No global user history stored</li>
                <li>No email or push notifications</li>
              </ul>

              <div className="docs-note">
                <strong>Note:</strong> Watchlists do not store long-term historical
                timelines or send alerts. They are designed for visibility, not automation.
              </div>
            </div>
          </section>

          {/* COMPARISON */}
          <section id="comparison" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Comparesvg()}</div>
              <h2>Node Comparison</h2>
            </div>

            <div className="docs-method-cards">
              <div className="docs-method-card">
                <h3>Side-by-Side Analysis</h3>
                <p>
                  Compare <strong>up to two pNodes</strong> at the same time to
                  understand differences in performance and behavior.
                </p>
                <ul className="docs-method-features">
                  <li>Uptime comparison</li>
                  <li>Storage usage comparison</li>
                  <li>Efficiency score contrast</li>
                  <li>Version & visibility differences</li>
                </ul>
              </div>
            </div>

            <div className="docs-note">
              This tool is intentionally limited to two nodes to keep analysis clear,
              readable, and decision-focused.
            </div>
          </section>

          {/* ANALYTICS */}
          <section id="analytics" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Chartsvg()}</div>
              <h2>Analytics Approach</h2>
            </div>

            <p>
              Analytics on Donnut-Nodes focus on clarity and interpretation rather than
              prediction or automated scoring.
            </p>

            <div className="docs-method-card">
              <h3>Visual Metrics</h3>
              <ul className="docs-method-features">
                <li>Uptime trends</li>
                <li>Storage utilization snapshots</li>
                <li>Efficiency distribution</li>
                <li>Network-level aggregates</li>
              </ul>
            </div>
          </section>

          {/* MONITORING */}
          <section id="monitoring" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Alertsvg()}</div>
              <h2>Live Monitoring</h2>
            </div>

            <p>
              Live updates are delivered through WebSocket connections for
              real-time visibility.
            </p>

            <div className="docs-method-card">
              <ul className="docs-method-features">
                <li>pNode update events</li>
                <li>Connection & reconnection handling</li>
                <li>Server uptime health visibility</li>
                <li>No alerting or notification system</li>
              </ul>
            </div>
          </section>

          {/* INTEGRATION */}
          <section id="integration" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Exportsvg()}</div>
              <h2>Integration</h2>
            </div>

            <div className="docs-info-box">
              <div className="docs-info-box-icon">{Exportsvg()}</div>
              <div className="docs-info-box-content">
                <h3>Read-Only Access</h3>
                <p>
                  Integrate Donnut-Nodes data into external tools using our REST
                  and WebSocket APIs.
                </p>
                <ul className="docs-method-features">
                  <li>REST endpoints for pNode data</li>
                  <li>WebSocket for live updates</li>
                  <li>No write access</li>
                  <li>No exports or webhooks</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Start Exploring pNodes</h3>
            <p>Use these tools to understand the network clearly and confidently.</p>
            <Link to="/nodes" className="docs-cta-button">
              Open Nodes Dashboard
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Methods;
