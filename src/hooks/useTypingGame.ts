import { type Reducer, useCallback, useEffect, useMemo, useReducer } from 'react';
import {
    RESET as reset,
    SETCURRENTINDEX as setCurrentIndex,
    END as end,
    TYPINGINSERT as typingInsert,
    TYPINGDELETE as typingDelete,
    ActionType,
    type ActionItemType,
} from './actions/useTypingGameActions';

import {
    PhaseType,
    TypingActionType,
    TypingOptionsType,
    TypingStateType,
    CharStatusType,
} from '../types/useTypingGameTypes';

const reducer: Reducer<TypingStateType, ActionItemType> = (state, action) => {
    switch (action.type) {
        case ActionType.SETCURRENTINDEX:
            return setCurrentIndex(state, action);
        case ActionType.RESET:
            return reset(state);
        case ActionType.END:
            return end(state);
        case ActionType.TYPINGINSERT:
            return typingInsert(state, action);
        case ActionType.TYPINGDELETE:
            return typingDelete(state, action);
        case ActionType._ONTEXTCHANGE:
            return action.payload;
        default: {
            return state;
        }
    }
};

const useTypingGame = (
    text = '',
    options: Partial<TypingOptionsType> = {}
): { states: TypingStateType; actions: TypingActionType } => {
    const initialState = useMemo<TypingStateType>(
        () => ({
            startTime: undefined,
            endTime: undefined,
            text,
            textState: new Array(text.length).fill(0) as CharStatusType[],
            length: text.length,
            currIndex: -1,
            currChar: '',
            correctChar: 0,
            errorChar: 0,
            phase: 0,
            skipCurrentWordOnSpace: true,
            pauseOnError: false,
            countErrors: 'everytime',
            ...options,
        }),
        [options, text]
    );

    const [states, dispatch] = useReducer<Reducer<TypingStateType, ActionItemType>>(
        reducer,
        initialState
    );

    useEffect(() => {
        dispatch({
            type: ActionType._ONTEXTCHANGE,
            payload: initialState,
        });
    }, [text, dispatch]);

    const getDuration = useCallback<TypingActionType['getDuration']>(() => {
        switch (states.phase) {
            case PhaseType.NotStarted: {
                return 0;
            }

            case PhaseType.Started: {
                return states.startTime ? new Date().getTime() - states.startTime : 0;
            }

            case PhaseType.Ended: {
                return states.startTime && states.endTime ? states.endTime - states.startTime : 0;
            }

            default:
                return 0;
        }
    }, [states.phase, states.startTime, states.startTime]);

    const resetTyping = useCallback<TypingActionType['resetTyping']>(() => {
        dispatch({ type: ActionType.RESET });
    }, [dispatch]);

    const endTyping = useCallback<TypingActionType['endTyping']>(() => {
        dispatch({ type: ActionType.END });
    }, [dispatch]);

    const insertTyping = useCallback<TypingActionType['insertTyping']>(
        (letter: string | undefined) => {
            const payload = letter ? letter[0] : undefined;
            dispatch({
                type: ActionType.TYPINGINSERT,
                payload,
            });
        },
        [dispatch]
    );

    const deleteTyping = useCallback<TypingActionType['deleteTyping']>(
        (deleteWord = false) => {
            dispatch({
                type: ActionType.TYPINGDELETE,
                payload: deleteWord || false,
            });
        },
        [dispatch]
    );

    const setCurrIndex = useCallback<TypingActionType['setCurrIndex']>(
        (num: number) => {
            if (num < -1 || num >= states.length || states.phase !== 2) {
                return false;
            }

            dispatch({
                type: ActionType.SETCURRENTINDEX,
                payload: num,
            });
            return true;
        },
        [dispatch, states.length, states.phase]
    );

    return {
        states,
        actions: {
            getDuration,
            resetTyping,
            endTyping,
            insertTyping,
            deleteTyping,
            setCurrIndex,
        },
    };
};

export default useTypingGame;
