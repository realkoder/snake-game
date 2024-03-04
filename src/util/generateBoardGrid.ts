

export const generateBoardGrid = (row: number, col: number) => {
    return Array.from({ length: row }, () => Array.from({ length: col }, () => ""));
}