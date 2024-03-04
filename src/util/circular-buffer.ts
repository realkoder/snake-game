
// ================= IMPLEMENTATION OF QUEUE CLASS

export type SnakePartType = {
    row: number;
    col: number;
}

class Queue {
    private items: SnakePartType[];
  
    constructor() {
      this.items = [];
    }
  
    enqueue(item: SnakePartType): void {
      this.items.push(item);
    }
  
    dequeue(): SnakePartType | undefined {
      return this.items.shift();
    }
  
    peek(): SnakePartType | undefined {
      return this.items[0];
    }

    isQueued(snakePart: SnakePartType) {
        return this.items.findIndex(curSnakePart => curSnakePart.row === snakePart.row && curSnakePart.col === snakePart.col) > -1 ? true : false;
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    size(): number {
      return this.items.length;
    }
  
    clear(): void {
      this.items = [];
    }
  }

  export default Queue;