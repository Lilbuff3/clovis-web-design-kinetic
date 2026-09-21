import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Download, ArrowLeft, Send } from 'lucide-react';
import { site } from '../data';
import { Flower } from './Flower';

export type ContactDraft = {
  name: string;
  email: string;
  project: string;
  budget: string;
  message: string;
};

type ContactDialogProps = {
  draft: ContactDraft;
  onChange: (draft: ContactDraft) => void;
};

export function ContactDialog({ draft, onChange }: ContactDialogProps) {
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [formError, setFormError] = useState('');
  const update = (key: keyof ContactDraft, value: string) => {
    setFormError('');
    onChange({ ...draft, [key]: value });
  };
  const brief = `A GOOD START / OTHERLY.\n\nName: ${draft.name.trim()}\nEmail: ${draft.email.trim()}\nProject: ${draft.project}\nBudget: ${draft.budget || 'Let\'s work it out'}\n\nTHE IDEA\n${draft.message.trim()}\n\nCreated with the otherly. project brief builder.`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft.message.trim().length < 10) {
      setFormError('Tell me a little more about your idea. Please use at least 10 characters, not counting extra spaces.');
      event.currentTarget.querySelector('textarea')?.focus();
      return;
    }
    setReady(true);
    setTimeout(() => document.querySelector<HTMLElement>('.brief-ready-heading')?.focus(), 50);
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };

  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `otherly-project-brief-${draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'hello'}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="contact-content">
      <p className="eyebrow">A GOOD THING WAITING TO HAPPEN</p>
      {!ready ? (
        <>
          <h2 id="contact-title">It starts with<br /><em>hello.</em><Flower className="contact-flower" /></h2>
          <p className="contact-intro">Big idea, small question, or a blank page.<br />I'd love to hear what you're thinking.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label>Your name<input autoComplete="name" name="name" placeholder="The name I should know" value={draft.name} onChange={(event) => update('name', event.target.value)} required maxLength={100} pattern=".*\S.*" /></label>
              <label>Email address<input autoComplete="email" type="email" name="email" placeholder="you@somewhere.good" value={draft.email} onChange={(event) => update('email', event.target.value)} required maxLength={200} /></label>
            </div>
            <div className="form-row">
              <label>What are we making?<select name="project" value={draft.project} onChange={(event) => update('project', event.target.value)}><option>A brand & a website</option><option>A thoughtful website</option><option>A memorable brand</option><option>Something a little otherly</option></select></label>
              <label><span>A ballpark budget <span className="optional">(optional)</span></span><select name="budget" value={draft.budget} onChange={(event) => update('budget', event.target.value)}><option value="">Let's work it out</option><option>$3,000 - $5,000</option><option>$5,000 - $10,000</option><option>$10,000 - $20,000</option><option>$20,000+</option></select></label>
            </div>
            <label>A little about your idea<textarea name="message" rows={3} placeholder="The what, the why, the wild ambition..." value={draft.message} onChange={(event) => update('message', event.target.value)} required minLength={10} maxLength={4000} aria-invalid={Boolean(formError)} aria-describedby={formError ? 'contact-error' : undefined} /></label>
            {formError && <p className="form-error" id="contact-error" role="alert">{formError}</p>}
            <div className="form-bottom"><p>{site.email ? 'Create a brief, then open it in your email app. Nothing is sent automatically.' : 'A portfolio concept, a real starting point. Create a brief to copy or download. Nothing is sent.'}</p><button className="button button-dark" type="submit">Create my brief <ArrowUpRight size={19} /></button></div>
          </form>
        </>
      ) : (
        <div className="brief-ready">
          <Flower className="brief-flower" />
          <h2 id="contact-title" className="brief-ready-heading" tabIndex={-1}>A good<br /><em>beginning.</em></h2>
          <p>Thanks for putting your idea into words, {draft.name.trim().split(/\s+/)[0]}. Your project brief is ready to take with you.</p>
          <div className="brief-preview"><span className="eyebrow">YOUR PROJECT BRIEF</span><h3>{draft.project}</h3><p>{draft.message}</p><span>{draft.name} / {draft.email}</span></div>
          <div className="brief-actions">
            <button className="button button-dark" onClick={copyBrief}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Brief copied' : 'Copy brief'}</button>
            <button className="button button-outline" onClick={downloadBrief}><Download size={17} />Download .txt</button>
            {site.email && <a className="button button-outline" href={`mailto:${site.email}?subject=${encodeURIComponent(`A good idea from ${draft.name}`)}&body=${encodeURIComponent(brief)}`}><Send size={17} />Open email draft</a>}
          </div>
          <p className="brief-status" role="status">{copyError ? 'Clipboard access is unavailable. You can download your brief instead.' : copied ? 'Copied to your clipboard, ready to share. No message has been sent.' : 'Your details stay in this browser. No message has been sent.'}</p>
          <button className="text-link" onClick={() => { setReady(false); setCopied(false); }}><ArrowLeft size={17} />Back to my idea</button>
        </div>
      )}
    </div>
  );
}