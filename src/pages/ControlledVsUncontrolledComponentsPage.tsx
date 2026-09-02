import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ControlledVsUncontrolledComponentsPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('controlled-vs-uncontrolled-components');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
