import {type TypingStateType} from '@/types/useTypingGameTypes';

export default (state: TypingStateType): TypingStateType => {
	const {text} = state;

	return {
		...state,
		startTime: undefined,
		endTime: undefined,
		textState: new Array(text.length).fill(0),
		currIndex: -1,
		currChar: '',
		correctChar: 0,
		errorChar: 0,
		phase: 0,
	};
};
