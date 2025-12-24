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
            <p>Detailed terms, conditions, and user agreements</p>
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
              <span>View Privacy Policy →</span>
            </Link>
          </div>
        </aside>

        <main className="docs-content">
          <div className="docs-content-header">
            <h1>Terms & Conditions</h1>
            <p className="docs-subtitle">
              Comprehensive terms and conditions governing your use of the Donnut-Nodes platform.
              Last updated: March 15, 2024
            </p>
          </div>

          <section id="introduction" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{InfoSvg()}</div>
              <h2>Introduction</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Welcome to Donnut-Nodes</h3>
              <p>
                These Terms & Conditions ("Terms") govern your access to and use of the Donnut-Nodes website,
                API, and services (collectively, the "Service"). Please read these Terms carefully before
                using the Service.
              </p>
              
              <div className="docs-important-notice">
                <h3>Agreement to Terms</h3>
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree
                  with any part of the Terms, then you may not access the Service.
                </p>
              </div>
              
              <h3>Changes to Terms</h3>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material,
                we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes
                a material change will be determined at our sole discretion.
              </p>
              
              <div className="docs-note">
                <strong>Note:</strong> Continued use of the Service after any such changes shall constitute
                your consent to such changes.
              </div>
            </div>
          </section>

          <section id="definitions" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{QuestionSvg()}</div>
              <h2>Definitions</h2>
            </div>
            
            <div className="docs-glossary">
              <div className="docs-glossary-header">
                <h3>Key Terms Defined</h3>
              </div>
              <div className="docs-glossary-content">
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"Service"</div>
                  <div className="docs-glossary-definition">
                    Refers to the Donnut-Nodes website, API, mobile applications, and all related services
                    provided by Donnut-Nodes.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"Content"</div>
                  <div className="docs-glossary-definition">
                    Text, graphics, images, music, software, audio, video, information, or other materials
                    available through the Service.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"User", "You", "Your"</div>
                  <div className="docs-glossary-definition">
                    Refers to the individual, company, or legal entity that accesses or uses the Service.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"Account"</div>
                  <div className="docs-glossary-definition">
                    The unique account created for you to access our Service or parts of our Service.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"pNode Data"</div>
                  <div className="docs-glossary-definition">
                    Information about Xandeum Provider Nodes collected from public pRPC endpoints.
                  </div>
                </div>
                
                <div className="docs-glossary-item">
                  <div className="docs-glossary-term">"API"</div>
                  <div className="docs-glossary-definition">
                    Application Programming Interface allowing programmatic access to pNode data.
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
                When you create an account with us, you must provide information that is accurate,
                complete, and current at all times. Failure to do so constitutes a breach of the Terms,
                which may result in immediate termination of your account on our Service.
              </p>
              
              <h3>Account Security</h3>
              <p>
                You are responsible for safeguarding the password that you use to access the Service
                and for any activities or actions under your password. You agree not to disclose your
                password to any third party.
              </p>
              
              <div className="docs-important-notice">
                <h3>Security Responsibilities</h3>
                <p>
                  You must notify us immediately upon becoming aware of any breach of security or
                  unauthorized use of your account. We cannot and will not be liable for any loss or
                  damage arising from your failure to comply with this security obligation.
                </p>
              </div>
              
              <h3>Age Requirement</h3>
              <p>
                You must be at least 13 years of age to use the Service. By using the Service, you
                represent and warrant that you are at least 13 years of age.
              </p>
            </div>
          </section>

          <section id="acceptable-use" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Acceptable Use Policy</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Permitted Uses</h3>
              <p>
                You may use the Service only for lawful purposes and in accordance with these Terms.
                You agree not to use the Service:
              </p>
              
              <ul className="docs-policy-list">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>To transmit any advertising or promotional material without our prior written consent</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use of the Service</li>
                <li>To attempt to gain unauthorized access to any portion of the Service</li>
                <li>To interfere with or disrupt the Service or servers connected to the Service</li>
                <li>To use any robot, spider, or other automatic device to access the Service for any purpose</li>
                <li>To introduce any viruses or other harmful material</li>
              </ul>
              
              <h3>Rate Limiting</h3>
              <p>
                We implement rate limits to ensure fair usage and system stability. You agree to:
              </p>
              <ul className="docs-policy-list">
                <li>Respect all rate limits specified in our API documentation</li>
                <li>Not attempt to circumvent rate limiting mechanisms</li>
                <li>Contact us if you require higher rate limits for legitimate purposes</li>
              </ul>
            </div>
          </section>

          <section id="intellectual-property" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{AgreementSvg()}</div>
              <h2>Intellectual Property Rights</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Service Ownership</h3>
              <p>
                The Service and its original content, features, and functionality are and will remain
                the exclusive property of Donnut-Nodes and its licensors. The Service is protected by
                copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              
              <h3>License Grant</h3>
              <p>
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
                non-transferable, non-sublicensable license to access and use the Service for your
                personal or internal business purposes.
              </p>
              
              <h3>Trademarks</h3>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service
                without the prior written consent of Donnut-Nodes. All other trademarks not owned by
                Donnut-Nodes that appear in the Service are the property of their respective owners.
              </p>
              
              <div className="docs-note">
                <strong>Note:</strong> Xandeum and related trademarks are property of their respective
                owners. Donnut-Nodes is not affiliated with Xandeum.
              </div>
            </div>
          </section>

          <section id="limitations" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Limitations of Liability</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Disclaimer of Warranties</h3>
              <p>
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES,
                EXPRESS OR IMPLIED, REGARDING THE SERVICE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              
              <h3>Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL Donnut-NODES BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR
                RELATING TO YOUR USE OF THE SERVICE.
              </p>
              
              <h3>Accuracy of Data</h3>
              <p>
                While we strive to provide accurate and timely information, we cannot guarantee the
                accuracy, completeness, or timeliness of pNode data, as it is sourced from third-party
                networks and may be subject to delays, inaccuracies, or unavailability.
              </p>
              
              <div className="docs-important-notice">
                <h3>No Investment Advice</h3>
                <p>
                  The information provided through our Service is for informational purposes only and
                  should not be construed as investment advice. We do not provide financial, investment,
                  or trading advice.
                </p>
              </div>
            </div>
          </section>

          <section id="termination" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{WarningSvg()}</div>
              <h2>Termination</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Termination by Us</h3>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <h3>Termination by You</h3>
              <p>
                You may stop using the Service at any time. You may also request deletion of your account
                by contacting us at support@Donnut-Nodes.com.
              </p>
              
              <h3>Effect of Termination</h3>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to
                terminate your account, you may simply discontinue using the Service.
              </p>
              
              <div className="docs-note">
                <strong>Note:</strong> All provisions of the Terms which by their nature should survive
                termination shall survive termination, including ownership provisions, warranty disclaimers,
                indemnity, and limitations of liability.
              </div>
            </div>
          </section>

          <section id="governing-law" className="docs-section">
            <div className="docs-section-header">
              <div className="docs-section-icon">{AgreementSvg()}</div>
              <h2>Governing Law & Dispute Resolution</h2>
            </div>
            
            <div className="docs-policy-section">
              <h3>Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of
                Delaware, United States, without regard to its conflict of law provisions.
              </p>
              
              <h3>Dispute Resolution</h3>
              <p>
                Any dispute arising from these Terms or your use of the Service shall be resolved through
                binding arbitration in accordance with the rules of the American Arbitration Association.
                The arbitration shall take place in Wilmington, Delaware.
              </p>
              
              <h3>Class Action Waiver</h3>
              <p>
                You agree that any arbitration or proceeding shall be limited to the dispute between us
                individually. There is no right or authority for any dispute to be arbitrated or resolved
                on a class-action basis.
              </p>
              
              <div className="docs-important-notice">
                <h3>Contact Information</h3>
                <p>
                  For any questions about these Terms, please contact us at:
                  <br />
                  <strong>Email:</strong> legal@Donnut-Nodes.com
                  <br />
                  <strong>Address:</strong> 123 Innovation Drive, Suite 100, Wilmington, DE 19801
                </p>
              </div>
            </div>
          </section>

          <div className="docs-cta">
            <h3>Accept Terms & Continue</h3>
            <p>By using our Service, you acknowledge that you have read and agree to these Terms</p>
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