class Item {
  typeItem: "heart" | "incisor";
  x: number;
  y: number;
  radius: number = 10; // Default radius for items
  constructor(typeItem: "heart" | "incisor", x: number, y: number) {
    this.typeItem = typeItem;
    this.x = x;
    this.y = y;
  }
}

export default Item;
