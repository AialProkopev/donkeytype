import type {TypingStateType} from '@/types/useTypingGameTypes';

export enum ActionType {
	_ONTEXTCHANGE = 'INTERNAL/ONTEXTCHANGE',
	RESET = 'RESET',
	END = 'END',
	TYPINGINSERT = 'TYPING/INSERT',
	TYPINGDELETE = 'TYPING/DELETE',
	SETCURRENTINDEX = 'SET/CURRENTINDEX',
}

export type ActionItemType =
  | {type: ActionType.RESET; payload?: undefined}
  | {type: ActionType.END; payload?: undefined}
  | {type: ActionType.TYPINGDELETE; payload: boolean}
  | {type: ActionType.TYPINGINSERT; payload: string | undefined}
  | {type: ActionType.SETCURRENTINDEX; payload: number}
  | {type: ActionType._ONTEXTCHANGE; payload: TypingStateType};

