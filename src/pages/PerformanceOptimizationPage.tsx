import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function PerformanceOptimizationPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('performance-optimization');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
