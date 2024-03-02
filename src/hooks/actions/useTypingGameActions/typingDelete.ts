import { type ActionItemType } from './index';
import { type TypingStateType } from '@/types/useTypingGameTypes';

export default (state: TypingStateType, action: ActionItemType): TypingStateType => {
    let { currIndex, correctChar, errorChar } = state;
    const { text, textState, phase, countErrors } = state;

    const payload = action.payload ?? null;

    if (phase !== 1 || currIndex === -1) {
        return state;
    }

    const newTextState = [...textState];

    if (payload) {
        let newIndex = text.lastIndexOf(' ', currIndex);
        newIndex = newIndex === -1 ? 0 : newIndex + 1;
        for (let i = currIndex; i >= newIndex; i--) {
            if (newTextState[i] === 1) {
                correctChar -= 1;
            } else if (newTextState[i] === 2) {
                if (countErrors === 'once') {
                    errorChar -= 1;
                }
            }

            newTextState[i] = 0;
        }

        currIndex = newIndex;
    } else {
        if (newTextState[currIndex] === 1) {
            correctChar -= 1;
        } else if (newTextState[currIndex] === 2) {
            if (countErrors === 'once') {
                errorChar -= 1;
            }
        }

        newTextState[currIndex] = 0;
    }

    if (currIndex !== -1) {
        currIndex -= 1;
    }

    const currChar = currIndex >= 0 ? text[currIndex] : '';

    return {
        ...state,
        currIndex,
        currChar,
        textState: newTextState,
        correctChar,
        errorChar,
    };
};
