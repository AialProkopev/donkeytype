import React from 'react';
import { trainingWords, shuffleWords } from '@/data/words';
import useTypingGame, { CharStateType } from 'react-typing-game-hook';

const someText: string = shuffleWords(trainingWords).join(' ');

export const Game = () => {
    const {
        states: { chars, charsState },
        actions: { insertTyping, resetTyping, deleteTyping },
    } = useTypingGame(someText, { pauseOnError: true });

    const handleOnKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const { key } = e;

            e.preventDefault();

            if (key === 'Escape') {
                resetTyping();
                return;
            }

            if (key === 'Backspace') {
                deleteTyping(false);
                return;
            }

            if (key.length === 1) {
                insertTyping(key);
            }
        },
        [deleteTyping, insertTyping, resetTyping]
    );

    return (
        <main>
            <div className="relative">
                {/* <span id="caret" className="absolute w-px h-6" style={{ left: shiftCaret }} /> */}
                <span id="caret" className="absolute w-px h-6" />
                <div id="words" className="text-2xl" onKeyDown={handleOnKeyDown} tabIndex={0}>
                    {chars.split('').map((char: string, index: number) => {
                        const state = charsState[index];

                        const color =
                            state === CharStateType.Incomplete
                                ? ''
                                : state === CharStateType.Correct
                                ? 'correct-letter'
                                : 'error-letter';

                        return (
                            <span id="letter" key={char + index.toString()} className={color}>
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};
