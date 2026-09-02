import { useMemo, useState, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { TopicDetailPage } from './components/TopicDetailPage';
import { HomePage } from './pages/HomePage';
import { ReactFundamentalsPage } from './pages/ReactFundamentalsPage';
import { HooksPage } from './pages/HooksPage';
import { ComponentLifecyclePage } from './pages/ComponentLifecyclePage';
import { StateManagementPage } from './pages/StateManagementPage';
import { PropsVsStatePage } from './pages/PropsVsStatePage';
import { ControlledVsUncontrolledComponentsPage } from './pages/ControlledVsUncontrolledComponentsPage';
import { FormsAndValidationPage } from './pages/FormsAndValidationPage';
import { EventHandlingPage } from './pages/EventHandlingPage';
import { ConditionalRenderingPage } from './pages/ConditionalRenderingPage';
import { ListsAndKeysPage } from './pages/ListsAndKeysPage';
import { ComponentCompositionPage } from './pages/ComponentCompositionPage';
import { CustomHooksPage } from './pages/CustomHooksPage';
import { ReactRouterPage } from './pages/ReactRouterPage';
import { ApiIntegrationPage } from './pages/ApiIntegrationPage';
import { PerformanceOptimizationPage } from './pages/PerformanceOptimizationPage';
import { ReactMemoUsememoUsecallbackPage } from './pages/ReactMemoUsememoUsecallbackPage';
import { ReconciliationAndVirtualDomPage } from './pages/ReconciliationAndVirtualDomPage';
import { RenderingAndRerenderingPage } from './pages/RenderingAndRerenderingPage';
import { RefsPage } from './pages/RefsPage';
import { ErrorBoundariesPage } from './pages/ErrorBoundariesPage';
import { SuspenseAndLazyLoadingPage } from './pages/SuspenseAndLazyLoadingPage';
import { TestingPage } from './pages/TestingPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { SecurityPage } from './pages/SecurityPage';
import { SsrCsrReactServerComponentsPage } from './pages/SsrCsrReactServerComponentsPage';
import { TypescriptWithReactPage } from './pages/TypescriptWithReactPage';
import { AdvancedPatternsPage } from './pages/AdvancedPatternsPage';
import { ScalableArchitecturePage } from './pages/ScalableArchitecturePage';
import { CleanCodeAndReusableComponentsPage } from './pages/CleanCodeAndReusableComponentsPage';
import { RealWorldReactInterviewScenariosPage } from './pages/RealWorldReactInterviewScenariosPage';
import { CodePlaygroundPage } from './pages/CodePlaygroundPage';
import { ReactInterviewQuestionsPage } from './pages/ReactInterviewQuestionsPage';
import { LandingPage } from './pages/LandingPage';
import { sectionLabels, type SectionKey } from './data/sectionTypes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { toggleCompletion } from './store/topicsSlice';

const sectionPaths: Record<SectionKey, string> = {
  react: '/react',
  javascript: '/javascript',
  node: '/node-js',
  angular: '/angular',
  interview: '/interview-questions',
};

const pathSections: Record<string, SectionKey> = Object.fromEntries(
  Object.entries(sectionPaths).map(([section, path]) => [path, section as SectionKey]),
);

function getSection(pathname: string): SectionKey {
  if (pathname === '/' || pathname.startsWith('/react') || pathname === '/hooks') return 'react';
  return pathSections[`/${pathname.split('/')[1]}`] ?? 'react';
}

function ProgressBar({ section }: { section: SectionKey }) {
  const topics = useAppSelector((state) => state.topics.topicsBySection[section]);
  const completed = useAppSelector((state) => state.topics.completedBySection[section]);
  const progress = topics.length ? Math.round((completed.length / topics.length) * 100) : 0;

  return (
    <div className="topbar" aria-label={`${sectionLabels[section]} progress`}>
      <div><p className="eyebrow">Progress</p><strong>{completed.length}/{topics.length} topics</strong></div>
      <span className="progress-pill">{progress}% complete</span>
    </div>
  );
}

function ReactTopicRoute({ onToggleComplete }: { onToggleComplete: (slug: string) => void }) {
  const slug = useLocation().pathname.split('/').filter(Boolean).pop();
  const completed = useAppSelector((state) => state.topics.completedBySection.react);
  const props = (topicSlug: string) => ({ completed: completed.includes(topicSlug), onToggleComplete });
  const pages: Record<string, ReactNode> = {
    'react-fundamentals': <ReactFundamentalsPage {...props('react-fundamentals')} />,
    hooks: <HooksPage {...props('hooks')} />,
    'component-lifecycle': <ComponentLifecyclePage {...props('component-lifecycle')} />,
    'state-management': <StateManagementPage {...props('state-management')} />,
    'props-vs-state': <PropsVsStatePage {...props('props-vs-state')} />,
    'controlled-vs-uncontrolled-components': <ControlledVsUncontrolledComponentsPage {...props('controlled-vs-uncontrolled-components')} />,
    'forms-and-validation': <FormsAndValidationPage {...props('forms-and-validation')} />,
    'event-handling': <EventHandlingPage {...props('event-handling')} />,
    'conditional-rendering': <ConditionalRenderingPage {...props('conditional-rendering')} />,
    'lists-and-keys': <ListsAndKeysPage {...props('lists-and-keys')} />,
    'component-composition': <ComponentCompositionPage {...props('component-composition')} />,
    'custom-hooks': <CustomHooksPage {...props('custom-hooks')} />,
    'react-router': <ReactRouterPage {...props('react-router')} />,
    'api-integration': <ApiIntegrationPage {...props('api-integration')} />,
    'performance-optimization': <PerformanceOptimizationPage {...props('performance-optimization')} />,
    'react-memo-usememo-usecallback': <ReactMemoUsememoUsecallbackPage {...props('react-memo-usememo-usecallback')} />,
    'reconciliation-and-virtual-dom': <ReconciliationAndVirtualDomPage {...props('reconciliation-and-virtual-dom')} />,
    'rendering-and-rerendering': <RenderingAndRerenderingPage {...props('rendering-and-rerendering')} />,
    refs: <RefsPage {...props('refs')} />,
    'error-boundaries': <ErrorBoundariesPage {...props('error-boundaries')} />,
    'suspense-and-lazy-loading': <SuspenseAndLazyLoadingPage {...props('suspense-and-lazy-loading')} />,
    testing: <TestingPage {...props('testing')} />,
    accessibility: <AccessibilityPage {...props('accessibility')} />,
    security: <SecurityPage {...props('security')} />,
    'ssr-csr-react-server-components': <SsrCsrReactServerComponentsPage {...props('ssr-csr-react-server-components')} />,
    'typescript-with-react': <TypescriptWithReactPage {...props('typescript-with-react')} />,
    'advanced-patterns': <AdvancedPatternsPage {...props('advanced-patterns')} />,
    'scalable-architecture': <ScalableArchitecturePage {...props('scalable-architecture')} />,
    'clean-code-and-reusable-components': <CleanCodeAndReusableComponentsPage {...props('clean-code-and-reusable-components')} />,
    'real-world-react-interview-scenarios': <RealWorldReactInterviewScenariosPage {...props('real-world-react-interview-scenarios')} />,
  };

  return pages[slug ?? ''] ?? <Navigate to="/react" replace />;
}

function ReactRoutes({ query, onToggleComplete }: { query: string; onToggleComplete: (slug: string) => void }) {
  const completed = useAppSelector((state) => state.topics.completedBySection.react);
  const props = (slug: string) => ({ completed: completed.includes(slug), onToggleComplete });

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/react" replace />} />
      <Route path="/react" element={<HomePage query={query} completed={completed} />} />
      <Route path="/react/interview-questions" element={<ReactInterviewQuestionsPage />} />
      <Route path="/react/:topicSlug" element={<ReactTopicRoute onToggleComplete={onToggleComplete} />} />
      <Route path="/react-fundamentals" element={<ReactFundamentalsPage {...props('react-fundamentals')} />} />
      <Route path="/hooks" element={<HooksPage {...props('hooks')} />} />
      <Route path="/component-lifecycle" element={<ComponentLifecyclePage {...props('component-lifecycle')} />} />
      <Route path="/state-management" element={<StateManagementPage {...props('state-management')} />} />
      <Route path="/props-vs-state" element={<PropsVsStatePage {...props('props-vs-state')} />} />
      <Route path="/controlled-vs-uncontrolled-components" element={<ControlledVsUncontrolledComponentsPage {...props('controlled-vs-uncontrolled-components')} />} />
      <Route path="/forms-and-validation" element={<FormsAndValidationPage {...props('forms-and-validation')} />} />
      <Route path="/event-handling" element={<EventHandlingPage {...props('event-handling')} />} />
      <Route path="/conditional-rendering" element={<ConditionalRenderingPage {...props('conditional-rendering')} />} />
      <Route path="/lists-and-keys" element={<ListsAndKeysPage {...props('lists-and-keys')} />} />
      <Route path="/component-composition" element={<ComponentCompositionPage {...props('component-composition')} />} />
      <Route path="/custom-hooks" element={<CustomHooksPage {...props('custom-hooks')} />} />
      <Route path="/react-router" element={<ReactRouterPage {...props('react-router')} />} />
      <Route path="/api-integration" element={<ApiIntegrationPage {...props('api-integration')} />} />
      <Route path="/performance-optimization" element={<PerformanceOptimizationPage {...props('performance-optimization')} />} />
      <Route path="/react-memo-usememo-usecallback" element={<ReactMemoUsememoUsecallbackPage {...props('react-memo-usememo-usecallback')} />} />
      <Route path="/reconciliation-and-virtual-dom" element={<ReconciliationAndVirtualDomPage {...props('reconciliation-and-virtual-dom')} />} />
      <Route path="/rendering-and-rerendering" element={<RenderingAndRerenderingPage {...props('rendering-and-rerendering')} />} />
      <Route path="/refs" element={<RefsPage {...props('refs')} />} />
      <Route path="/error-boundaries" element={<ErrorBoundariesPage {...props('error-boundaries')} />} />
      <Route path="/suspense-and-lazy-loading" element={<SuspenseAndLazyLoadingPage {...props('suspense-and-lazy-loading')} />} />
      <Route path="/testing" element={<TestingPage {...props('testing')} />} />
      <Route path="/accessibility" element={<AccessibilityPage {...props('accessibility')} />} />
      <Route path="/security" element={<SecurityPage {...props('security')} />} />
      <Route path="/ssr-csr-react-server-components" element={<SsrCsrReactServerComponentsPage {...props('ssr-csr-react-server-components')} />} />
      <Route path="/typescript-with-react" element={<TypescriptWithReactPage {...props('typescript-with-react')} />} />
      <Route path="/advanced-patterns" element={<AdvancedPatternsPage {...props('advanced-patterns')} />} />
      <Route path="/scalable-architecture" element={<ScalableArchitecturePage {...props('scalable-architecture')} />} />
      <Route path="/clean-code-and-reusable-components" element={<CleanCodeAndReusableComponentsPage {...props('clean-code-and-reusable-components')} />} />
      <Route path="/real-world-react-interview-scenarios" element={<RealWorldReactInterviewScenariosPage {...props('real-world-react-interview-scenarios')} />} />
    </Routes>
  );
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const section = getSection(location.pathname);
  const topics = useAppSelector((state) => state.topics.topicsBySection[section]);
  const completed = useAppSelector((state) => state.topics.completedBySection[section]);
  const slug = location.pathname.split('/').filter(Boolean).pop();
  const activeTopic = topics.find((topic) => topic.slug === slug) ?? topics[0];
  const activeIndex = topics.findIndex((topic) => topic.slug === activeTopic?.slug);
  const previousTopic = activeIndex > 0 ? topics[activeIndex - 1] : undefined;
  const nextTopic = activeIndex >= 0 && activeIndex < topics.length - 1 ? topics[activeIndex + 1] : undefined;
  const filteredTopics = useMemo(() => {
    const search = query.trim().toLowerCase();
    return search
      ? topics.filter((topic) => `${topic.title} ${topic.summary} ${topic.questions.join(' ')}`.toLowerCase().includes(search))
      : topics;
  }, [query, topics]);

  const handleToggleComplete = (topicSlug: string) => dispatch(toggleCompletion({ section, slug: topicSlug }));

  if (location.pathname === '/') return <LandingPage />;
  if (location.pathname.startsWith('/playground')) return <CodePlaygroundPage />;

  return (
    <div className="app-shell">
      <Sidebar query={query} onQueryChange={setQuery} completed={completed} sectionName={sectionLabels[section]} items={filteredTopics.map((topic) => ({ id: topic.slug, label: topic.title, summary: topic.summary, questions: topic.questions }))} activeItemId={activeTopic?.slug} onSelectItem={(id) => navigate(`${sectionPaths[section]}/${id}`)} sectionPath={sectionPaths[section]} />
      <main className="main-panel">
        <header className="app-topbar" aria-label="Main navigation">
          <div className="brand-inline"><span className="brand-dot">R</span><span className="brand-text">React Prep</span></div>
          <nav className="top-nav" aria-label="Section navigation">
            {(Object.keys(sectionLabels) as SectionKey[]).map((item) => <button key={item} type="button" className={`nav-pill ${section === item ? 'active' : ''}`} onClick={() => navigate(sectionPaths[item])} aria-pressed={section === item}>{sectionLabels[item]}</button>)}
            <button type="button" className="nav-pill playground-nav" onClick={() => navigate('/playground')}>Code Playground</button>
          </nav>
          <ThemeToggle />
        </header>
        <ProgressBar section={section} />
        {section === 'react' ? <ReactRoutes query={query} onToggleComplete={handleToggleComplete} /> : <Routes>
          <Route path={sectionPaths[section]} element={<TopicDetailPage topic={activeTopic} completed={completed.includes(activeTopic.slug)} onToggleComplete={handleToggleComplete} previousTopic={previousTopic} nextTopic={nextTopic} onNavigate={(nextSlug) => navigate(`${sectionPaths[section]}/${nextSlug}`)} />} />
          <Route path={`${sectionPaths[section]}/:topicSlug`} element={<TopicDetailPage topic={activeTopic} completed={completed.includes(activeTopic.slug)} onToggleComplete={handleToggleComplete} previousTopic={previousTopic} nextTopic={nextTopic} onNavigate={(nextSlug) => navigate(`${sectionPaths[section]}/${nextSlug}`)} />} />
          <Route path="*" element={<Navigate to={sectionPaths[section]} replace />} />
        </Routes>}
      </main>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>;
}
