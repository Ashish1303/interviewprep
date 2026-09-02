import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function CustomHooksPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('custom-hooks');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
