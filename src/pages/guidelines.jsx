import React, { useEffect } from 'react';
import '../App.css';
import { 
  CheckCircle2, XCircle, ShieldAlert, Heart, 
  MessageSquare, Camera, MapPin, UserX 
} from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const TextieGuidelines = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="app-container">
      <TopNav />

      {/* --- HERO --- */}
      <section style={{ paddingTop: '10rem', paddingBottom: '4rem' }} className="reveal">
        <center>
          <div style={{ padding: '12px', background: 'rgba(255, 79, 149, 0.1)', borderRadius: '20px', width: 'fit-content', marginBottom: '1.5rem' }}>
            <Heart size={30} color="var(--hot-pink)" fill="var(--hot-pink)" />
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', margin: 0 }}>
            Community <span style={{ color: 'var(--hot-pink)' }}>Guidelines</span>
          </h1>
          <p className="hero-subtext" style={{ color: '#888', marginTop: '1rem', maxWidth: '700px' }}>
            Textie is a space for intentional connections. To keep the vibe high, we expect everyone to play by the same rules.
          </p>
        </center>
      </section>

      {/* --- THE DO'S AND DON'TS GRID --- */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }} className="reveal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* THE GOOD VIBES (DO'S) */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(0, 255, 136, 0.2)', background: 'rgba(0, 255, 136, 0.02)' }}>
            <h3 style={{ color: '#00ff88', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={24} /> The Good Vibes
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#ccc' }}>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: '#00ff88' }}>•</span>
                <div><strong>Be Real:</strong> Use your actual photos and be honest about your intentions.</div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: '#00ff88' }}>•</span>
                <div><strong>Be Respectful:</strong> Treat everyone with the same kindness you’d want in return.</div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: '#00ff88' }}>•</span>
                <div><strong>Stay Safe:</strong> Move conversations to the map only when you feel a genuine connection.</div>
              </li>
            </ul>
          </div>

          {/* THE NO-GO'S (DON'TS) */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(255, 79, 149, 0.2)', background: 'rgba(255, 79, 149, 0.02)' }}>
            <h3 style={{ color: 'var(--hot-pink)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <XCircle size={24} /> The Dealbreakers
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#ccc' }}>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--hot-pink)' }}>•</span>
                <div><strong>Harassment:</strong> We have zero tolerance for hate speech, bullying, or threats.</div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--hot-pink)' }}>•</span>
                <div><strong>Catfishing:</strong> Impersonating others will result in an immediate and permanent ban.</div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--hot-pink)' }}>•</span>
                <div><strong>Solicitation:</strong> Textie is for dating, not for selling products, services, or content.</div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- SPECIFIC POLICIES --- */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 10rem' }} className="reveal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ padding: '15px', background: '#111', borderRadius: '15px', border: '1px solid #222' }}>
                <Camera color="var(--hot-pink)" />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ color: 'white', marginBottom: '10px' }}>Photo Guidelines</h3>
                <p style={{ color: '#777', fontSize: '0.95rem' }}>
                    No nudity, no violence, and no illegal substances. Photos should clearly show your face. If we can't tell it's you, we can't verify you.
                </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ padding: '15px', background: '#111', borderRadius: '15px', border: '1px solid #222' }}>
                <MapPin color="var(--hot-pink)" />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ color: 'white', marginBottom: '10px' }}>Map Etiquette</h3>
                <p style={{ color: '#777', fontSize: '0.95rem' }}>
                    Don't use the Map to "stalk" or follow users. Use it to find public events and meetups. Misusing location data to make others uncomfortable is a violation of our safety code.
                </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ padding: '15px', background: '#111', borderRadius: '15px', border: '1px solid #222' }}>
                <UserX color="var(--hot-pink)" />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ color: 'white', marginBottom: '10px' }}>Reporting & Enforcement</h3>
                <p style={{ color: '#777', fontSize: '0.95rem' }}>
                    When you report someone, our moderators review it within hours. We don't just "hide" bad actors; we remove them from the ecosystem. We also use <strong>AI VibeCheck</strong> to detect harmful patterns before they reach you.
                </p>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem', background: 'var(--glass)', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
            <ShieldAlert size={40} color="var(--hot-pink)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: 'white' }}>See something? Say something.</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>If a user is making you feel unsafe, use the in-app Block & Report feature immediately.</p>
            <button className="cta-pill clickable-bounce">Report a Violation</button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TextieGuidelines;