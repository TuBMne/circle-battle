import Circle from "../Model/Circle";
import Player from "./Player";
interface Props {
  players: Circle[];
}
const ListPlayer = ({ players }: Props) => {
  return (
    <>
      <ul>
        {players.map((player) => (
          <Player player={player}></Player>
        ))}
      </ul>
    </>
  );
};
export default ListPlayer;
