import debounce from "lodash.debounce";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import Food from "./components/Food";
import SnakeBody from "./components/SnakeBody";
import { DOWN, FOOD_SIZE, LEFT, RIGHT, UP } from "./constants";
import {
    handleNewSnakeBodyPart,
    handleSnakeBodyMoves,
    isSnakeEatingFood,
    isSnakeOnCollision,
    spawnNewFood,
} from "./game_funcs";
import { FoodData, SnakeBodyData, SnakeBodyValues } from "./types";
import eat from "./sounds/eat.mp3";

const App = () => {
    const [direction, setDirection] = useState("");
    const [prevDirection, setPrevDirection] = useState("");
    const [snakeBody, setSnakeBody] = useState<SnakeBodyValues>([
        {
            isHead: true,
            x: 300,
            y: 300,
        },
    ]);
    const [foodPos, setFoodPos] = useState<FoodData>({
        x: 200,
        y: 325,
        radius: FOOD_SIZE,
    });
    const [score, setScore] = useState(0);

    const playEatSound = useCallback(() => {
        const audio = new Audio(eat);
        audio.play();
    }, []);

    const handleMovement = (e: Event) => {
        const key = (e as KeyboardEvent).code;

        if (key === "ArrowRight") {
            setDirection(RIGHT);
        } else if (key === "ArrowLeft") {
            setDirection(LEFT);
        } else if (key === "ArrowUp") {
            setDirection(UP);
        } else if (key === "ArrowDown") {
            setDirection(DOWN);
        }
    };

    useEffect(() => {
        document.body.addEventListener("keyup", handleMovement);

        return () => {
            document.body.removeEventListener("keyup", handleMovement);
        };
    }, []);

    useLayoutEffect(() => {
        const intervalId = setInterval(() => {
            if (direction !== "") {
                if (direction === RIGHT) {
                    if (prevDirection !== LEFT) {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, RIGHT, prevDirection)
                        );
                        setPrevDirection(RIGHT);
                    } else {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, LEFT, prevDirection)
                        );
                    }
                } else if (direction === LEFT) {
                    if (prevDirection !== RIGHT) {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, LEFT, prevDirection)
                        );
                        setPrevDirection(LEFT);
                    } else {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, RIGHT, prevDirection)
                        );
                    }
                } else if (direction === UP) {
                    if (prevDirection !== DOWN) {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, UP, prevDirection)
                        );
                        setPrevDirection(UP);
                    } else {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, DOWN, prevDirection)
                        );
                    }
                } else if (direction === DOWN) {
                    if (prevDirection !== UP) {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, DOWN, prevDirection)
                        );
                        setPrevDirection(DOWN);
                    } else {
                        setSnakeBody((body) =>
                            handleSnakeBodyMoves(body, UP, prevDirection)
                        );
                    }
                }
            }
        }, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, [direction]);

    useEffect(() => {
        const snakeHead = snakeBody[0];
        if (isSnakeEatingFood(foodPos, snakeHead as SnakeBodyData)) {
            setFoodPos(spawnNewFood(snakeHead as SnakeBodyData, foodPos));
            setSnakeBody((body) => handleNewSnakeBodyPart(body, direction));
            setScore((prev) => prev + 1);
            playEatSound();
        }
        if (isSnakeOnCollision(snakeHead as SnakeBodyData, snakeBody)) {
            setSnakeBody([
                {
                    isHead: true,
                    x: 300,
                    y: 300,
                },
            ]);
            setScore(0);
        }
    });

    return (
        <div className="flex items-center justify-center p-2">
            <div className="rounded-lg border border-slate-700 shadow-md shadow-gray-600">
                <Stage width={820} height={800}>
                    <Layer>
                        <Text
                            text={`Score: ${score}`}
                            fill="white"
                            x={5}
                            y={5}
                            fontSize={18}
                        />
                        <Food
                            x={foodPos.x}
                            y={foodPos.y}
                            radius={foodPos.radius}
                            color="white"
                        />

                        <SnakeBody
                            snakeBody={snakeBody}
                            setSnakeBody={setSnakeBody}
                        />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default App;
