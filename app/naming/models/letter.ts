import { Hangul } from './hangul';
import { Hanja } from './hanja';

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