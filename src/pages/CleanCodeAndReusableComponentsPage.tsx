import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function CleanCodeAndReusableComponentsPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('clean-code-and-reusable-components');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
