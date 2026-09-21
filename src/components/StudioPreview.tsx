import { useState } from 'react';
import { Gauge, Zap, CheckCircle, ShieldCheck, ArrowUpRight, Cpu, Layers } from 'lucide-react';

export function StudioPreview({ isMobile = false }: { isMobile?: boolean }) {
  const [activeTab, setActiveTab] = useState<'vitals' | 'roi'>('vitals');
  const [projectType, setProjectType] = useState<'medical' | 'trade' | 'flagship'>('medical');

  const benchmarks = [
    { metric: 'Largest Contentful Paint (LCP)', clovis: '0.42s', agency: '4.85s', diff: '11.5× Faster' },
    { metric: 'Mobile Performance Score', clovis: '100 / 100', agency: '38 / 100', diff: '+62 Points' },
    { metric: 'Cumulative Layout Shift (CLS)', clovis: '0.000', agency: '0.342', diff: 'Zero Jitter' },
    { metric: 'Third-Party Tracking Scripts', clovis: '0 Bytes', agency: '1.4 MB', diff: '100% Privacy' },
    { metric: 'Ongoing Platform Retainers', clovis: '$0 (You Own Code)', agency: '$400–$800/mo', diff: '$0 Lock-in' },
  ];

  const scopes = {
    medical: {
      title: 'Medical Practice Flagship (e.g. Kidney Specialist Inc)',
      speed: 'Sub-second mobile speed',
      hipaa: '100% Zero HIPAA liability & fax-first intake',
      schema: 'Deep MedicalClinic & Physician Schema.org JSON-LD',
      wcag: 'WCAG 2.1 AA contrast & clinical readability',
      deliverable: 'Astro SSG static site, zero server vulnerabilities, 100% asset ownership on day one.',
    },
    trade: {
      title: 'Local Trade & Contractor Presence (e.g. Big Bros Dumpster)',
      speed: 'Instant mobile click-to-call & SMS quote',
      hipaa: 'Geo-radius landing pages (Clovis, Fresno, Fig Garden)',
      schema: 'LocalBusiness Schema + Google Business Profile 3-Pack optimization',
      wcag: 'Bilingual English/Spanish conversions & 4.9-star review trust',
      deliverable: 'High-converting roll-off booking flow, zero broker commissions, phone rings in 60s.',
    },
    flagship: {
      title: 'Bespoke Brand & Digital Flagship',
      speed: '60fps interactive canvas & micro-animations',
      hipaa: 'Modern React + Vite + Motion architecture',
      schema: 'World-class visual identity & bespoke typography',
      wcag: 'Zero cookie banners, zero bloat, pure craftsmanship',
      deliverable: 'Fortune 500 aesthetic engineered directly by Adam Youssef with no agency intermediaries.',
    },
  };

  const currentScope = scopes[projectType];

  return (
    <div
      className={`studio-live-component ${isMobile ? 'is-mobile-view' : ''}`}
      style={{
        backgroundColor: '#f7f6f0',
        color: '#1a1815',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top Studio Bar */}
      <div className="slc-topbar">
        <span className="slc-badge">CENTRAL VALLEY DIGITAL ARCHITECTURE</span>
        <span className="slc-meta">Direct Craftsman Delivery · Adam Youssef</span>
      </div>

      {/* Hero Intro */}
      <div className="slc-hero-box">
        <p className="slc-eyebrow">THE CRAFTSMAN STANDARD</p>
        <h3 className="slc-title">
          Fortune 500 craft. <br />
          <em>Main Street soul.</em>
        </h3>
        <p className="slc-desc">
          Compare real Central Valley speed and ownership against traditional 14-person agency bloat.
        </p>

        <div className="slc-nav-pills">
          <button
            className={`slc-pill ${activeTab === 'vitals' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('vitals')}
          >
            <Gauge size={15} /> Core Web Vitals Benchmark
          </button>
          <button
            className={`slc-pill ${activeTab === 'roi' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('roi')}
          >
            <Layers size={15} /> Architecture & Scope
          </button>
        </div>
      </div>

      {activeTab === 'vitals' ? (
        <section className="slc-vitals-section">
          <div className="slc-table-wrap">
            <table className="slc-table">
              <thead>
                <tr>
                  <th>Audit Metric</th>
                  <th className="slc-col-clovis">Clovis Web Design</th>
                  <th className="slc-col-agency">Typical Agency Theme</th>
                  <th>The Advantage</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b) => (
                  <tr key={b.metric}>
                    <td className="slc-metric-name">{b.metric}</td>
                    <td className="slc-metric-clovis">
                      <Zap size={13} color="#15803d" /> {b.clovis}
                    </td>
                    <td className="slc-metric-agency">{b.agency}</td>
                    <td className="slc-metric-diff">{b.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="slc-vitals-footer">
            <CheckCircle size={15} color="#15803d" />
            <span>Audited on simulated throttled mobile 4G network under Google Lighthouse standards.</span>
          </div>
        </section>
      ) : (
        <section className="slc-scope-section">
          <div className="slc-scope-selector">
            <button
              className={`slc-scope-btn ${projectType === 'medical' ? 'is-selected' : ''}`}
              onClick={() => setProjectType('medical')}
            >
              Medical / Clinic
            </button>
            <button
              className={`slc-scope-btn ${projectType === 'trade' ? 'is-selected' : ''}`}
              onClick={() => setProjectType('trade')}
            >
              Local Trade / Hauler
            </button>
            <button
              className={`slc-scope-btn ${projectType === 'flagship' ? 'is-selected' : ''}`}
              onClick={() => setProjectType('flagship')}
            >
              Bespoke Flagship
            </button>
          </div>

          <div className="slc-scope-card">
            <h4>{currentScope.title}</h4>
            <div className="slc-scope-features">
              <div>
                <Zap size={15} color="#15803d" />
                <strong>Speed: </strong> {currentScope.speed}
              </div>
              <div>
                <ShieldCheck size={15} color="#15803d" />
                <strong>Integrity: </strong> {currentScope.hipaa}
              </div>
              <div>
                <Cpu size={15} color="#15803d" />
                <strong>SEO Schema: </strong> {currentScope.schema}
              </div>
              <div>
                <CheckCircle size={15} color="#15803d" />
                <strong>Audience: </strong> {currentScope.wcag}
              </div>
            </div>
            <div className="slc-scope-deliverable">
              <strong>Ownership Guarantee: </strong> {currentScope.deliverable}
            </div>
          </div>
        </section>
      )}

      {/* Direct Contact Footer */}
      <div className="slc-footer-cta">
        <div>
          <strong>Ready to build your digital flagship?</strong>
          <span>Speak directly with Adam Youssef · No junior account managers</span>
        </div>
        <a
          href="https://cloviswebdesign.com"
          target="_blank"
          rel="noopener noreferrer"
          className="slc-footer-btn"
        >
          Explore cloviswebdesign.com <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}
