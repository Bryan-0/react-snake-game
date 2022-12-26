import { Rect } from "react-konva";
import { SnakeBodyValues } from "../types";
import uuid4 from "uuid4";
import { SNAKE_HEIGHT, SNAKE_WIDTH } from "../constants";

interface SnakeBodyProps {
    snakeBody: SnakeBodyValues;
    setSnakeBody: React.Dispatch<SnakeBodyValues>;
}

const SnakeBody: React.FC<SnakeBodyProps> = ({ snakeBody, setSnakeBody }) => {
    const snakeHead = snakeBody[0];

    // Border Collision checks
    if (
        (snakeHead?.x as number) <= -20 ||
        (snakeHead?.x as number) >= 800 ||
        (snakeHead?.y as number) <= -20 ||
        (snakeHead?.y as number) >= 780
    ) {
        setSnakeBody([
            {
                isHead: true,
                x: 300,
                y: 300,
            },
        ]);
    }

    const renderBody = () => {
        return snakeBody.map((part, idx) => (
            <Rect
                key={idx}
                width={SNAKE_WIDTH}
                height={SNAKE_HEIGHT}
                x={part.x}
                y={part.y}
                fill="green"
                cornerRadius={4}
                shadowBlur={4}
            />
        ));
    };

    return <>{renderBody()}</>;
};

export default SnakeBody;
