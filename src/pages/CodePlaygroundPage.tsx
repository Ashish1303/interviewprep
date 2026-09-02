import { useEffect, useMemo, useRef, useState } from 'react';

type FileKey = 'html' | 'css' | 'javascript' | 'typescript';
type Layout = 'columns' | 'rows' | 'preview-right' | 'preview-bottom';
type Theme = 'dark' | 'light' | 'system';

type PlaygroundState = {
  html: string;
  css: string;
  javascript: string;
  typescript: string;
  activeFile: FileKey;
  template: string;
};

const fileLabels: Record<FileKey, string> = {
  html: 'HTML', css: 'CSS', javascript: 'JavaScript', typescript: 'TypeScript',
};

const templates: Record<string, Partial<PlaygroundState>> = {
  Blank: { html: '<main class="empty-state">\n  <h1>Your canvas</h1>\n  <p>Start building something thoughtful.</p>\n</main>', css: '.empty-state {\n  padding: 3rem;\n  text-align: center;\n  font-family: system-ui;\n}' },
  'HTML / CSS / JS': { html: '<main class="card">\n  <span class="eyebrow">Live component</span>\n  <h1 id="title">Hello, builder.</h1>\n  <button id="action">Change message</button>\n</main>', css: ':root { font-family: Inter, system-ui, sans-serif; color: #172033; background: #e8edf5; }\nbody { display: grid; place-items: center; min-height: 100vh; margin: 0; }\n.card { padding: 2rem; border-radius: 18px; background: white; box-shadow: 0 20px 60px #17203322; }\nbutton { padding: .7rem 1rem; border: 0; border-radius: 10px; background: #2f6df6; color: white; cursor: pointer; }', javascript: "document.querySelector('#action').addEventListener('click', () => {\n  document.querySelector('#title').textContent = 'It works. Keep going.';\n  console.log('Button clicked');\n});" },
  TypeScript: { typescript: "type User = { name: string; role: string };\n\nconst user: User = { name: 'Aisha', role: 'Frontend engineer' };\nconst greeting = (person: User): string => `Hello ${person.name}`;\nconsole.log(greeting(user));" },
};

const initialState: PlaygroundState = {
  html: templates['HTML / CSS / JS'].html ?? '',
  css: templates['HTML / CSS / JS'].css ?? '',
  javascript: templates['HTML / CSS / JS'].javascript ?? '',
  typescript: '', activeFile: 'html', template: 'HTML / CSS / JS',
};

const makeId = () => Math.random().toString(36).slice(2, 9);

function transpileTypeScript(source: string) {
  return source
    .replace(/^(export\s+)?(type|interface)\s+\w+[\s\S]*?\};?\s*/gm, '')
    .replace(/\s+as\s+[A-Za-z_$][\w$<>\[\]| ]*/g, '')
    .replace(/([A-Za-z_$][\w$]*)\s*\??:\s*[A-Za-z_$][\w$<>\[\]| ]*(?=\s*[,)=;{])/g, '$1')
    .replace(/\)\s*:\s*[A-Za-z_$][\w$<>\[\]| ]*\s*=>/g, ') =>');
}

