import { Position } from "./Position";

export default class Pub {
  id: string;
  name: string;
  position: Position;
  active?: boolean = false;

  constructor(id: string, name: string, position: Position) {
    this.id = id;
    this.name = name;
    this.position = position;
  }
}
