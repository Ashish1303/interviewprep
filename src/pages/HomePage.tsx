import { TopicCard } from '../components/TopicCard';
import { topics } from '../data/topics';

type HomePageProps = {
  query: string;
  completed: string[];
};

export function HomePage({ query, completed }: HomePageProps) {
  const filteredTopics = topics.filter((topic) => {
    const search = query.trim().toLowerCase();
    if (!search) return true;
    return (
      topic.title.toLowerCase().includes(search) ||
      topic.summary.toLowerCase().includes(search) ||
      topic.questions.some((question) => question.toLowerCase().includes(search))
    );
  });

  return (
    <div className="home-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Preparation platform</p>
          <h1>React Interview Playbook</h1>
        </div>
        <div className="stat-card">
          <strong>{completed.length}</strong>
          <span>topics complete</span>
        </div>
      </header>

      <section className="hero-panel">
        <p className="eyebrow accent">Senior-focused</p>
        <h2>Master the React topics hiring teams actually test.</h2>
        <p>
          Review the concepts that matter in mid-to-senior interviews: hooks, state, performance,
          routing, testing, architecture, and real-world debugging trade-offs.
        </p>
      </section>

      <section className="topic-grid home-grid">
        {filteredTopics.length ? (
          filteredTopics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} isComplete={completed.includes(topic.slug)} />
          ))
        ) : (
          <div className="empty-state">
            <h3>No topics match your search.</h3>
            <p>Try a topic like ?hooks?, ?performance?, or ?router?.</p>
          </div>
        )}
      </section>
    </div>
  );
}
