interface Props {
  startGame: () => void;
}

const Start = ({ startGame }: Props) => {
  return <button onClick={startGame}>Start Game</button>;
};

export default Start;
