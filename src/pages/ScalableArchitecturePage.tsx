import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ScalableArchitecturePage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('scalable-architecture');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
