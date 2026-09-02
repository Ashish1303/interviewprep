import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

type LearningTrack = {
  name: string;
  eyebrow: string;
  description: string;
  route: string;
  icon: string;
  accent: string;
  topics: string;
};

const tracks: LearningTrack[] = [
  { name: 'React', eyebrow: 'Frontend library', description: 'Build a confident mental model for components, hooks, state, rendering, and architecture.', route: '/react', icon: '⚛', accent: 'react', topics: '30 topics' },
  { name: 'JavaScript', eyebrow: 'Language essentials', description: 'Sharpen the language fundamentals behind every modern frontend interview.', route: '/javascript', icon: 'JS', accent: 'javascript', topics: '5 topics' },
  { name: 'Angular', eyebrow: 'Structured framework', description: 'Learn components, dependency injection, RxJS, routing, and testing patterns.', route: '/angular', icon: '△', accent: 'angular', topics: '5 topics' },
  { name: 'Node.js', eyebrow: 'Server-side runtime', description: 'Prepare for event loops, APIs, streams, security, and production scaling questions.', route: '/node-js', icon: '◆', accent: 'node', topics: '5 topics' },
];

export function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <Link className="landing-brand" to="/"><span className="landing-brand-mark">R</span><span>Interview Prep</span></Link>
        <div className="landing-nav-actions"><Link className="landing-playground-link" to="/playground">Code Playground <span>↗</span></Link><ThemeToggle /></div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-copy"><p className="eyebrow">A sharper way to prepare</p><h1>Know the answer.<br /><em>Own the interview.</em></h1><p className="landing-lede">A focused learning workspace for engineers who want to understand the why, explain the trade-offs, and build with confidence.</p><div className="landing-hero-actions"><Link className="primary-landing-action" to="/react">Start with React <span>→</span></Link><Link className="secondary-landing-action" to="/react/interview-questions">Browse questions</Link></div></div>
          <div className="landing-signal"><div className="signal-orbit orbit-one" /><div className="signal-orbit orbit-two" /><div className="signal-core"><span>R</span><small>READY</small></div><span className="signal-label signal-label-top">Learn</span><span className="signal-label signal-label-right">Practice</span><span className="signal-label signal-label-bottom">Ship</span></div>
        </section>

        <section className="tracks-section"><div className="section-heading"><div><p className="eyebrow">Choose your track</p><h2>Four paths. One stronger engineer.</h2></div><span className="track-count">04 <span>tracks</span></span></div><div className="track-grid">{tracks.map((track, index) => <Link className={`track-card track-${track.accent}`} to={track.route} key={track.name}><div className="track-card-top"><span className="track-index">0{index + 1}</span><span className="track-icon">{track.icon}</span></div><div className="track-card-content"><p className="track-eyebrow">{track.eyebrow}</p><h3>{track.name}</h3><p>{track.description}</p></div><div className="track-card-footer"><span>{track.topics}</span><span className="track-arrow">↗</span></div></Link>)}</div></section>

        <section className="landing-footer-band"><div><span className="footer-dot" /><strong>Built for deliberate practice</strong></div><span>Question → Understand → Explain</span><Link to="/playground">Open Code Playground <span>→</span></Link></section>
      </main>
    </div>
  );
}
