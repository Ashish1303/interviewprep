import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function FormsAndValidationPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('forms-and-validation');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
