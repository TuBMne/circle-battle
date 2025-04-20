import Circle from "../Model/Circle";
interface Props {
  player: Circle;
}

const Player = ({ player }: Props) => {
  return <li key={player.name}>{player.name}</li>;
};

export default Player;
