import { Injectable } from '@angular/core';
import { Material } from './models/material';

@Injectable()
export class TheoryService {

  public materials: Material[] = [
    new Material('木', [1,2], '牙', '東', 'green'), // blue
    new Material('火', [3,4], '舌', '南', 'red' ), // red
    new Material('土', [5,6], '喉', '中', 'orange'), // yellow
    new Material('金', [7,8], '齒', '西', 'gray' ), // white
    new Material('水', [9,0], '脣', '北', 'blue' )  // black
    ];

  public getMaterialByStroke(stroke) {
    return this.materials[(Math.floor((stroke % 10 - 1) / 2) + 5) % 5]
  }
}
