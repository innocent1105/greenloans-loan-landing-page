import React, { useEffect } from 'react';
import '../App.css';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, Landmark } from 'lucide-react';
import TopNav from '../components/top_nav';
import Footer from '../components/footer';

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const offices = [
    {
      city: "Solwezi",
      type: "Headquarters",
      address: "Plot No# L/40269 New Industrial Area, Solwezi-Mutanda Road",
      province: "North-Western Province",
      phone: "+260 978 330929",
      email: "solwezi@greenhub.co.zm",
      hours: "Mon-Sat: 08:00 - 17:00",
      mapUrl: "https://maps.google.com" // Replace with actual link
    },
    {
      city: "Ndola",
      type: "Regional Office",
      address: "City Centre, President Avenue",
      province: "Copperbelt Province",
      phone: "+260 965 112233",
      email: "ndola@greenhub.co.zm",
      hours: "Mon-Sat: 08:00 - 17:00",
      mapUrl: "https://maps.google.com" // Replace with actual link
    }
  ];

  return (
    <div className="app-container" style={{ backgroundColor: '#050505' }}>
      <TopNav />

      {/* --- HERO SECTION --- */}
      <section style={{ paddingTop: '10rem', paddingBottom: '5rem' }} className="reveal">
        <center>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: 'fit-content', padding: '5px 15px', borderRadius: '50px', border: '1px solid #10b981', marginBottom: '1.5rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px' }}>FIND US NEAR YOU</span>
          </div>
          <h1 className="hero-text" style={{ fontWeight: 900, color: 'white', margin: 0, fontSize: '3.5rem' }}>
            Our <span style={{ color: '#10b981' }}>Offices.</span>
          </h1>
          <p className="hero-subtext" style={{ color: '#888', marginTop: '1.5rem', maxWidth: '600px' }}>
            We are deeply rooted in the communities we serve. Visit any of our branches for a one-on-one consultation with a loan officer.
          </p>
        </center>
      </section>

      {/* --- LOCATIONS GRID --- */}
      <section className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
          {offices.map((office, i) => (
            <div key={i} className="location-card" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '35px', overflow: 'hidden' }}>
              
              {/* Placeholder for Map / Street View Image */}
              <div style={{ height: '250px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #1a1a1a', position: 'relative' }}>
                <div style={{ textAlign: 'center', color: '#333' }}>
                    <MapPin size={48} style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.8rem' }}>Map view for {office.city} Office</p>
                </div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#10b981', color: 'black', padding: '5px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 800 }}>
                    {office.type.toUpperCase()}
                </div>
              </div>

              <div style={{ padding: '2.5rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{office.city} Office</h3>
                <p style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1.5rem' }}>{office.province.toUpperCase()}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                        <Navigation size={18} color="#555" />
                        <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{office.address}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Phone size={18} color="#555" />
                        <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{office.phone}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Mail size={18} color="#555" />
                        <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{office.email}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Clock size={18} color="#555" />
                        <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{office.hours}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                    <a href={office.mapUrl} className="cta-pill" style={{ flex: 1, textAlign: 'center', background: '#10b981', color: 'black', textDecoration: 'none', padding: '1rem', borderRadius: '15px', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        GET DIRECTIONS <ExternalLink size={14} />
                    </a>
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} style={{ padding: '1rem', border: '1px solid #222', borderRadius: '15px', color: 'white', display: 'flex', alignItems: 'center' }}>
                        <Phone size={20} />
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EXPANSION NOTICE --- */}
        <div style={{ marginTop: '5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed #10b981', borderRadius: '25px', padding: '3rem', textAlign: 'center' }}>
            <Landmark size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Expanding to Lusaka Soon!</h4>
            <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto', fontSize: '0.9rem' }}>
                We are currently identifying local partners to bring GreeNloans to the capital. Stay tuned for our new branch opening in 2026.
            </p>
        </div>
      </section>

      <Footer />

      <style>{`
        .location-card:hover { border-color: #10b981 !important; transform: translateY(-5px); transition: all 0.3s ease; }
        @media (max-width: 600px) {
            .location-card { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Locations;