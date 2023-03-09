import useTypingGame from '@/hooks/useTypingGame';
import {CharStatusType, PhaseType} from '@/types/useTypingGameTypes';
export const Game = () => {
	const someText = 'Hello world from react';
	const {
		states: {
			startTime,
			endTime,
			textState,
			currIndex,
			currChar,
			correctChar,
			errorChar,
			phase,
		},
		actions: {
			resetTyping,
			deleteTyping,
			insertTyping,
		},
	} = useTypingGame(someText);

	const handleKey = (key: any) => {
		if (key === 'Escape') {
			resetTyping();
			return;
		}

		if (key === 'Backspace') {
			deleteTyping(false);
			return;
		}

		if (key.length === 1) {
			insertTyping(key as string);
		}
	};

	return (
		<div>
			<h1>React Typing Game Hook Demo</h1>
			<p>Click on the text below and start typing (esc to reset)</p>
			<div
				className='typing-test'
				onKeyDown={e => {
					handleKey(e.key);
					e.preventDefault();
				}}
				tabIndex={0}
			>
				{someText.split('').map((char: string, index: number) => {
					const state = textState[index];
					const color = state === CharStatusType.Incomplete ? 'black' : state === CharStatusType.Correct ? 'green' : 'red';
					return (
						<span
							key={char + index.toString()}
							style={{color}}
							className={currIndex + 1 === index ? 'curr-letter' : ''}
						>
							{char}
						</span>
					);
				})}
			</div>
			<pre>
				{JSON.stringify(
					{
						startTime,
						endTime,
						length,
						currIndex,
						currChar,
						correctChar,
						errorChar,
						phase: PhaseType[phase],
					},
					null,
					2,
				)}
			</pre>
		</div>
	);
};
