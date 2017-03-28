import { Injectable } from '@angular/core';
import { Hangul } from './models/hangul';
import { consonants, hangulMaster } from './data/hangul-master';

@Injectable()
export class HangulService {

  private hangulMaster;

  getEmptyHangul () {
    return new Hangul('',0);
  }

  getHangul (consonant, hangulVal) {
    return this.hangulMaster[consonant].hanguls[hangulVal];
  }

  getHanguls (consonant: string, surname: boolean) {
    if (surname) {
      return hangulMaster[consonant].surnameHanguls;
    } else {
      return hangulMaster[consonant].hanguls;
    }
  }

  init() {
    let keys = Object.keys(hangulMaster); // ㄱㄴㄷ

    keys.forEach((key) => {

      let hangulList = hangulMaster[key];
      hangulList.surnameHanguls = {};

      let hangulVals = Object.keys(hangulList.hanguls); // 가 나 다

      hangulVals.forEach((hangulVal) => {

        hangulList.hanguls[hangulVal].val = hangulVal;
        if (hangulList.hanguls[hangulVal].surname) {
          hangulList.surnameHanguls[hangulVal] = hangulList.hanguls[hangulVal];
        }

      });
    });
    this.hangulMaster = hangulMaster;
  }

}