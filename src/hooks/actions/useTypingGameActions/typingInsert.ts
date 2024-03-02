import { type ActionItemType } from './index';
import { type TypingStateType } from '@/types/useTypingGameTypes';

export default (state: TypingStateType, action: ActionItemType): TypingStateType => {
    let { currIndex, correctChar, errorChar, phase } = state;

    const {
        startTime,
        endTime,
        text,
        textState,
        length,
        skipCurrentWordOnSpace,
        pauseOnError,
        countErrors,
    } = state;

    const letter = action.payload ?? null;
    let newStartTime = startTime;
    let newEndedTime = endTime;

    if (phase === 2) {
        return state;
    }

    if (phase === 0) {
        phase = 1;
        newStartTime = new Date().getTime();
    }

    const newTextState = [...textState];

    if (letter === ' ' && text[currIndex + 1] !== ' ' && skipCurrentWordOnSpace) {
        const newCurrIndex = text.indexOf(letter, currIndex);
        currIndex = newCurrIndex === -1 ? length - 1 : newCurrIndex;
    } else if (letter !== null) {
        if (text[currIndex + 1] !== letter) {
            if (newTextState[currIndex + 1] === 2) {
                if (countErrors === 'everytime') {
                    errorChar += 1;
                }
            } else {
                newTextState[currIndex + 1] = 2;
                errorChar += 1;
            }

            if (!pauseOnError) {
                currIndex += 1;
            }
        } else {
            if (newTextState[currIndex + 1] === 2 && pauseOnError && countErrors === 'once') {
                errorChar -= 1;
            }

            newTextState[currIndex + 1] = 1;
            correctChar += 1;
            currIndex += 1;
        }
    } else {
        currIndex += 1;
    }

    if (currIndex >= length - 1) {
        newEndedTime = new Date().getTime();
        phase = 2;
    }

    const currChar = currIndex >= 0 ? text[currIndex] : '';

    return {
        ...state,
        textState: newTextState,
        errorChar,
        correctChar,
        currIndex,
        currChar,
        phase,
        startTime: newStartTime,
        endTime: newEndedTime,
    };
};
