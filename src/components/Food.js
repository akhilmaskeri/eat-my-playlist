const Food = ({x, y, height, width}) => {
    return (
        <div className="absolute border-black border"
            style={{left: `${x}px`, top: `${y}px`, height: `${height}px`, width: `${width}px`}}
        >
            
        </div>
    )
}

export default Food;