export enum PhaseType {
  NotStarted = 0,
  Started = 1,
  Ended = 2,
}
// For each character
export enum CharStatusType {
  Incomplete = 0,
  Correct = 1,
  Incorrect = 2,
}

type CountErrorTypes = 'everytime' | 'once';

export type TypingOptionsType = {
  skipCurrentWordOnSpace: boolean;
  pauseOnError: boolean;
  countErrors: CountErrorTypes;
};
export type TypingStateType = {
  text: string;
  textState: CharStatusType[];
  length: number;
  currIndex: number;
  currChar: string;
  correctChar: number;
  errorChar: number;
  phase: PhaseType;
  startTime: number | undefined;
  endTime: number | undefined;
} & TypingOptionsType;
export type TypingActionType = {
  getDuration: () => number;
  resetTyping: () => void;
  endTyping: () => void;
  insertTyping: (char?: string) => void;
  deleteTyping: (deleteWord?: boolean) => void;
  setCurrIndex: (num: number) => boolean;
};
