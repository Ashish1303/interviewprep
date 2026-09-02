import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function TypescriptWithReactPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('typescript-with-react');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
