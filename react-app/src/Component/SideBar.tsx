import HP from "./HP";

interface Props {
  name: string;
  hp: number;
}

function SideBar({ name, hp }: Props) {
  return (
    <div className="sidebar">
      {name}
      <div className="sidebar-content">
        <HP hp={hp}></HP>
      </div>
    </div>
  );
}

export default SideBar;
