export const site = {
  name: 'cloviswebdesign.',
  designer: 'Adam Youssef',
  domain: 'cloviswebdesign.com',
  email: 'adam@cloviswebdesign.com',
};

export type Project = {
  id: string;
  number: string;
  name: string;
  url: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  color: string;
  ink: string;
  headline: string;
  description: string;
  challenge: string;
  idea: string;
  details: string[];
  services: string[];
  previewHeadline: string;
  previewDescription: string;
  previewAction: string;
};

export const projects: Project[] = [
  {
    id: 'kidney-specialist',
    number: '01',
    name: 'Kidney Specialist Inc',
    url: 'https://kidneyspecialistinc.com',
    category: 'Medical Practice · Nephrology / CMS & WCAG 2.1 AA',
    year: '2026',
    image: '/images/kidney/fresno-clinic.jpg',
    alt: 'Kidney Specialist Inc medical clinic in Fresno, CA led by Dr. Sheikh Mohammad Masood and Dr. Mohammed Muhibbulla Siddiqui.',
    color: '#e8f0eb',
    ink: '#163323',
    headline: 'Zero HIPAA liability.\nAccessible clinical trust.',
    description: 'A bespoke, sub-second digital flagship for Dr. Masood & Dr. Siddiqui serving 8,400 vulnerable kidney patients across Fresno and Madera County.',
    challenge: 'How do you serve thousands of kidney patients without risking HIPAA privacy leaks through third-party contact widgets? Build an accessible, fax-first and direct-call architecture with zero third-party tracking.',
    idea: 'Clinical dignity and sub-second speed for patients aged 18 to 92.',
    details: [
      'Engineered for maximum accessibility (WCAG 2.1 AA) with high-contrast typography, zero-delay phone triage, and plain-English nephrology care guides.',
      'MedicalClinic JSON-LD schema integration for Madera (509 S I St) and Fresno (7005 N Maple Ave) locations, driving dominant local organic search visibility.',
    ],
    services: ['Medical Web Architecture', 'WCAG 2.1 AA Accessibility', 'CMS Compliance', 'Local Schema & SEO'],
    previewHeadline: 'Care that begins\nbefore the door opens.',
    previewDescription: 'Madera & Fresno premier nephrology practice. Visit kidneyspecialistinc.com',
    previewAction: 'Visit kidneyspecialistinc.com',
  },
  {
    id: 'big-bros-dumpster-rental',
    number: '02',
    name: 'Big Bros Dumpster Rentals',
    url: 'https://bigbrosdumpsterrental.com',
    category: 'Local Trade · Roll-Off Dumpster Haulers / Clovis & Fresno',
    year: '2026',
    image: '/images/bigbros/job-driveway.webp',
    alt: 'Big Bros Dumpster Rentals bright red roll-off dumpster placed cleanly on driveway in Clovis, CA.',
    color: '#fed7aa',
    ink: '#7c2d12',
    headline: 'Book in 60 seconds.\nFlat-rate, zero surprises.',
    description: 'A high-converting geo-radius digital presence for Jessica & William Maldonado Ramirez’s family-owned hauler in Clovis and Fresno.',
    challenge: 'Compete against predatory nationwide broker conglomerates by highlighting authentic local family ownership, instant flat-rate pricing, and dedicated geo-radius landing pages.',
    idea: 'Main Street speed meets modern digital craft.',
    details: [
      'Dedicated Geo-SEO radius pages for Clovis, Fresno, and Fig Garden that capture high-intent commercial and residential dumpster bookings.',
      'Bilingual English/Spanish trade copy, frictionless SMS and call dispatch, and verified 4.9/5 star contractor reviews front and center.',
    ],
    services: ['Geo-SEO & Radius Pages', 'Conversion Design', 'Bilingual Trade Copy', 'Google Business Profile 3-Pack'],
    previewHeadline: 'Clean drop-offs.\nTransparent rates.',
    previewDescription: 'Clovis & Fresno premier roll-off dumpster service. Visit bigbrosdumpsterrental.com',
    previewAction: 'Visit bigbrosdumpsterrental.com',
  },
  {
    id: 'clovis-flagship',
    number: '03',
    name: 'Clovis Web Design Studio',
    url: 'https://cloviswebdesign.com',
    category: 'Digital Flagships · Central Valley Web Architecture',
    year: '2026',
    image: '/images/hero-flagship.jpg',
    alt: 'Clovis Web Design studio digital flagship and Central Valley craftsmanship by Adam Youssef.',
    color: '#ede4d5',
    ink: '#221d17',
    headline: 'Fortune 500 craft.\nMain Street soul.',
    description: 'Bespoke web architecture engineered for business owners who refuse to rent bloated agency themes.',
    challenge: 'Dismantle the 14-person agency bloat, $100k markups, and hostage hosting that hold local businesses back.',
    idea: 'Direct craftsman delivery. 100% asset ownership on day one.',
    details: [
      'Sub-second load times, 100/100 Core Web Vitals on throttled mobile devices, and zero ongoing platform lock-in.',
      'Transparent scope calculators and fixed-fee delivery with direct communication with Adam Youssef.',
    ],
    services: ['Bespoke Web Design', 'Core Web Vitals 100/100', 'Local SEO & Schema', 'Direct Craftsman Delivery'],
    previewHeadline: 'Websites that work\nas hard as you do.',
    previewDescription: 'Clovis & Fresno Central Valley flagship. Visit cloviswebdesign.com',
    previewAction: 'Explore cloviswebdesign.com',
  },
];

export const approach = [
  {
    title: 'Listen closely.',
    text: 'Before pixels and code, Adam sits down with you. About your clients, your highest-margin service, and the revenue your website should be generating. No corporate jargon.',
  },
  {
    title: 'Design for revenue & speed.',
    text: 'I turn what makes your business trusted into a high-converting digital experience with sub-second page loads, accessible contrast, and zero fluff.',
  },
  {
    title: '100% ownership on day one.',
    text: 'Code, domain, copy, images, and analytics belong to you. No agency retainers holding your site hostage, no bloated plugins, no surprise hourly bills.',
  },
];