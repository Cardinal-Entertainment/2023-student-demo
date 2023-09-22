import './App.css';
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from "wouter";
import Leaderboard from './components/Leaderboard';
import nakamaInstance from './utils/nakama';

async function call_nakama_async() {
    const session = await nakamaInstance.getNakamaUserSession();

    console.log(await nakamaInstance.client.getAccount(session));

    const result = await nakamaInstance.client.listLeaderboardRecords(session, 'bonez_wins');
    
    result.records.forEach(function(record){
        //console.log(record);
        console.log("%o:%o", record.username, record.score, record.rank);
    });
}

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

    call_nakama_async();

    return (
        <Container fluid className="Home-background">
            <video className="logo-video" autoPlay muted>
                 <source
                  src="zoombies_logo.webm"
                  type="video/mp4"
                  />
            </video>
            <h1 className="gameTitle">CLICK A MINI-GAME TO PLAY</h1>



            <div className='gameText'>
            <h3 className="match-text">Match Game</h3>     <h3 className="catch-text">Catch Game  </h3>       <h3 className="sort-text">Sort Game</h3>
            </div>


            <div className="image">
            <div className="Matchgame">
                <Link href="/match"> 
                    <img src="images/match.png" alt="Match Game" className="match-image" />
                </Link>
            </div>

            <div className="Sortgame">
                <Link href="/sort"> 
                    <img src="images/sort.png" alt="Sort Game" className="sort-image" />
                </Link>
            </div>

            <div className="Catchgame">
                <Link href="/catch"> 
                    <img src="images/catch.png" alt="Catch Game" className="catch-image" />
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
