import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import './GameDisplay.css'

function GameDisplay(props) {
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [cardsList, setCardsList] = useState(['red', 'palevioletred', 'burlywood', 'lightskyblue', 'lightgreen', 'orange', 'purple', 'brown', 'blue', 'black', 'yellow', 'lightseagreen'])
    const [selectedCards, setSelectedCards] = useState([]);

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

    useEffect(() => {
        //shuffle cards after card select.
        setCardsList(prevCardsList => randomizeArray(prevCardsList));
    }, [selectedCards])

    useEffect(() => {
        //set score to 1 on first card select.
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

    // const checkForWin = () => {
    //     return score === 10 ? blah : blah
    // }

    const selectCard = (card) => {
        setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
    }

    return (
        <div className="game-container">
            <div className="header-container">
                <div className="title-container">
                    <h1 className="game-title">Memory Game</h1>
                </div>
                <div className="score-container">
                    <p className="score-tag">Score:</p>
                    <p className="score">{score}</p>
                </div>
            </div>
            <div className="card-display">{cardsList.map(card => {
                return (
                    <CardComponent
                        key={`${card}`}
                        cardColor={`${card}`}
                        handleClick={() => selectCard(card)}
                    />
                )
            })}
            </div>
        </div>
    )
}

export default GameDisplay;