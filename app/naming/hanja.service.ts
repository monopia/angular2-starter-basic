import { Injectable } from '@angular/core';
import { Hanja } from './models/hanja';
import { hanjaMaster } from './data/hanja-master'
import { Theory } from './theory';

const FETCH_LATENCY = 500;

@Injectable()
export class HanjaService {

  getEmptyHanja () {
    return new Hanja('', '', '', [], 0, 0, false, [], 0);
  }

  public valIndex = {};
  public initialValIndex = {};
  public tagIndex = {};
  theory: Theory;
  
  init() {

    this.theory = new Theory();
    let hanjaKeys = Object.keys(hanjaMaster);

    hanjaKeys.forEach( (key) => {

      let modulus, master: Hanja;
      master = hanjaMaster[key];
      master.material = this.theory.getMaterialIndexByStroke(master.stroke);

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