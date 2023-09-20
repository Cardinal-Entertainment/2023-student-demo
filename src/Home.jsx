import './App.css';
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from "wouter";
import Leaderboard from './components/Leaderboard';

const GAMES = [
    { id: "Match", storageKey: "Leaderboard_Match", className: "Matchgame" },
    { id: "Sort", storageKey: "Leaderboard_Sort", className: "Sortgame" },
    { id: "Catch", storageKey: "Leaderboard_Catch", className: "Catchgame" }
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
                  src="zoombies_logo.webm"
                  type="video/mp4"
                  />
            </video>
            <h1 className="gameTitle">CLICK A MINI-GAME TO PLAY</h1>

            <div className="image">
            <div className="Matchgame">
                <Link href="/Match"> 
                    <img src="images/match.png" alt="Match Game" className="game-image" />
                </Link>
            </div>

            <div className="Sortgame">
                <Link href="/Sort"> 
                    <img src="images/sort.png" alt="Sort Game" className="game-image" />
                </Link>
            </div>

            <div className="Catchgame">
                <Link href="/Catch"> 
                    <img src="images/catch.png" alt="Catch Game" className="game-image" />
                </Link>
            </div>
            </div>

            <div className="Leaderboards">
                {GAMES.map((game, index) => (
                <React.Fragment key={game.id}>
                        <div className={`leaderboard-${game.id.toLowerCase()}`}>
                            <Leaderboard data={leaderboards[index]} />
                        </div>
                </React.Fragment>
                ))}
            </div>


        </Container>

    );
}

export default Home;
