export type Creator = {
  name: string;
  tag: string;
  note: string;
  image: string;
};

export const CREATORS: Creator[] = [
  { name: 'Donna D\u2019Errico', tag: 'Pods', note: 'Live host', image: '/generated/creator-orb-pink.png' },
  { name: 'Hawk Tuah AI', tag: 'Pods', note: '400M+ views', image: '/generated/creator-orb-magenta.jpg' },
  { name: 'Tracy Brighman', tag: 'Faith', note: 'Pray With You', image: '/generated/creator-orb-white.jpg' },
  { name: 'Untitled Creator', tag: 'Books', note: 'Coming', image: '/generated/creator-orb-gold.jpg' },
  { name: 'Untitled Creator', tag: 'Pods', note: 'Coming', image: '/generated/creator-orb-blue.jpg' },
  { name: 'Untitled Creator', tag: 'Books', note: 'Coming', image: '/generated/creator-orb-cyan.jpg' }
];

export const PRESS = ['Fox News', 'Hollywood Reporter', 'TechCrunch', 'People', 'Podnews'];

export const METRICS = [
  { value: '400M+', label: 'Organic views' },
  { value: '20+', label: 'Creators signed' },
  { value: '24', label: 'Months profitable' },
  { value: '#1', label: 'Real-time AI in Hollywood' }
];

export const FAQ = [
  {
    q: 'What is Ultimate AI?',
    a: 'A platform for creators to own, deploy, and monetize their AI selves. Think Full Name, Image, and Likeness in real time. Voice, video, personality, scaled.'
  },
  {
    q: 'What does \u201Cpodcasts you can join\u201D mean?',
    a: 'Open the app, join an episode in progress, and speak. The hosts hear you. They respond in their actual voices. The conversation continues with you in it.'
  },
  {
    q: 'How do books work?',
    a: 'Open a chapter. Hit pause. Ask the author a question. Hear them answer. Resume reading. The book remembers what you talked about.'
  },
  {
    q: 'For creators?',
    a: 'We replicate voice, likeness, and worldview, then deploy across pods, books, and direct chat. You own the persona. We handle the infrastructure.'
  }
];
