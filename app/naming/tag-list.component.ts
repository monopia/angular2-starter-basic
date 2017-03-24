import { Component, EventEmitter, Output, SimpleChange } from '@angular/core';
import { Hanja, hanjaTags } from './hanja.service';
import { Letter } from './letter.service';

@Component({
  moduleId: module.id,
  selector: 'tag-list',
  template: `
<button class="btn btn-default" *ngFor="let key of tagKeys">
  <span> {{ this.hanjaTags[key].desc }}
  `
})

export class TagListComponent {
  
  @Output() returnTag = new EventEmitter<number>();
  tagKeys;
  hanjaTags;

  constructor() { 
    this.tagKeys = Object.keys(hanjaTags);
    this.hanjaTags = hanjaTags;
  };

  selectTag(tag: number) {
    this.returnTag.emit(tag);
  }
}