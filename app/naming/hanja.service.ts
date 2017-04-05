import { Injectable } from '@angular/core';
import { Hanja } from './models/hanja';
import { hanjaMaster } from './data/hanja-master';
import { TheoryService } from './theory.service';

const FETCH_LATENCY = 500;

@Injectable()
export class HanjaService {

  constructor(private theoryService: TheoryService) {};

  getEmptyHanja () {
    return new Hanja('', '', '', [], 0, 0, false, [], null);
  }

  public valIndex = {};
  public initialValIndex = {};
  public tagIndex = {};
  
  init() {

    let hanjaKeys = Object.keys(hanjaMaster);

    hanjaKeys.forEach( (key) => {

      let modulus, master: Hanja;
      master = hanjaMaster[key];
      master.material = this.theoryService.getMaterialByStroke(master.stroke);

      if (this.valIndex[master.val])
        this.valIndex[master.val].push(key);
      else
        this.valIndex[master.val] = [key];

      if (this.initialValIndex[master.initialVal])
        this.initialValIndex[master.initialVal].push(key);
      else
        this.initialValIndex[master.initialVal] = [key];

      if (master.tag && typeof(master.tag) === 'object') {
        master.tag.forEach((tag) => {
          if (this.tagIndex[tag])
            this.tagIndex[tag].push(key);
          else
            this.tagIndex[tag] = [key];
        })
      }
    });
  }

  getHanjaMaster() {
    return new Promise<Object>(resolve => {
      setTimeout(() => { resolve(hanjaMaster); }, FETCH_LATENCY);
    });
  }

  getHanjaListByValue(val: string) {
    return this.getHanjaList(this.valIndex[val]);
  }

  getHanjaListByTag(tag: number) {
    return this.getHanjaList(this.tagIndex[tag]);
  }

  private getHanjaList(hanjaVals) {
    let list = [];
    if (hanjaVals) {
      hanjaVals.forEach((key) => {
        let hanja: Hanja = hanjaMaster[key];
        hanja.key = key;
        list.push(hanjaMaster[key]);
      });
    }
    return list;
  }
}