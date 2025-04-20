import Item from "../Model/Item";
import Circle from "../Model/Circle";
import Canvas from "../Model/Canvas";
export function radomPositionCircle(arenaSize: number, circle: Circle): void {
  circle.position[0] = Math.floor(
    Math.random() * (arenaSize - 2 * circle.radius) + circle.radius
  );
  circle.position[1] = Math.floor(
    Math.random() * (arenaSize - 2 * circle.radius) + circle.radius
  );
}

export function position(arenaSize: number, circle: Circle): void {
  circle.position[0] = 50;
  circle.position[1] = Math.floor(
    Math.random() * (arenaSize - 2 * circle.radius) + circle.radius
  );
}

export function randomVelocity(circle: Circle): void {
  circle.speed[0] = Math.random() * 2 + 2;
  circle.speed[1] = Math.random() * 2 + 2;
}

export function velocity(circle: Circle): void {
  circle.speed[0] = 0;
  circle.speed[1] = Math.random() * 2 + 7;
}

export function randomPositionItem(
  arenaSize: number,
  radius: number = 10,
  itemType: string
): Item {
  if (itemType === "heart") return randomHeartItem(arenaSize, radius);
  return radomIncisorItem(arenaSize, radius);
}

export function randomHeartItem(arenaSize: number, radius: number = 10): Item {
  return new Item(
    "heart",
    Math.floor(Math.random() * (arenaSize - 2 * radius) + radius),
    Math.floor(Math.random() * (arenaSize - 2 * radius) + radius)
  );
}

export function radomIncisorItem(arenaSize: number, radius: number = 10): Item {
  return new Item(
    "incisor",
    Math.floor(Math.random() * (arenaSize - 2 * radius) + radius),
    Math.floor(Math.random() * (arenaSize - 2 * radius) + radius)
  );
}

export function fillItems(items: Item[], ctx: CanvasRenderingContext2D) {
  items.forEach((item) => {
    ctx.beginPath();
    ctx.fillStyle = item.typeItem === "heart" ? "red" : "purple";
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function fillCircles(
  canvas: Canvas,
  players: Circle[],
  items: Item[],
  ctx: CanvasRenderingContext2D
) {
  players.forEach((p, i) => {
    p.move(canvas.arenaSize);
    items.forEach((item, index) => {
      const dx = p.position[0] - item.x;
      const dy = p.position[1] - item.y;
      if (Math.sqrt(dx * dx + dy * dy) < p.radius + item.radius) {
        p.itemEffect(item);
        items.splice(
          index,
          1,
          randomPositionItem(canvas.arenaSize, 10, item.typeItem)
        );
      }
    });

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.position[0], p.position[1], p.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
  });
}

export function randomPositionPlayers(canvasSize: number, players: Circle[]) {
  players.map((circle) => {
    radomPositionCircle(canvasSize, circle);
    randomVelocity(circle);
  });
}

export function playersInSameLine(canvasSize: number, players: Circle[]) {
  players.map((circle) => {
    position(canvasSize, circle);
    velocity(circle);
  });
}
