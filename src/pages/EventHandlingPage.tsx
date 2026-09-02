import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function EventHandlingPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('event-handling');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
