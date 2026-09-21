import type { CSSProperties } from 'react';

type FlowerProps = {
  className?: string;
  style?: CSSProperties;
};

export function Flower({ className = '', style }: FlowerProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <g fill="currentColor">
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x="40" y="4" width="20" height="51" rx="10" transform={`rotate(${i * 60} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="6" fill="var(--flower-center, var(--paper))" />
    </svg>
  );
}