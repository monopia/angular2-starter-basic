export class Theory {
  public materials = ['木','火','土','金','水']; // (1,2) (3,4) (5,6) (7,8) (9,0)

  public getMaterialIndexByStroke(stroke) {
    return (Math.floor((stroke % 10 - 1) / 2) + 5) % 5
  }
}
