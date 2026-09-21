import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  className?: string;
};

export function Dialog({ children, onClose, labelledBy, className = '' }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const reducedMotion = useReducedMotion();
  closeRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;
    const app = document.getElementById('root');
    app?.setAttribute('inert', '');

    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLButtonElement>('[data-dialog-close]')?.focus();
    }, 40);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;
      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]',
      ) ?? []).filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !panelRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panelRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      app?.removeAttribute('inert');
      const restoreTarget = previouslyFocused?.isConnected && previouslyFocused !== document.body
        ? previouslyFocused
        : app?.querySelector<HTMLElement>('a[href], button');
      restoreTarget?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    panelRef.current?.querySelector<HTMLButtonElement>('[data-dialog-close]')?.focus();
  }, [labelledBy]);

  return createPortal(
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.22 }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <motion.div
        ref={panelRef}
        className={`dialog-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={{ y: reducedMotion ? 0 : 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reducedMotion ? 0 : 18, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="icon-button dialog-close" onClick={onClose} aria-label="Close dialog" data-dialog-close>
          <X size={22} strokeWidth={1.6} />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}