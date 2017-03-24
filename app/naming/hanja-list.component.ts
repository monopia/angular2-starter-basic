import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { HanjaService, Hanja } from './hanja.service';
import { Letter } from './letter.service';

@Component({
  moduleId: module.id,
  selector: 'hanja-list',
  template: `
<div class="list-group col-sm-10">
  <button type="button" class="list-group-item"
    *ngFor="let hanja of hanjaList"
    (click)="selectLetter(hanja)">
    <span style="font-size:2em">{{ hanja.key }}</span>&nbsp;&nbsp;&nbsp;
    <span>{{ hanja.desc.join() }}</span>
  </button>
</div>
  `
})

export class HanjaListComponent{
  constructor(private hanjaService: HanjaService) { }

  @Input() letter: string;
  @Output() returnHanja = new EventEmitter<Hanja>();

  hanjaList: Hanja[];

  ngOnChanges(change: SimpleChange) {
    let curr = JSON.stringify(change["letter"].currentValue);
    let prev = JSON.stringify(change["letter"].previousValue);

    if (curr != prev) {
      this.hanjaList = this.hanjaService.getHanjaList(this.letter); // curr로 하면 안됨 ?
    }
  }

  selectLetter(hanja: Hanja) {
    this.returnHanja.emit(hanja);
  }
}