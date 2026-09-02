import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function ComponentCompositionPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('component-composition');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
