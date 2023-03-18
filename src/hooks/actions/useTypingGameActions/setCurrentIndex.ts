import { type ActionItemType } from './index';
import { type TypingStateType } from '@/types/useTypingGameTypes';

export default (state: TypingStateType, action: ActionItemType): TypingStateType => {
  const { text, length } = state;
  const payload = action.payload ?? null;

  if (payload && typeof payload === 'number' && payload >= -1 && payload < length) {
    return { ...state, currIndex: payload, currChar: text[payload] };
  }

  return state;
};
