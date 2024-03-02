import React from 'react';
import { Game } from './Game';
import { Menu } from './Menu';
import { Footer } from './Footer';

function App() {
    return (
        <div id="app" className="grid grid-cols-ama justify-items-center">
            <div></div>
            <div id="content" className="w-full min-h-screen p-8 grid gap-8 grid-rows-a1a">
                <Menu />
                <Game />
                <Footer />
            </div>

            <div>Hello</div>
        </div>
    );
}

export default App;
