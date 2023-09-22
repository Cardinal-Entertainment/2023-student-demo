import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from "wouter";
import Leaderboard from './components/Leaderboard';
import nakamaInstance from './utils/nakama';

// async function call_nakama_async() {
//     const session = await nakamaInstance.getNakamaUserSession();

//     console.log(await nakamaInstance.client.getAccount(session));

//     const result = await nakamaInstance.client.listLeaderboardRecords(session, 'bonez_wins', null, 10);
    
//     console.log(result.records);
//     result.records.forEach(function(record){
//         //console.log(record);
//         console.log("%o:%o", record.username, record.score, record.rank);
//     });
// }

const GAMES = [ // !!!!!!!!!!!!! Change id later !!!!!!!!!!!!!!!!
    { id: "bonez_zoom_won", storageKey: "Leaderboard_Match", className: "Matchgame" },
    { id: "bonez_wins", storageKey: "Leaderboard_Sort", className: "Sortgame" },
    { id: "bone_god", storageKey: "Leaderboard_Catch", className: "Catchgame" }
  ];

function Home() {

    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data for each game
        GAMES.forEach(async game => {
            const session = await nakamaInstance.getNakamaUserSession();

            // Assuming each game's leaderboard is identified by the game's id in the Nakama server
            const result = await nakamaInstance.client.listLeaderboardRecords(session, game.id, null, 10);

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


    // Retrieve leaderboard data from local storage
    // const leaderboards = GAMES.map(game => {
    //     const storedData = localStorage.getItem(game.storageKey);
    //     return storedData ? JSON.parse(storedData) : [];
    // });

    // call_nakama_async();


    return (
        <Container fluid className="Home-background">
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
            <h3 className="match-text">Match Game</h3>     <h3 className="catch-text">Catch Game  </h3>       <h3 className="sort-text">Sort Game</h3>
            </div>


             <div className="image">
                <div className="Matchgame">
                 <Link href="/match">
                    <div className="game-image-container">
                        <img src="images/match.png" alt="Match Game" className="match-image" />
                        <div className="image-hover-text">Click to Play</div>
                    </div>
                 </Link>
                </div>

            <div className="Sortgame">
                <Link href="/sort">
                <div className="game-image-container">
                    <img src="images/sort.png" alt="Sort Game" className="sort-image" />
                    <div className="image-hover-text">Click to Play</div>
                </div>
                </Link>
            </div>

            <div className="Catchgame">
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
                            <Leaderboard data={leaderboardData[game.id] || []} />
                        </div>
                    </React.Fragment>
                ))}
            </div>


        </Container>

    );
}

export default Home;
