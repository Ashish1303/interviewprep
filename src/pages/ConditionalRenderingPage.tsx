import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ConditionalRenderingPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('conditional-rendering');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
