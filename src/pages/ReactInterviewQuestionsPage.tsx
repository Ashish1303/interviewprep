import { useMemo, useState } from 'react';
import { reactInterviewQuestions } from '../data/reactInterviewQuestions';

export function ReactInterviewQuestionsPage() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(1);
  const filteredQuestions = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return reactInterviewQuestions;
    return reactInterviewQuestions.filter((item) => `${item.question} ${item.answer} ${item.topic ?? ''}`.toLowerCase().includes(search));
  }, [query]);

  return (
    <div className="question-bank-page">
      <header className="question-bank-header">
        <div><p className="eyebrow">React interview questions</p><h1>React Interview Answer Bank</h1><p>{reactInterviewQuestions.length} carefully structured questions with concise answers and practical examples for confident interviews.</p></div>
        <div className="question-bank-count"><strong>{filteredQuestions.length}</strong><span>questions</span></div>
      </header>
      <label className="question-bank-search"><span>⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions, topics, or answers" aria-label="Search React interview questions" /></label>
      <div className="question-list">
        {filteredQuestions.map((item, index) => {
          const isOpen = openId === item.id;
          const example = item.example ? (typeof item.example === 'string' ? item.example : item.example.jsx ?? item.example.javascript) : item.examples ? Object.values(item.examples).join('\n\n') : undefined;
          return (
            <article className={`question-bank-item ${isOpen ? 'is-open' : ''}`} key={item.id}>
              <button className="question-bank-trigger" type="button" onClick={() => setOpenId(isOpen ? 0 : item.id)} aria-expanded={isOpen}>
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span><span className="question-title">{item.question}</span><span className="question-chevron">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="question-bank-answer"><div className="section-label"></div><p>{item.answer}</p>{item.topic && <span className="question-topic">{item.topic}</span>}{item.benefits && <div className="answer-columns"><div><strong>Benefits</strong><ul>{item.benefits.map((value) => <li key={value}>{value}</li>)}</ul></div>{item.downsides && <div><strong>Trade-offs</strong><ul>{item.downsides.map((value) => <li key={value}>{value}</li>)}</ul></div>}</div>}{item.keyPoints && <ul className="answer-key-points">{item.keyPoints.map((value) => <li key={value}>✓ {value}</li>)}</ul>}{example && <div className="question-example"><div className="code-card-header"><span>Example</span><button type="button" onClick={() => navigator.clipboard?.writeText(example)}>Copy</button></div><pre><code>{example}</code></pre></div>}</div>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
