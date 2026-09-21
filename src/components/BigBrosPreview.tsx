import { useState } from 'react';
import { Phone, MessageSquare, ShieldCheck, MapPin, Truck, Check, ArrowUpRight, Star, Clock, AlertCircle } from 'lucide-react';

export function BigBrosPreview({ isMobile = false }: { isMobile?: boolean }) {
  const [selectedSize, setSelectedSize] = useState<'14' | '20'>('14');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedCity, setSelectedCity] = useState<string>('Clovis');
  const [pileText, setPileText] = useState('');
  const [pileEstimated, setPileEstimated] = useState(false);

  const dumpsters = {
    '14': {
      name: '14-Yard Roll-Off Dumpster',
      price: '$399',
      period: '7-Day Rental',
      tons: '2 Tons Included (4,000 lbs)',
      dimensions: '14 ft long × 8 ft wide × 4 ft high',
      capacity: 'Holds approx. 6 standard pickup truck beds',
      fits: [
        'Garage cleanouts & single-room decluttering',
        'Kitchen or bathroom remodels',
        'Shingle roofing tear-offs (up to 25–30 squares)',
        'Flooring, carpet, and drywall removal',
        'Mattresses, appliances, and bulky furniture included',
      ],
      popular: true,
    },
    '20': {
      name: '20-Yard Roll-Off Dumpster',
      price: '$499',
      period: '7-Day Rental',
      tons: '2.5 Tons Included (5,000 lbs)',
      dimensions: '16 ft long × 8 ft wide × 5.5 ft high',
      capacity: 'Holds approx. 9 standard pickup truck beds',
      fits: [
        'Whole-house cleanouts & estate downsizing',
        'Full residential demo & multi-room renovations',
        'Commercial tenant improvements',
        'Heavy yard debris, trees, branches, and fence tear-downs',
        'Contractor construction debris',
      ],
      popular: false,
    },
  };

  const neighborhoods = [
    { name: 'Clovis', time: 'Same-Day Dispatch', fee: 'Free Delivery' },
    { name: 'Fresno', time: 'Same-Day Dispatch', fee: 'Free Delivery' },
    { name: 'Old Town Clovis', time: 'Under 2 Hours', fee: 'Free Delivery' },
    { name: 'Harlan Ranch', time: 'Same-Day Dispatch', fee: 'Free Delivery' },
    { name: 'Fig Garden', time: 'Same-Day Dispatch', fee: 'Free Delivery' },
    { name: 'Woodward Park', time: 'Same-Day Dispatch', fee: 'Free Delivery' },
    { name: 'Sunnyside', time: 'Same-Day Dispatch', fee: 'Free Delivery' },
    { name: 'Sanger', time: 'Scheduled Delivery', fee: 'Free Delivery' },
  ];

  const currentDumpster = dumpsters[selectedSize];

  return (
    <div
      className={`bigbros-live-component ${isMobile ? 'is-mobile-view' : ''}`}
      style={{
        backgroundColor: '#fffaf5',
        color: '#2a1609',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top Trade Dispatch Bar */}
      <div className="bbc-topbar">
        <div className="bbc-status">
          <span className="bbc-dot" /> {language === 'en' ? 'SAME-DAY DISPATCH AVAILABLE IN CLOVIS & FRESNO' : 'DESPACHO EL MISMO DÍA EN CLOVIS Y FRESNO'}
        </div>
        <div className="bbc-top-controls">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="bbc-lang-toggle"
          >
            {language === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
          </button>
          <span className="bbc-rating">
            <Star size={13} fill="#ea580c" color="#ea580c" /> 4.9/5 (120+ Central Valley Reviews)
          </span>
        </div>
      </div>

      {/* Main Trade Header */}
      <header className="bbc-header">
        <div className="bbc-brand">
          <div className="bbc-logo-badge">
            <Truck size={22} color="#ffffff" />
          </div>
          <div>
            <h4 className="bbc-brand-title">BIG BROS DUMPSTER RENTALS</h4>
            <p className="bbc-brand-sub">
              {language === 'en'
                ? 'Locally Owned & Operated by Jessica & William Maldonado Ramirez'
                : 'Empresa Familiar de Jessica y William Maldonado Ramirez'}
            </p>
          </div>
        </div>

        <div className="bbc-header-actions">
          <a href="tel:5593945555" className="bbc-call-pill">
            <Phone size={14} /> (559) 394-5555
          </a>
          <a href="sms:5594958034" className="bbc-text-pill">
            <MessageSquare size={14} /> Text Photo: (559) 495-8034
          </a>
        </div>
      </header>

      {/* Hero Showcase with Authentic Driveway Drop-off Photo */}
      <div className="bbc-hero-card">
        <div className="bbc-hero-copy">
          <span className="bbc-tag">
            {language === 'en' ? 'FLAT-RATE CENTRAL VALLEY ROLL-OFFS' : 'TARIFAS PLANAS SIN SORPRESAS'}
          </span>
          <h3 className="bbc-hero-h1">
            {language === 'en' ? (
              <>
                Book in 60 seconds. <br />
                <em>Driveway safe. Zero surprises.</em>
              </>
            ) : (
              <>
                Renta en 60 segundos. <br />
                <em>Protegemos tu driveway.</em>
              </>
            )}
          </h3>
          <p className="bbc-hero-desc">
            {language === 'en'
              ? 'Transparent 7-day flat rates with driveway wood protection boards, weight allowance, and drop-off included. No franchise broker markups.'
              : 'Precios transparentes de 7 días con tablas de madera protectoras para tu driveway, peso incluido y entrega rápida.'}
          </p>

          <div className="bbc-hero-buttons">
            <a href="tel:5593945555" className="bbc-btn-primary">
              <Phone size={16} /> {language === 'en' ? 'Call William & Jessica: (559) 394-5555' : 'Llamar a William y Jessica'}
            </a>
            <span className="bbc-guarantee-note">
              <ShieldCheck size={14} color="#16a34a" /> Wood runner boards placed on every job
            </span>
          </div>
        </div>

        <div className="bbc-hero-media">
          <img
            src="/images/bigbros/job-driveway.webp"
            alt="Big Bros roll-off dumpster on Clovis driveway"
            className="bbc-driveway-img"
          />
          <div className="bbc-media-tag">
            <span>Real Clovis Residential Job · Clean Wood Board Protection</span>
          </div>
        </div>
      </div>

      {/* Meet the Founders: William & Jessica Maldonado Ramirez */}
      <section className="bbc-family-section">
        <div className="bbc-family-card">
          <img
            src="/images/bigbros/family-photo.webp"
            alt="Jessica & William Maldonado Ramirez, founders of Big Bros Dumpster Rentals"
            className="bbc-family-photo"
          />
          <div className="bbc-family-info">
            <p className="bbc-label">LOCAL FAMILY OWNED & OPERATED</p>
            <h4>Meet William & Jessica Maldonado Ramirez</h4>
            <p className="bbc-family-story">
              {language === 'en'
                ? 'We started Big Bros Dumpster Rentals in Clovis to give homeowners, roofers, and contractors an honest alternative to predatory nationwide broker websites. When you call, you speak directly with us — not a call center in another state.'
                : 'Fundamos Big Bros en Clovis para ofrecer a contratistas y familias un servicio honesto y directo. Cuando nos llamas, hablas directamente con nosotros, sin intermediarios.'}
            </p>
            <div className="bbc-badges-row">
              <span className="bbc-badge">
                <Check size={14} color="#ea580c" /> 100% Local Central Valley
              </span>
              <span className="bbc-badge">
                <Check size={14} color="#ea580c" /> Direct Phone / SMS
              </span>
              <span className="bbc-badge">
                <Check size={14} color="#ea580c" /> Driveway Safe Runners
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dumpster Size & Rate Calculator */}
      <section className="bbc-sizing-tool">
        <div className="bbc-section-head">
          <p className="bbc-label">CHOOSE YOUR DUMPSTER SIZE</p>
          <h4>Transparent Flat Rates</h4>
          <p className="bbc-sub">Everything included: delivery, 7 days on-site, pickup, and disposal tonnage.</p>
        </div>

        <div className="bbc-size-selector">
          <button
            className={`bbc-size-pill ${selectedSize === '14' ? 'is-active' : ''}`}
            onClick={() => setSelectedSize('14')}
          >
            <span className="bbc-size-name">14-Yard Roll-Off</span>
            <span className="bbc-size-price">$399 Flat</span>
            <span className="bbc-size-pop">Most Popular</span>
          </button>
          <button
            className={`bbc-size-pill ${selectedSize === '20' ? 'is-active' : ''}`}
            onClick={() => setSelectedSize('20')}
          >
            <span className="bbc-size-name">20-Yard Roll-Off</span>
            <span className="bbc-size-price">$499 Flat</span>
            <span className="bbc-size-pop">Large Remodels</span>
          </button>
        </div>

        <div className="bbc-specs-card">
          <div className="bbc-specs-header">
            <div>
              <h5>{currentDumpster.name}</h5>
              <p className="bbc-specs-dim">{currentDumpster.dimensions}</p>
            </div>
            <div className="bbc-specs-price-box">
              <span className="bbc-big-price">{currentDumpster.price}</span>
              <span className="bbc-price-detail">{currentDumpster.period} · {currentDumpster.tons}</span>
            </div>
          </div>

          <div className="bbc-capacity-highlight">
            <Truck size={17} color="#c2410c" />
            <span><strong>Capacity: </strong> {currentDumpster.capacity}</span>
          </div>

          <div className="bbc-fits-list">
            <p className="bbc-fits-title">Ideal For:</p>
            <ul>
              {currentDumpster.fits.map((fit) => (
                <li key={fit}>
                  <Check size={14} color="#16a34a" /> {fit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive "Text a Photo of Your Pile" Widget */}
      <section className="bbc-text-pile-tool">
        <div className="bbc-pile-card">
          <div className="bbc-pile-info">
            <p className="bbc-label">UNSURE OF THE SIZE?</p>
            <h4>Text a Photo of Your Pile</h4>
            <p>
              Don't pay for empty space or risk needing a second dumpster. Snap a photo of your debris and text it directly to William. We'll size it in 5 minutes.
            </p>
            <div className="bbc-sms-box">
              <input
                type="text"
                value={pileText}
                onChange={(e) => setPileText(e.target.value)}
                placeholder="e.g. 2 car garage cleanout with old sofa and boxes..."
                className="bbc-pile-input"
              />
              <button
                onClick={() => setPileEstimated(true)}
                className="bbc-pile-btn"
              >
                Estimate Size
              </button>
            </div>
            {pileEstimated && (
              <div className="bbc-estimate-bubble">
                <AlertCircle size={16} color="#c2410c" />
                <div>
                  <strong>William's Quick Sizing: </strong>
                  <span>Based on your description, a <strong>14-Yard dumpster ($399)</strong> will easily handle your cleanout without paying for extra tonnage.</span>
                </div>
              </div>
            )}
          </div>
          <div className="bbc-pile-action-box">
            <a href="sms:5594958034" className="bbc-big-sms-btn">
              <MessageSquare size={18} /> Text Photo: (559) 495-8034
            </a>
            <span className="bbc-sms-sub">Direct line to William · Instant Response</span>
          </div>
        </div>
      </section>

      {/* Neighborhood Delivery Radius Selector */}
      <section className="bbc-radius-section">
        <div className="bbc-section-head">
          <p className="bbc-label">SERVICE RADIUS</p>
          <h4>Central Valley Delivery Coverage</h4>
        </div>

        <div className="bbc-city-grid">
          {neighborhoods.map((n) => (
            <button
              key={n.name}
              className={`bbc-city-card ${selectedCity === n.name ? 'is-selected' : ''}`}
              onClick={() => setSelectedCity(n.name)}
            >
              <div className="bbc-city-top">
                <MapPin size={15} color={selectedCity === n.name ? '#ea580c' : '#78350f'} />
                <strong>{n.name}</strong>
              </div>
              <div className="bbc-city-bottom">
                <span>{n.time}</span>
                <span className="bbc-city-fee">{n.fee}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Authentic Job Photo Strip */}
      <section className="bbc-job-gallery">
        <div className="bbc-gallery-item">
          <img src="/images/bigbros/job-driveway.webp" alt="Driveway safe drop off" />
          <span>Driveway Protection Planks</span>
        </div>
        <div className="bbc-gallery-item">
          <img src="/images/bigbros/job-dropoff.webp" alt="Precision roll off delivery" />
          <span>Tight Space Placement</span>
        </div>
        <div className="bbc-gallery-item">
          <img src="/images/bigbros/job-loaded.webp" alt="Full dumpster haul" />
          <span>Contractor Ready Hauling</span>
        </div>
      </section>

      {/* Footer Dispatch Bar */}
      <div className="bbc-footer-bar">
        <div>
          <strong>Ready for your dumpster delivery?</strong>
          <span>Call or text William & Jessica directly at (559) 394-5555</span>
        </div>
        <a
          href="https://bigbrosdumpsterrental.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bbc-live-btn"
        >
          Visit Live bigbrosdumpsterrental.com <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}
