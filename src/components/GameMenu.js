function GameMenu(props) {
    return (
        <div className="game-menu">
        <div className="header-container">
        <div className="title-container">
          <h1 className="game-title">Memory Game</h1>
        </div>
      </div>
            <div className="instructions-container">
                <h1 className="instructions-heading">How to play:</h1>
                <p className="instructions">Avoid clicking on the same colour twice.</p>
                <button type="button"
                    className='start-button'
                    onClick={props.handleClick}>Start</button>
            </div>
        </div>
    )
}

export default GameMenu;