import { useEffect, useRef, useState, FormEvent } from "react";
import Circle from "../Model/Circle";
import {
  randomPositionPlayers,
  randomHeartItem,
  radomIncisorItem,
  fillItems,
  fillCircles,
  playersInSameLine,
} from "../Controller/Logic";
import Item from "../Model/Item";
import Canvas from "../Model/Canvas";
import SideBar from "./SideBar";
import FormInput from "./FormInput";
import ListPlayer from "./ListPlayer";
import Start from "./Start";
import Stop from "./Stop";

const Game = () => {
  let canvas = new Canvas(500);
  const [players, setPlayers] = useState<Circle[]>([]);
  const [items, setItems] = useState<Item[]>([
    randomHeartItem(canvas.arenaSize),
    radomIncisorItem(canvas.arenaSize),
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const [isGameRunning, setIsGameRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animation: ReturnType<typeof setInterval>;
    if (isGameRunning && !isPaused && players.length >= 2) {
      const ctx = canvasRef.current?.getContext("2d");
      animation = setInterval(() => {
        if (!ctx) return;
        const newPlayers = players;
        ctx.clearRect(0, 0, canvas.arenaSize, canvas.arenaSize);
        fillItems(items, ctx);
        fillCircles(canvas, newPlayers, items, ctx);
        for (let i = 0; i <= players.length - 2; i++) {
          for (let j = i + 1; j <= players.length - 1; j++) {
            newPlayers[i].handleTouch(newPlayers[j]);
          }
        }
        const filteredPlayers = newPlayers.filter((player) => player.hp !== 0);
        setPlayers(filteredPlayers);
        if (newPlayers.length === 1) {
          clearInterval(animation);
          alert(`Game Over! ${players[0].name} wins!`);
          setIsGameRunning(false);
        }
      }, 1);
    }
    return () => clearInterval(animation);
  }, [isGameRunning, players, items, isPaused]);

  function startGame(): void {
    randomPositionPlayers(canvas.arenaSize, players);
    //playersInSameLine(canvas.arenaSize, players);
    setPlayers(players);
    setIsGameRunning(true);
  }

  function pauseGame(): void {
    setIsPaused(!isPaused);
  }

  function addPlayer(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const newCircle = new Circle(name, 50, color, image, [0, 0], [0, 0], 50);
    players.push(newCircle);
    setName("");
    setColor("");
    setImage("");
  }

  return (
    <div className="p-4">
      {!isGameRunning && (
        <>
          <FormInput
            addPlayer={addPlayer}
            name={name}
            color={color}
            image={image}
            setName={setName}
            setColor={setColor}
            setImage={setImage}
          ></FormInput>
          <ListPlayer players={players} />
        </>
      )}
      {!isGameRunning && players.length >= 2 && (
        <Start startGame={startGame}></Start>
      )}
      {isGameRunning && (
        <>
          {players.map((player, index) => (
            <SideBar key={index} name={player.name} hp={player.hp} />
          ))}
          <canvas
            ref={canvasRef}
            width={canvas.arenaSize}
            height={canvas.arenaSize}
            className="border border-gray-500"
          ></canvas>
          <Stop pauseGame={pauseGame} isPaused={isPaused}></Stop>
        </>
      )}
    </div>
  );
};

export default Game;
