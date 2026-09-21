import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Monitor, Smartphone, Check, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { type Project } from '../data';
import { KidneyPreview } from './KidneyPreview';
import { BigBrosPreview } from './BigBrosPreview';
import { StudioPreview } from './StudioPreview';

type ProjectDialogProps = {
  project: Project;
  nextProject: Project;
  onNext: () => void;
  onContact: () => void;
};

export function ProjectDialog({ project, nextProject, onNext, onContact }: ProjectDialogProps) {
  const [tab, setTab] = useState<'story' | 'digital'>('story');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <article className="case-study">
      <div className="case-intro">
        <p className="eyebrow">CLOVIS WEB DESIGN / PROJECT {project.number} / CASE STUDY</p>
        <h2 id="project-title" tabIndex={-1}>{project.name}</h2>
        <p className="case-description">{project.description}</p>
        <div className="case-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline flex items-center gap-1 font-mono text-xs"
            >
              {project.url.replace('https://', '')} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      <div
        className="case-tabs"
        role="tablist"
        aria-label="Project view"
        onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next =
            event.key === 'Home'
              ? 'story'
              : event.key === 'End'
              ? 'digital'
              : tab === 'story'
              ? 'digital'
              : 'story';
          setTab(next);
          document.getElementById(`${next}-tab`)?.focus();
        }}
      >
        <button
          id="story-tab"
          role="tab"
          aria-controls={tab === 'story' ? 'story-panel' : undefined}
          aria-selected={tab === 'story'}
          tabIndex={tab === 'story' ? 0 : -1}
          onClick={() => setTab('story')}
        >
          The story <span>01</span>
        </button>
        <button
          id="digital-tab"
          role="tab"
          aria-controls={tab === 'digital' ? 'digital-panel' : undefined}
          aria-selected={tab === 'digital'}
          tabIndex={tab === 'digital' ? 0 : -1}
          onClick={() => setTab('digital')}
        >
          Digital direction & components <span>02</span>
        </button>
      </div>

      {tab === 'story' ? (
        <div id="story-panel" role="tabpanel" aria-labelledby="story-tab" tabIndex={0}>
          <img className="case-cover" src={project.image} alt={project.alt} />

          <div className="case-story-grid">
            <div>
              <p className="eyebrow">THE STARTING POINT</p>
              <h3 className="preserve-lines">{project.headline}</h3>
              <p>{project.challenge}</p>
            </div>
            <div className="case-services">
              <p className="eyebrow">THE GOOD STUFF</p>
              {project.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
              <p className="case-note">
                Live Central Valley Flagship.<br />
                Engineered for real business results.
              </p>
            </div>
          </div>

          {/* Authentic Real Client Section */}
          {project.id === 'kidney-specialist' && (
            <div className="case-real-spotlight">
              <p className="eyebrow">AUTHENTIC CLINICAL LEADERSHIP</p>
              <h3 className="preserve-lines">Fellowship-Trained Nephrologists</h3>
              <div className="case-doctors-showcase">
                <div className="case-doctor-profile">
                  <img
                    src="/images/kidney/dr-sheikh-mohammad-masood.jpg"
                    alt="Dr. Sheikh Mohammad Masood, M.D."
                  />
                  <div>
                    <h4>Dr. Sheikh Mohammad Masood, M.D.</h4>
                    <p className="doc-creds">Nephrology & Internal Medicine · 25+ Yrs Central Valley Experience</p>
                    <p className="doc-affil">St. Agnes Medical Center & Community Regional Medical Center</p>
                    <span className="npi-tag">NPI: 1669422812</span>
                  </div>
                </div>

                <div className="case-doctor-profile">
                  <img
                    src="/images/kidney/dr-mohammed-muhibbulla-siddiqui.jpg"
                    alt="Dr. Mohammed Muhibbulla Siddiqui, M.D."
                  />
                  <div>
                    <h4>Dr. Mohammed M. Siddiqui, M.D.</h4>
                    <p className="doc-creds">Interventional Nephrology Fellowship · Dialysis Access Specialist</p>
                    <p className="doc-affil">Madera Community Hospital & Fresno Regional Care</p>
                    <span className="npi-tag">NPI: 1184916983</span>
                  </div>
                </div>
              </div>

              <div className="case-clinic-grid">
                <div className="case-clinic-card">
                  <img src="/images/kidney/fresno-clinic.jpg" alt="Fresno Clinic Facility" />
                  <div>
                    <strong>Fresno Medical Clinic</strong>
                    <p>7005 N Maple Ave, Ste 101, Fresno, CA 93720</p>
                    <span>Direct: (559) 449-7470 · Fax: (559) 449-7471</span>
                  </div>
                </div>
                <div className="case-clinic-card">
                  <img src="/images/kidney/madera-clinic.jpg" alt="Madera Clinic Facility" />
                  <div>
                    <strong>Madera County Clinic</strong>
                    <p>509 S I St, Madera, CA 93638</p>
                    <span>Direct: (559) 673-5196 · Fax: (559) 673-5197</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {project.id === 'big-bros-dumpster-rental' && (
            <div className="case-real-spotlight">
              <p className="eyebrow">FAMILY-OWNED CENTRAL VALLEY HAULERS</p>
              <h3 className="preserve-lines">Jessica & William Maldonado Ramirez</h3>
              <div className="case-family-showcase">
                <img
                  src="/images/bigbros/family-photo.webp"
                  alt="Jessica & William Maldonado Ramirez and Family"
                  className="case-family-img"
                />
                <div className="case-family-story">
                  <h4>Clovis & Fresno's Trusted Dumpster Service</h4>
                  <p>
                    William and Jessica founded Big Bros Dumpster Rentals to provide Clovis homeowners, roofers, and
                    general contractors with an honest, reliable waste partner without nationwide broker surcharges.
                  </p>
                  <ul className="case-check-list">
                    <li><Check size={14} color="#ea580c" /> Flat 7-day rentals ($399 for 14-Yard / $499 for 20-Yard)</li>
                    <li><Check size={14} color="#ea580c" /> Heavy wood boards under every roll-off to protect driveways</li>
                    <li><Check size={14} color="#ea580c" /> Bilingual direct Spanish & English telephone dispatch</li>
                  </ul>
                  <div className="case-job-strip">
                    <img src="/images/bigbros/job-driveway.webp" alt="Clean driveway drop-off" />
                    <img src="/images/bigbros/big-bros-rolloff.png" alt="Big Bros roll-off truck" />
                    <img src="/images/bigbros/job-loaded.webp" alt="Loaded contractor dumpster" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="case-idea" style={{ backgroundColor: project.color, color: project.ink }}>
            <p className="eyebrow">THE ARCHITECTURE</p>
            <h3>{project.idea}</h3>
            <div>
              {project.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
          </div>

          <button
            className="text-link case-digital-link"
            onClick={() => {
              setTab('digital');
              document.querySelector('.case-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Explore live interactive components <ArrowUpRight size={19} />
          </button>
        </div>
      ) : (
        <div id="digital-panel" className="digital-panel" role="tabpanel" aria-labelledby="digital-tab" tabIndex={0}>
          <div className="preview-toolbar">
            <p className="eyebrow">RESPONSIVE LIVE COMPONENTS & DIRECTION</p>
            <div className="viewport-controls" role="group" aria-label="Preview width">
              <button
                onClick={() => setViewport('desktop')}
                aria-pressed={viewport === 'desktop'}
                aria-label="Desktop preview"
              >
                <Monitor size={18} />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setViewport('mobile')}
                aria-pressed={viewport === 'mobile'}
                aria-label="Mobile preview"
              >
                <Smartphone size={17} />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <div className="preview-stage">
            <motion.div
              layout
              className={`website-preview ${viewport === 'mobile' ? 'is-mobile' : ''}`}
              transition={{ duration: 0.35 }}
            >
              {project.id === 'kidney-specialist' && <KidneyPreview isMobile={viewport === 'mobile'} />}
              {project.id === 'big-bros-dumpster-rental' && <BigBrosPreview isMobile={viewport === 'mobile'} />}
              {project.id === 'clovis-flagship' && <StudioPreview isMobile={viewport === 'mobile'} />}
            </motion.div>
          </div>
          <p className="preview-caption">
            Interactive client components running in-engine. Switch between Desktop and Mobile perspectives above to test responsive layout dynamics.
          </p>
        </div>
      )}

      <div className="case-footer">
        <button className="text-link" onClick={onContact}>
          Have something in mind? <ArrowUpRight size={18} />
        </button>
        <button className="next-project" onClick={onNext}>
          <span className="eyebrow">UP NEXT</span>
          <span>{nextProject.name}<ArrowRight size={24} /></span>
        </button>
      </div>
    </article>
  );
}