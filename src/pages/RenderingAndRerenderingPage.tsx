import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function RenderingAndRerenderingPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('rendering-and-rerendering');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
