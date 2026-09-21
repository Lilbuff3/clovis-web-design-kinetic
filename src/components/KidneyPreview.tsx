import { useState } from 'react';
import { Phone, MapPin, ShieldCheck, CheckCircle2, Search, ArrowUpRight, Stethoscope, Clock, FileText, Sparkles } from 'lucide-react';

type ClinicLocation = 'madera' | 'fresno';

export function KidneyPreview({ isMobile = false }: { isMobile?: boolean }) {
  const [activeLocation, setActiveLocation] = useState<ClinicLocation>('fresno');
  const [activeStage, setActiveStage] = useState<number>(3);
  const [searchInsurance, setSearchInsurance] = useState('');
  const [highContrast, setHighContrast] = useState(false);

  const insurancePlans = [
    'Medicare Part B',
    'Medi-Cal / CalViva Health',
    'Blue Shield of California PPO',
    'Anthem Blue Cross HMO / PPO',
    'Kaiser Permanente (Referral Affiliated)',
    'Health Net Community Solutions',
    'Aetna Better Health',
    'Cigna Healthcare',
    'Humana Gold Plus',
    'UnitedHealthcare Medicare Solutions',
    'TriCare West Military',
    'Fresno-Madera Medical Society IPA',
  ];

  const filteredInsurance = insurancePlans.filter((plan) =>
    plan.toLowerCase().includes(searchInsurance.toLowerCase())
  );

  const stages = [
    { stage: 1, egfr: '90+', title: 'Normal / Minimal', color: '#10b981', action: 'Annual screening & urine albumin monitoring.' },
    { stage: 2, egfr: '60–89', title: 'Mild Decrease', color: '#3b82f6', action: 'Blood pressure regulation & cardiovascular protection.' },
    { stage: 3, egfr: '30–59', title: 'Moderate (3a/3b)', color: '#f59e0b', action: 'Direct nephrologist consultation, anemia & bone-mineral balance.' },
    { stage: 4, egfr: '15–29', title: 'Severe Decrease', color: '#f97316', action: 'Vascular access planning & kidney transplant evaluation.' },
    { stage: 5, egfr: '<15', title: 'Kidney Failure', color: '#ef4444', action: 'Hemodialysis, peritoneal dialysis, or transplant care.' },
  ];

  const currentStageInfo = stages.find((s) => s.stage === activeStage) || stages[2];

  return (
    <div
      className={`kidney-live-component ${highContrast ? 'high-contrast' : ''} ${isMobile ? 'is-mobile-view' : ''}`}
      style={{
        backgroundColor: highContrast ? '#0a1711' : '#f4f8f5',
        color: highContrast ? '#ffffff' : '#14281e',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top Clinical Utility Bar */}
      <div className="klc-topbar">
        <div className="klc-emergency-badge">
          <span className="klc-dot" /> Serving 8,400+ Central Valley Kidney Patients
        </div>
        <div className="klc-top-actions">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="klc-contrast-toggle"
            title="Toggle High Contrast for WCAG 2.1 AA Demonstration"
          >
            WCAG AA: {highContrast ? 'HIGH CONTRAST ON' : 'STANDARD'}
          </button>
          <span className="klc-badge-hipaa">
            <ShieldCheck size={13} /> ZERO HIPAA TRACKING
          </span>
        </div>
      </div>

      {/* Practice Header */}
      <header className="klc-header">
        <div className="klc-brand">
          <div className="klc-crest">
            <Stethoscope size={20} color="#166534" />
          </div>
          <div>
            <h4 className="klc-brand-title">KIDNEY SPECIALIST INC.</h4>
            <p className="klc-brand-sub">Nephrology & Hypertension · Sheikh M. Masood, M.D. & Mohammed M. Siddiqui, M.D.</p>
          </div>
        </div>
        <div className="klc-header-phones">
          <a href="tel:5594497470" className="klc-call-pill">
            <Phone size={14} /> Fresno: (559) 449-7470
          </a>
          <a href="tel:5596735196" className="klc-call-pill">
            <Phone size={14} /> Madera: (559) 673-5196
          </a>
        </div>
      </header>

      {/* Hero Banner with Authentic Clinic Photo */}
      <div className="klc-hero-card">
        <div className="klc-hero-content">
          <span className="klc-pill">FELLOWSHIP-TRAINED NEPHROLOGY CARE</span>
          <h3 className="klc-hero-h1">
            Care that begins <br />
            <em>before the door opens.</em>
          </h3>
          <p className="klc-hero-p">
            Comprehensive kidney care, hypertension control, dialysis management, and transplant care for Fresno and Madera counties.
          </p>
          <div className="klc-hero-buttons">
            <a href="tel:5594497470" className="klc-btn-primary">
              <Phone size={16} /> Call for Appointment
            </a>
            <span className="klc-fax-info">
              <FileText size={14} /> Clinical Fax Referral: (559) 449-7471
            </span>
          </div>
        </div>
        <div className="klc-hero-image-wrap">
          <img
            src="/images/kidney/fresno-clinic.jpg"
            alt="Kidney Specialist Inc Fresno Clinical Office"
            className="klc-clinic-img"
          />
          <div className="klc-img-caption">
            <span>Fresno Clinic · 7005 N Maple Ave</span>
          </div>
        </div>
      </div>

      {/* Attending Physicians Section with Real Portraits */}
      <section className="klc-doctors-section">
        <div className="klc-section-header">
          <p className="klc-label">BOARD-CERTIFIED NEPHROLOGISTS</p>
          <h4>Your Attending Physicians</h4>
        </div>
        <div className="klc-doctors-grid">
          <div className="klc-doc-card">
            <img
              src="/images/kidney/dr-sheikh-mohammad-masood.jpg"
              alt="Dr. Sheikh Mohammad Masood, M.D."
              className="klc-doc-avatar"
            />
            <div className="klc-doc-meta">
              <h5>Dr. Sheikh M. Masood, M.D.</h5>
              <p className="klc-doc-title">Internal Medicine & Nephrology · 25+ Yrs Experience</p>
              <div className="klc-doc-tags">
                <span>NPI: 1669422812</span>
                <span>St. Agnes Medical Center</span>
                <span>CRMC Fresno</span>
              </div>
            </div>
          </div>

          <div className="klc-doc-card">
            <img
              src="/images/kidney/dr-mohammed-muhibbulla-siddiqui.jpg"
              alt="Dr. Mohammed Muhibbulla Siddiqui, M.D."
              className="klc-doc-avatar"
            />
            <div className="klc-doc-meta">
              <h5>Dr. Mohammed M. Siddiqui, M.D.</h5>
              <p className="klc-doc-title">Interventional Nephrology Fellowship Trained</p>
              <div className="klc-doc-tags">
                <span>NPI: 1184916983</span>
                <span>Madera Community Hospital</span>
                <span>Vascular Access Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Location Switcher */}
      <section className="klc-locations-interactive">
        <div className="klc-section-header">
          <p className="klc-label">CENTRAL VALLEY CLINICS</p>
          <h4>Choose Your Clinic Location</h4>
        </div>

        <div className="klc-loc-tabs">
          <button
            className={`klc-loc-tab ${activeLocation === 'fresno' ? 'is-active' : ''}`}
            onClick={() => setActiveLocation('fresno')}
          >
            <MapPin size={16} /> Fresno Medical Center
          </button>
          <button
            className={`klc-loc-tab ${activeLocation === 'madera' ? 'is-active' : ''}`}
            onClick={() => setActiveLocation('madera')}
          >
            <MapPin size={16} /> Madera Clinic
          </button>
        </div>

        {activeLocation === 'fresno' ? (
          <div className="klc-loc-detail">
            <div className="klc-loc-info">
              <h5>Fresno Clinic (North Maple)</h5>
              <p className="klc-address">
                <MapPin size={15} /> 7005 N Maple Ave, Suite 101, Fresno, CA 93720
              </p>
              <p className="klc-hours">
                <Clock size={15} /> Mon – Fri: 8:30 AM – 5:00 PM
              </p>
              <div className="klc-loc-contacts">
                <a href="tel:5594497470" className="klc-loc-btn">
                  <Phone size={14} /> Call: (559) 449-7470
                </a>
                <span className="klc-loc-fax">Fax: (559) 449-7471</span>
              </div>
              <p className="klc-loc-note">Across from Clovis North educational corridor with patient-accessible parking.</p>
            </div>
            <img
              src="/images/kidney/fresno-clinic.jpg"
              alt="Fresno Clinic Exterior"
              className="klc-loc-img"
            />
          </div>
        ) : (
          <div className="klc-loc-detail">
            <div className="klc-loc-info">
              <h5>Madera Clinic (South I Street)</h5>
              <p className="klc-address">
                <MapPin size={15} /> 509 S I St, Madera, CA 93638
              </p>
              <p className="klc-hours">
                <Clock size={15} /> Mon – Fri: 8:30 AM – 5:00 PM
              </p>
              <div className="klc-loc-contacts">
                <a href="tel:5596735196" className="klc-loc-btn">
                  <Phone size={14} /> Call: (559) 673-5196
                </a>
                <span className="klc-loc-fax">Fax: (559) 673-5197</span>
              </div>
              <p className="klc-loc-note">Convenient access off Hwy 99 serving Madera, Chowchilla, and rural valley communities.</p>
            </div>
            <img
              src="/images/kidney/madera-clinic.jpg"
              alt="Madera Clinic Exterior"
              className="klc-loc-img"
            />
          </div>
        )}
      </section>

      {/* Interactive CKD Stage & eGFR Educational Calculator */}
      <section className="klc-egfr-tool">
        <div className="klc-section-header">
          <p className="klc-label">PATIENT CLINICAL EDUCATION</p>
          <h4>Chronic Kidney Disease (CKD) Stage Reference</h4>
          <p className="klc-subtitle">Select an eGFR range to review clinical guidance recommended by Dr. Masood and Dr. Siddiqui.</p>
        </div>

        <div className="klc-stage-pills">
          {stages.map((s) => (
            <button
              key={s.stage}
              className={`klc-stage-btn ${activeStage === s.stage ? 'is-selected' : ''}`}
              onClick={() => setActiveStage(s.stage)}
              style={{
                borderColor: activeStage === s.stage ? s.color : undefined,
                backgroundColor: activeStage === s.stage ? (highContrast ? '#1f2937' : '#ffffff') : undefined,
              }}
            >
              <span className="klc-stage-num" style={{ color: s.color }}>Stage {s.stage}</span>
              <span className="klc-stage-range">eGFR {s.egfr}</span>
            </button>
          ))}
        </div>

        <div className="klc-stage-card" style={{ borderLeft: `5px solid ${currentStageInfo.color}` }}>
          <div className="klc-stage-badge" style={{ color: currentStageInfo.color }}>
            Stage {currentStageInfo.stage} · {currentStageInfo.title} (eGFR {currentStageInfo.egfr} mL/min/1.73m²)
          </div>
          <p className="klc-stage-action">
            <strong>Clinical Care Pathway: </strong> {currentStageInfo.action}
          </p>
          <p className="klc-stage-disclaimer">
            *eGFR levels should be monitored in conjunction with urine albumin-to-creatinine ratio (uACR) and blood pressure.
          </p>
        </div>
      </section>

      {/* Interactive 60+ Insurance Search Component */}
      <section className="klc-insurance-tool">
        <div className="klc-section-header">
          <p className="klc-label">COVERAGE & ACCESS</p>
          <h4>Accepted Health Plans</h4>
          <p className="klc-subtitle">Kidney Specialist Inc works with 60+ Central Valley insurance carriers and Medicare programs.</p>
        </div>

        <div className="klc-search-wrap">
          <Search size={16} className="klc-search-icon" />
          <input
            type="text"
            value={searchInsurance}
            onChange={(e) => setSearchInsurance(e.target.value)}
            placeholder="Search insurance (e.g. Medicare, Blue Shield, CalViva)..."
            className="klc-search-input"
          />
        </div>

        <div className="klc-insurance-chips">
          {filteredInsurance.slice(0, 8).map((plan) => (
            <span key={plan} className="klc-chip">
              <CheckCircle2 size={13} color="#16a34a" /> {plan}
            </span>
          ))}
          {filteredInsurance.length > 8 && (
            <span className="klc-chip-more">+{filteredInsurance.length - 8} more accepted plans</span>
          )}
        </div>
      </section>

      {/* Sticky Quick-Action Bar */}
      <div className="klc-footer-cta">
        <div>
          <strong>Ready for compassionate nephrology care?</strong>
          <span>Direct staff referral intake · No automated call mazes</span>
        </div>
        <a
          href="https://kidneyspecialistinc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="klc-live-link"
        >
          Visit Live kidneyspecialistinc.com <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}
