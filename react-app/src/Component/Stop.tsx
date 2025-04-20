interface Props {
  pauseGame: () => void;
  isPaused: boolean;
}

const Stop = ({ pauseGame, isPaused }: Props) => {
  return <button onClick={pauseGame}>{isPaused ? "Resume" : "Pause"}</button>;
};

export default Stop;
