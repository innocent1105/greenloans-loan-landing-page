import React, { useEffect } from 'react';
import '../App.css';
import { Quote, TrendingUp, ShoppingBag, Truck, GraduationCap, ChevronRight } from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';

const SuccessStories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const stories = [
    {
      name: "Mutale Mwila",
      location: "Solwezi Central Market",
      business: "Fresh Produce Wholesale",
      loanType: "Marketeers Loan",
      impact: "Increased stock variety by 60%",
      image: s2,
      quote: "GreeNhub didn't just give me money; they gave me a plan. My stall is now the biggest in my section."
    },
    {
      name: "Kelvin Phiri",
      location: "Ndola, Chifubu",
      business: "Mobile Money Agent & Electronics",
      loanType: "Intemba Loan",
      impact: "Opened a second outlet in 6 months",
      image: s4,
      quote: "The Intemba loan allowed me to bridge my cash flow gap. The weekly repayments are very manageable."
    },
    {
      name: "Esther Ng'andu",
      location: "Solwezi, Kansanshi",
      business: "Poultry Farming",
      loanType: "BYD Project Loan",
      impact: "Expanded from 100 to 500 birds",
      image: s3,
      quote: "I used the BYD loan to buy high-quality feed and a solar brooder. My business is now sustainable."
    }
  ];

  return (
    <div className="app-container" style={{ backgroundColor: '#050505' }}>
      <TopNav />

      {/* --- HERO SECTION --- */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem' }} className="reveal">
        <center>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: 'fit-content', padding: '5px 15px', borderRadius: '50px', border: '1px solid #10b981', marginBottom: '1.5rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px' }}>REAL PEOPLE. REAL GROWTH.</span>
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', margin: 0, fontSize: '3.5rem' }}>
            Stories of <span style={{ color: '#10b981' }}>Impact.</span>
          </h1>
          <p className="hero-subtext" style={{ color: '#888', marginTop: '1rem', maxWidth: '700px' }}>
            From Solwezi to Ndola, we are proud to have supported over 5,000 small businesses. See how GreeNloans is changing lives one business at a time.
          </p>
        </center>
      </section>

      <section className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #0a1a14 0%, #050505 100%)', borderRadius: '40px', border: '1px solid #1a1a1a', padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={s1} 
              alt="Featured Entrepreneur" 
              style={{ width: '100%', borderRadius: '25px', filter: 'grayscale(20%)' }} 
            />
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#10b981', color: 'black', padding: '1.5rem', borderRadius: '20px', fontWeight: 900 }}>
              HERO OF THE MONTH
            </div>
          </div>
          <div>
            <Quote size={40} color="#10b981" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
            <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '1rem' }}>"GreeNloans believed in my hardware store when the banks said I was too small."</h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '2rem' }}>— <strong>Joyce Banda</strong>, Owner of Banda Hardware, Solwezi.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                    <h5 style={{ color: '#10b981', margin: 0 }}>K25,000</h5>
                    <p style={{ color: '#555', fontSize: '0.8rem', margin: 0 }}>Capital Injection</p>
                </div>
                <div>
                    <h5 style={{ color: '#10b981', margin: 0 }}>3 Jobs</h5>
                    <p style={{ color: '#555', fontSize: '0.8rem', margin: 0 }}>Created Locally</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[
          { icon: <ShoppingBag />, label: "Marketeers Funded", value: "3,200+" },
          { icon: <TrendingUp />, label: "Average Growth", value: "45%" },
          { icon: <GraduationCap />, label: "Training Sessions", value: "150+" },
          { icon: <Truck />, label: "Logistics Loans", value: "K1.2M+" },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#0a0a0a', padding: '2rem', borderRadius: '25px', border: '1px solid #1a1a1a', textAlign: 'center' }}>
            <div style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
            <h3 style={{ color: 'white', fontSize: '1.8rem', margin: '0 0 5px 0' }}>{stat.value}</h3>
            <p style={{ color: '#555', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>{stat.label}</p>
          </div>
        ))}
      </section>
      <section className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem 10rem' }}>
        <h2 style={{ color: 'white', marginBottom: '3rem', textAlign: 'center' }}>More Success Stories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {stories.map((story, i) => (
            <div key={i} className="story-card clickable-bounce" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '30px', overflow: 'hidden' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={story.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={story.name} />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800, marginBottom: '0.5rem' }}>{story.loanType.toUpperCase()}</div>
                <h4 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1.2rem' }}>{story.name}</h4>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{story.quote}</p>
                <hr style={{ border: 'none', borderTop: '1px solid #1a1a1a', marginBottom: '1.5rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#eee', fontSize: '0.75rem', fontWeight: 600 }}>{story.location}</span>
                    <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 700 }}>
                        VIEW IMPACT <ChevronRight size={14} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        .story-card:hover { border-color: #10b981 !important; transform: translateY(-10px); transition: all 0.4s; }
      `}</style>
    </div>
  );
};

export default SuccessStories;