import './App.css';
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from "wouter";
import Leaderboard from './components/Leaderboard';

function Home() {
    // Retrieve leaderboard data from local storage
    const storedData = localStorage.getItem('Leaderboard');
    const leaderboardData = storedData ? JSON.parse(storedData) : [];

    return (
        <Container fluid className="Home-background">
            <video className="logo-video" autoPlay muted>
                 <source
                  src="zoombies_logo.webm"
                  type="video/mp4"
                  />
            </video>
            <h1 className="gameTitle">CLICK A MINI-GAME TO PLAY</h1>




            <div className="Matchgame">
                <Link href="/Match"> 
                    <img src="match.png" alt="Match Game" />
                </Link>
            </div>

            <div className="Sortgame">
                <Link href="/Sort"> 
                    <img src="sort.png" alt="Sort Game" />
                </Link>
            </div>

            <div className="Catchgame">
                <Link href="/Catch"> 
                    <img src="catch.png" alt="Catch Game" />
                </Link>
            </div>




            <div className="leaderboard-match"></div>
            <div className="leaderboard-sort"></div>
            <div className="leaderboard-catch"></div>


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
