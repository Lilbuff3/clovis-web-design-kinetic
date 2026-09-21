import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Menu, Minus, Plus, X } from 'lucide-react';
import { approach, projects, site, type Project } from './data';
import { Flower } from './components/Flower';
import { Dialog } from './components/Dialog';
import { ProjectDialog } from './components/ProjectDialog';
import { ContactDialog, type ContactDraft } from './components/ContactDialog';
import { MotionStudy } from './components/MotionStudy';

type OpenDialog = { type: 'project'; index: number } | { type: 'contact' } | { type: 'colophon' } | null;

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function ProjectLink({ project, onClick, wide = false }: { project: Project; onClick: () => void; wide?: boolean }) {
  return (
    <button className={`project-card ${wide ? 'project-card--wide' : ''}`} onClick={onClick} aria-label={`Explore ${project.name}, ${project.category}`} aria-haspopup="dialog">
      <div className="project-media" style={{ backgroundColor: project.color }}>
        <img src={project.image} alt={project.alt} loading="lazy" width={1376} height={1024} />
        <span className="project-hover" aria-hidden="true">Take a look<ArrowUpRight size={20} /></span>
      </div>
      <div className="project-copy">
        {wide && <p className="extra-project-headline">A daily ritual.<br /><em>A shared purpose.</em></p>}
        <div className="project-title-row"><h3>{project.name}</h3><span className="project-arrow"><ArrowUpRight size={22} strokeWidth={1.5} /></span></div>
        <div className="project-details"><span>{project.category}</span><span>{project.year}</span></div>
        {wide && <p className="extra-project-description">{project.description}</p>}
      </div>
    </button>
  );
}

