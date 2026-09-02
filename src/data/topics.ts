export type Topic = {
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string[];
  questions: string[];
  code: string;
  commonMistakes: string[];
  seniorTips: string[];
  useCase: string;
};

export const topics: Topic[] = [
  {
    "slug": "react-fundamentals",
    "title": "React Fundamentals",
    "summary": "React is a component-based UI library that renders declaratively from state and props.",
    "whyItMatters": [
      "It explains how updates flow through a component tree.",
      "It is the foundation for hooks, state, and performance thinking.",
      "It helps with debugging render behavior and data ownership."
    ],
    "questions": [
      "What is JSX and how is it different from HTML?",
      "How does React decide what to render when state changes?",
      "What are the responsibilities of props and state?"
    ],
    "code": "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default function App() {\n  return <Greeting name='Aisha' />;\n}",
    "commonMistakes": [
      "Mutating props instead of deriving behavior from them.",
      "Using state for values that can be computed directly.",
      "Assuming JSX is just HTML with no component model."
    ],
    "seniorTips": [
      "Explain React as a declarative rendering model.",
      "Tie UI behavior to state ownership and data flow.",
      "Use examples that show how input and output change over time."
    ],
    "useCase": "A dashboard renders summary cards and tables from a consistent data model while keeping local interactions isolated to each component."
  },
  {
    "slug": "hooks",
    "title": "Hooks",
    "summary": "Hooks let function components manage state, side effects, and reusable behavior without class components.",
    "whyItMatters": [
      "Hooks are the default React API in modern apps.",
      "Interviewers test dependency arrays, stale closures, and rules of hooks.",
      "Bad hook usage creates loops and hard-to-debug updates."
    ],
    "questions": [
      "What are the rules of hooks?",
      "When would you use useReducer instead of useState?",
      "How do dependencies affect useEffect behavior?"
    ],
    "code": "import { useEffect, useState } from 'react';\n\nfunction SearchBox() {\n  const [query, setQuery] = useState('');\n\n  useEffect(() => {\n    const id = setTimeout(() => console.log('search:', query), 250);\n    return () => clearTimeout(id);\n  }, [query]);\n\n  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;\n}",
    "commonMistakes": [
      "Calling hooks conditionally or inside loops.",
      "Forgetting dependencies in useEffect.",
      "Using effects to derive state that can be computed directly."
    ],
    "seniorTips": [
      "Keep hooks small and focused on a single responsibility.",
      "Explain stale closures in terms of snapshot behavior.",
      "Prefer derived state and memoization when effects are not needed."
    ],
    "useCase": "A search experience debounces typing and fetches suggestions without wasting API calls."
  },
  {
    "slug": "component-lifecycle",
    "title": "Component Lifecycle",
    "summary": "Lifecycle thinking explains how side effects start, update, and clean up across mount, re-render, and unmount.",
    "whyItMatters": [
      "Most resource-heavy interactions like timers and subscriptions need lifecycle cleanup.",
      "It helps explain the class-to-hooks migration.",
      "Clean lifecycle handling prevents memory leaks and stale listeners."
    ],
    "questions": [
      "How does useEffect map to componentDidMount and componentWillUnmount?",
      "When should cleanup run?",
      "What causes a memory leak in effect-driven code?"
    ],
    "code": "useEffect(() => {\n  const unsubscribe = socket.on('message', handleMessage);\n  return () => unsubscribe();\n}, [handleMessage]);",
    "commonMistakes": [
      "Forgetting cleanup for subscriptions or timers.",
      "Adding functions inside effects without stable dependencies.",
      "Using effects for data that can be derived during render."
    ],
    "seniorTips": [
      "Think in terms of ownership: who creates the resource and who destroys it?",
      "Be explicit about mount, update, and cleanup behavior.",
      "Use cleanup to prevent leaking state across route changes."
    ],
    "useCase": "A real-time notification panel subscribes to updates on mount and unsubscribes when the user leaves the screen."
  },
  {
    "slug": "state-management",
    "title": "State Management",
    "summary": "State management is about centralizing the data that drives the UI while keeping ownership clear and updates predictable.",
    "whyItMatters": [
      "State choices affect complexity, performance, and maintainability.",
      "Senior engineers know when local state is enough and when a shared store is necessary.",
      "Bad ownership creates stale updates and duplicated source-of-truth problems."
    ],
    "questions": [
      "When should you use local state vs context vs a store?",
      "What are the trade-offs of global state libraries?",
      "How do you avoid prop drilling without overusing context?"
    ],
    "code": "const [filters, setFilters] = useState({ status: 'open', search: '' });\n\nconst updateFilter = (key, value) => {\n  setFilters((prev) => ({ ...prev, [key]: value }));\n};",
    "commonMistakes": [
      "Duplicating state across components.",
      "Using global state for UI-local concerns.",
      "Introducing a store before the data model is understood."
    ],
    "seniorTips": [
      "Keep state close to the feature that owns it.",
      "Lift state only when multiple components actually need the same source of truth.",
      "Choose the simplest state model that still fits the product."
    ],
    "useCase": "A billing dashboard stores filter state and selected rows in a shared store while keeping row-specific UI state local to each row."
  },
  {
    "slug": "props-vs-state",
    "title": "Props vs State",
    "summary": "Props are inputs from a parent; state is component-owned data that can change over time and drive rendering.",
    "whyItMatters": [
      "This distinction is essential to component design.",
      "Interviewers often test whether you identify the true source of truth.",
      "Incorrect ownership leads to duplication, stale values, and confusing behavior."
    ],
    "questions": [
      "What is the key difference between props and state?",
      "When should a parent own state instead of a child?",
      "Can a child mutate props directly?"
    ],
    "code": "function Parent() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onIncrement={() => setCount((c) => c + 1)} />;\n}\n\nfunction Child({ count, onIncrement }) {\n  return <button onClick={onIncrement}>Count: {count}</button>;\n}",
    "commonMistakes": [
      "Storing derived values in state.",
      "Allowing children to mutate incoming props.",
      "Lifting state too high without a clear need."
    ],
    "seniorTips": [
      "Ask ?who owns this data?? before changing state structure.",
      "Props should be treated as immutable inputs.",
      "A good component makes state ownership obvious."
    ],
    "useCase": "A cart page owns the total while item components receive data as props and emit actions back to the parent."
  },
  {
    "slug": "controlled-vs-uncontrolled-components",
    "title": "Controlled vs Uncontrolled Components",
    "summary": "A controlled input is driven by React state; an uncontrolled input keeps its own value and is accessed via refs when needed.",
    "whyItMatters": [
      "Most forms are controlled because they are easier to validate and test.",
      "Uncontrolled inputs are useful when the DOM owns the state for a short-lived interaction.",
      "This choice affects validation, UX, and user flow logic."
    ],
    "questions": [
      "When should you prefer controlled inputs?",
      "What is the role of value and onChange?",
      "When might a ref be a better choice than state?"
    ],
    "code": "const [email, setEmail] = useState('');\n\n<input value={email} onChange={(e) => setEmail(e.target.value)} />;\n\nconst fileInputRef = useRef(null);",
    "commonMistakes": [
      "Setting value without onChange in a controlled field.",
      "Using refs for values that should be part of the form state.",
      "Forgetting labels and accessibility semantics."
    ],
    "seniorTips": [
      "Default to controlled inputs for validation-heavy forms.",
      "Use uncontrolled patterns only when you truly want browser-managed values.",
      "Form state should match the user?s actual input and validation state."
    ],
    "useCase": "A checkout form keeps values in state for validation and submit handling while the uploaded file remains uncontrolled because the browser manages the handle."
  },
  {
    "slug": "forms-and-validation",
    "title": "Forms & Validation",
    "summary": "Forms are more than inputs; they require clear validation logic, accessible labels, and a stable submit flow.",
    "whyItMatters": [
      "Nearly every product depends on user input flows.",
      "Validation is a common interview topic because it combines state and UX decisions.",
      "Bad form handling creates broken submissions and confused users."
    ],
    "questions": [
      "How do you validate a form when the user types?",
      "When should validation happen on blur vs submit?",
      "How do you handle server-side validation errors?"
    ],
    "code": "const [errors, setErrors] = useState({});\n\nconst handleSubmit = (event) => {\n  event.preventDefault();\n  const nextErrors = validateForm(form);\n  setErrors(nextErrors);\n\n  if (Object.keys(nextErrors).length === 0) {\n    submitForm(form);\n  }\n};",
    "commonMistakes": [
      "Validating only after submit without field-level feedback.",
      "Ignoring server validation responses.",
      "Creating inaccessible labels and error messages."
    ],
    "seniorTips": [
      "Model states clearly: pristine, invalid, submitting, success, and error.",
      "Let users fix errors without retyping everything.",
      "Separate validation rules from UI rendering so they are reusable."
    ],
    "useCase": "A signup form validates email, password strength, and confirmation before allowing the user to continue while preserving existing inputs on API errors."
  },
  {
    "slug": "event-handling",
    "title": "Event Handling",
    "summary": "React events are synthetic and unified, so you must understand propagation, default behavior, and handler patterns to build interactive UIs correctly.",
    "whyItMatters": [
      "User interactions are the core of interactivity.",
      "Interviewers often test how you pass data and prevent unintended actions.",
      "Incorrect handlers lead to stale closures, accidental propagation, and broken flows."
    ],
    "questions": [
      "What is a synthetic event?",
      "How do you stop propagation or prevent default behavior?",
      "How do you manage arguments passed to handlers?"
    ],
    "code": "<button onClick={(event) => { event.preventDefault(); submitForm(); }}>Submit</button>\n\nconst handleRowClick = (id) => () => navigate(`/users/${id}`);",
    "commonMistakes": [
      "Calling handlers without a wrapper and losing event semantics.",
      "Forgetting preventDefault in form submits.",
      "Using inline callbacks for heavy logic without considering performance."
    ],
    "seniorTips": [
      "Know the difference between event logic and business logic.",
      "Prefer explicit callbacks for actions with parameters.",
      "Use event delegation when dealing with large or dynamic lists."
    ],
    "useCase": "A table row click opens a detail panel while a toolbar button stops propagation to avoid triggering parent handlers accidentally."
  },
  {
    "slug": "conditional-rendering",
    "title": "Conditional Rendering",
    "summary": "Conditional rendering expresses the current UI state by showing or hiding parts of a component tree based on data and user actions.",
    "whyItMatters": [
      "It is one of the most common patterns in React code.",
      "Clear conditional flow improves readability and reduces edge-case bugs.",
      "Interviews test whether you can map product states to UI accurately."
    ],
    "questions": [
      "When should you use a ternary vs early return?",
      "How do you handle loading and error states?",
      "How do you avoid repeated nested conditions?"
    ],
    "code": "if (status === 'loading') return <Spinner />;\nif (error) return <ErrorState />;\nif (!items.length) return <EmptyState />;\n\nreturn <ItemList items={items} />;",
    "commonMistakes": [
      "Using complex nested ternaries that hide logic.",
      "Returning null without describing the empty or loading state to the user.",
      "Mixing business logic and UI branching in a way that is hard to predict."
    ],
    "seniorTips": [
      "Prefer early returns for major states and simple ternaries for smaller views.",
      "Explicitly model idle, loading, success, and error states.",
      "Always consider what the user should know during each branch."
    ],
    "useCase": "A task dashboard flips between skeletons, empty tables, and live data depending on whether the user has tasks and whether the request is loading or failed."
  },
  {
    "slug": "lists-and-keys",
    "title": "Lists & Keys",
    "summary": "Lists require stable identity so React can reconcile changes without reusing the wrong state or DOM nodes.",
    "whyItMatters": [
      "Most user interfaces render collections of items.",
      "Incorrect keys are a common source of hidden UI bugs in dynamic lists.",
      "Keys should represent identity, not visual position."
    ],
    "questions": [
      "Why are keys important in React?",
      "Why is index as a key a bad idea for dynamic lists?",
      "How do keys affect reconciliation when items are inserted or reordered?"
    ],
    "code": "const rows = users.map((user) => <Row key={user.id} user={user} />);",
    "commonMistakes": [
      "Using array index as a key in mutable or reordered content.",
      "Mutating the original list in place.",
      "Showing empty states without considering list operations."
    ],
    "seniorTips": [
      "Use durable IDs that survive insertion and filtering.",
      "Think of keys as identity markers, not display-order hints.",
      "Test reorder, insert, and delete cases before shipping."
    ],
    "useCase": "A board app reorders tasks between columns while preserving task-specific state with stable IDs rather than array indexes."
  },
  {
    "slug": "component-composition",
    "title": "Component Composition",
    "summary": "Composition is the idiomatic React way to build reusable UI: small components with controlled interfaces and explicit responsibilities.",
    "whyItMatters": [
      "It scales better than deep inheritance patterns and more clearly expresses UI intent.",
      "Good composition reduces duplication and improves reuse across features.",
      "Interviews test whether you can build flexible component APIs without overengineering."
    ],
    "questions": [
      "What is the difference between composition and inheritance?",
      "When should you use children vs explicit props?",
      "How do you design a reusable container component?"
    ],
    "code": "function Modal({ title, children }) {\n  return (\n    <dialog open>\n      <h2>{title}</h2>\n      {children}\n    </dialog>\n  );\n}\n\n<Modal title='Profile'>\n  <ProfileForm />\n</Modal>",
    "commonMistakes": [
      "Creating giant components with no boundaries.",
      "Over-configuring props instead of designing a clean API.",
      "Mixing rendering logic and data-fetching concerns in one component."
    ],
    "seniorTips": [
      "Build composition around product intent rather than low-level DOM details.",
      "Prefer explicit slots or children over brittle prop configurations.",
      "Small reusable components with clear responsibilities are easier to maintain."
    ],
    "useCase": "A layout shell composes header, navigation, and content sections while page-specific components fill in the actual content."
  },
  {
    "slug": "custom-hooks",
    "title": "Custom Hooks",
    "summary": "Custom hooks extract reusable behavior such as data fetching, debouncing, and subscriptions into a clear, hook-based API.",
    "whyItMatters": [
      "They reduce duplication and keep components focused on UI concerns.",
      "Interviewers want to see whether you know when to abstract logic and when to leave it local.",
      "Bad custom hooks can hide complexity and make behavior harder to reason about."
    ],
    "questions": [
      "When do you create a custom hook?",
      "How do custom hooks differ from utility functions?",
      "What are the risks of sharing hook logic across components?"
    ],
    "code": "function useDebouncedValue(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n\n  return debounced;\n}",
    "commonMistakes": [
      "Creating hooks without a clear shared behavior.",
      "Returning unstable objects that trigger unnecessary re-renders.",
      "Mixing unrelated concerns in one hook."
    ],
    "seniorTips": [
      "Hooks should represent real behavior, not just a wrapper around library calls.",
      "Make the API narrow and explicit so consumers understand the contract.",
      "Keep data-fetching and UI concerns separate where possible."
    ],
    "useCase": "A search page uses a custom hook to debounce the query and expose loading and error states to multiple screens without duplicating logic."
  },
  {
    "slug": "react-router",
    "title": "React Router",
    "summary": "Routing maintains navigation state, nested layouts, route params, and access control in a single-page app.",
    "whyItMatters": [
      "A real app depends on routes, redirects, and protected views.",
      "Interviewers often ask about nested routes, auth guards, and URL-driven state.",
      "Bad route design creates broken deep links and confusing workflow transitions."
    ],
    "questions": [
      "How do you guard routes?",
      "What is the difference between Link and navigate?",
      "How do nested routes help with layout composition?"
    ],
    "code": "<Routes>\n  <Route path='/' element={<Dashboard />} />\n  <Route path='/users/:id' element={<UserDetail />} />\n  <Route path='*' element={<NotFound />} />\n</Routes>",
    "commonMistakes": [
      "Not handling 404 states and redirect edges.",
      "Forgetting auth checks on protected routes.",
      "Using route definitions inconsistently across the app."
    ],
    "seniorTips": [
      "Route transitions are product flows, not just screen mappings.",
      "Use route-level guards for auth and data loading boundaries.",
      "Keep URLs meaningful and stable across refreshes."
    ],
    "useCase": "A SaaS application protects dashboards behind authentication and uses nested routes to share a layout while switching between account, billing, and settings screens."
  },
  {
    "slug": "api-integration",
    "title": "API Integration",
    "summary": "React does not manage the network layer; good API integration means handling async flows, caching, errors, and request boundaries carefully.",
    "whyItMatters": [
      "Most application bugs live in the boundary between client state and server data.",
      "Interviewers want to hear about loading states, stale data, and cancellation.",
      "Network mistakes are easy to miss when the UI appears to ?work.?"
    ],
    "questions": [
      "How do you fetch data in React?",
      "How do you avoid race conditions between requests?",
      "What is the difference between optimistic and pessimistic updates?"
    ],
    "code": "useEffect(() => {\n  let cancelled = false;\n  fetch('/api/users')\n    .then((res) => res.json())\n    .then((data) => !cancelled && setUsers(data));\n  return () => { cancelled = true; };\n}, []);",
    "commonMistakes": [
      "Fetching during render instead of inside effects or a data layer.",
      "Ignoring stale responses and cancellation.",
      "Showing success before the API request is completed."
    ],
    "seniorTips": [
      "Model loading, success, and error states explicitly.",
      "Treat async data as a lifecycle with cleanup and cancellation.",
      "Prefer server truth and predictable requests over ad hoc client-side mutation."
    ],
    "useCase": "A customer dashboard loads account details and activity logs, handles background refresh, and shows sensible error states when a request fails."
  },
  {
    "slug": "performance-optimization",
    "title": "Performance Optimization",
    "summary": "Performance optimization is about reducing wasted work, not just tweaking code for the sake of it.",
    "whyItMatters": [
      "Slow rendering leads to poor UX and lost trust.",
      "Strong candidates profile before optimizing and focus on high-value bottlenecks.",
      "React is fast by default, but large lists and expensive computations require discipline."
    ],
    "questions": [
      "How do you identify a render bottleneck?",
      "What is the difference between perceived performance and actual render cost?",
      "When does memoization actually help?"
    ],
    "code": "const filtered = useMemo(() => expensiveFilter(items), [items]);",
    "commonMistakes": [
      "Memoizing before identifying the real bottleneck.",
      "Creating large objects in render without a clear purpose.",
      "Ignoring list virtualization for large collections."
    ],
    "seniorTips": [
      "Profile first and optimize the hottest path.",
      "Measure user-visible behavior, not just micro-optimizations.",
      "Keep the performance story tied to real user impact."
    ],
    "useCase": "A reporting page renders a large table using windowing, memoized filtering, and a small list of visible rows to keep scrolling smooth."
  },
  {
    "slug": "react-memo-usememo-usecallback",
    "title": "React.memo / useMemo / useCallback",
    "summary": "These APIs help avoid unnecessary re-renders and repeated work, but they are only effective when dependencies and identity behavior are understood.",
    "whyItMatters": [
      "These are among the most discussed optimization tools in React interviews.",
      "Overuse of memoization makes code harder to reason about and maintain.",
      "The right use is targeted and motivated by actual cost."
    ],
    "questions": [
      "When is React.memo useful?",
      "What is the difference between useMemo and useCallback?",
      "What problems occur when a dependency array is wrong?"
    ],
    "code": "const visibleRows = useMemo(() => filterRows(rows), [rows]);\nconst onSelect = useCallback((id) => setSelected(id), []);\nconst Row = React.memo(({ item }) => <button>{item.label}</button>);",
    "commonMistakes": [
      "Adding memoization everywhere without measuring impact.",
      "Forgetting dependency arrays and creating stale closures.",
      "Using memoization to hide poor component structure."
    ],
    "seniorTips": [
      "Memoization should solve a real re-render problem, not create one.",
      "Use it after profiling and when dependency identity matters.",
      "If code is simple and fast, the best optimization may be to leave it alone."
    ],
    "useCase": "A dashboard memoizes expensive chart computations and stable callbacks so filter interactions stay smooth without re-rendering static panels."
  },
  {
    "slug": "reconciliation-and-virtual-dom",
    "title": "Reconciliation & Virtual DOM",
    "summary": "Reconciliation is the algorithm React uses to compare the previous tree with the next tree and apply the smallest meaningful updates.",
    "whyItMatters": [
      "It explains why React can be efficient without manual DOM manipulation.",
      "Interviewers often test whether you understand that keys and identity matter during diffing.",
      "This is the core of how React updates interface state predictably."
    ],
    "questions": [
      "What is reconciliation?",
      "Why do keys matter during diffing?",
      "How does React decide whether to update a subtree?"
    ],
    "code": "const nextState = { ...state, count: state.count + 1 };\n// React compares previous and next trees to decide which DOM nodes to update.",
    "commonMistakes": [
      "Thinking the virtual DOM is the actual browser DOM.",
      "Ignoring that keys preserve identity during reordering.",
      "Expecting React to magically skip all work in a re-render."
    ],
    "seniorTips": [
      "Explain reconciliation as tree comparison with identity-aware updates.",
      "Connect keys to stable component behavior during reorder and inserts.",
      "Remember that React makes render-friendly decisions, not DOM-perfect assumptions."
    ],
    "useCase": "A large dashboard updates a single widget and React reuses the unaffected tree while applying only the necessary isolated changes."
  },
  {
    "slug": "rendering-and-rerendering",
    "title": "Rendering & Re-rendering",
    "summary": "A component re-renders when its state, props, or context change, which is why understanding render triggers is crucial for performance and debugging.",
    "whyItMatters": [
      "Many performance issues come from unnecessary re-renders and rerender storms.",
      "Senior engineers can explain the difference between render and commit.",
      "This also helps you reason about efficient nested component trees."
    ],
    "questions": [
      "What causes a component to re-render?",
      "Why can parent updates trigger child re-renders?",
      "How do you minimize unnecessary renders?"
    ],
    "code": "function Counter() {\n  const [count, setCount] = useState(0);\n  console.log('render');\n  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;\n}",
    "commonMistakes": [
      "Confusing render with DOM mutation.",
      "Creating new objects inline and blaming React for unnecessary churn.",
      "Ignoring that context updates can re-render many consumers."
    ],
    "seniorTips": [
      "Treat render as the pure process of converting current state and props to output.",
      "Trace the source of a re-render before changing state or memoization.",
      "Look for unnecessary work in the render path rather than guessing."
    ],
    "useCase": "A filter panel updates the query and triggers only the list portion to re-render while unrelated panels remain stable."
  },
  {
    "slug": "refs",
    "title": "Refs",
    "summary": "Refs provide imperative access to DOM nodes or values without directly causing re-renders, which is useful for focus, scrolling, and animation.",
    "whyItMatters": [
      "Refs are critical for imperative UI behavior and integration with browser APIs.",
      "Interviewers test when to prefer refs and when state is the correct choice.",
      "Bad ref usage creates stale or unmanaged state."
    ],
    "questions": [
      "How is a ref different from state?",
      "When is useRef useful?",
      "How do you focus or scroll to an element with a ref?"
    ],
    "code": "const inputRef = useRef(null);\n\nconst focusInput = () => inputRef.current?.focus();\n\n<input ref={inputRef} />",
    "commonMistakes": [
      "Using refs for values that should be reactive state.",
      "Reading ref.current without null checking.",
      "Keeping imperative state in refs and forgetting to reset it."
    ],
    "seniorTips": [
      "Use state for reactive UI data and refs for imperative behavior.",
      "If the UI is driven by React, state is usually the better model.",
      "Document when a ref is intentionally mutable or lifecycle-managed."
    ],
    "useCase": "A chat composer focuses the message field after opening the reply panel and scrolls the user to the newest message automatically."
  },
  {
    "slug": "error-boundaries",
    "title": "Error Boundaries",
    "summary": "Error boundaries catch rendering failures in a subtree and allow the app to present fallback UI instead of crashing the whole page.",
    "whyItMatters": [
      "Production apps need graceful failure states where one widget can fail without killing the whole interface.",
      "Senior engineers know where boundaries should sit and what they do and do not catch.",
      "Fallback UI is a major quality signal for real users."
    ],
    "questions": [
      "What is an error boundary?",
      "What kinds of errors are caught by error boundaries?",
      "How do you recover from an error state?"
    ],
    "code": "class WidgetBoundary extends React.Component {\n  state = { hasError: false };\n\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n\n  render() {\n    return this.state.hasError ? <Fallback /> : this.props.children;\n  }\n}",
    "commonMistakes": [
      "Placing boundaries at the wrong level in the tree.",
      "Expecting boundaries to catch async or event handler errors.",
      "Leaving the user without a recovery path."
    ],
    "seniorTips": [
      "Use boundaries around risky UI sections to avoid full app failure.",
      "Pair them with a fallback and an action to retry or reload safely.",
      "Remember that render-time errors are what boundaries handle best."
    ],
    "useCase": "A chart widget fails to render due to malformed data while the rest of the dashboard keeps working and shows a fallback card instead."
  },
  {
    "slug": "suspense-and-lazy-loading",
    "title": "Suspense & Lazy Loading",
    "summary": "Suspense and lazy loading let React delay work and show fallbacks while code or data is being loaded, improving perceived performance.",
    "whyItMatters": [
      "They are core patterns for code splitting and loading states.",
      "Senior engineers align loading behavior with product expectations and route design.",
      "Good loading UX prevents users from thinking the app is broken."
    ],
    "questions": [
      "What is React.lazy?",
      "How does Suspense improve loading UX?",
      "Why is a fallback important?"
    ],
    "code": "const ReportsPage = React.lazy(() => import('./ReportsPage'));\n\n<Suspense fallback={<Spinner />}>\n  <ReportsPage />\n</Suspense>",
    "commonMistakes": [
      "Lazy loading without a meaningful fallback.",
      "Chunking too much code into single large bundles.",
      "Ignoring the user experience while data is loading."
    ],
    "seniorTips": [
      "Loading states are part of the product experience, not an afterthought.",
      "Use route and component splitting to keep the first interaction fast.",
      "Choose fallbacks that communicate progress without being noisy."
    ],
    "useCase": "An admin panel lazy-loads heavy reporting modules so the first screen is faster and users see a spinner rather than a blank area."
  },
  {
    "slug": "testing",
    "title": "Testing",
    "summary": "Testing helps protect the parts of the app hardest to reason about: user flows, validation logic, and regressions under change.",
    "whyItMatters": [
      "The best React teams test behavior as users experience it.",
      "Interviewers often ask whether you can separate unit, integration, and end-to-end test value.",
      "The right test strategy reduces shipping risk without slowing people down."
    ],
    "questions": [
      "What should you test in a component?",
      "How do unit and integration tests differ?",
      "Why is accessibility testing important?"
    ],
    "code": "it('submits the form', async () => {\n  render(<SignupForm />);\n  await user.type(screen.getByLabelText(/email/i), 'a@b.com');\n  await user.click(screen.getByRole('button', { name: /submit/i }));\n  expect(screen.getByText(/success/i)).toBeInTheDocument();\n});",
    "commonMistakes": [
      "Testing implementation details instead of behavior.",
      "Ignoring keyboard and accessibility flows.",
      "Creating brittle snapshots instead of meaningful assertions."
    ],
    "seniorTips": [
      "Write tests around user-visible behavior and product outcomes.",
      "Keep high-signal integration tests in place and avoid over-mocking.",
      "Test the real flow, not only the happy path."
    ],
    "useCase": "A login form is tested for invalid input, loading, API error, and success states so regressions do not get merged unnoticed."
  },
  {
    "slug": "accessibility",
    "title": "Accessibility",
    "summary": "Accessible React interfaces support keyboard navigation, screen readers, and semantic markup without sacrificing user experience.",
    "whyItMatters": [
      "A11y is part of delivering quality software to real users.",
      "Interviewers often ask about labels, focus management, and semantic elements.",
      "Good accessibility often creates better UX for everyone."
    ],
    "questions": [
      "How do you make a custom button accessible?",
      "When should you use ARIA?",
      "Why are labels and keyboard navigation critical?"
    ],
    "code": "<label htmlFor='email'>Email</label>\n<input id='email' type='email' />\n<button aria-label='Close dialog'>?</button>",
    "commonMistakes": [
      "Using divs for interactive controls.",
      "Forgetting keyboard focus in modals or expanded content.",
      "Using color alone to communicate state."
    ],
    "seniorTips": [
      "Use native semantics before custom enhancements.",
      "Test keyboard-only flows and focus transitions.",
      "Accessible patterns are often more robust for all users."
    ],
    "useCase": "A modal dialog traps focus, exposes clear labels, and announces updates so users can complete a workflow with a screen reader or keyboard alone."
  },
  {
    "slug": "security",
    "title": "Security",
    "summary": "Security in React means treating untrusted input as dangerous, protecting auth boundaries, and keeping the server as the real enforcement layer.",
    "whyItMatters": [
      "Front-end code can still be vulnerable if user input is trusted without sanitization.",
      "Interviewers often test your understanding of XSS and client-side security boundaries.",
      "A safe app requires thoughtful server and client cooperation."
    ],
    "questions": [
      "How do you prevent XSS in React?",
      "When is dangerouslySetInnerHTML risky?",
      "Where should auth checks happen?"
    ],
    "code": "const safeHtml = sanitize(userInput);\n<div dangerouslySetInnerHTML={{ __html: safeHtml }} />;",
    "commonMistakes": [
      "Trusting user input without sanitization.",
      "Storing or exposing secrets in client code.",
      "Treating front-end auth as the only security boundary."
    ],
    "seniorTips": [
      "React escapes values by default; only bypass it when you have a justified need.",
      "Keep auth and permission enforcement on the server and API layer.",
      "Validate and sanitize user-controlled content before it enters the UI."
    ],
    "useCase": "A comment system sanitizes markup and uses server-issued tokens to ensure only authenticated users can edit or delete content."
  },
  {
    "slug": "ssr-csr-react-server-components",
    "title": "SSR / CSR / React Server Components",
    "summary": "SSR renders on the server for HTML and SEO, CSR renders in the browser for interactive apps, and server components move some server work outside the client bundle.",
    "whyItMatters": [
      "This decision affects performance, SEO, hydration, and architecture.",
      "Senior interviews test whether you understand when each model fits.",
      "The right choice depends on data freshness, interactivity, and business needs."
    ],
    "questions": [
      "What is the difference between CSR and SSR?",
      "When is SSR valuable for SEO or first load?",
      "How do React Server Components change the model?"
    ],
    "code": "export default async function Page() {\n  const products = await fetch('/api/products').then((r) => r.json());\n  return <ProductList items={products} />;\n}",
    "commonMistakes": [
      "Using CSR everywhere when SSR would improve first paint and SEO.",
      "Mixing server-only logic into client components.",
      "Ignoring hydration and client/server boundary rules."
    ],
    "seniorTips": [
      "Choose the rendering model by business requirements, not default preference.",
      "Keep server data fetches near the route and interactive work on the client.",
      "Understand that server components shift work away from the browser."
    ],
    "useCase": "A storefront uses SSR for product pages and SEO while the cart remains client-rendered and interactive."
  },
  {
    "slug": "typescript-with-react",
    "title": "TypeScript with React",
    "summary": "TypeScript gives React components explicit contracts, helping teams reduce runtime errors and improve code quality across large codebases.",
    "whyItMatters": [
      "Most production React apps rely on TypeScript for maintainability.",
      "Interviewers test props, unions, generic components, and event typing.",
      "Type design helps define safer APIs and better team collaboration."
    ],
    "questions": [
      "How do you type component props?",
      "When should you use a union type?",
      "Why are generics useful in reusable components?"
    ],
    "code": "type ButtonProps = {\n  variant?: 'primary' | 'secondary';\n  onClick: () => void;\n  children: React.ReactNode;\n};\n\nfunction Button({ variant = 'primary', children, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{children}</button>;\n}",
    "commonMistakes": [
      "Typing everything as any to move faster.",
      "Using broad types without narrowing when the UI expects limited states.",
      "Ignoring event and form value types."
    ],
    "seniorTips": [
      "Type the public contract of a component, not every implementation detail.",
      "Prefer exact unions and derived types when a value has a limited domain.",
      "Let TypeScript guide design rather than just document it."
    ],
    "useCase": "A design system button component types variant, loading state, and click behavior so all product teams use the same safe API."
  },
  {
    "slug": "advanced-patterns",
    "title": "Advanced Patterns",
    "summary": "Advanced patterns such as compound components, render props, and controlled APIs help you build flexible, scalable user interfaces without overcomplication.",
    "whyItMatters": [
      "Senior interviews often test your awareness of design patterns and their trade-offs.",
      "The right pattern decreases duplication while keeping behavior understandable.",
      "The wrong pattern adds indirection and makes the code hard to debug."
    ],
    "questions": [
      "What is a compound component?",
      "When is a render prop useful?",
      "How do you avoid overengineering an abstraction?"
    ],
    "code": "const Tabs = Object.assign(({ children }) => <div>{children}</div>, {\n  List: ({ children }) => <ul>{children}</ul>,\n  Item: ({ children }) => <li>{children}</li>,\n});",
    "commonMistakes": [
      "Applying an advanced pattern before the simpler API is proven insufficient.",
      "Sharing state where ownership is unclear.",
      "Optimizing for elegance instead of real product needs."
    ],
    "seniorTips": [
      "Start from the product semantics and build the abstraction outward.",
      "Prefer patterns that are easy for the team to explain and debug.",
      "If a pattern adds magic, it should solve a real recurring problem."
    ],
    "useCase": "A tabs and accordion system uses a compound component API so the composition matches the product domain without leaking implementation details."
  },
  {
    "slug": "scalable-architecture",
    "title": "Scalable Architecture",
    "summary": "Scalable React architecture organizes code around domain features, shared components, and clear responsibilities so the app can evolve without collapsing under complexity.",
    "whyItMatters": [
      "Architecture questions appear in senior React interviews because they reflect engineering judgment.",
      "The best code organization helps teams move quickly and reliably.",
      "Bad boundaries create coupling, duplication, and slow delivery."
    ],
    "questions": [
      "How would you structure a growing React app?",
      "How do you separate UI, domain logic, and API access?",
      "What is the value of feature-based folders?"
    ],
    "code": "src/\n  app/\n  features/\n    auth/\n    billing/\n  shared/\n    components/\n    hooks/\n    utils/",
    "commonMistakes": [
      "Keeping everything in a single folder.",
      "Mixing domain logic with reusable presentation code.",
      "Creating too many layers without clear ownership."
    ],
    "seniorTips": [
      "Structure code around product domains and team boundaries.",
      "Define clear seams between UI, services, and infrastructure.",
      "Keep the architecture simple enough for the current team to reason about."
    ],
    "useCase": "A large SaaS app separates billing, auth, reporting, and shared UI modules so product teams can build independently without accidental coupling."
  },
  {
    "slug": "clean-code-and-reusable-components",
    "title": "Clean Code & Reusable Components",
    "summary": "Clean React code is readable, intentional, and built around interfaces that are reusable, testable, and easy to extend.",
    "whyItMatters": [
      "Most maintenance work is not about adding features; it is about reading and modifying code safely.",
      "Senior engineers write components that communicate intent without a lot of comment-heavy workarounds.",
      "Reuse is only valuable when it reduces duplication without reducing clarity."
    ],
    "questions": [
      "What makes a component reusable?",
      "How do you avoid overengineering shared UI?",
      "What are signs of unclean React code?"
    ],
    "code": "function DataGrid({ rows, columns }) {\n  return <table>{/* render rows */}</table>;\n}",
    "commonMistakes": [
      "Copy-pasting UI patterns across screens.",
      "Making shared components too abstract to be understandable.",
      "Mixing formatting, fetching, and rendering logic in the same component."
    ],
    "seniorTips": [
      "Prefer descriptive names and small units of logic over clever abstractions.",
      "Hold the public API to a clear, intentionally designed contract.",
      "Code should be understandable to the next engineer without deep context."
    ],
    "useCase": "A design system library builds reusable table, modal, and button APIs that teams across the product can adopt without re-solving the same problems."
  },
  {
    "slug": "real-world-react-interview-scenarios",
    "title": "Real-world React Interview Scenarios",
    "summary": "Real interview scenarios test your ability to reason through root causes, product constraints, and the right technical path under pressure.",
    "whyItMatters": [
      "The best answers show structured thinking, not memorized definitions.",
      "Senior interviews evaluate communication, judgment, and architecture awareness.",
      "Most production work is solving real problems with constraints, not writing perfect code."
    ],
    "questions": [
      "How would you debug a slow dashboard with too many re-renders?",
      "What would you do if a modal state was inconsistent across routes?",
      "How would you refactor a React app that has become hard to maintain?"
    ],
    "code": "const [data, setData] = useState([]);\nuseEffect(() => {\n  fetch('/api/data').then(setData);\n}, []);\n// Ask: Are loading, error, and stale-response cases handled?",
    "commonMistakes": [
      "Jumping to a framework answer without understanding the root cause.",
      "Ignoring constraints like time-to-market and team maturity.",
      "Answering with theory instead of structured trade-off analysis."
    ],
    "seniorTips": [
      "Start by clarifying the problem and assumptions.",
      "Explain the technical path, validation, and business impact.",
      "Show how you would measure, verify, and iterate after the fix."
    ],
    "useCase": "A team asks for a performance fix on a dashboard with thousands of rows and stale filter state; the ideal answer includes profiling, state ownership refinement, and a realistic rollout plan."
  }
];

export function getTopic(slug: string): Topic {
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) {
    throw new Error(`Topic not found: ${slug}`);
  }
  return topic;
}
