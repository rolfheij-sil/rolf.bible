import { useSpring, a } from "@react-spring/web";

import "./FlipCard.css";

interface FlipCardProps {
  flipped: boolean;
  onClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const FlipCard = ({ flipped, onClickHandler }: FlipCardProps) => {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <div className={"flipcard-container"} onClick={onClickHandler}>
      <a.div
        className={"flipcard-c flipcard-back"}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
      <a.div
        className={"flipcard-c flipcard-front"}
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
      />
    </div>
  );
};

export default FlipCard;
