import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function AdvancedPatternsPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('advanced-patterns');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
