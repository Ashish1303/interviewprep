import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ErrorBoundariesPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('error-boundaries');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
