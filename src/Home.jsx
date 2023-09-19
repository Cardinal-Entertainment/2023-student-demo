import './App.css';
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from "wouter";
import Leaderboard from './components/Leaderboard';

const GAMES = [
    { id: "Catch", storageKey: "Leaderboard_Catch", className: "Catchgame" },
    { id: "Match", storageKey: "Leaderboard_Match", className: "Matchgame" },
    { id: "Sort", storageKey: "Leaderboard_Sort", className: "Sortgame" }
  ];

function Home() {
    // Retrieve leaderboard data from local storage
    const leaderboards = GAMES.map(game => {
        const storedData = localStorage.getItem(game.storageKey);
        return storedData ? JSON.parse(storedData) : [];
    });

    return (
        <Container fluid className="Home-background">
            <video className="logo-video" autoPlay muted>
                 <source
                  src="logo_animation.mp4"
                  type="video/mp4"
                  />
            </video>
            <h1 className="gameTitle">CLICK A MINI-GAME TO PLAY</h1>
            <div className="Matchgame"></div>
            <div className="Sortgame"></div>
            <div className="Catchgame"></div>
            
            {GAMES.map((game, index) => (
              <React.Fragment key={game.id}>
                <div className={game.className}></div>
                <div className={`leaderboard-${game.id.toLowerCase()}`}>
                    <Leaderboard data={leaderboards[index]} />
                </div>
              </React.Fragment>
            ))}


        </Container>

        // <Container fluid className="Home-background">
        //     <header className="site-header">
        //       <video className="video-size" autoPlay muted>
        //         <source
        //           src="logo_animation.mp4"
        //           type="video/mp4"
        //           />
        //       </video>
        //       <audio controls autoPlay loop>
        //         <source src="./sounds/homeBackground.mp3" type="audio/mpeg" />
        //       </audio>
        //     </header>
        //     <h1 className="Home-title">
        //         Sort Game
        //     </h1>
            
        //     {/* Bottom components aligned */}
        //     <div className="bottom-container">
        //         <h3 className="Home-summary">Sort the cards into the boxes before time runs out! If you drag and drop a card in corresponding crate, you earn 1 score. Otherwise, you lose 1 score.</h3>
        //         <div className="buttons">
        //             <Link href="/Game">
        //                 <Button size="lg">Start game</Button>
        //             </Link>
        //             <Button size="md" onClick={handleResetClick} className="Reset-button" >Reset Leaderboard</Button>
        //         </div>
        //         <div className="Leaderboard">
        //             <Leaderboard data={leaderboardData} />
        //         </div>
        //     </div>
        // </Container>
    );
}

export default Home;
