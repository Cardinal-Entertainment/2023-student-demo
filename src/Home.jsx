import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from "wouter";
import Leaderboard from './components/Leaderboard';
import nakamaInstance from './utils/nakama';
import LandscapeModal from "./components/LandscapeModal";
import PwaModal from './components/PwaModal'
import { Modal } from 'react-bootstrap';

const GAMES = [
    { id: "minigame_match", storageKey: "Leaderboard_Match", className: "Matchgame" },
    { id: "minigame_sort", storageKey: "Leaderboard_Sort", className: "Sortgame" },
    { id: "minigame_catch", storageKey: "Leaderboard_Catch", className: "Catchgame" }
];

function Home() {
    const [isShowingLandscapeModal, setIsShowingLandscapeModal] = useState(false);
    const [isShowingPwaModal, setIsShowingPwaModal] = useState(false);
    const [isChrome, setIsChrome] = useState(false);
    const [isSafari, setIsSafari] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data for each game
        GAMES.forEach(async game => {
            const session = await nakamaInstance.getNakamaUserSession();
            const result = await nakamaInstance.client.listLeaderboardRecords(session, game.id, null, 5);
            const transformedData = result.records.map(record => ({
                username: record.username,
                numOfPlay: record.num_score, // Adjust as needed.
                score: record.score
            }));
            // Store the fetched data in the state object under the respective game's id
            setLeaderboardData(prevLeaderboards => ({
                ...prevLeaderboards,
                [game.id]: transformedData
            }));
        });
    }, []); // Empty dependency array to fetch once on component mount

    useEffect(() => {
        const checkWindowDimensions = () => {
            if (window.innerHeight > window.innerWidth) {
                setIsShowingLandscapeModal(true);
            } else {
                setIsShowingLandscapeModal(false);
            }
        };

        // Call the function to check window dimensions immediately after component mount
        checkWindowDimensions();

        // Attach event listener to update dimensions and state when the window is resized
        window.addEventListener("resize", checkWindowDimensions);

        // Clean up the event listener on component unmount to avoid memory leaks
        return () => {
            window.removeEventListener("resize", checkWindowDimensions);
        };
    }, []); // Empty dependency array, so the effect runs once after the initial render and sets up the event listener

    return (
        <Container fluid className="Home-background">
            <Modal show={isShowingLandscapeModal} centered>
                <LandscapeModal />
            </Modal>


            <audio autoPlay loop className='background-audio'>
                <source src="./sounds/homeBackground.mp3" type="audio/mpeg" />
            </audio>            
            <video className="logo-video" autoPlay muted>
                 <source
                  src="zoombies_logo.webm"
                  type="video/mp4"
                  />
            </video>
            <h1 className="gameTitle">CLICK A MINI-GAME TO PLAY</h1>



            <div className='gameText'>
            <h3 className="match-text">Match Game</h3>     <h3 className="sort-text">Sort Game</h3>    <h3 className="catch-text">Catch Game  </h3>  
            </div>


             <div className="image">
                <div>
                 <Link href="/match">
                    <div className="game-image-container">
                        <img src="images/match.png" alt="Match Game" className="match-image" />
                        <div className="image-hover-text">Click to Play</div>
                    </div>
                 </Link>
                </div>

                <div>
                    <Link href="/sort">
                    <div className="game-image-container">
                        <img src="images/sort.png" alt="Sort Game" className="sort-image" />
                        <div className="image-hover-text">Click to Play</div>
                    </div>
                    </Link>
                </div>

                <div>
                    <Link href="/catch">
                    <div className="game-image-container">
                        <img src="images/catch.png" alt="Catch Game" className="catch-image" />
                        <div className="image-hover-text">Click to Play</div>
                    </div>
                    </Link>
                </div>
            </div>


            <div className="Leaderboards">
                {GAMES.map((game, index) => (
                    <React.Fragment key={game.id}>
                        <div className={`leaderboard-${game.id.toLowerCase()}`}>
                            <Leaderboard data={leaderboardData[game.id] || []} className={game.className}/>
                        </div>
                    </React.Fragment>
                ))}
            </div>


        </Container>

    );
}

export default Home;
