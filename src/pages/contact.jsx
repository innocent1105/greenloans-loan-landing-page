import React, { useEffect } from 'react';
import '../App.css';
import { Mail, MapPin, Send, Phone, Clock, ShieldCheck, Users, Target } from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const GreeNloansContact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="app-container" style={{ backgroundColor: '#050505' }}>
      <TopNav />

      {/* --- HERO SECTION --- */}
      <section style={{ paddingTop: '10rem', paddingBottom: '3rem' }} className="reveal">
        <center>
          <div className="clickable-bounce" style={{border: '1px solid #064e3b', width: 'fit-content', padding: '0.5rem 1.2rem', borderRadius: '50px', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)'}}>
            <span style={{color: '#10b981', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px'}}>👋 THE HUB OF GROWTH</span>
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', margin: 0, fontSize: '3.5rem' }}>
            Let's grow <span style={{ color: '#10b981' }}>together.</span>
          </h1>
          <p className="hero-subtext" style={{ color: '#888', marginTop: '1rem', maxWidth: '600px' }}>
            Questions about your loan application or Chilimba savings? Our Solwezi and Ndola teams are ready to guide you.
          </p>
        </center>
      </section>

      {/* --- ABOUT US SECTION (New) --- */}
      <section className="reveal" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '40px', padding: '3rem' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                Who is <span style={{ color: '#10b981' }}>GreeNhub?</span>
              </h2>
              <p style={{ color: '#888', lineHeight: '1.8', fontSize: '1rem' }}>
                GreeNhub eResources Ltd is a Zambian-owned financial services provider dedicated to the "unbanked" and small-scale entrepreneurs. 
                We believe that credit should be a tool for empowerment, not a burden. By combining community values with modern technology, 
                we provide instant, collateral-free capital to Marketeers and small business owners across Solwezi and Ndola.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: <ShieldCheck size={20}/>, title: "Our Mission", desc: "To provide dignified financial access to every Zambian entrepreneur." },
                { icon: <Users size={20}/>, title: "Community First", desc: "Our Chilimba systems are built on local trust and traditional values." },
                { icon: <Target size={20}/>, title: "Our Vision", desc: "To be the leading bridge between potential and capital in the region." }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: '#10b981', marginTop: '3px' }}>{item.icon}</div>
                  <div>
                    <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1rem' }}>{item.title}</h4>
                    <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 10rem' }} className="reveal">
        <div className="contact-grid">
          
          <div className="info-side" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email Card */}
            <div className="clickable-bounce" style={{ padding: '1.5rem', borderRadius: '25px', background: '#111', border: '1px solid #222' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <Mail color="#10b981" size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>Email Support</h4>
                  <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>greeNloansoffice@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="clickable-bounce" style={{ padding: '1.5rem', borderRadius: '25px', background: '#111', border: '1px solid #222' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <Phone color="#10b981" size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>Call Our Guide</h4>
                  <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>+260 978 330929</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="clickable-bounce" style={{ padding: '1.5rem', borderRadius: '25px', background: '#111', border: '1px solid #222' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <MapPin color="#10b981" size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>Main Office (Solwezi)</h4>
                  <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Plot No# L/40269 New Industrial Area, Solwezi-Mutanda Road.</p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="clickable-bounce" style={{ padding: '1.5rem', borderRadius: '25px', background: '#111', border: '1px solid #222' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <Clock color="#10b981" size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>Business Hours</h4>
                  <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Mon - Sat: 08:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="form-side" style={{ background: '#0a0a0a', padding: '2.5rem', borderRadius: '30px', border: '1px solid #222' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ color: '#555', fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', display: 'block', letterSpacing: '1px' }}>FULL NAME</label>
                  <input type="text" placeholder="Enter your name" className="contact-input" />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ color: '#555', fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', display: 'block', letterSpacing: '1px' }}>MOBILE NUMBER</label>
                  <input type="text" placeholder="097..." className="contact-input" />
                </div>
              </div>
              
              <div>
                <label style={{ color: '#555', fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', display: 'block', letterSpacing: '1px' }}>LOAN INTEREST</label>
                <select className="contact-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                  <option>Marketeers Loan</option>
                  <option>Intemba Loan</option>
                  <option>BYD Project Loan</option>
                  <option>Chilimba Savings</option>
                  <option>Other Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#555', fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', display: 'block', letterSpacing: '1px' }}>MESSAGE</label>
                <textarea placeholder="How can GreeNhub help your business grow?" className="contact-input" style={{ height: '120px', resize: 'none' }}></textarea>
              </div>

              <button className="cta-pill clickable-bounce" style={{ 
                width: '100%', 
                padding: '1rem', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '10px',
                background: '#10b981',
                border: 'none',
                color: 'black',
                fontWeight: 800,
                borderRadius: '15px'
              }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>

        <style>{`
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-input {
            width: 100%;
            background: #111;
            border: 1px solid #222;
            border-radius: 12px;
            padding: 1rem;
            color: white;
            font-size: 0.9rem;
            transition: all 0.3s;
          }
          .contact-input:focus {
            outline: none;
            border-color: #10b981;
            background: #0d0d0e;
          }
          @media (min-width: 900px) {
            .contact-grid { grid-template-columns: 1fr 1.5fr; }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
};

export default GreeNloansContact;