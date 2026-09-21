import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { type Project } from '../data';

type ProjectDialogProps = {
  project: Project;
  nextProject: Project;
  onNext: () => void;
  onContact: () => void;
};

export function ProjectDialog({ project, nextProject, onNext, onContact }: ProjectDialogProps) {
  const [tab, setTab] = useState<'story' | 'digital'>('story');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewExpanded, setPreviewExpanded] = useState(false);

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
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline flex items-center gap-1 font-mono text-xs">
              {project.url.replace('https://', '')} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="case-tabs" role="tablist" aria-label="Project view" onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 'story' : event.key === 'End' ? 'digital' : tab === 'story' ? 'digital' : 'story';
        setTab(next);
        document.getElementById(`${next}-tab`)?.focus();
      }}>
        <button id="story-tab" role="tab" aria-controls={tab === 'story' ? 'story-panel' : undefined} aria-selected={tab === 'story'} tabIndex={tab === 'story' ? 0 : -1} onClick={() => setTab('story')}>The story <span>01</span></button>
        <button id="digital-tab" role="tab" aria-controls={tab === 'digital' ? 'digital-panel' : undefined} aria-selected={tab === 'digital'} tabIndex={tab === 'digital' ? 0 : -1} onClick={() => setTab('digital')}>Digital direction <span>02</span></button>
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
              {project.services.map((service) => <span key={service}>{service}</span>)}
              <p className="case-note">Self-initiated exploration.<br />An original brand, built from an idea.</p>
            </div>
          </div>
          <div className="case-idea" style={{ backgroundColor: project.color, color: project.ink }}>
            <p className="eyebrow">THE IDEA</p>
            <h3>{project.idea}</h3>
            <div>{project.details.map((detail) => <p key={detail}>{detail}</p>)}</div>
          </div>
          <button className="text-link case-digital-link" onClick={() => {
            setTab('digital');
            document.querySelector('.case-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>See the digital direction <ArrowUpRight size={19} /></button>
        </div>
      ) : (
        <div id="digital-panel" className="digital-panel" role="tabpanel" aria-labelledby="digital-tab" tabIndex={0}>
          <div className="preview-toolbar">
            <p className="eyebrow">A RESPONSIVE FIRST IMPRESSION</p>
            <div className="viewport-controls" role="group" aria-label="Preview width">
              <button onClick={() => setViewport('desktop')} aria-pressed={viewport === 'desktop'} aria-label="Desktop preview"><Monitor size={18} /><span>Desktop</span></button>
              <button onClick={() => setViewport('mobile')} aria-pressed={viewport === 'mobile'} aria-label="Mobile preview"><Smartphone size={17} /><span>Mobile</span></button>
            </div>
          </div>
          <div className="preview-stage">
            <motion.div layout className={`website-preview ${viewport === 'mobile' ? 'is-mobile' : ''}`} style={{ backgroundColor: project.color, color: project.ink }} transition={{ duration: 0.4 }}>
              <div className="preview-nav"><strong>{project.name}</strong><span>Good things, thoughtfully made.</span></div>
              <div className="preview-hero">
                <div className="preview-copy">
                  <p className="eyebrow">A FRESH PERSPECTIVE</p>
                  <h3 className="preserve-lines">{project.previewHeadline}</h3>
                  <p>{project.previewDescription}</p>
                  <button style={{ color: project.ink, borderColor: project.ink }} onClick={() => setPreviewExpanded(!previewExpanded)} aria-expanded={previewExpanded}>
                    {previewExpanded ? 'A little less' : project.previewAction}<ArrowRight size={17} />
                  </button>
                </div>
                <img src={project.image} alt={project.alt} />
              </div>
              {previewExpanded && <div className="preview-expanded"><h4>{project.idea}</h4><p>{project.details[0]}</p><span>Thoughtfully made. Unmistakably {project.name}.</span></div>}
              <div className="preview-bottom"><span>Made with intention.</span><span>{project.year}</span></div>
            </motion.div>
          </div>
          <p className="preview-caption">An interactive design exploration. Switch perspectives, then take a closer look.</p>
        </div>
      )}

      <div className="case-footer">
        <button className="text-link" onClick={onContact}>Have something in mind? <ArrowUpRight size={18} /></button>
        <button className="next-project" onClick={onNext}><span className="eyebrow">UP NEXT</span><span>{nextProject.name}<ArrowRight size={24} /></span></button>
      </div>
    </article>
  );
}