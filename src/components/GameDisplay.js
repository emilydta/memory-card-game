import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import './GameDisplay.css'

function GameDisplay() {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [cardsList, setCardsList] = useState(['red', 'palevioletred', 'burlywood', 'lightskyblue', 'lightgreen', 'orange', 'purple', 'brown', 'blue', 'black', 'yellow', 'lightseagreen'])
    const [selectedCards, setSelectedCards] = useState([]);


    useEffect(() => {
        //shuffle cards after card select.
        setCardsList(prevCardsList => randomizeArray(prevCardsList));
    }, [selectedCards])

    useEffect(() => {
        //update best score
        if (score > bestScore) {
            setBestScore(score)
        }

        //set score to 1 after first turn.
        if (selectedCards.length === 1) {
            setScore(1)
        }

        //if there's a match
        if (selectedCards.length > 1 && selectedCards.length !== new Set(selectedCards).size) {
            setSelectedCards([]);
            setScore(0);

            //if there's no match
        } else if (selectedCards.length > 1 && selectedCards.length === new Set(selectedCards).size) {
            setScore(prevScore => prevScore + 1)
        }
    }, [cardsList])

    const randomizeArray = (array) => {
        let copyArray = [...array];
        const newArray = [];

        while (copyArray.length > 0) {
            let randomIndx = Math.floor(Math.random() * copyArray.length);
            newArray.push(copyArray[randomIndx]);

            copyArray = copyArray
                .slice(0, randomIndx)
                .concat(copyArray.slice(randomIndx + 1));
        };
        return newArray;
    }

    const selectCard = (card) => {
        setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
    }

    const restartGame = () => {
        setScore(0);
        setBestScore(0);
        setSelectedCards([]);
    }

    return (
        <div className="game-container">
            <div className="header-container">
                <div className="title-container">
                    <h1 className="game-title">Memory Game</h1>
                </div>
                <div className="score-container">
                    <div className="best-score-container">
                        <p className="score-tag">Best Score:</p>
                        <p className="score">{bestScore}</p>
                    </div>
                    <div className="current-score-container">
                        <p className="score-tag">Score:</p>
                        <p className="score">{score}</p>
                    </div>
                </div>
            </div>
            {score === 12 ?
                <div className="win-container">
                    <h1>You win!</h1>
                    <button type="button" className="play-again" onClick={restartGame}>Play Again?</button>
                </div> :
                <div className="card-display">{cardsList.map(card => {
                    return (
                        <CardComponent
                            key={`${card}`}
                            cardColor={`${card}`}
                            handleClick={() => selectCard(card)}
                        />
                    )
                })}
                </div>}

        </div>
    )
}

export default GameDisplay;