import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ComponentLifecyclePage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('component-lifecycle');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
