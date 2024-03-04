"use client";

import Queue from "@/util/circular-buffer";
import { generateBoardGrid } from "@/util/generateBoardGrid";
import { useEffect, useState } from "react";


type SnakeGridProps = {
}

const SnakeGrid = ({ }: SnakeGridProps) => {
    const [boardGrid, setBoardGrid] = useState(generateBoardGrid(20, 30));
    const [snake, setSnake] = useState(new Queue());
    const [direction, setDirection] = useState("left");

    useEffect(() => {
        setSnake(() => {
            const updatedSnake = new Queue();
            updatedSnake.enqueue({ row: 5, col: 5 });
            return updatedSnake;
        })
    }, []);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            console.log(event)
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

    useEffect(() => {
        const interval = setInterval(() => {
            switch (direction) {
                case "up":
                    moveSnake(-1, 0);
                    break;
                case "down":
                    moveSnake(1, 0);
                    break;
                case "left":
                    moveSnake(0, -1);
                    break;
                case "right":
                    moveSnake(0, 1);
                    break;                
            }
        }, 150);

        return () => clearInterval(interval);
    }, [direction]);

    const moveSnake = (changeRow: number, changeCol: number) => {
        setSnake((prevSnake) => {
            const oldHead = prevSnake.dequeue();
            if (oldHead) {
                const { row, col } = oldHead;
                const newHead = { row: row + changeRow, col: col + changeCol };
                prevSnake.enqueue(newHead);
            }

            return prevSnake;
        });
    };



    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-12 font-serif">SNAKING AROUND!</h1>

            <div className="grid grid-row-3 gap-0.5">

                {boardGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-0.5 cursor-pointer">
                        {row.map((cell, colIndex) => {
                            const isSnakeBody = snake.isQueued({ row: rowIndex, col: colIndex });

                            return (
                                <button
                                    className={`h-8 w-8 border rounded-sm ${isSnakeBody ? 'bg-green-500' : ' bg-gray-300'} 
                                    flex items-center justify-center font-bold font-mono text-9xl`}
                                    key={colIndex}
                                    onClick={() => console.log(rowIndex, colIndex)}
                                >
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default SnakeGrid;