import { Link } from 'react-router-dom';
import { TermsSvg , AcceptSvg , WarningSvg , InfoSvg ,QuestionSvg ,AgreementSvg } from '../components/svgPack';

const Terms = () => {
  return (
    <div className="docs-container">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-sidebar-header">
            <Link to="/docs/terms" className="docs-sidebar-home">
              {TermsSvg()}
              <h2>Terms & Conditions</h2>
            </Link>
            <p>Platform terms, policies, and user agreements</p>
          </div>
          
          <nav className="docs-nav">
            <a href="#introduction" className="docs-nav-item">
              <span className="docs-nav-title">Introduction</span>
            </a>
            <a href="#definitions" className="docs-nav-item">
              <span className="docs-nav-title">Definitions</span>
            </a>
            <a href="#account-terms" className="docs-nav-item">
              <span className="docs-nav-title">Account Terms</span>
            </a>
            <a href="#acceptable-use" className="docs-nav-item">
              <span className="docs-nav-title">Acceptable Use</span>
            </a>
            <a href="#intellectual-property" className="docs-nav-item">
              <span className="docs-nav-title">Intellectual Property</span>
            </a>
            <a href="#limitations" className="docs-nav-item">
              <span className="docs-nav-title">Limitations</span>
            </a>
            <a href="#termination" className="docs-nav-item">
              <span className="docs-nav-title">Termination</span>
            </a>
            <a href="#governing-law" className="docs-nav-item">
              <span className="docs-nav-title">Governing Law</span>
            </a>
          </nav>
          
          <div className="docs-sidebar-footer">
            <div className="docs-version">
              <span>Version</span>
              <span className="docs-version-number">2.1.0</span>
            </div>
            <Link to="/docs/policies" className="docs-github-btn">
              <span>View Policies →</span>
            </Link>
          </div>
        </aside>

        <main className="docs-content">
          <div className="docs-content-header">
            <h1>Terms & Conditions</h1>
            <p className="docs-subtitle">
              Terms and policies governing your use of Donnut-Nodes platform.
            </p>
          </div>

          <section id="introduction" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{InfoSvg()}</div>
              <h2>Introduction</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Welcome</h3>
              <p>
                These Terms & Conditions ("Terms") govern your access to and use of the Donnut-Nodes website,
                API, and services (collectively, the "Service"). Using any part of our Service or website
                constitutes your agreement to these Terms and our Policies.
              </p>
              
              <div className="docs-important-notice">
                <h3>Agreement to Terms</h3>
                <p>
                  By accessing or using the Service, you agree to comply with all Terms and Policies.
                  If you disagree with any part, you must refrain from using the Service.
                </p>
              </div>
              
              <h3>Changes to Terms</h3>
              <p>
                We may modify or update these Terms at any time. Continued use of the Service after changes
                implies acceptance of the updated Terms.
              </p>
            </div>
          </section>

          <section id="definitions" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{QuestionSvg()}</div>
              <h2>Definitions</h2>
            </div>
            
            <div className="docs-glossary">
              <div className="docs-glossary-content">
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"Service"</div>
                  <div className="docs-glossary-definition">
                    The Donnut-Nodes website, API, mobile apps, and related features.
                  </div>
                </div>
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"Content"</div>
                  <div className="docs-glossary-definition">
                    Text, graphics, images, software, or other materials available through the Service.
                  </div>
                </div>
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"User"</div>
                  <div className="docs-glossary-definition">
                    Any individual or entity using the Service.
                  </div>
                </div>
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"Account"</div>
                  <div className="docs-glossary-definition">
                    Your registered profile used to access the Service.
                  </div>
                </div>
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"pNode Data"</div>
                  <div className="docs-glossary-definition">
                    Data from Xandeum nodes collected from public endpoints.
                  </div>
                </div>
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"API"</div>
                  <div className="docs-glossary-definition">
                    Programmatic access to pNode data.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="account-terms" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{AcceptSvg()}</div>
              <h2>Account Terms</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Account Creation</h3>
              <p>
                Provide accurate and current information. Failure to do so may result in account suspension or termination.
              </p>
              
              <h3>Account Security</h3>
              <p>
                You are responsible for maintaining your password and account security. Notify the dev team immediately if you suspect unauthorized use.
              </p>
              
              <h3>Age Requirement</h3>
              <p>
                Users must be at least 13 years old.
              </p>
            </div>
          </section>

          <section id="acceptable-use" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Acceptable Use</h2>
            </div>
            
            <div className="docs-policy-section">
              <p>
                You may use the Service only lawfully and in accordance with these Terms:
              </p>
              <ul className="docs-policy-list">
                <li>No illegal activity</li>
                <li>No abuse or disruption of the Service</li>
                <li>Respect API rate limits</li>
                <li>No introduction of harmful software or viruses</li>
              </ul>
            </div>
          </section>

          <section id="intellectual-property" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{AgreementSvg()}</div>
              <h2>Intellectual Property</h2>
            </div>
            
            <div className="docs-policy-section">
              <p>
                Donnut-Nodes retains ownership of all Service content. Xandeum and other trademarks belong to their owners; we are not affiliated.
              </p>
              <p>
                You may access the Service for personal or internal purposes in compliance with these Terms.
              </p>
            </div>
          </section>

          <section id="limitations" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Limitations of Liability</h2>
            </div>
            
            <div className="docs-policy-section">
              <p>
                Service is provided "as is". Donnut-Nodes is not responsible for indirect, incidental, or consequential damages.
              </p>
              <p>
                Node data comes from public sources; accuracy is not guaranteed. Do not consider this financial or investment advice.
              </p>
            </div>
          </section>

          <section id="termination" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Termination</h2>
            </div>
            
            <div className="docs-policy-section">
              <p>
                We may suspend or terminate accounts for violations of Terms. Users may discontinue use at any time.
              </p>
            </div>
          </section>

          <section id="governing-law" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{AgreementSvg()}</div>
              <h2>Governing Law & Dispute Resolution</h2>
            </div>
            
            <div className="docs-policy-section">
              <p>
                Terms are governed by Delaware law. Any disputes are handled through arbitration in Wilmington, Delaware.
              </p>
              <p>
                All questions should be directed to our dev team via <a href="https://cod-en-ywpx.vercel.app">dev contact page</a>.
              </p>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Using the Service</h3>
            <p>
              By accessing or using any part of Donnut-Nodes, you acknowledge and agree to these Terms and our Policies.
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

export default Terms;
