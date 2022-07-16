function CardComponent(props) {
    return (
        <div className="card"
            style={{ backgroundColor: props.cardColor }}
            key={props.cardColor}
            id={props.CardColor}
            onClick={props.handleClick}
        ></div>
    )
}

export default CardComponent;