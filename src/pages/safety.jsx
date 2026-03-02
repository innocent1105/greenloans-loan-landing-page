import React, { useEffect } from 'react';
import '../App.css';
import { 
  ShieldCheck, Eye, Bell, UserCheck, 
  MapPin, AlertTriangle, ShieldAlert, Heart
} from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const TextieSafety = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const safetyRules = [
    {
      icon: <UserCheck size={28} color="var(--hot-pink)" />,
      title: "VibeCheck Verification",
      desc: "Every profile undergoes a mandatory AI-driven liveness test to eliminate bots and catfishing."
    },
    {
      icon: <Eye size={28} color="var(--hot-pink)" />,
      title: "Blurred Map Presence",
      desc: "Your exact location is never shown. We use a 'fuzzed' radius to keep your home address private."
    },
    {
      icon: <Bell size={28} color="var(--hot-pink)" />,
      title: "Real-time Reporting",
      desc: "Spotted a weird vibe? Our 24/7 moderation team reviews reports in under 15 minutes."
    }
  ];

  return (
    <div className="app-container">
      <TopNav />

      {/* --- HERO SECTION --- */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem' }} className="reveal">
        <center>
          <div className="clickable-bounce" style={{border: '1px solid #ff4f9533', width: 'fit-content', padding: '0.5rem 1.2rem', borderRadius: '50px', marginBottom: '1.5rem', background: 'rgba(255, 79, 149, 0.05)'}}>
            <span style={{color: 'var(--hot-pink)', fontSize: '0.7rem', fontWeight: 700}}>🛡️ YOUR SAFETY IS OUR PRIORITY</span>
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', margin: 0 }}>
            Date with <span style={{ color: 'var(--hot-pink)' }}>confidence.</span>
          </h1>
          <p className="hero-subtext" style={{ color: '#888', marginTop: '1rem' }}>
            We've built the world's most sophisticated safety ecosystem for intentional dating.
          </p>
        </center>
      </section>

      {/* --- CORE SAFETY PILLARS --- */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 5rem' }} className="reveal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {safetyRules.map((rule, i) => (
            <div key={i} className="glass-card" style={{ padding: '2.5rem', borderRadius: '30px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>
              <div style={{ marginBottom: '1.5rem' }}>{rule.icon}</div>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.4rem' }}>{rule.title}</h3>
              <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: '1.6' }}>{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- MEETING IN PERSON TIPS (The "Dating Checklist") --- */}
      <section style={{ background: '#080808', padding: '6rem 1.5rem', borderTop: '1px solid var(--glass-border)' }} className="reveal">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>
            Meeting <span style={{ color: 'var(--hot-pink)' }}>In-Person?</span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { title: "Public Places Only", text: "Always meet for the first time in a well-lit, populated public area." },
              { title: "Share Your Plans", text: "Tell a friend where you're going." },
              { title: "Stay in Control", text: "Arrange your own transportation to and from the date." },
              { title: "Trust Your Gut", text: "If a situation feels off, leave immediately. We will support your decision." }
            ].map((tip, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '1.5rem', background: '#111', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
                <div style={{ color: 'var(--hot-pink)', fontWeight: 900, fontSize: '1.5rem', opacity: 0.3 }}>0{idx + 1}</div>
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 5px 0' }}>{tip.title}</h4>
                  <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EMERGENCY BANNER --- */}
      <section className="reveal" style={{ padding: '8rem 1.5rem' }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          background: 'linear-gradient(135deg, var(--maroon) 0%, #200510 100%)', 
          padding: '3rem', 
          borderRadius: '40px', 
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(128, 18, 62, 0.3)'
        }}>
          <ShieldAlert size={48} color="white" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Instant Help</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
            If you are in immediate danger, please contact your local emergency services (991/999 in Zambia). 
            Our safety team is also available 24/7 for in-app support.
          </p>
          <button className="clickable-bounce" style={{ background: 'white', color: 'black', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 800 }}>
            Contact Safety Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TextieSafety;