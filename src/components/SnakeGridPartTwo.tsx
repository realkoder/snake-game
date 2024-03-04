"use client";

import { generateBoardGrid } from "@/util/generateBoardGrid";
import { moveSnake } from "@/util/snake-utils";
import { useEffect, useState } from "react";

const numRows = 20;
const numCols = 30;
const initialSnake = [{ row: 5, col: 5 }, { row: 5, col: 6 }, { row: 5, col: 7 }];
const initialDirection = "left";
const tickInterval = 200;

const SnakeGridPartTwo = () => {
    const [boardGrid, setBoardGrid] = useState(generateBoardGrid(numRows, numCols));
    const [snake, setSnake] = useState(initialSnake);
    const [direction, setDirection] = useState(initialDirection);
    const [food, setFood] = useState({ row: 15, col: 12 });    

    useEffect(() => {
        const interval = setInterval(() => {
            moveSnake(setSnake, direction, food, numRows, numCols, setFood);
        }, tickInterval);

        return () => clearInterval(interval);
    }, [direction]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {            
            switch (event.key) {
                case "ArrowUp":
                    setDirection("up");
                    break;
                case "ArrowDown":
                    setDirection("down");
                    break;
                case "ArrowLeft":
                    setDirection("left");
                    break;
                case "ArrowRight":
                    setDirection("right");                    
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-12 font-extralight">SNAKING AROUND! 👽</h1>            

            <div className="grid grid-row-3 gap-0.5">
                {boardGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-0.5 cursor-pointer">
                        {row.map((cell, colIndex) => {
                            const isFoodPart = food.row === rowIndex && food.col === colIndex;
                            const isSnakeBody = snake.some(part => part.row === rowIndex && part.col === colIndex);                        
                            return (
                                <button
                                    className={`h-8 w-8 border rounded-sm 
                                    ${isFoodPart ? 'bg-yellow-300' : isSnakeBody ? 'bg-green-500' : ' bg-gray-300'} 
                                    flex items-center justify-center font-bold font-mono text-9xl`}
                                    key={colIndex}                                    
                                ></button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SnakeGridPartTwo;