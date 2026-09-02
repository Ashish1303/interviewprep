import { Link } from 'react-router-dom';
import type { Topic } from '../data/topics';

type TopicCardProps = {
  topic: Topic;
  isComplete: boolean;
};

export function TopicCard({ topic, isComplete }: TopicCardProps) {
  return (
    <Link to={`/${topic.slug}`} className="topic-card" aria-label={`Open ${topic.title}`}>
      <div className="topic-card-header">
        <span className="topic-tag">{topic.title.split(' ')[0]}</span>
        {isComplete ? <span className="done-pill">?</span> : null}
      </div>
      <h3>{topic.title}</h3>
      <p>{topic.summary}</p>
      <div className="topic-card-footer">
        <span>{topic.questions.length} questions</span>
        <span>Open ?</span>
      </div>
    </Link>
  );
}
