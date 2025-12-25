import { Link } from 'react-router-dom';
import { InfoSvg, WarningSvg, QuestionSvg, Exportsvg } from '../components/svgPack';

const GraphDocs = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/docs/graph" className="docs-sidebar-home">
              {InfoSvg()}
              <h2>Graph Overview</h2>
            </Link>
            <p>Learn how to read and interact with single & double line charts</p>
          </div>

          <nav className="docs-nav">
            <a href="#intro" className="docs-nav-item">
              <span className="docs-nav-title">Introduction</span>
            </a>
            <a href="#tools" className="docs-nav-item">
              <span className="docs-nav-title">Tools & Controls</span>
            </a>
            <a href="#single-chart" className="docs-nav-item">
              <span className="docs-nav-title">Single Line Chart</span>
            </a>
            <a href="#double-chart" className="docs-nav-item">
              <span className="docs-nav-title">Double Line Chart</span>
            </a>
            <a href="#tips" className="docs-nav-item">
              <span className="docs-nav-title">Best Practices & Tips</span>
            </a>
          </nav>
        </aside>

        <main className="docs-content">
          <div className="docs-content-header">
            <h1>Graph Overview</h1>
            <p className="docs-subtitle">
              A complete guide to using Donnut-Nodes charts to track node data effectively.
            </p>
          </div>

          <section id="intro" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{InfoSvg()}</div>
              <h2>Introduction</h2>
            </div>
            <div className="docs-policy-section">
              <p>
                The graphs display pNode performance over time. You can view metrics as single-line charts
                for one dataset, or double-line charts for comparing two datasets simultaneously.
              </p>
              <p>
                The Y-axis represents the value (with the unit shown in the chart header), and the X-axis
                represents time. Values are dynamically scaled and padded for clarity.
              </p>
            </div>
          </section>

          <section id="tools" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{QuestionSvg()}</div>
              <h2>Tools & Controls</h2>
            </div>
            <div className="docs-policy-section">
              <ul className="docs-policy-list">
                <li>
                  <strong>Zoom:</strong> Adjust the visible range of data using the slider or buttons. Zoom in for detailed view, zoom out for overview.
                </li>
                <li>
                  <strong>Scroll:</strong> Drag horizontally to move through the timeline. Works with both mouse and touch gestures.
                </li>
                <li>
                  <strong>Export:</strong> Use the export button to download the chart for reporting or analysis.
                </li>
                <li>
                  <strong>Tooltips:</strong> Hover over a line point to see precise values and timestamps.
                </li>
              </ul>
            </div>
          </section>

          <section id="single-chart" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{InfoSvg()}</div>
              <h2>Single Line Chart</h2>
            </div>
            <div className="docs-policy-section">
              <p>
                A single-line chart is best for tracking one metric over time. It provides a clear view
                of trends, peaks, and dips for your selected node data.
              </p>
              <p>
                Example uses: uptime, transaction count, or latency for a single pNode.
              </p>
            </div>
          </section>

          <section id="double-chart" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{InfoSvg()}</div>
              <h2>Double Line Chart</h2>
            </div>
            <div className="docs-policy-section">
              <p>
                Double-line charts allow comparison of two datasets over the same timeline. Each line
                has a unique color to differentiate metrics.
              </p>
              <p>
                Example uses: comparing two pNodes' performance or comparing uptime vs transaction count.
              </p>
            </div>
          </section>

          <section id="tips" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Best Practices & Tips</h2>
            </div>
            <div className="docs-policy-section">
              <ul className="docs-policy-list">
                <li>Always check the time scale before analyzing trends.</li>
                <li>Use zoom to focus on periods of high activity or anomalies.</li>
                <li>Hover over points for precise numeric insights.</li>
                <li>Double-check dataset alignment for comparisons in double-line charts.</li>
                <li>Export charts for offline analysis or reporting.</li>
              </ul>
              <p>
                Remember: The charts visualize node data in real time and may slightly differ from
                backend raw data due to update intervals.
              </p>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Get Started</h3>
            <p>
              Use the chart tools to explore, compare, and analyze your pNode data effectively.
            </p>
            <Link to="/" className="docs-cta-button">
              Return to Homepage
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GraphDocs;
