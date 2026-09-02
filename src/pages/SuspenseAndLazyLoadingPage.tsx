import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function SuspenseAndLazyLoadingPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('suspense-and-lazy-loading');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
