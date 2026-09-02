import { getTopic } from '../data/topics';
import { TopicDetailPage, type TopicPageProps } from '../components/TopicDetailPage';

export function SsrCsrReactServerComponentsPage({ completed, onToggleComplete }: TopicPageProps) {
  const topic = getTopic('ssr-csr-react-server-components');

  return <TopicDetailPage topic={topic} completed={completed} onToggleComplete={onToggleComplete} />;
}
