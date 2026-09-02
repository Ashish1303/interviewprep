import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ReconciliationAndVirtualDomPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('reconciliation-and-virtual-dom');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
