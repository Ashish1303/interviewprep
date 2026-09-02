import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ReactRouterPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('react-router');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
