import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ListsAndKeysPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('lists-and-keys');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
