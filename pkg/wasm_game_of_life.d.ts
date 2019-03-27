/* tslint:disable */
/**
*/
export enum Cell {
  Dead,
  Alive,
}
/**
*/
export class Universe {
  free(): void;
  cells(): number;
  tick(): void;
  static new(rows: number, cols: number): Universe;
  flip_cell(row: number, col: number): void;
  render(): string;
}
