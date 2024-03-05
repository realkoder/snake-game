import { Dispatch, SetStateAction } from "react";
import { SnakePartType } from "./circular-buffer";

export const moveSnake = (
    setSnake: Dispatch<SetStateAction<SnakePartType[]>>,
    direction: string,
    food: SnakePartType,
    numRows: number,
    numCols: number,
    setFood: Dispatch<SetStateAction<SnakePartType>>,
) => {
    setSnake((prevSnake) => {
        const oldHead = prevSnake[prevSnake.length - 1];
        let newHead;
        switch (direction) {
            case "up":
                if (oldHead.row === 0) {
                    newHead = { row: numRows - 1, col: oldHead.col };
                } else {
                    newHead = { row: oldHead.row - 1, col: oldHead.col };
                }
                break;
            case "down":
                if (oldHead.row === numRows - 1) {
                    newHead = { row: 0, col: oldHead.col };
                } else {
                    newHead = { row: oldHead.row + 1, col: oldHead.col };
                }
                break;
            case "left":
                if (oldHead.col === 0) {
                    newHead = { row: oldHead.row, col: numCols - 1 };
                } else {
                    newHead = { row: oldHead.row, col: oldHead.col - 1 };
                }
                break;
            case "right":
                if (oldHead.col === numCols - 1) {
                    newHead = { row: oldHead.row, col: 0 };
                } else {
                    newHead = { row: oldHead.row, col: oldHead.col + 1 };
                }
                break;
            default:
                newHead = oldHead;
                break;
        }
        const newSnake = [...prevSnake.slice(1), newHead];

        checkIfHadFood(newHead, food, numRows, numCols, setFood, setSnake);

        return newSnake;
    });
};

const checkIfHadFood = (
    newHead: SnakePartType,
    food: SnakePartType,
    numRows: number,
    numCols: number,
    setFood: Dispatch<SetStateAction<SnakePartType>>,
    setSnake: Dispatch<SetStateAction<SnakePartType[]>>,
) => {
    if (newHead.row === food.row && newHead.col === food.col) {
        generateFoodPosition(numRows, numCols, setFood);
        setSnake(prevSnake => [...prevSnake, food]);
    }
};

const generateFoodPosition = (
    numRows: number,
    numCols: number,
    setFood: Dispatch<SetStateAction<SnakePartType>>,
) => {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    setFood({ row, col });
};