export type SnakeBodyValues = SnakeBodyData[];

export interface SnakeBodyData {
    isHead?: boolean;
    x: number;
    y: number;
}

export interface FoodData {
    x: number;
    y: number;
    radius: number;
}