export default function App() {
  const [dialog, setDialog] = useState<OpenDialog>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [openApproach, setOpenApproach] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('');
  const [draft, setDraft] = useState<ContactDraft>({ name: '', email: '', project: 'A brand & a website', budget: '', message: '' });
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const springX = useSpring(imageX, { stiffness: 45, damping: 25 });
  const springY = useSpring(imageY, { stiffness: 45, damping: 25 });

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main section[id]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  const openContact = () => { setMenuOpen(false); setDialog({ type: 'contact' }); };
  const closeDialog = () => setDialog(null);
  const navigateTo = () => setMenuOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Clovis Web Design home" onClick={navigateTo}><Flower className="brand-flower" /><span>cloviswebdesign.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className={activeSection === 'work' ? 'is-active' : ''} href="#work">Work<span className="nav-dot" /></a>
          <a className={activeSection === 'about' ? 'is-active' : ''} href="#about">About<span className="nav-dot" /></a>
          <a className={activeSection === 'play' ? 'is-active' : ''} href="#play">Play<span className="nav-dot" /></a>
        </nav>
        <button className="header-contact" onClick={openContact} aria-haspopup="dialog">Let's talk<ArrowUpRight size={18} strokeWidth={1.5} /></button>
        <button ref={menuButtonRef} className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} /> : <Menu size={25} />}</button>
        <AnimatePresence>
          {menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <a href="#work" onClick={navigateTo}><span>01</span>Work<ArrowUpRight /></a>
            <a href="#about" onClick={navigateTo}><span>02</span>About<ArrowUpRight /></a>
            <a href="#play" onClick={navigateTo}><span>03</span>Play<ArrowUpRight /></a>
            <button onClick={openContact}>Got something in mind? Let's talk<ArrowUpRight size={19} /></button>
          </motion.nav>}
        </AnimatePresence>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title" onPointerMove={(event) => {
          if (reducedMotion || event.pointerType === 'touch') return;
          const rect = event.currentTarget.getBoundingClientRect();
          imageX.set(((event.clientX - rect.left) / rect.width - 0.5) * -12);
          imageY.set(((event.clientY - rect.top) / rect.height - 0.5) * -8);
        }} onPointerLeave={() => { imageX.set(0); imageY.set(0); }}>
          <motion.div className="hero-art" style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }} initial={{ scale: reducedMotion ? 1.02 : 1.065, opacity: 0 }} animate={{ scale: 1.02, opacity: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
            <img src="/images/otherly-hero.jpg" alt="Clovis Web Design digital craft and sculptural identity by Adam Youssef." width={1568} height={882} fetchPriority="high" />
          </motion.div>
          <div className="hero-wash" />
          <div className="hero-content">
            <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>CENTRAL VALLEY WEB ARCHITECTURE · CLOVISWEBDESIGN.COM</motion.p>
            <h1 id="hero-title" className="hero-title">
              <motion.span initial={{ opacity: 0, y: reducedMotion ? 0 : 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>Crafted by</motion.span>
              <motion.em initial={{ opacity: 0, y: reducedMotion ? 0 : 44 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>Adam Youssef.</motion.em>
            </h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.85 }}>
              <p>Fortune 500 craft. Main Street soul.<br />Direct craftsman delivery with 100% asset ownership.</p>
              <a className="button button-dark hero-cta" href="#work">Explore client work<ArrowDown size={18} strokeWidth={1.6} /></a>
            </motion.div>
          </div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <Reveal>
            <div className="section-topline"><p className="eyebrow">01 / SELECTED WORK</p><span className="eyebrow section-aside">PROVEN RESULTS. BESPOKE CRAFT.</span></div>
            <div className="section-heading"><h2 id="work-title">Flagships,<br /><em>built to convert.</em></h2><p>Nephrology clinics, local trade haulers, and digital homes<br className="desktop-break" /> that load in sub-seconds and dominate search.</p></div>
          </Reveal>
          <div className="projects-grid">
            {projects.slice(0, 2).map((project, index) => <Reveal key={project.id} delay={index * 0.09}><ProjectLink project={project} onClick={() => setDialog({ type: 'project', index })} /></Reveal>)}
          </div>
          <AnimatePresence initial={false}>
            {showMore && <motion.div id="more-projects" className="more-projects" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><ProjectLink project={projects[2]} wide onClick={() => setDialog({ type: 'project', index: 2 })} /></motion.div>}
          </AnimatePresence>
          <Reveal className="work-bottom"><p>High-ticket craft. Zero agency bloat.</p><button className="text-link" onClick={() => setShowMore(!showMore)} aria-expanded={showMore} aria-controls={showMore ? 'more-projects' : undefined}>{showMore ? 'Show less' : 'More studio projects'}{showMore ? <Minus size={17} /> : <Plus size={17} />}</button></Reveal>
        </section>

        <section className="about-section section-shell" id="about" aria-labelledby="about-title">
          <div className="about-grid">
            <Reveal className="about-left"><p className="eyebrow">02 / THE CRAFTSMAN</p><div className="about-art" aria-hidden="true"><Flower className="about-flower" /><svg viewBox="0 0 340 340" className="about-orbit"><defs><path id="orbit-path" d="M170,170 m-140,0 a140,140 0 1,1 280,0 a140,140 0 1,1 -280,0" /></defs><text><textPath href="#orbit-path" startOffset="0%" textLength="879" lengthAdjust="spacing">FORTUNE 500 CRAFT. MAIN STREET SOUL. FORTUNE 500 CRAFT. MAIN STREET SOUL. </textPath></text></svg></div><p className="about-signature">Adam Youssef · Clovis Web Design<br />cloviswebdesign.com</p></Reveal>
            <div className="about-right">
              <Reveal><h2 id="about-title">Direct craft.<br />Zero <em>agency bloat.</em></h2><p className="about-intro">I'm {site.designer}, the founder and lead engineer behind cloviswebdesign.com.<br className="desktop-break" /> I build sub-second, high-converting digital flagships for premier local businesses.</p><p className="about-description">When you work with me, you speak directly with the craftsman writing the code. No 14-person Zoom meetings, no $180k markups, no hostage hosting. Just honest Central Valley grit and world-class engineering.</p></Reveal>
              <div className="approach-list">
                {approach.map((item, index) => <Reveal key={item.title} delay={index * 0.05}><div className={`approach-item ${openApproach === index ? 'is-open' : ''}`}><h3><button id={`approach-trigger-${index}`} aria-expanded={openApproach === index} aria-controls={openApproach === index ? `approach-content-${index}` : undefined} onClick={() => setOpenApproach(openApproach === index ? null : index)}><span className="eyebrow">0{index + 1}</span><span>{item.title}</span>{openApproach === index ? <Minus size={20} strokeWidth={1.4} /> : <Plus size={20} strokeWidth={1.4} />}</button></h3><AnimatePresence initial={false}>{openApproach === index && <motion.div id={`approach-content-${index}`} role="region" aria-labelledby={`approach-trigger-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><p>{item.text}</p></motion.div>}</AnimatePresence></div></Reveal>)}
              </div>
            </div>
          </div>
        </section>

        <section id="play" className="play-section section-shell" aria-labelledby="play-title">
          <Reveal><div className="section-topline"><p className="eyebrow">03 / PERFORMANCE LAB</p><span className="eyebrow section-aside">INTERACTIVE LABS. ZERO LOREM IPSUM.</span></div><div className="section-heading"><h2 id="play-title">Modern physics,<br /><em>sub-second speed.</em></h2><p>Interactive motion rendered at 60fps<br />with zero bloat.</p></div></Reveal>
          <Reveal><MotionStudy /></Reveal>
        </section>

        <section id="contact" className="contact-section section-shell" aria-labelledby="contact-section-title">
          <Reveal><p className="eyebrow">04 / START YOUR FLAGSHIP</p><div className="contact-section-main"><h2 id="contact-section-title">Ready for<br /><em>real results?</em></h2><div className="contact-invitation"><p>Serving Clovis, Fresno, and high-standard businesses nationwide.<br />Let's build a flagship your competitors can't ignore.</p><button className="contact-cta" onClick={openContact}><span>Let's talk</span><span className="contact-cta-arrow"><ArrowUpRight size={44} strokeWidth={1.2} /></span></button></div></div></Reveal>
          <footer className="site-footer"><a className="brand footer-brand" href="#top" aria-label="Clovis Web Design, back to top"><Flower className="brand-flower" /><span>cloviswebdesign.</span></a><p>&copy; {new Date().getFullYear()} cloviswebdesign.com · Adam Youssef. All rights reserved.</p><div><button className="footer-link" onClick={() => setDialog({ type: 'colophon' })}>Studio Colophon<ArrowUpRight size={14} /></button><a className="footer-link back-top" href="#top">Back to top<ArrowUp size={15} /></a></div></footer>
        </section>
      </main>

      <AnimatePresence>
        {dialog && <Dialog key="portfolio-dialog" onClose={closeDialog} labelledBy={dialog.type === 'project' ? 'project-title' : dialog.type === 'contact' ? 'contact-title' : 'colophon-title'} className={dialog.type === 'project' ? 'project-dialog' : dialog.type === 'contact' ? 'contact-dialog' : 'colophon-dialog'}>
          {dialog.type === 'project' && <ProjectDialog key={projects[dialog.index].id} project={projects[dialog.index]} nextProject={projects[(dialog.index + 1) % projects.length]} onContact={openContact} onNext={() => {
            setDialog({ type: 'project', index: (dialog.index + 1) % projects.length });
            requestAnimationFrame(() => {
              document.querySelector('.dialog-panel')?.scrollTo({ top: 0, behavior: 'instant' });
              document.getElementById('project-title')?.focus({ preventScroll: true });
            });
          }} />}
          {dialog.type === 'contact' && <ContactDialog draft={draft} onChange={setDraft} />}
          {dialog.type === 'colophon' && <div className="colophon-content"><p className="eyebrow">THE DETAILS BEHIND THE DETAILS</p><Flower className="colophon-flower" /><h2 id="colophon-title">Made with<br /><em>curiosity.</em></h2><p>This is otherly., an original portfolio concept for an independent designer with a different point of view.</p><dl><div><dt>The visual world</dt><dd>Custom-generated still-life artwork, a bespoke sculptural identity, and original, self-initiated project concepts. No stock photography or reference designs.</dd></div><div><dt>The moving parts</dt><dd>Built with React, TypeScript, and Motion. The playground is drawn live with Canvas and can synthesize an original six-second video entirely in your browser.</dd></div><div><dt>The type</dt><dd>Manrope for a clear head. Instrument Serif for a playful heart. A little DM Mono for the details.</dd></div><div><dt>Your privacy</dt><dd>No analytics, no cookies, and no contact submissions. Project briefs stay in this browser session unless you choose to copy or download them. Fonts are served by Google Fonts.</dd></div></dl><button className="text-link" onClick={closeDialog}>Back to the good stuff<ArrowRight size={18} /></button></div>}
        </Dialog>}
      </AnimatePresence>
    </MotionConfig>
  );
}
