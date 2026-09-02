import { useEffect, useState } from 'react';
import type { Topic } from '../data/topics';
import { reactInterviewQuestions, type ReactInterviewQuestion } from '../data/reactInterviewQuestions';

export type TopicPageProps = {
  completed: boolean;
  onToggleComplete: (slug: string) => void;
};

type TopicDetailProps = TopicPageProps & {
  topic: Topic;
  previousTopic?: Topic;
  nextTopic?: Topic;
  onNavigate?: (slug: string) => void;
};

function getInterviewQuestion(topic: Topic): ReactInterviewQuestion {
  const questionIdsBySlug: Record<string, number> = {
    'react-fundamentals': 1,
    hooks: 10,
    'props-vs-state': 9,
    'controlled-vs-uncontrolled-components': 15,
    'lists-and-keys': 7,
    'component-composition': 6,
    'reconciliation-and-virtual-dom': 13,
    'rendering-and-rerendering': 3,
    'react-memo-usememo-usecallback': 17,
    'typescript-with-react': 22,
  };
  const mappedId = questionIdsBySlug[topic.slug];
  if (mappedId) return reactInterviewQuestions.find((item) => item.id === mappedId) ?? reactInterviewQuestions[0];
  const topicWords = topic.title.toLowerCase().split(/\s+/).filter((word) => word.length > 3);
  return reactInterviewQuestions.find((item) =>
    topicWords.some((word) => item.question.toLowerCase().includes(word) || item.topic?.toLowerCase().includes(word)),
  ) ?? reactInterviewQuestions[0];
}

export function TopicDetailPage({ topic, completed, onToggleComplete, previousTopic, nextTopic, onNavigate }: TopicDetailProps) {
  const interviewQuestion = getInterviewQuestion(topic);
  const [bookmarked, setBookmarked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('interview-bookmarks') ?? '[]').includes(topic.slug); } catch { return false; }
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const bookmarks: string[] = JSON.parse(localStorage.getItem('interview-bookmarks') ?? '[]');
      localStorage.setItem('interview-bookmarks', JSON.stringify(bookmarked ? [...new Set([...bookmarks, topic.slug])] : bookmarks.filter((slug) => slug !== topic.slug)));
    } catch { /* Storage is optional. */ }
  }, [bookmarked, topic.slug]);

  useEffect(() => {
    try { setBookmarked(JSON.parse(localStorage.getItem('interview-bookmarks') ?? '[]').includes(topic.slug)); } catch { setBookmarked(false); }
    setCopied(false);
  }, [topic.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') onToggleComplete(topic.slug);
      if (event.altKey && event.key === 'ArrowLeft' && previousTopic) onNavigate?.(previousTopic.slug);
      if (event.altKey && event.key === 'ArrowRight' && nextTopic) onNavigate?.(nextTopic.slug);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextTopic, onNavigate, onToggleComplete, previousTopic, topic.slug]);

  const copyCode = async () => {
    await navigator.clipboard?.writeText(topic.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="topic-page premium-topic-page">
      <header className="topic-header premium-topic-header">
        <div><p className="eyebrow">Interview question · {topic.title}</p><h1>{interviewQuestion.question}</h1><p className="topic-kicker">A concise answer you can explain with confidence.</p></div>
        <div className="topic-actions"><button type="button" className={`bookmark-button ${bookmarked ? 'is-bookmarked' : ''}`} onClick={() => setBookmarked((value: boolean) => !value)} aria-pressed={bookmarked} title="Bookmark this question"><span aria-hidden="true">{bookmarked ? '★' : '☆'}</span> {bookmarked ? 'Saved' : 'Save'}</button><button type="button" className={`status-toggle ${completed ? 'is-complete' : ''}`} onClick={() => onToggleComplete(topic.slug)} aria-pressed={completed}>{completed ? '✓ Completed' : 'Mark complete'}</button></div>
      </header>

      <section className="answer-card"><div className="section-label"><span className="answer-icon">A</span><span>Interview-ready answer</span></div><p>{interviewQuestion.answer}</p>{interviewQuestion.modernNote && <p className="modern-note"><strong>Modern note:</strong> {interviewQuestion.modernNote}</p>}</section>
      <section className="content-card description-card"><div className="section-label"><span>01</span><span>Description</span></div><p>{topic.summary}</p><ul className="insight-list">{topic.whyItMatters.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></section>
      <section className="visual-card" aria-label="Concept flow"><div className="section-label"><span>02</span><span>How to think about it</span></div><div className="concept-flow"><div><strong>Input</strong><span>Requirements</span></div><i>→</i><div className="flow-focus"><strong>Concept</strong><span>{topic.title}</span></div><i>→</i><div><strong>Output</strong><span>Predictable UI</span></div></div></section>
      <section className="code-preview-card"><div className="code-card-header"><div><div className="section-label"><span>03</span><span>Syntax-highlighted example</span></div><span className="code-filename">example.{topic.slug.includes('typescript') ? 'ts' : 'tsx'}</span></div><button type="button" className="copy-code-button" onClick={copyCode}>{copied ? '✓ Copied' : 'Copy code'}</button></div><pre><code>{interviewQuestion.example ? (typeof interviewQuestion.example === 'string' ? interviewQuestion.example : interviewQuestion.example.jsx ?? interviewQuestion.example.javascript ?? topic.code) : topic.code}</code></pre></section>
      <div className="output-grid"><section className="output-card"><div className="section-label"><span>04</span><span>Expected output</span></div><pre>{topic.useCase}</pre>{interviewQuestion.benefits && <ul className="compact-points">{interviewQuestion.benefits.map((benefit) => <li key={benefit}>+ {benefit}</li>)}</ul>}</section><section className="key-point-card"><div className="section-label"><span>05</span><span>Key interview point</span></div><p>{topic.seniorTips[0] ?? 'Explain the trade-off and connect the concept to a real product decision.'}</p></section></div>
      <section className="content-card mistakes-card"><div className="section-label"><span>06</span><span>Watch out for</span></div><ul className="insight-list">{topic.commonMistakes.map((item) => <li key={item}><span>!</span>{item}</li>)}</ul></section>
      <nav className="topic-pagination" aria-label="Question navigation"><button type="button" disabled={!previousTopic} onClick={() => previousTopic && onNavigate?.(previousTopic.slug)}><span>←</span><small>Previous</small><strong>{previousTopic?.title ?? 'First question'}</strong></button><span className="pagination-rule" /><button type="button" disabled={!nextTopic} onClick={() => nextTopic && onNavigate?.(nextTopic.slug)}><small>Next</small><strong>{nextTopic?.title ?? 'Last question'}</strong><span>→</span></button></nav>
    </article>
  );
}
