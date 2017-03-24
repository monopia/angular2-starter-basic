import { Injectable } from '@angular/core';
import { Hangul } from './hangul.service'; 
import { Hanja } from './hanja.service'; 

export class Letter {
  constructor(
    public label: string,
    public hangul: Hangul,
    public hanja: Hanja,
    public searchOption: number = 0,
    public surname: boolean,
    public visible: boolean = true,
    public tag: number
  ) { }
}

@Injectable()
export class LetterService {

}