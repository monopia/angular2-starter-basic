import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hangul } from './models/hangul';
import { consonants } from './data/hangul-master';
import { HangulService } from './hangul.service';

@Component({
  moduleId: module.id,
  selector: 'hangul-list',
  template: `
  <div class="btn-group" role="group">
  <button type="button" class="btn btn-default"
    *ngFor="let consonant of consonants"
    (click)="selectConsonant(consonant)">{{ consonant }}</button>
  </div>
  <p></p>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-default"
      *ngFor="let hangulVal of selectedHangulVals"
      (click)="selectHangul(hangulVal)">{{ hangulVal }}</button>
  </div>
  `,
  styles: ['{background-color: gray}']
})

export class HangulListComponent {
  consonants;
  selectedConsonant;
  constructor(private hangulService: HangulService) { 
    this.consonants = consonants;
  }

  private selectedHangulVals: Object;

  @Input() hangul;
  @Input() surname: boolean = false;
  @Output() returnHangul = new EventEmitter<Hangul>();

  selectConsonant(consonant) {
    this.selectedConsonant = consonant;
    this.returnHangul.emit(this.hangulService.getEmptyHangul());
    this.selectedHangulVals = Object.keys(this.hangulService.getHanguls(consonant, this.surname));
  }

  selectHangul(hangulVal) {
    this.returnHangul.emit(this.hangulService.getHangul(this.selectedConsonant, hangulVal));
  }
}