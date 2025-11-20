export class Box {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(top: number, right: number, bottom: number, left: number) {
    this.x = left;
    this.y = top;
    this.width = right - left;
    this.height = bottom - top;
  }

  getImageData(): [x: number, y: number, width: number, height: number] {
    return [this.x, this.y, this.width, this.height];
  }

  putImageData(): [x: number, y: number] {
    return [this.x, this.y];
  }

  getDimension(): [width: number, height: number] {
    return [this.width, this.height];
  }
}
