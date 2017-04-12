import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { Hanja } from './models/hanja';
import { Hangul } from './models/hangul';
import { Letter } from './models/letter';
import { HanjaService } from './hanja.service';

@Component({
  moduleId: module.id,
  selector: 'hanja-list',
  template: `
<div class="list-group col-sm-10">
  <button type="button" class="list-group-item"
    *ngFor="let hanja of hanjaList"
    (click)="selectLetter(hanja)">
    <span style="font-size:2em">{{ hanja.key }}</span>
    <span style="width:150px; display:inline-block">
      &nbsp;[ {{ hanja.val }} ]
      &nbsp;[ {{ hanja.stroke }}{{ hanja.originStroke ? "(" + hanja.originStroke + ")" : "" }} 획 ]
    </span>
    <span>{{ hanja.desc.join() }}</span>
    <div class="pull-right badge" [ngStyle]="{'background-color': hanja.material.color}">
      <span>{{ hanja.material.material }}</span>
    </div>
  </button>
</div>
  `
})

export class HanjaListComponent{
  constructor(private hanjaService: HanjaService) { }

  @Input() hangul: Hangul;
  @Input() tag: number;
  @Input() surname: boolean = false;
  @Output() returnHanja = new EventEmitter<Hanja>();

  hanjaList: Hanja[];

  ngOnChanges(change: SimpleChange) {
    let obj;
    if (change["hangul"]) {
      // obj = JSON.stringify(change["hangul"]);
      obj = change["hangul"];
    } else if (change["tag"]) {
      // obj = JSON.stringify(change["tag"]);
      obj = change["tag"];
    } else {
      obj = {};
    }
    if (obj.currentValue && obj.currentValue != obj.previousValue) {
      if (change["hangul"]) {
        this.hanjaList = this.hanjaService.getHanjaListByValue(this.hangul.val, this.surname);
      } else if (change["tag"]) {
        this.hanjaList = this.hanjaService.getHanjaListByTag(this.tag);
      }
    }
  }

  selectLetter(hanja: Hanja) {
    this.returnHanja.emit(hanja);
  }
}