const SnakeHead = ({height, width, x, y}) => {
    
    return (
        <div 
            className={`border bg-black border-black absolute m-1`}
            style={{ top: `${y}px`, left: `${x}px`, height: `${height-1}px`, width: `${width-1}px`}}
        >
        </div>
    )
}

export default SnakeHead;