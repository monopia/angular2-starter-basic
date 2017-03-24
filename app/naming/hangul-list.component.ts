import { Component, EventEmitter, Input, Output } from '@angular/core';
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
      *ngFor="let letter of selectedLetters"
      (click)="selectLetter(letter)">{{ letter }}</button>
  </div>
  `,
  styles: ['{background-color: gray}']
})

export class HangulListComponent {
  constructor(private hangulService: HangulService) { }

  consonants = this.hangulService.getConsonants();

  private selectedConsonant: string;
  private selectedLetters: Object;

  @Input() letter: string;
  @Input() surname: boolean = false;
  @Output() returnLetter = new EventEmitter<string>();

  selectConsonant(consonant) {
    this.returnLetter.emit("");
    this.selectedConsonant = consonant;
    this.selectedLetters = Object.keys(this.hangulService.getLetters(consonant, this.surname));
  }

  selectLetter(letter) {
    this.returnLetter.emit(letter);
  }
}