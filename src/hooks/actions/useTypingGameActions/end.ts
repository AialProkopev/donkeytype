import {type TypingStateType} from '@/types/useTypingGameTypes';

export default (state: TypingStateType): TypingStateType => ({
	...state,
	phase: 2,
	endTime: new Date().getTime(),
});
