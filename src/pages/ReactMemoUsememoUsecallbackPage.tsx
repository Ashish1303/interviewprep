import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ReactMemoUsememoUsecallbackPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('react-memo-usememo-usecallback');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