export function CodePlaygroundPage() {
  const [playground, setPlayground] = useState<PlaygroundState>(() => {
    try { return { ...initialState, ...(JSON.parse(localStorage.getItem('code-playground') ?? '{}')) }; } catch { return initialState; }
  });
  const [autoRun, setAutoRun] = useState(true);
  const [layout, setLayout] = useState<Layout>('preview-right');
  const [theme, setTheme] = useState<Theme>('dark');
  const [fontSize, setFontSize] = useState(14);
  const [consoleLines, setConsoleLines] = useState<string[]>(['Ready. Run your code to see output here.']);
  const [resources, setResources] = useState<string[]>([]);
  const [resourceInput, setResourceInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [savedAt, setSavedAt] = useState('Not saved');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updateFile = (value: string) => setPlayground((current) => ({ ...current, [current.activeFile]: value }));
  const activeCode = playground[playground.activeFile];
  const lineCount = Math.max(1, activeCode.split('\n').length);
  const lines = useMemo(() => Array.from({ length: lineCount }, (_, index) => index + 1), [lineCount]);

  const runCode = () => {
    setIsRunning(true);
    setConsoleLines(['Running playground...', ...resources.map((resource) => `Loaded ${resource}`)]);
    window.setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage({ type: 'run-playground' }, '*');
      setIsRunning(false);
    }, 160);
  };

  const clearWorkspace = () => {
    setPlayground((current) => ({ ...current, html: '', css: '', javascript: '', typescript: '' }));
    setConsoleLines(['Workspace cleared.']);
  };

  const applyTemplate = (name: string) => {
    const template = templates[name] ?? {};
    setPlayground((current) => ({
      ...current,
      ...template,
      activeFile: name === 'TypeScript' ? 'typescript' : 'html',
      template: name,
    }));
    setConsoleLines([`Template loaded: ${name}`]);
  };

  const saveWorkspace = () => {
    localStorage.setItem('code-playground', JSON.stringify(playground));
    setSavedAt(`Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  useEffect(() => {
    if (autoRun) runCode();
  }, [playground.html, playground.css, playground.javascript, playground.typescript, autoRun]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<{ type?: string; level?: string; value?: string }>) => {
      if (event.data?.type === 'console') setConsoleLines((current) => [...current, `${event.data.level === 'error' ? '✕' : '›'} ${event.data.value ?? ''}`]);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const executableCode = playground.activeFile === 'typescript' ? transpileTypeScript(playground.typescript) : playground.javascript;
  const previewDocument = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${playground.css}</style>${resources.filter((url) => url.endsWith('.css')).map((url) => `<link rel="stylesheet" href="${url}">`).join('')}</head><body>${playground.html}<script>['log','warn','error'].forEach(level => { const original = console[level]; console[level] = (...args) => { parent.postMessage({ type: 'console', level, value: args.map(String).join(' ') }, '*'); original(...args); }; });\ntry { ${executableCode.replace(/<\/script>/gi, '<\\/script>')} } catch (error) { parent.postMessage({ type: 'console', level: 'error', value: error.stack || String(error) }, '*'); }<\/script>${resources.filter((url) => url.endsWith('.js')).map((url) => `<script src="${url}"></script>`).join('')}</body></html>`;

  return (
    <div className={`playground ${theme}`}>
      <header className="playground-toolbar">
        <div className="playground-title"><span className="playground-icon">&lt;/&gt;</span><div><strong>Code Playground</strong><span className="playground-breadcrumb">Dashboard / Workspace</span></div></div>
        <div className="toolbar-actions">
          <select aria-label="Template" value={playground.template} onChange={(event) => applyTemplate(event.target.value)}>{Object.keys(templates).map((name) => <option key={name}>{name}</option>)}</select>
          <button className="tool-button primary" onClick={runCode} title="Run code">{isRunning ? 'Running...' : '▶ Run'}</button>
          <button className="tool-button" onClick={() => setConsoleLines(['Stopped.'])} title="Stop execution">■ Stop</button>
          <button className="tool-button" onClick={clearWorkspace} title="Clear workspace">Clear</button>
          <button className={`toggle ${autoRun ? 'on' : ''}`} onClick={() => setAutoRun((current) => !current)} aria-pressed={autoRun}>Auto Run <span /></button>
          <button className="icon-button" onClick={() => setShowSettings((current) => !current)} title="Editor settings">⚙</button>
          <button className="share-button" onClick={() => setShowShare(true)}>Share</button>
        </div>
      </header>

      <div className="playground-subbar">
        <div className="workspace-tabs"><span className="workspace-label">WORKSPACE</span><button className="file-tab active">playground <span>×</span></button><button className="new-file" title="Create file">+</button></div>
        <div className="subbar-actions"><span className="save-state">● {savedAt}</span><button onClick={saveWorkspace}>Save</button><button onClick={() => setShowResources((current) => !current)}>Resources <span className="count-badge">{resources.length}</span></button><select aria-label="Panel layout" value={layout} onChange={(event) => setLayout(event.target.value as Layout)}><option value="preview-right">Preview right</option><option value="preview-bottom">Preview bottom</option><option value="columns">Columns</option><option value="rows">Rows</option></select></div>
      </div>

      {showResources && <section className="resources-panel"><div><span className="eyebrow">External resources</span><h3>Dependencies & CDN links</h3></div><div className="resource-add"><input value={resourceInput} onChange={(event) => setResourceInput(event.target.value)} placeholder="https://cdn.example.com/library.js" /><button onClick={() => { if (resourceInput.trim()) { setResources((current) => [...current, resourceInput.trim()]); setResourceInput(''); } }}>Add URL</button></div><div className="resource-list">{resources.map((resource) => <span key={resource}>{resource} <button onClick={() => setResources((current) => current.filter((item) => item !== resource))}>×</button></span>)}</div></section>}

      <div className={`playground-workspace layout-${layout}`}>
        <section className="editor-zone">
          <div className="editor-tabbar">{(Object.keys(fileLabels) as FileKey[]).map((file) => <button key={file} className={playground.activeFile === file ? 'active' : ''} onClick={() => setPlayground((current) => ({ ...current, activeFile: file }))}><span className={`file-dot ${file}`} />{fileLabels[file]}</button>)}<button className="add-tab">＋</button></div>
          <div className="editor-shell"><div className="line-numbers">{lines.map((line) => <span key={line}>{line}</span>)}</div><textarea spellCheck={false} value={activeCode} onChange={(event) => updateFile(event.target.value)} onKeyDown={(event) => { if (event.key === 'Tab') { event.preventDefault(); const start = event.currentTarget.selectionStart; const end = event.currentTarget.selectionEnd; updateFile(`${activeCode.slice(0, start)}${' '.repeat(2)}${activeCode.slice(end)}`); window.setTimeout(() => event.currentTarget.setSelectionRange(start + 2, start + 2)); } }} style={{ fontSize }} aria-label={`${fileLabels[playground.activeFile]} editor`} /></div>
          <footer className="editor-status"><span>Ln 1, Col 1</span><span>{fileLabels[playground.activeFile]}</span><span>Spaces: 2</span><span>UTF-8</span><span>Prettier</span></footer>
        </section>
        <section className="preview-zone"><div className="panel-header"><div><span className="live-dot" /> Live Preview</div><div><button onClick={runCode} title="Reload preview">↻</button><button title="Open preview in new window" onClick={() => window.open(iframeRef.current?.srcdoc, '_blank')}>↗</button></div></div><iframe ref={iframeRef} title="Sandboxed live preview" sandbox="allow-scripts" srcDoc={previewDocument} /></section>
      </div>

      <section className="bottom-panel"><div className="bottom-tabs"><button className="active">☷ Console <span>{consoleLines.length}</span></button><button>⚠ Problems <span>0</span></button><button>▣ Output</button><button>⇄ Network</button></div><div className="console-output">{consoleLines.map((line, index) => <div key={`${line}-${index}`} className={line.includes('✕') ? 'error' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{line}</div>)}</div></section>

      {showSettings && <div className="playground-popover settings-popover"><div className="popover-heading"><strong>Editor settings</strong><button onClick={() => setShowSettings(false)}>×</button></div><label>Theme<select value={theme} onChange={(event) => setTheme(event.target.value as Theme)}><option value="dark">Dark</option><option value="light">Light</option><option value="system">System</option></select></label><label>Font size <input type="range" min="12" max="20" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} /><span>{fontSize}px</span></label><label className="setting-check"><input type="checkbox" checked={autoRun} onChange={(event) => setAutoRun(event.target.checked)} /> Auto-run changes</label><label className="setting-check"><input type="checkbox" defaultChecked /> Word wrap</label><label className="setting-check"><input type="checkbox" defaultChecked /> Line numbers</label></div>}
      {showShare && <div className="modal-backdrop"><div className="share-modal"><div className="popover-heading"><div><span className="eyebrow">Publish workspace</span><h2>Share your playground</h2></div><button onClick={() => setShowShare(false)}>×</button></div><p>Anyone with this link can open a read-only snapshot of your current workspace.</p><input readOnly value={`${window.location.origin}/playground/${makeId()}`} /><div className="share-actions"><button onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy link</button><button onClick={() => navigator.clipboard?.writeText(`<iframe src="${window.location.href}" title="Code Playground"></iframe>`)}>Copy embed</button></div></div></div>}
    </div>
  );
}
