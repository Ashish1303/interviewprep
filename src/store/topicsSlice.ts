import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { angularTopics } from '../data/angularTopics';
import { interviewTopics } from '../data/interviewTopics';
import { javascriptTopics } from '../data/javascriptTopics';
import { nodeTopics } from '../data/nodeTopics';
import { topics } from '../data/topics';
import type { SectionKey, SectionTopic } from '../data/sectionTypes';

const reactTopics: SectionTopic[] = topics.map((topic) => ({
  slug: topic.slug,
  title: topic.title,
  summary: topic.summary,
  whyItMatters: topic.whyItMatters,
  questions: topic.questions,
  code: topic.code,
  commonMistakes: topic.commonMistakes,
  seniorTips: topic.seniorTips,
  useCase: topic.useCase,
}));

type TopicsState = {
  topicsBySection: Record<SectionKey, SectionTopic[]>;
  completedBySection: Record<SectionKey, string[]>;
};

const initialCompleted = (): Record<SectionKey, string[]> => {
  if (typeof window === 'undefined') {
    return { react: [], javascript: [], node: [], angular: [], interview: [] };
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem('interview-prep-progress') ?? '{}');
    const previousReactProgress = JSON.parse(window.localStorage.getItem('react-interview-completed') ?? '[]');
    return {
      react: stored.react ?? previousReactProgress,
      javascript: stored.javascript ?? [],
      node: stored.node ?? [],
      angular: stored.angular ?? [],
      interview: stored.interview ?? [],
    };
  } catch {
    return { react: [], javascript: [], node: [], angular: [], interview: [] };
  }
};

const initialState: TopicsState = {
  topicsBySection: {
    react: reactTopics,
    javascript: javascriptTopics,
    node: nodeTopics,
    angular: angularTopics,
    interview: interviewTopics,
  },
  completedBySection: initialCompleted(),
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    toggleCompletion: (
      state,
      action: PayloadAction<{ section: SectionKey; slug: string }>,
    ) => {
      const completed = state.completedBySection[action.payload.section];
      const index = completed.indexOf(action.payload.slug);
      if (index >= 0) completed.splice(index, 1);
      else completed.push(action.payload.slug);
    },
  },
});

export const { toggleCompletion } = topicsSlice.actions;
export default topicsSlice.reducer;
