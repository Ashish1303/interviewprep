import { NavLink } from 'react-router-dom';
import { topics } from '../data/topics';

type SidebarEntry = {
  id: string;
  label: string;
  summary?: string;
  questions?: string[];
};

type SidebarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  completed: string[];
  items?: SidebarEntry[];
  activeItemId?: string;
  onSelectItem?: (id: string) => void;
  sectionName?: string;
  sectionPath?: string;
};

export function Sidebar({
  query,
  onQueryChange,
  completed,
  items,
  activeItemId,
  onSelectItem,
  sectionName = 'React',
  sectionPath = '/',
}: SidebarProps) {
  const sourceItems =
    items && items.length > 0
      ? items
      : topics.map((topic) => ({
          id: topic.slug,
          label: topic.title,
          summary: topic.summary,
          questions: topic.questions,
        }));

  const filteredTopics = sourceItems.filter((item) => {
    const q = query.toLowerCase();
    if (!q) return true;
    return (
      item.label.toLowerCase().includes(q) ||
      (item.summary ?? '').toLowerCase().includes(q) ||
      (item.questions ?? []).some((question) => question.toLowerCase().includes(q))
    );
  });

  const isReactSection = sectionName === 'React';

  return (
    <aside className="sidebar" aria-label="Topic navigation">
      <div className="brand-block">
        <div className="brand-mark">{isReactSection ? 'R' : sectionName.charAt(0).toUpperCase()}</div>
        <div>
          <p className="eyebrow">Interview prep</p>
          <h2>{isReactSection ? 'React Mastery' : sectionName}</h2>
        </div>
      </div>

      <div className="sidebar-summary">
        <span>
          {isReactSection ? `${completed.length}/${topics.length} complete` : `${filteredTopics.length} topics`}
        </span>
      </div>

      <label className="search-box" htmlFor="topic-search">
        <span aria-hidden="true">⌕</span>
        <input
          id="topic-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search topics"
          aria-label="Search topics"
        />
      </label>

      <nav className="topic-list" aria-label="Topics">
        {isReactSection ? (
          <>
            <NavLink to={sectionPath} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
              Overview
            </NavLink>

            {filteredTopics.map((topic) => (
              <NavLink
                key={topic.id}
                to={`/${topic.id}`}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{topic.label}</span>
                {completed.includes(topic.id) ? <span className="done-indicator">✓</span> : null}
              </NavLink>
            ))}
          </>
        ) : (
          filteredTopics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className={`nav-item ${activeItemId === topic.id ? 'active' : ''}`}
              onClick={() => onSelectItem?.(topic.id)}
            >
              <span>{topic.label}</span>
            </button>
          ))
        )}
      </nav>
    </aside>
  );
}
