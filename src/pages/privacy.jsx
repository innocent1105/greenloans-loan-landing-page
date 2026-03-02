import React, { useEffect } from 'react';
import '../App.css';
import { Heart, Lock, EyeOff, Map, Share2, Database } from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const TextiePrivacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="app-container" style={{ color: '#ccc', lineHeight: '1.7' }}>
      <TopNav />

      {/* --- HEADER --- */}
      <header style={{ paddingTop: '10rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, #0d0d0e 0%, #1a050d 100%)' }}>
        <center className="reveal">
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '15px', background: 'rgba(255, 79, 149, 0.1)', borderRadius: '20px', border: '1px solid var(--maroon)' }}>
                <Lock size={32} color="var(--hot-pink)" />
            </div>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>
            Privacy <span style={{color: 'var(--hot-pink)'}}>Pledge</span>
          </h1>
          <p style={{ maxWidth: '600px', opacity: 0.7, margin: '0 auto', padding: '0 1rem' }}>
            At Textie, your privacy isn't a feature—it's the foundation. We don't sell your data; we protect your vibe.
          </p>
        </center>
      </header>

      {/* --- CONTENT --- */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 10rem' }}>
        
        {/* The "No-Nonsense" Privacy Grid */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '25px', background: 'var(--glass)', border: '1px solid var(--glass-border)' }}>
                <EyeOff color="var(--hot-pink)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Incognito by Default</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>We don't track your background location. Your position is only updated when you engage with the map.</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '25px', background: 'var(--glass)', border: '1px solid var(--glass-border)' }}>
                <Share2 color="var(--hot-pink)" style={{ marginBottom: '1rem' }} />
                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>No Third-Party Sales</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Your personal chats and matches are strictly between you and them. We never sell data to advertisers.</p>
            </div>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          <section>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Map size={24} color="var(--hot-pink)" />
                Location Data & The Map
            </h3>
            <p>
                To provide the "Love on the Map" experience, Textie requests access to your GPS. 
                <strong> Unlike other apps, we do not store a history of your movements.</strong> 
                Your location is only visible to others if you post a Vibe or join an Event on the Map. You can revoke this permission at any time in your device settings.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Database size={24} color="var(--hot-pink)" />
                Information We Collect
            </h3>
            <p>We collect minimal information required to make your matches meaningful:</p>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '1rem', color: '#aaa', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><strong>Profile Details:</strong> Name, age, and interests to help VibeMatch AI find your people.</li>
                <li><strong>Media:</strong> Photos you upload (stored securely via Cynite Technologies cloud).</li>
                <li><strong>Verification:</strong> Facial geometry data used temporarily for your "Verified" badge (deleted immediately after).</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Heart size={24} color="var(--hot-pink)" />
                Your Rights
            </h3>
            <p>
                You are in total control. Through the app settings, you can:
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Request Data Export', 'Delete Account', 'Clear Chat History', 'Toggle Map Visibility'].map(tag => (
                    <span key={tag} style={{ padding: '8px 16px', background: '#111', border: '1px solid #222', borderRadius: '50px', fontSize: '0.8rem', color: 'white' }}>
                        {tag}
                    </span>
                ))}
            </div>
          </section>

          <section style={{ padding: '2.5rem', background: 'rgba(255, 79, 149, 0.03)', borderRadius: '30px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Questions about your privacy?</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Our Data Protection Officer is ready to help you.</p>
            <a href="mailto:textie@gmail.com" className="cta-pill clickable-bounce" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Contact Privacy Team
            </a>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TextiePrivacy;