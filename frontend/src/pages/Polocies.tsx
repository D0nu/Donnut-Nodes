import { Link } from 'react-router-dom';
import { ShieldSvg , PrivacySvg , TermsSvg , CookieSvg ,GdprSvg ,SecuritySvg } from '../components/svgPack';

const Policies = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/docs/policies" className="docs-sidebar-home">
              {ShieldSvg()}
              <h2>Policies & Terms</h2>
            </Link>
            <p>Platform policies, privacy, and data handling</p>
          </div>
          
          <nav className="docs-nav">
            <a href="#terms-service" className="docs-nav-item">
              <span className="docs-nav-title">Terms of Service</span>
            </a>
            
            <a href="#privacy-policy" className="docs-nav-item">
              <span className="docs-nav-title">Privacy Policy</span>
            </a>
            
            <a href="#data-processing" className="docs-nav-item">
              <span className="docs-nav-title">Data Processing</span>
            </a>
            
            <a href="#cookie-policy" className="docs-nav-item">
              <span className="docs-nav-title">Cookie Policy</span>
            </a>
            
            <a href="#gdpr" className="docs-nav-item">
              <span className="docs-nav-title">GDPR Compliance</span>
            </a>
            
            <a href="#security" className="docs-nav-item">
              <span className="docs-nav-title">Security Practices</span>
            </a>
          </nav>
          
          <div className="docs-sidebar-footer">
            <Link to="/docs" className="docs-download-btn">
              {ShieldSvg()}
              <span>Back to Docs</span>
            </Link>
          </div>
        </aside>

        <main className="docs-content">
          <div className="docs-content-header">
            <h1>Platform Policies & Data Handling</h1>
            <p className="docs-subtitle">
              Policies governing data usage, privacy, and platform operations for Donnut-Nodes
            </p>
          </div>

          <section id="terms-service" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{TermsSvg()}</div>
              <h2>Terms of Use</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Platform Purpose</h3>
              <p>
                Donnut-Nodes provides analytics and monitoring tools for pNode networks. We do not
                create, modify, or form pNode data; we interpret and present data that is provided
                by the network or users.
              </p>
              
              <h3>Service Scope</h3>
              <ul className="docs-policy-list">
                <li>Analysis and monitoring of pNodes based on provided data</li>
                <li>Watchlist monitoring of selected nodes</li>
                <li>Comparisons limited to two nodes side-by-side</li>
                <li>Visualization and statistics based on existing data</li>
              </ul>
              
              <h3>Disclaimer</h3>
              <p>
                We do not hold any public license in the US or other jurisdictions. Users assume
                all risk associated with actions based on node information. Donnut-Nodes is not
                responsible for any losses resulting from node data interpretation or monitoring.
              </p>
            </div>
          </section>

          <section id="privacy-policy" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{PrivacySvg()}</div>
              <h2>Privacy Policy</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Information We Collect</h3>
              <p>
                We only collect minimal account information to allow platform access and OAuth
                login:
              </p>
              
              <ul className="docs-policy-list">
                <li>Name and email from Google OAuth</li>
                <li>Username from X OAuth</li>
                <li>Auto-generated password for initial sign-up based on username or email</li>
              </ul>
              
              <h3>Data Handling</h3>
              <p>
                User passwords are never visible or stored in plaintext. No additional personal
                data is collected beyond what is needed for authentication.
              </p>
              
              <h3>Sharing</h3>
              <p>
                We do not sell or provide user data to any third parties. Only our dev team may
                access minimal OAuth details for platform functionality.
              </p>
            </div>
          </section>

          <section id="data-processing" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{GdprSvg()}</div>
              <h2>Data Processing & Retention</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Processing of Node Data</h3>
              <p>
                All node-related data is interpreted from provided sources. We do not generate
                node data and cannot guarantee completeness or accuracy.
              </p>
              
              <h3>Data Retention</h3>
              <ul className="docs-policy-list">
                <li>Real-time node data: cached for 7 days</li>
                <li>Historical aggregates: retained 90 days for analytics</li>
                <li>User OAuth/account data: retained while account is active</li>
              </ul>
              
              <h3>Data Security</h3>
              <p>
                We implement reasonable security practices, including encrypted connections and
                hashed passwords, to protect user data.
              </p>
            </div>
          </section>

          {/* Keep Cookie, GDPR, Security sections mostly intact */}
          <section id="cookie-policy" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{CookieSvg()}</div>
              <h2>Cookie Policy</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>What Are Cookies?</h3>
              <p>
                Cookies are small text files stored on your device when you visit websites.
                They help websites remember information about your visit.
              </p>
              
              <h3>How We Use Cookies</h3>
              <div className="docs-category-grid">
                <div className="docs-category">
                  <h4>Essential Cookies</h4>
                  <p>Required for basic site functionality and security</p>
                </div>
                <div className="docs-category">
                  <h4>Performance Cookies</h4>
                  <p>Help us understand how visitors use our site</p>
                </div>
                <div className="docs-category">
                  <h4>Functional Cookies</h4>
                  <p>Remember your preferences and settings</p>
                </div>
                <div className="docs-category">
                  <h4>Analytics Cookies</h4>
                  <p>Collect anonymous usage data for improvement</p>
                </div>
              </div>
            </div>
          </section>

          <section id="gdpr" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{GdprSvg()}</div>
              <h2>GDPR Compliance</h2>
            </div>
            
            <div className="docs-policy-section">
              <p>
                We respect GDPR rights for users in the EU. To exercise data rights, contact our dev
                team at <a href="https://cod-en-ywpx.vercel.app">cod-en-ywpx.vercel.app</a>.
              </p>
            </div>
          </section>

          <section id="security" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{SecuritySvg()}</div>
              <h2>Security Practices</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Measures in Place</h3>
              <ul className="docs-policy-list">
                <li>Regular updates and security patches</li>
                <li>Encrypted data storage and transmission</li>
                <li>Access logging and monitoring</li>
                <li>Incident response procedures</li>
              </ul>
              
              <h3>Reporting Issues</h3>
              <p>
                For security concerns, contact our dev team at <a href="https://cod-en-ywpx.vercel.app">cod-en-ywpx.vercel.app</a>.
              </p>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Need Help or Info?</h3>
            <p>Contact our dev team for platform or data-related questions</p>
            <a href="https://cod-en-ywpx.vercel.app" className="docs-cta-button">
              Contact Dev Team
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Policies;
