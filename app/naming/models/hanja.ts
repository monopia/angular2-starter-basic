import { Material } from './material';
export class Hanja {
  constructor(
    public key: string,
    public val: string,
    public initialVal: string,
    public desc: string[],
    public stroke: number,
    public originStroke: number,
    public surname: boolean,
    public tag: number[],
    public material: Material
  ) { }
}
