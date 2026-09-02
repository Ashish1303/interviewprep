import type { Topic } from '../data/topics';

export type TopicPageProps = {
  completed: boolean;
  onToggleComplete: (slug: string) => void;
};

export function TopicDetailPage({
  topic,
  completed,
  onToggleComplete,
}: {
  topic: Topic;
  completed: boolean;
  onToggleComplete: (slug: string) => void;
}) {
  return (
    <article className="topic-page">
      <header className="topic-header">
        <div>
          <p className="eyebrow">React interview topic</p>
          <h1>{topic.title}</h1>
        </div>
        <button
          type="button"
          className={`status-toggle ${completed ? 'is-complete' : ''}`}
          onClick={() => onToggleComplete(topic.slug)}
          aria-pressed={completed}
        >
          {completed ? 'Completed' : 'Mark complete'}
        </button>
      </header>

      <p className="topic-summary">{topic.summary}</p>

      <div className="topic-grid detail-grid">
        <section className="content-card">
          <h2>Concept</h2>
          <p>{topic.summary}</p>
        </section>

        <section className="content-card">
          <h2>Why it matters</h2>
          <ul className="bullet-list">
            {topic.whyItMatters.map((item) => (
              <li key={item}>? {item}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2>Key interview questions</h2>
          <ul className="bullet-list">
            {topic.questions.map((item) => (
              <li key={item}>? {item}</li>
            ))}
          </ul>
        </section>

        <section className="content-card code-card">
          <h2>Practical example</h2>
          <pre><code>{topic.code}</code></pre>
        </section>

        <section className="content-card">
          <h2>Common mistakes</h2>
          <ul className="bullet-list">
            {topic.commonMistakes.map((item) => (
              <li key={item}>? {item}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2>Senior-level interview tips</h2>
          <ul className="bullet-list">
            {topic.seniorTips.map((item) => (
              <li key={item}>? {item}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2>Real-world use case</h2>
          <p>{topic.useCase}</p>
        </section>
      </div>
    </article>
  );
}
