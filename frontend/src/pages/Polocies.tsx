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
            <p>Legal policies, terms of service, and privacy information</p>
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
            <h1>Policies, Terms & Legal Information</h1>
            <p className="docs-subtitle">
              Legal documents, policies, and terms governing the use of Donnut-Nodes platform
            </p>
          </div>

          <section id="terms-service" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{TermsSvg()}</div>
              <h2>Terms of Service</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Acceptance of Terms</h3>
              <p>
                By accessing and using Donnut-Nodes ("the Platform"), you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to abide by these terms,
                please do not use this service.
              </p>
              
              <h3>Service Description</h3>
              <p>
                Donnut-Nodes provides analytics and monitoring services for Xandeum pNodes. We offer:
              </p>
              <ul className="docs-policy-list">
                <li>Real-time pNode performance monitoring</li>
                <li>Network health analytics</li>
                <li>Historical data tracking</li>
                <li>API access to pNode data</li>
                <li>Advanced filtering and search tools</li>
              </ul>
              
              <h3>User Responsibilities</h3>
              <ul className="docs-policy-list">
                <li>Use the service only for lawful purposes</li>
                <li>Do not attempt to disrupt or compromise the service</li>
                <li>Respect rate limits and fair use policies</li>
                <li>Do not use the service to infringe on others' rights</li>
                <li>Maintain the confidentiality of your account credentials</li>
              </ul>
              
              <h3>Limitations of Service</h3>
              <p>
                We strive to provide reliable service but cannot guarantee 100% uptime or accuracy
                of data, as we depend on third-party sources (Xandeum network) for pNode information.
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
                We are committed to protecting your privacy. Here's what we collect:
              </p>
              
              <div className="docs-category-grid">
                <div className="docs-category">
                  <h4>Account Information</h4>
                  <p>Email, username, and password (encrypted)</p>
                </div>
                
                <div className="docs-category">
                  <h4>Usage Data</h4>
                  <p>Pages visited, features used, and interaction patterns</p>
                </div>
                
                <div className="docs-category">
                  <h4>Technical Data</h4>
                  <p>IP address, browser type, device information</p>
                </div>
                
                <div className="docs-category">
                  <h4>Public pNode Data</h4>
                  <p>Network information from Xandeum's public endpoints</p>
                </div>
              </div>
              
              <h3>How We Use Your Information</h3>
              <ul className="docs-policy-list">
                <li>Provide and maintain our service</li>
                <li>Improve and optimize the platform</li>
                <li>Communicate important updates and information</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h3>Data Sharing</h3>
              <p>
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="docs-policy-list">
                <li>Service providers who assist in platform operation</li>
                <li>Legal authorities when required by law</li>
                <li>Third parties during business transfers (mergers, acquisitions)</li>
              </ul>
            </div>
          </section>

          <section id="data-processing" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{GdprSvg()}</div>
              <h2>Data Processing & Retention</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Data Collection Methods</h3>
              <p>
                We collect pNode data through automated polling of Xandeum's public pRPC endpoints
                every 90 seconds. This data is processed and made available through our API and dashboard.
              </p>
              
              <h3>Data Retention</h3>
              <div className="docs-definition-grid">
                <div className="docs-definition">
                  <div className="docs-definition-term">Real-time Data</div>
                  <div className="docs-definition-content">
                    Available immediately and updated every 90 seconds. Retained for 7 days in cache.
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">Historical Data</div>
                  <div className="docs-definition-content">
                    Daily aggregates and trends. Retained for 90 days for analytics purposes.
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">User Data</div>
                  <div className="docs-definition-content">
                    Account information and preferences. Retained while account is active.
                  </div>
                </div>
              </div>
              
              <h3>Data Security</h3>
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="docs-policy-list">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Secure password storage (bcrypt hashing)</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Monitoring for suspicious activity</li>
              </ul>
            </div>
          </section>

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
              
              <div className="docs-important-notice">
                <h3>Cookie Consent</h3>
                <p>
                  By using our site, you consent to our use of cookies. You can control cookies
                  through your browser settings, though disabling essential cookies may affect
                  site functionality.
                </p>
              </div>
            </div>
          </section>

          <section id="gdpr" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{GdprSvg()}</div>
              <h2>GDPR Compliance</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Your Rights Under GDPR</h3>
              <p>
                If you are located in the European Economic Area (EEA), you have certain rights
                regarding your personal data:
              </p>
              
              <div className="docs-definition-grid">
                <div className="docs-definition">
                  <div className="docs-definition-term">Right to Access</div>
                  <div className="docs-definition-content">
                    Request copies of your personal data we hold
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">Right to Rectification</div>
                  <div className="docs-definition-content">
                    Request correction of inaccurate personal data
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">Right to Erasure</div>
                  <div className="docs-definition-content">
                    Request deletion of your personal data
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">Right to Restriction</div>
                  <div className="docs-definition-content">
                    Request restriction of processing your data
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">Right to Portability</div>
                  <div className="docs-definition-content">
                    Request transfer of your data to another organization
                  </div>
                </div>
                
                <div className="docs-definition">
                  <div className="docs-definition-term">Right to Object</div>
                  <div className="docs-definition-content">
                    Object to processing of your personal data
                  </div>
                </div>
              </div>
              
              <div className="docs-note">
                <strong>Note:</strong> To exercise any of these rights, please contact us at 
                privacy@Donnut-Nodes.com. We will respond to your request within 30 days.
              </div>
            </div>
          </section>

          <section id="security" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{SecuritySvg()}</div>
              <h2>Security Practices</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Our Security Measures</h3>
              <ul className="docs-policy-list">
                <li>Regular security updates and patches</li>
                <li>DDoS protection and rate limiting</li>
                <li>Secure API authentication methods</li>
                <li>Regular vulnerability scanning</li>
                <li>Encrypted data storage and transmission</li>
                <li>Access logging and monitoring</li>
                <li>Incident response procedures</li>
              </ul>
              
              <h3>Reporting Security Issues</h3>
              <p>
                If you discover a security vulnerability in our platform, please report it to
                security@Donnut-Nodes.com. We appreciate responsible disclosure and will work
                promptly to address valid security concerns.
              </p>
              
              <div className="docs-important-notice">
                <h3>Disclaimer</h3>
                <p>
                  While we implement robust security measures, no online service can be 100% secure.
                  We recommend users take appropriate precautions and use strong, unique passwords
                  for their accounts.
                </p>
              </div>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Have Questions About Our Policies?</h3>
            <p>Contact our legal team for clarification or to exercise your data rights</p>
            <a href="mailto:legal@Donnut-Nodes.com" className="docs-cta-button">
              Contact Legal Team
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Policies;