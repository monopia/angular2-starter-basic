import { Hangul } from './hangul';
import { Hanja } from './hanja';

export class Letter {
  constructor(
    private label: string,
    private hangul: Hangul,
    private hanja: Hanja,
    private searchOption: number = 0,
    private surname: boolean,
    private initial: boolean,
    private visible: boolean = true,
    private tag: number
  ) { }
}