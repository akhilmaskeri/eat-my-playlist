import { useEffect, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";

const Board = () => {

    const [direction, setDirection] = useState();
    const [currentDirection, setCurrentDirection] = useState();
    const [paused, setPaused] = useState();

    const [player, setPlayer] = useState(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    const [size, setSize] = useState(20);

    const [foodX, setFoodX] = useState(Math.floor(Math.random() * (window.innerWidth)));
    const [foodY, setFoodY] = useState(Math.floor(Math.random() * (window.innerHeight)));

    const [x, setX] = useState(window.innerWidth/2);
    const [y, setY] = useState(window.innerHeight/2);

    const [eat, setEat] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);



    
    useEffect(() => {
        const handleKeyPress = (event) => {
            if(event.key === ' '){
                setPaused(prev => !prev);
                return;
            }

            if(paused || isGameOver) return;

            if(event.key === 'ArrowRight' && currentDirection !== 'left'){
                setDirection('right');
            }
            if(event.key === 'ArrowLeft' && currentDirection !== 'right'){
                setDirection('left');
            }
            if(event.key === 'ArrowUp' && currentDirection !== 'down'){
                setDirection('up');
            }
            if(event.key === 'ArrowDown' && currentDirection !== 'up'){
                setDirection('down');
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [currentDirection, paused, isGameOver])

    useEffect(()=> {
        if(eat === true){
            let fx = Math.floor(Math.random() * (window.innerWidth));
            let fy = Math.floor(Math.random() * (window.innerHeight));

            setFoodX(fx);
            setFoodY(fy);
            setEat(false);
        }
    }, [eat]);

    return (
        <div className="w-screen h-screen bg-slate-200 flex">

            {paused &&
                <div className="flex w-screen h-screen backdrop-blur-3xl bg-white/30">
                    <div className="text-xl text-center w-screen my-auto">
                        P A U S E D
                    </div>
                </div>
            }

            {isGameOver &&
                <div className="flex w-screen h-screen backdrop-blur-3xl bg-white/30">
                    <div className="text-xl text-center w-screen my-auto">
                        G A M E O V E R
                    </div>
                </div>
            }

            <Snake 
                direction={direction} 
                setCurrentDirection={setCurrentDirection}

                height={size}
                width={size}

                x={x} 
                y={y} 

                fx={foodX} 
                fy={foodY}
                
                eat={eat}
                resetFood={setEat}

                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}

                paused={paused} 
                setPaused={setPaused}
            />

            <Food 
                x={foodX} 
                y={foodY}
                height={size}
                width={size}
            />
        </div>
    )
}

export default Board;