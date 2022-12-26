import { Circle } from "react-konva";

interface FoodProps {
    x: number;
    y: number;
    radius: number;
    color: string;
}

const Food: React.FC<FoodProps> = ({ x, y, radius, color }) => {
    return <Circle radius={radius} fill={color} x={x} y={y} />;
};

export default Food;
