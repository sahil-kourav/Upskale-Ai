export const navLinks = [
  { label: 'Overview', href: '#', active: true },
  { label: 'Features', href: '#features' },
  { label: 'Tech Stack', href: '#tech' },
];

export const heroData = {
  badges: ['AI Interview Platform'],
  headline: 'Prepare Better for',
  headlineAccent: 'Your Next Interview',
  body: 'An AI-powered platform that analyzes resumes, identifies skill gaps, and generates personalized interview preparation plans tailored to specific job roles.',
  ctaPrimary: 'View Demo',
  ctaSecondary: 'GitHub Repo',
  dashboardStats: {
    matchScore: '92%',
    status: 'On Track',
    keywords: '14/18',
    keywordsProgress: '78%',
    version: 'UpstackAI v1.0',
    nextTask: 'Waiting for resume upload...',
    codeLines: [
      { color: 'text-primary', text: 'Analyzing experience blocks...' },
      { color: 'text-on-surface-variant opacity-70', text: '> Found: React, Node.js, AWS' },
      { color: 'text-on-surface-variant opacity-70', text: '> Checking Job Description mismatch...' },
      { color: 'text-tertiary mt-2', text: '! Recommendation: Add Kubernetes experience.' },
    ],
  },
};



export const resumeAnalysisData = {
  scoreLabel: 'MATCH SCORE',
  score: '92',
  badges: [
    { label: 'ATS Friendly', style: 'bg-green-500/10 text-green-400 border border-green-500/20' },
    { label: 'Senior Level', style: 'bg-primary/10 text-primary border border-primary/20' },
    { label: 'Keyword Gap', style: 'bg-orange-500/10 text-orange-400 border border-orange-500/20' },
  ],
  panelTitle: 'AI Feedback Panel',
  panelIcon: 'verified',
  strengths: [
    'Strong full-stack architectural understanding evidenced by project descriptions.',
    'Quantified results (e.g., "reduced latency by 40%") provide high credibility.',
  ],
  weakAreas: [
    'Missing specific cloud infrastructure keywords (AWS Lambda, Terraform).',
    "Recent gap in leadership descriptions for the 'Staff' level intent.",
  ],
};

export const interviewOutputData = {
  headline: 'Generated Prep Roadmap',
  sub: 'Personalized study materials created from your analysis.',
  technical: {
    title: 'Technical Focus',
    count: '4 Questions',
    questions: [
      { text: '"Explain how you would scale a WebSocket-based notification system as seen in your Portfolio Project."', meta: 'Topic: System Design & Scalability', faded: false },
      { text: '"What are the trade-offs of using MongoDB over PostgreSQL for your specific data schema?"', meta: null, faded: true },
    ],
  },
  behavioral: {
    title: 'Behavioral Strategy',
    count: '3 Tips',
    tips: [
      { title: 'The STAR Method', body: "Frame your 'Legacy Migration' project using the STAR method to emphasize ownership." },
      { title: 'Leadership Marker', body: "Be prepared to discuss the 'Mentorship' aspect you briefly mentioned in your 2022 role." },
    ],
  },
};
