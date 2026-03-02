import React, { useEffect } from 'react';
import '../App.css';
import '../tailwind.css';
import { 
  Leaf, Shield, Zap, Star, Apple, PlayCircle, 
  ArrowRight, Globe, Battery, Sun, Car, Users, Wallet, Smartphone
} from 'lucide-react';
import project1 from '../assets/model1.jpg'; 
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const GreenLoansFinal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const projectGallery = [project1, project1, project1, project1, project1];

  return (
    <div className="app-container" style={{ backgroundColor: '#050505', color: 'white' }}>
      <TopNav />    

      <section style={{padding: '10rem 1.5rem 0', paddingBottom : '40px'}} className="reveal">
        <center>
          <div className="clickable-bounce" style={{
            border: '1px solid #064e3b', 
            width: 'fit-content', 
            padding: '0.5rem 1.2rem', 
            borderRadius: '50px', 
            marginBottom: '5px', 
            background: 'rgba(6, 78, 59, 0.2)'
          }}>
            <span style={{color: '#10b981', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px'}}>
              ✨ GREENLOANS BY GREENHUB eRESOURCES LTD. ✨
            </span>
          </div>
          
          <h1 className="hero-text" style={{fontWeight: 900, margin: 0, lineHeight: 1.1, color: 'white'}}>
            Local Trust. <br />
            <span style={{color: '#10b981'}}>Fast Capital. Absolute Trust.</span>
          </h1>
          <p className="hero-subtext" style={{color: '#94a3b8', marginTop: '1.5rem', lineHeight: 1.6}}>
            GreeNloans by GreeNhub eResources Ltd. Instant business capital and community-led savings 
            at your fingertips. No collateral, no stress—just growth for Marketeers and Entrepreneurs.
          </p>

          <div className="hero-btns" style={{marginTop: '3rem', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
             <div className="clickable-bounce" style={{display: 'flex', alignItems: 'center', gap: '10px', background: '#111', padding: '0.8rem 1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', minWidth: '160px', cursor: 'pointer'}}>
                <Apple size={24} /> <div style={{textAlign: 'left'}}><small style={{display: 'block', fontSize: '0.6rem'}}>Download on</small>App Store</div>
             </div>
             <div className="clickable-bounce" style={{display: 'flex', alignItems: 'center', gap: '10px', background: '#111', padding: '0.8rem 1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', minWidth: '160px', cursor: 'pointer'}}>
                <PlayCircle size={24} /> <div style={{textAlign: 'left'}}><small style={{display: 'block', fontSize: '0.6rem'}}>Get it on</small>Google Play</div>
             </div>
          </div>
        </center>

        <style>{`
          .hero-text { font-size: 2.8rem; }
          .hero-subtext { font-size: 1.1rem; max-width: 100%; }
          @media (min-width: 768px) {
            .hero-text { font-size: 5rem; letter-spacing: -2px; }
            .hero-subtext { font-size: 1.3rem; max-width: 750px; }
            .hero-btns { gap: 20px; }
          }
        `}</style>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="reveal" style={{ padding: '8rem 1.5rem', background: '#080808' }}>
        <div className="max-w-6xl mx-auto border border-white/5 bg-white/[0.02] rounded-[3rem] p-12 backdrop-blur-3xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="clickable-bounce">
              <h3 style={{ color: '#10b981', fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>24/7</h3>
              <p style={{ color: '#888', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Availability</p>
            </div>
            <div className="clickable-bounce">
              <h3 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>K0</h3>
              <p style={{ color: '#888', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Collateral Required</p>
            </div>
            <div className="clickable-bounce">
              <h3 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Instant</h3>
              <p style={{ color: '#888', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Mobile Disbursement</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="reveal" style={{ padding: '4rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem', textAlign: 'center' }}>
            Tailored for your <span style={{ color: '#10b981' }}>Success.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users />, title: "Marketeers Loan", desc: "Short term capital to bridge your business to next payday." },
              { icon: <Zap />, title: "Intemba Loan", desc: "Urgent financial support for local business expenses." },
              { icon: <Sun />, title: "BYD Project Loan", desc: "Build Your Dream Project with structured installments." },
              { icon: <Wallet />, title: "Chilimba Savings", desc: "Community-led savings and withdraws in one app." }
            ].map((item, idx) => (
              <div key={idx} className="clickable-bounce" style={{
                background: '#111', padding: '2.5rem', borderRadius: '30px', border: '1px solid #222'
              }}>
                <div style={{ color: '#10b981', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRUST SECTION --- */}
      <section className="reveal" style={{ padding: '8rem 1.5rem', borderTop: '1px solid #111' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div style={{ flex: 1 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '10px', width: 'fit-content', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              SECURE & REGISTERED
            </div>
            <h2 style={{ color: 'white', fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Financial inclusion <br /> at your fingertips.
            </h2>
            <p style={{ color: '#888', lineHeight: 1.7, fontSize: '1.1rem' }}>
              Registered No. 126180000196. We provide cash advances without the bureaucracy 
              of traditional banks. Apply from Solwezi, Ndola, or anywhere in Zambia 24/7.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="clickable-bounce" style={{
              width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(16,185,129,0.1)',
              background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Smartphone size={100} color="#10b981" />
            </div>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section style={{padding: '5rem 0', overflow: 'hidden'}} className="reveal">
        <div className="gallery-scroll" style={{display: 'flex', gap: '20px', padding: '0 1.5rem'}}>
          {projectGallery.map((imgUrl, i) => (
            <div key={i} className="clickable-bounce" style={{
              minWidth: '240px', height: '480px', borderRadius: '35px', border: '6px solid #1a1a1c', 
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)', overflow: 'hidden', position: 'relative', flexShrink: 0,
              backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover'
            }}>
              <div style={{
                padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', 
                justifyContent: 'flex-end', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)'
              }}>
                <div style={{width: '40px', height: '40px', borderRadius: '12px', background: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                   <Leaf size={20} color="white" />
                </div>
                <div style={{height: '8px', width: '60%', background: '#10b981', borderRadius: '10px'}}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GreenLoansFinal;