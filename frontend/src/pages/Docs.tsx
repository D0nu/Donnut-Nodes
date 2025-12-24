import './../docs.css';
import { Link } from 'react-router-dom';
import { Booksvg , Devsvg , ChartSvg , SupportSvg , Rocketsvg , TrackerSvg ,HistorySvg ,TeamSvg ,MissionSvg ,TimelineSvg } from '../components/svgPack';

const Docs = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        {/* Main Content */}
        <main className="docs-content docs-hub">
          {/* Header Section */}
          <div className="docs-content-header">
            <h1>Donnut-Nodes Documentation</h1>
            <p className="docs-subtitle">
              Comprehensive analytics platform for monitoring Xandeum pNodes. Track performance, analyze metrics, 
              and optimize your storage operations with real-time insights.
            </p>
          </div>

          {/* About Us Section */}
          <section className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{HistorySvg()}</div>
              <h2>Our Story</h2>
            </div>
            
            <div className="docs-about-grid">
              <div className="docs-about-card">
                <div className="docs-about-icon">{TimelineSvg()}</div>
                <h3>How We Started</h3>
                <p>
                  Donnut-Nodes was founded to address the growing need for comprehensive analytics in decentralized storage networks.
                  As Xandeum's pNode network expanded, we recognized the critical need for real-time monitoring and performance insights.
                </p>
                <p>
                  We built our platform to provide the same level of visibility and analytics that blockchain validators enjoy,
                  but specifically tailored for storage providers in the Xandeum ecosystem.
                </p>
              </div>

              <div className="docs-about-card">
                <div className="docs-about-icon">{MissionSvg()}</div>
                <h3>Our Mission</h3>
                <p>
                  To empower the Xandeum storage ecosystem with the most comprehensive, real-time analytics platform.
                  We provide the tools needed for pNode operators to optimize performance and for developers to build better applications.
                </p>
                <ul className="docs-mission-list">
                  <li>Deliver real-time pNode performance monitoring</li>
                  <li>Provide actionable insights for storage optimization</li>
                  <li>Build comprehensive network health analysis tools</li>
                  <li>Support the growth of decentralized storage ecosystems</li>
                </ul>
              </div>

              <div className="docs-about-card">
                <div className="docs-about-icon">{TeamSvg()}</div>
                <h3>The Team</h3>
                <p>
                  Built by a passionate team of blockchain developers and data analysts who believe in the power of
                  decentralized storage. We combine expertise in distributed systems, real-time analytics, and
                  user experience to make complex network data accessible and actionable.
                </p>
                <div className="docs-team-tags">
                  <span className="docs-team-tag">Blockchain Experts</span>
                  <span className="docs-team-tag">Data Analysts</span>
                  <span className="docs-team-tag">Full-Stack Developers</span>
                  <span className="docs-team-tag">UI/UX Designers</span>
                </div>
              </div>
            </div>
          </section>

          {/* Platform Overview */}
          <section className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{Booksvg()}</div>
              <h2>Platform Overview</h2>
            </div>
            
            <div className="docs-platform-stats">
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Real-Time</div>
                <div className="docs-platform-stat-label">Monitoring</div>
              </div>
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Comprehensive</div>
                <div className="docs-platform-stat-label">Analytics</div>
              </div>
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Actionable</div>
                <div className="docs-platform-stat-label">Insights</div>
              </div>
              <div className="docs-platform-stat">
                <div className="docs-platform-stat-value">Open</div>
                <div className="docs-platform-stat-label">Documentation</div>
              </div>
            </div>

            <p className="docs-platform-description">
              Donnut-Nodes provides a complete suite of tools for monitoring Xandeum pNodes. From real-time
              performance metrics to historical trend analysis, we've built everything you need to understand
              and optimize your interaction with the Xandeum network.
            </p>
          </section>

          {/* Documentation Sections Grid */}
          <section className="docs-section">
            <div className="docs-section-header">
              <h2>Explore Our Documentation</h2>
              <p className="docs-section-description">
                Dive deeper into specific aspects of our platform with these comprehensive guides
              </p>
            </div>

            <div className="docs-cards-grid">
              <Link to="/docs/api" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{Devsvg()}</div>
                  <h3>API Reference</h3>
                  <p>Complete API documentation, endpoints, authentication, and integration guides for developers.</p>
                  <div className="docs-card-footer">
                    <span className="docs-card-cta">Explore API →</span>
                  </div>
                </div>
              </Link>

              <Link to="/docs/nodes" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{TrackerSvg()}</div>
                  <h3>pNodes Guide</h3>
                  <p>Understanding pNode metrics, efficiency scoring, storage calculations, and uptime tracking.</p>
                  <div className="docs-card-footer">
                    <span className="docs-card-cta">Learn about pNodes →</span>
                  </div>
                </div>
              </Link>

              <Link to="/docs/graphs" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{ChartSvg()}</div>
                  <h3>Graphs & Analytics</h3>
                  <p>Visual data analysis, performance graphs, storage trends, and network health metrics.</p>
                  <div className="docs-card-footer">
                    <span className="docs-card-cta">View Analytics →</span>
                  </div>
                </div>
              </Link>

              <Link to="/docs/methods" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{Rocketsvg()}</div>
                  <h3>Methods & Tools</h3>
                  <p>Watchlist feature, node comparison tool, advanced filtering, and analysis methods.</p>
                  <div className="docs-card-footer">
                    <span className="docs-card-cta">Explore Tools →</span>
                  </div>
                </div>
              </Link>

              <Link to="/docs/terminologies" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">{SupportSvg('big')}</div>
                  <h3>Terminology</h3>
                  <p>Glossary of terms, technical definitions, and metrics explanations for clear understanding.</p>
                  <div className="docs-card-footer">
                    <span className="docs-card-cta">Learn Terms →</span>
                  </div>
                </div>
              </Link>

              <Link to="/docs/developers" className="docs-card-link">
                <div className="docs-card">
                  <div className="docs-card-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3>Integration Guide</h3>
                  <p>How to integrate our analytics into your applications, webhooks, and custom solutions.</p>
                  <div className="docs-card-footer">
                    <span className="docs-card-cta">Integrate Now →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="docs-section docs-quick-start">
            <div className="docs-quick-start-header">
              <h2>Quick Start Guide</h2>
              <p>Get up and running in minutes</p>
            </div>
            
            <div className="docs-quick-steps">
              <div className="docs-quick-step">
                <div className="docs-quick-step-number">1</div>
                <div className="docs-quick-step-content">
                  <h3>Explore the Dashboard</h3>
                  <p>Start with our homepage to see network overview and top-performing pNodes.</p>
                </div>
              </div>
              
              <div className="docs-quick-step">
                <div className="docs-quick-step-number">2</div>
                <div className="docs-quick-step-content">
                  <h3>Monitor Specific Nodes</h3>
                  <p>Use the Nodes page to filter, search, and analyze individual pNode performance.</p>
                </div>
              </div>
              
              <div className="docs-quick-step">
                <div className="docs-quick-step-number">3</div>
                <div className="docs-quick-step-content">
                  <h3>Set Up Watchlists</h3>
                  <p>Create an account to save important nodes and track their performance over time.</p>
                </div>
              </div>
              
              <div className="docs-quick-step">
                <div className="docs-quick-step-number">4</div>
                <div className="docs-quick-step-content">
                  <h3>Use Advanced Tools</h3>
                  <p>Try our comparison tools and analytics features for deeper insights.</p>
                </div>
              </div>
            </div>
            
            <div className="docs-quick-start-cta">
              <Link to="/nodes" className="docs-primary-btn">
                Start Exploring Nodes
              </Link>
              <a 
                href="https://discord.gg/uqRSmmM5m" 
                className="docs-secondary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Xandeum
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Docs;