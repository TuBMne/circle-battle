interface Props {
  hp: number;
}

const HP = ({ hp }: Props) => {
  return (
    <div className="hp-bar-fill" style={{ width: `${(hp / 10) * 100}%` }}>
      {hp}
    </div>
  );
};

export default HP;
