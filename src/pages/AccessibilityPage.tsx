import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function AccessibilityPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('accessibility');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
