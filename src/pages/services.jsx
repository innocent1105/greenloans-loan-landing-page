import React, { useEffect } from 'react';
import '../App.css';
import { ShoppingBag, Landmark, Briefcase, Zap, CheckCircle2, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';
import s1 from '../assets/s1.png';
const LoanServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const servicePlans = [
    {
      title: "Marketeers Loan",
      icon: <ShoppingBag size={32} />,
      target: "Market Stall Owners",
      features: ["K500 - K5,000 Limit", "Daily/Weekly Repayments", "No Collateral Required", "24hr Disbursement"],
      description: "Designed for traders in local markets who need quick stock replenishment capital.",
      color: "#10b981"
    },
    {
      title: "Intemba Loan",
      icon: <Landmark size={32} />,
      target: "Small Shop Owners",
      features: ["K5,000 - K25,000 Limit", "Flexible Monthly Terms", "Business Assessment Only", "Growth Mentorship"],
      description: "A mid-tier loan for established small shops (Intembas) looking to expand their inventory or premises.",
      color: "#34d399"
    },
    {
      title: "BYD Project Loan",
      icon: <Briefcase size={32} />,
      target: "Contractors & Projects",
      features: ["Custom Loan Amounts", "Project-Based Terms", "Lower Interest Rates", "Professional Advisory"],
      description: "Specialized financing for youth-led projects and small-scale contractors in North-Western province.",
      color: "#059669"
    }
  ];

  return (
    <div className="app-container" style={{ backgroundColor: '#050505' }}>
      <TopNav />
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem' }} className="reveal">
        <center>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: 'fit-content', padding: '5px 15px', borderRadius: '50px', border: '1px solid #10b981', marginBottom: '1.5rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px' }}>FINANCIAL SOLUTIONS</span>
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', margin: 0, fontSize: '3.5rem' }}>
            Loans tailored for <br/><span style={{ color: '#10b981' }}>Zambian Growth.</span>
          </h1>
          <p className="hero-subtext" style={{ color: '#888', marginTop: '1.5rem', maxWidth: '700px' }}>
            We provide the capital. You provide the hustle. Our loan products are designed with the unique needs of Solwezi and Ndola entrepreneurs in mind.
          </p>
        </center>
      </section>

      <section className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {servicePlans.map((plan, i) => (
            <div key={i} className="service-card" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '35px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ color: plan.color, marginBottom: '1.5rem' }}>{plan.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{plan.title}</h3>
              <p style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>FOR: {plan.target.toUpperCase()}</p>
              <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>{plan.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {plan.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#eee', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="#10b981" /> {feat}
                  </div>
                ))}
              </div>

              <button className="cta-pill clickable-bounce" style={{ width: '100%', background: plan.color, color: 'black', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                Apply for {plan.title} <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal" style={{ background: '#080808', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>How to get <span style={{ color: '#10b981' }}>Funded</span></h2>
          
          <div className="steps-container">
            {[
              { step: "01", title: "Registration", desc: "Visit our office or register via our mobile app with your NRC and TPIN." },
              { step: "02", title: "Profile KYC", desc: "Submit your profile details and documents for verification." },
              { step: "03", title: "Approval", desc: "Get your loan approved within hours. No long waiting periods." },
              { step: "04", title: "Disbursement", desc: "Receive funds instantly on your Mobile Money (MTN/Airtel) or Bank." }
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', alignItems: 'flex-start' }}>
                <h1 style={{ color: 'rgba(16, 185, 129, 0.2)', fontSize: '4rem', margin: 0, lineHeight: 1, fontWeight: 900 }}>{s.step}</h1>
                <div style={{ paddingTop: '10px' }}>
                  <h4 style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 10px 0' }}>{s.title}</h4>
                  <p style={{ color: '#666', margin: 0, maxWidth: '500px' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal" style={{ padding: '5rem 1.5rem 10rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'linear-gradient(90deg, #064e3b 0%, #10b981 100%)', borderRadius: '30px', padding: '3rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ color: 'black', margin: '0 0 10px 0', fontWeight: 900 }}>Ready to scale your business?</h2>
            <p style={{ color: 'rgba(0,0,0,0.7)', fontWeight: 600, margin: 0 }}>Join over 5,000 Zambian entrepreneurs who trust GreeNloans.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px', color: 'black', fontWeight: 700 }}>
              <ShieldCheck size={20} /> BOZ Compliant
            </div>
            <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px', color: 'black', fontWeight: 700 }}>
              <Zap size={20} /> Instant Payout
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .service-card:hover { border-color: #10b981 !important; transform: translateY(-10px); transition: all 0.4s ease; }
        .steps-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; }
        @media (max-width: 600px) {
          .steps-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default LoanServices;