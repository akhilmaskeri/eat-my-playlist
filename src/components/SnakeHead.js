const SnakeHead = ({height, width, x, y, direction}) => {

    const getRotation = () => {
        switch(direction) {
            case 'right': return 0;
            case 'down': return 90;
            case 'left': return 180;
            case 'up': return 270;
            default: return 0;
        }
    }
    
    return (
        <div 
            className={`absolute m-1`}
            style={{
                top: `${y}px`,
                left: `${x}px`,
                height: `${height-1}px`,
                width: `${width-1}px`,
                backgroundColor: 'black',
                clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                transform: `rotate(${getRotation()}deg)`,
                transformOrigin: 'center',
            }}
        >
        </div>
    )
}

export default SnakeHead;