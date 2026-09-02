export type SectionTopic = {
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

export type SectionKey = 'react' | 'javascript' | 'node' | 'angular' | 'interview';

export const sectionLabels: Record<SectionKey, string> = {
  react: 'React',
  javascript: 'JavaScript',
  node: 'Node.js',
  angular: 'Angular',
  interview: 'Interview Questions',
};
