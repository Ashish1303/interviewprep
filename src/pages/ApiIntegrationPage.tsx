import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ApiIntegrationPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('api-integration');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
