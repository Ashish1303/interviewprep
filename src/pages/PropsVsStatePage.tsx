import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function PropsVsStatePage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('props-vs-state');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
