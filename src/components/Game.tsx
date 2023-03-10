import {useState, useEffect} from 'react';
import useTypingGame from '@/hooks/useTypingGame';
import {CharStatusType, PhaseType} from '@/types/useTypingGameTypes';
import {trainingWords, shuffleWords} from '@/data/words';

const someText: string = shuffleWords(trainingWords).join(' ');

export const Game = () => {
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

	const [shiftCaret, setShiftCaret] = useState<number>(0);
  const [statusTyping, setStatusTyping] = useState<number>(0);
	useEffect(() => {
		if (currIndex >= 0) {
			const words = [...document.querySelectorAll('#letter')];
			if (words) {
				if (statusTyping === 1) setShiftCaret(shiftCaret + words[currIndex].offsetWidth);
				if (statusTyping === 2) setShiftCaret(shiftCaret - words[currIndex].offsetWidth);
			}
		}
	}, [currIndex]);

  console.log(shiftCaret)

	const handleKey = (key: string) => {
		if (key === 'Escape') {
			resetTyping();
      setStatusTyping(0);
			return;
		}

		if (key === 'Backspace') {
			deleteTyping(false);
      setStatusTyping(2)
			return;
		}

		if (key.length === 1) {
			insertTyping(key as string);
      setStatusTyping(1);
		}
	};

	return (
		<main>
			<div className='relative'>
				<span id='caret' className='absolute w-px h-6' style={{left: shiftCaret}}/>
			  <div
					id='words'
			  	className='text-2xl'
			  	onKeyDown={e => {
			  		handleKey(e.key);
			  		e.preventDefault();
			  	}}
			  	tabIndex={0}
			  >
			  	{someText.split('').map((char: string, index: number) => {
			  		const state = textState[index];
			  		const color = state === CharStatusType.Incomplete ? '' : state === CharStatusType.Correct ? 'correct-letter' : 'error-letter';
			  		return (
			  			<span
								id='letter'
			  				key={char + index.toString()}
			  				className={color}
			  			>
			  				{char}
			  			</span>
			  		);
			  	})}
			  </div>
			</div>
		</main>
	);
};
