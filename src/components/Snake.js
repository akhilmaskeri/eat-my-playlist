import {  useEffect, useState } from 'react';
import SnakeHead from './SnakeHead'
import SnakeBody from './SnakeBody';

const Snake = ({direction, paused, height, width, x, y, fx, fy, eat, resetFood, isGameOver, setIsGameOver}) => {

    // const [height, setHeight] = useState(20);
    // const [width, setWidth] = useState(20);

    const [positions, setPositions] = useState([   
        {'x': x, 'y': y},
    ]);

    const [dirX, setDirX] = useState(0);
    const [dirY, setDirY] = useState(0);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    useEffect(() => {

        if (paused || isGameOver) return;
        
        const moveSnake = () => {

            if(!(dirX === 0 && dirY === 0)){
                setPositions(positions => {

                    const newX = positions[0].x + dirX*width;
                    const newY = positions[0].y + dirY*height;
    
                    if((newX < 0 || newX + width > screenWidth) || (newY < 0 || newY + height > screenHeight)){
                        setIsGameOver(true);
                        return positions;
                    }

                    let cx = newX;
                    let cy = newY;
                    let newPositions = [];

                    if(cx>=fx-(width) && cx<=fx+(width) && cy>=fy-(height) && cy<=fy+(height)){
                        resetFood(true);
                        newPositions.push(positions[0]);
                    }

                    for(let i=5; i<positions.length; i++){
                        let bx = positions[i].x;
                        let by = positions[i].y;

                        if(cx>=bx-(width/2) && cx<=bx+(width/2) && cy>=by-(height/2) && cy<=by+(height/2)){
                            console.log(i, cx, cy, bx, by, 'over');
                            setIsGameOver(true);
                            return positions;
                        }
                    }


                    newPositions.push({'x': newX, 'y': newY});
                    for(let i=0; i<positions.length-1; i++){
                        newPositions.push(positions[i])
                    }
                    return newPositions;
                });    
            }
        };
    
        const gameLoop = setInterval(() => {
          moveSnake();
        }, 50);
    
        return () => clearInterval(gameLoop);
      }, [dirX, dirY, paused, eat]);
    
    useEffect(() => {

        if(dirX === 0){
            if(direction === 'right'){
                setDirX(1);
                setDirY(0);
            }
            if(direction === 'left'){
                setDirX(-1);
                setDirY(0);
            }
        }

        if(dirY === 0){
            if(direction === 'up'){
                setDirY(-1);
                setDirX(0);
            }
            if(direction === 'down'){
                setDirY(1);
                setDirX(0);
            }
        }
    }, [direction]);

    const Body = () => {
        let body = [];
        for(var i=1; i<positions.length; i++){
            body.push(
                <SnakeBody 
                    x={positions[i].x} 
                    y={positions[i].y} 
                    height={height} 
                    width={width}
                />)
        }
        return body;
    }

    return (
        <div>
            <SnakeHead 
                height={height} 
                width={width} 
                x={positions[0].x} 
                y={positions[0].y}
            />
            
            {Body()}
        </div>
    )
}

export default Snake;