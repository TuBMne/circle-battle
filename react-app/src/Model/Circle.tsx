import Item from "./Item";
const MAX_HP = 5;
const MAX_SPEED = 8;
class Circle {
  name: string;
  radius: number;
  color: string;
  image: string;
  position: [number, number];
  speed: [number, number];
  mass: number;
  hp: number;
  isAttack: boolean;

  constructor(
    name: string,
    radius: number,
    color: string,
    image: string,
    posotion: [number, number],
    speed: [number, number],
    mass: number
  ) {
    this.name = name;
    this.radius = radius;
    this.color = color;
    this.image = image;
    this.position = posotion;
    this.speed = speed;
    this.mass = mass;
    this.hp = MAX_HP;
    this.isAttack = false;
  }
  private capSpeed(): void {
    const speedMagnitude = Math.sqrt(this.speed[0] ** 2 + this.speed[1] ** 2);
    if (speedMagnitude > MAX_SPEED) {
      const scale = MAX_SPEED / speedMagnitude;
      this.speed[0] *= scale;
      this.speed[1] *= scale;
    }
  }
  move(arenaSize: number): void {
    this.position[0] += this.speed[0];
    this.position[1] += this.speed[1];
    this.capSpeed();
    if (
      this.position[0] + this.radius > arenaSize ||
      this.position[0] - this.radius < 0
    ) {
      this.position[0] = Math.max(
        this.radius,
        Math.min(this.position[0], arenaSize - this.radius)
      );
      this.speed[0] = -this.speed[0];
    }
    if (
      this.position[1] + this.radius > arenaSize ||
      this.position[1] - this.radius < 0
    ) {
      this.position[1] = Math.max(
        this.radius,
        Math.min(this.position[1], arenaSize - this.radius)
      );
      this.speed[1] = -this.speed[1];
    }
  }

  handleTouch(circle: Circle): void {
    const d = [
      this.position[0] - circle.position[0],
      this.position[1] - circle.position[1],
    ];
    const distance = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
    const sumOfRadii = this.radius + circle.radius;
    // Check if the circles are actually colliding (or very close)
    if (distance <= sumOfRadii) {
      const n = [d[0] / distance, d[1] / distance];

      const v1 = this.speed[0] * n[0] + this.speed[1] * n[1];
      const v1p = [v1 * n[0], v1 * n[1]];
      const v1t = [this.speed[0] - v1p[0], this.speed[1] - v1p[1]];

      const v2 = circle.speed[0] * n[0] + circle.speed[1] * n[1];
      const v2p = [v2 * n[0], v2 * n[1]];
      const v2t = [circle.speed[0] - v2p[0], circle.speed[1] - v2p[1]];

      const m1 = this.mass;
      const m2 = circle.mass;

      const v1pNew = [
        ((m1 - m2) * v1p[0] + 2 * m2 * v2p[0]) / (m1 + m2),
        ((m1 - m2) * v1p[1] + 2 * m2 * v2p[1]) / (m1 + m2),
      ];

      const v2pNew = [
        ((m2 - m1) * v2p[0] + 2 * m1 * v1p[0]) / (m1 + m2),
        ((m2 - m1) * v2p[1] + 2 * m1 * v1p[1]) / (m1 + m2),
      ];

      const v1New = [v1t[0] + v1pNew[0], v1t[1] + v1pNew[1]];
      const v2New = [v2t[0] + v2pNew[0], v2t[1] + v2pNew[1]];

      [this.speed[0], this.speed[1]] = v1New;
      [circle.speed[0], circle.speed[1]] = v2New;

      // Cap the speed after collision
      this.capSpeed();
      circle.capSpeed();

      const overlap = sumOfRadii - distance;
      const correctionFactor = 0.5; // Distribute the correction equally
      this.position[0] += n[0] * overlap * correctionFactor;
      this.position[1] += n[1] * overlap * correctionFactor;
      circle.position[0] -= n[0] * overlap * correctionFactor;
      circle.position[1] -= n[1] * overlap * correctionFactor;

      if (this.isAttack) circle.hp -= 1;
      if (circle.isAttack) this.hp -= 1;
      this.mass = 50 * this.hp;
      circle.mass = 50 * circle.hp;
      this.isAttack = false;
      circle.isAttack = false;
      this.setRadius();
      circle.setRadius();
      console.log(this, circle);
    }
  }
  setRadius() {
    this.radius = 50 - 5 * (MAX_HP - this.hp);
  }
  itemEffect(item: Item): void {
    if (item.typeItem === "heart") {
      if (this.hp < MAX_HP) {
        this.hp++;
      }
    }
    if (item.typeItem === "incisor") {
      this.isAttack = true;
    }
    this.setRadius();
  }
}

export default Circle;
