import './../attribution.css';

const Resources = () => {
  return (
    <section className='page'>
      <main className="attributions-content">
        <div className="attributions-grid">
          {/* Fonts Section */}
          <section className="attribution-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4L5 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 8H15C17.7614 8 20 10.2386 20 13V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>Fonts & Typography</h2>
            </div>
            
            <div className="resource-item">
              <h3>Poppins Font Family</h3>
              <div className="resource-meta">
                <span className="license-badge">OFL License</span>
                <span className="source-badge">Google Fonts</span>
              </div>
              <p>Primary typography throughout the application</p>
              <div className="code-snippet">
                <code>{'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">'}</code>
              </div>
              <a href="https://fonts.google.com/specimen/Poppins" target="_blank" rel="noopener noreferrer" className="resource-link">
                View on Google Fonts
              </a>
            </div>

            <div className="resource-item">
              <h3>Google Material Icons</h3>
              <div className="resource-meta">
                <span className="license-badge">Apache 2.0</span>
                <span className="source-badge">Google Fonts</span>
              </div>
              <p>UI icons and interface elements</p>
              <div className="code-snippet">
                <code>{'<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">'}</code>
              </div>
            </div>
          </section>

          {/* Illustrations Section */}
          <section className="attribution-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="9" r="2" fill="currentColor"/>
                  <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Illustrations & Graphics</h2>
            </div>

            <div className="resource-item">
              <h3>FreePik Illustrations</h3>
              <div className="resource-meta">
                <span className="license-badge">MIT / CC</span>
                <span className="source-badge">FreePik</span>
              </div>
              <p>Application illustrations, empty states, and visual elements</p>
              <div className="attribution-box">
                <strong>Attribution Required:</strong>
                <p>Illustrations by FreePik (FreePik.com)</p>
              </div>
            </div>

            <div className="resource-item">
              <h3>SVG Icon Collections</h3>
              <div className="resource-meta">
                <span className="license-badge">MIT</span>
                <span className="source-badge">Multiple Sources</span>
              </div>
              <p>Interface icons, buttons, and indicators from:</p>
              <ul className="resource-list">
                <li>FreePik</li>
                <li>GoogleIcon</li>
                <li>Drawen</li>
                <li>Icon finder</li>
              </ul>
            </div>
          </section>

          {/* Technology Section */}
          <section className="attribution-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Technology & Infrastructure</h2>
            </div>

            <div className="resource-item">
              <h3>Xandeum pNodes</h3>
              <div className="resource-meta">
                <span className="license-badge">Proprietary</span>
                <span className="source-badge">Xandeum Network</span>
              </div>
              <p>pNode analytics and data collection via RPC calls</p>
              <div className="code-snippet">
                <code>{`{
  "jsonrpc": "2.0",
  "method": "get-pods-with-stats",
  "id": 1
}`}</code>
              </div>
              <a href="https://docs.xandeum.com" target="_blank" rel="noopener noreferrer" className="resource-link">
                Xandeum Documentation
              </a>
            </div>

            <div className="resource-item">
              <h3>JSON-RPC 2.0</h3>
              <div className="resource-meta">
                <span className="license-badge">Open Standard</span>
                <span className="source-badge">JSON-RPC</span>
              </div>
              <p>Communication protocol with pNodes</p>
            </div>
          </section>

          {/* Libraries Section */}
          <section className="attribution-card wide-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Development Libraries</h2>
            </div>

            <div className="libraries-grid">
              <div className="library-category">
                <h4>Frontend</h4>
                <ul className="library-list">
                  <li>
                    <span className="library-name">React</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">TypeScript</span>
                    <span className="library-license">Apache 2.0</span>
                  </li>
                  <li>
                    <span className="library-name">Recharts</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">React Router</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">Axios</span>
                    <span className="library-license">MIT</span>
                  </li>
                </ul>
              </div>

              <div className="library-category">
                <h4>Backend</h4>
                <ul className="library-list">
                  <li>
                    <span className="library-name">Express.js</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">Mongoose</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">Passport.js</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">Socket.io</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">JWT</span>
                    <span className="library-license">MIT</span>
                  </li>
                </ul>
              </div>

              <div className="library-category">
                <h4>Authentication</h4>
                <ul className="library-list">
                  <li>
                    <span className="library-name">Google OAuth</span>
                    <span className="library-license">Proprietary</span>
                  </li>
                  <li>
                    <span className="library-name">Twitter OAuth 2.0</span>
                    <span className="library-license">Proprietary</span>
                  </li>
                  <li>
                    <span className="library-name">bcrypt</span>
                    <span className="library-license">MIT</span>
                  </li>
                  <li>
                    <span className="library-name">jsonwebtoken</span>
                    <span className="library-license">MIT</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* License Compliance */}
          <section className="attribution-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M12 11V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h2>License Compliance</h2>
            </div>

            <div className="resource-item">
              <h3>Project License</h3>
              <div className="license-info">
                <div className="license-type">
                  <strong>Primary License:</strong> MIT License
                </div>
                <div className="license-location">
                  <strong>Location:</strong> <code>LICENSE</code> file in project root
                </div>
              </div>
            </div>

            <div className="resource-item">
              <h3>Maintenance</h3>
              <p>All third-party resources are used in compliance with their respective licenses.</p>
              <div className="commands">
                <div className="command-item">
                  <span className="command-prompt">$</span>
                  <code>npm run licenses</code>
                  <span className="command-desc">Generate license report</span>
                </div>
                <div className="command-item">
                  <span className="command-prompt">$</span>
                  <code>npm run license-check</code>
                  <span className="command-desc">Check license compliance</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="attribution-card contact-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.5H11.5M11.5 11.5L11.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>Contact & Support</h2>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <h4>Resource Issues</h4>
                <p>If you believe a resource is improperly attributed:</p>
                <div className="contact-links">
                  <a href="mailto:support@domain.com" className="contact-link">
                    Email Support
                  </a>
                  <a href="https://github.com/your-repo/issues" target="_blank" rel="noopener noreferrer" className="contact-link">
                    GitHub Issues
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <h4>License Questions</h4>
                <p>For questions about specific licenses:</p>
                <ul className="contact-list">
                  <li>Refer to individual package LICENSE files</li>
                  <li>Consult Open Source Initiative (OSI)</li>
                  <li>Contact original resource maintainers</li>
                </ul>
              </div>
            </div>

            <footer className="card-footer">
              <div className="project-info">
                <div className="project-name">
                  <strong>Project:</strong> Donnut Nodes Analytics Platform
                </div>
                <div className="maintainer">
                  <strong>Maintained by:</strong> Your Team Name
                </div>
              </div>
              <div className="update-note">
                <small>This document should be reviewed and updated quarterly or when new resources are added.</small>
              </div>
            </footer>
          </section>
        </div>
      </main>
    </section>
  );
};

export default Resources;