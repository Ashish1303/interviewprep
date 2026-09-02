import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ReactFundamentalsPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('react-fundamentals');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
