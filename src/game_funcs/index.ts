import {
    DOWN,
    FOOD_SIZE,
    LEFT,
    RIGHT,
    SNAKE_HEIGHT,
    SNAKE_SPEED,
    SNAKE_WIDTH,
    UP,
} from "../constants";
import { FoodData, SnakeBodyData, SnakeBodyValues } from "../types";
import { isEven } from "./utils";

export const handleSnakeBodyMoves = (
    snakeBody: SnakeBodyValues,
    direction: string,
    prevDir: string
) => {
    const snakeHead = snakeBody[0];
    let newSnakeBody: SnakeBodyValues = [];

    let prevX = snakeHead?.x as number;
    let prevY = snakeHead?.y as number;
    let previousPos = [prevX, prevY];

    if (direction === UP) {
        newSnakeBody.push({
            x: snakeHead?.x as number,
            y: (snakeHead?.y as number) - SNAKE_SPEED,
            isHead: true,
        });

        for (let i = 1; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    } else if (direction === RIGHT) {
        // Push new head position
        newSnakeBody.push({
            x: (snakeHead?.x as number) + SNAKE_SPEED,
            y: snakeHead?.y as number,
            isHead: true,
        });

        for (let i = 1; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    } else if (direction === LEFT) {
        newSnakeBody.push({
            x: (snakeHead?.x as number) - SNAKE_SPEED,
            y: snakeHead?.y as number,
            isHead: true,
        });

        for (let i = 1; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    } else if (direction === DOWN) {
        newSnakeBody.push({
            x: snakeHead?.x as number,
            y: (snakeHead?.y as number) + SNAKE_SPEED,
            isHead: true,
        });

        for (let i = 1; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    }

    return newSnakeBody;
};

export const isSnakeEatingFood = (food: FoodData, snakeHead: SnakeBodyData) => {
    const snakeHeadWidthCalc = (SNAKE_WIDTH * 2) / 2;
    const snakeHeadHeightCalc = (SNAKE_HEIGHT * 2) / 2;

    var distX = Math.abs(food.x - snakeHead.x - snakeHeadWidthCalc);
    var distY = Math.abs(food.y - snakeHead.y - snakeHeadHeightCalc);

    if (distX > snakeHeadWidthCalc + food.radius) {
        return false;
    }
    if (distY > snakeHeadHeightCalc + food.radius) {
        return false;
    }

    if (distX <= snakeHeadWidthCalc) {
        return true;
    }
    if (distY <= snakeHeadHeightCalc) {
        return true;
    }

    var dx = distX - snakeHeadWidthCalc;
    var dy = distY - snakeHeadHeightCalc;
    return dx * dx + dy * dy <= food.radius * food.radius;
};

export const handleNewSnakeBodyPart = (
    snakeBody: SnakeBodyValues,
    direction: string
): SnakeBodyValues => {
    const snakeHead = snakeBody[0];

    let prevX = snakeHead?.x as number;
    let prevY = snakeHead?.y as number;
    let previousPos = [prevX, prevY];

    const newSnakeBody = [];

    if (direction === RIGHT) {
        let newHead: SnakeBodyData = {
            x: (snakeHead?.x as number) + SNAKE_SPEED,
            y: snakeHead?.y as number,
            isHead: true,
        };

        // new head
        newSnakeBody.push(newHead);

        for (let i = 0; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    }
    if (direction === LEFT) {
        let newHead: SnakeBodyData = {
            x: (snakeHead?.x as number) - SNAKE_SPEED,
            y: snakeHead?.y as number,
            isHead: true,
        };

        // new head
        newSnakeBody.push(newHead);

        for (let i = 0; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    }
    if (direction === DOWN) {
        let newHead: SnakeBodyData = {
            x: snakeHead?.x as number,
            y: (snakeHead?.y as number) + SNAKE_SPEED,
            isHead: true,
        };

        // new head
        newSnakeBody.push(newHead);

        for (let i = 0; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    }
    if (direction === UP) {
        let newHead: SnakeBodyData = {
            x: snakeHead?.x as number,
            y: (snakeHead?.y as number) - SNAKE_SPEED,
            isHead: true,
        };

        // new head
        newSnakeBody.push(newHead);

        for (let i = 0; i < snakeBody.length; i++) {
            let currentPos = [snakeBody[i].x, snakeBody[i].y];
            newSnakeBody.push({
                x: previousPos[0],
                y: previousPos[1],
            });
            previousPos = currentPos;
        }
    }

    return newSnakeBody;
};

const snakePossibleFoodX = [...Array(801).keys()]
    .slice(1)
    .filter((num) => num % 20 === 0);

const snakePossibeFoodY = [...Array(801).keys()]
    .slice(1)
    .filter((num) => num % 25 === 0);

export const spawnNewFood = (snakeHead: SnakeBodyData, food: FoodData) => {
    let foodPosX =
        snakePossibleFoodX[(snakePossibleFoodX.length * Math.random()) | 0];
    let foodPosY =
        snakePossibeFoodY[(snakePossibeFoodY.length * Math.random()) | 0];

    // Banned Y range below
    while (foodPosY >= 700 && foodPosY <= 800) {
        foodPosY =
            snakePossibeFoodY[(snakePossibeFoodY.length * Math.random()) | 0];
    }

    // Banned Y range above
    while (foodPosY >= 0 && foodPosY <= 100) {
        foodPosY =
            snakePossibeFoodY[(snakePossibeFoodY.length * Math.random()) | 0];
    }

    // Banned X range left
    while (foodPosX >= 0 && foodPosX <= 10) {
        foodPosX =
            snakePossibleFoodX[(snakePossibleFoodX.length * Math.random()) | 0];
    }

    // Banned X range right
    while (foodPosX >= 800 && foodPosX <= 820) {
        foodPosX =
            snakePossibleFoodX[(snakePossibleFoodX.length * Math.random()) | 0];
    }

    return {
        x: foodPosX,
        y: foodPosY,
        radius: FOOD_SIZE,
    };
};

const haveIntersection = (r1: SnakeBodyData, r2: SnakeBodyData) => {
    return !(
        r2.x > r1.x + SNAKE_WIDTH ||
        r2.x + SNAKE_WIDTH < r1.x ||
        r2.y > r1.y + SNAKE_HEIGHT ||
        r2.y + SNAKE_HEIGHT < r1.y
    );
};

export const isSnakeOnCollision = (
    snakeHead: SnakeBodyData,
    snakeBody: SnakeBodyValues
): boolean => {
    return snakeBody.some((bodyPart, idx) => {
        if (idx === 0) return false;

        if (haveIntersection(bodyPart, snakeHead)) return true;

        return false;
    });
};
