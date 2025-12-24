import './../hero.css'
import './../stats.css'
import './../network.css'
import './../Featured.css'
import './../QuickStart.css'
import { useAuth } from '../context/AuthContext'
import { Stats ,Hero , NetworkOverview, FeaturedPNodes, QuickStatsBar } from '../components/pageParts'

const Home = () => {
  const { user }  = useAuth()
  return (
    <div>
      <Hero />
      <Stats />
      <NetworkOverview />
      <FeaturedPNodes />
      <QuickStatsBar />

      
    <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Monitor pNodes?</h2>
          <p className="cta-description">
            Start tracking pNode performance, set up watchlists, and compare metrics across the network.
          </p>
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => window.location.href = user ? '/settings' : '/signup'}
            >
              Join Donnut-nodes
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => window.location.href = '/compare'}
            >
              Compare Nodes
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home