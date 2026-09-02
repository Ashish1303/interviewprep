import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function RealWorldReactInterviewScenariosPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('real-world-react-interview-scenarios');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
