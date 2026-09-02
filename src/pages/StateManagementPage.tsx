import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function StateManagementPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('state-management');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
