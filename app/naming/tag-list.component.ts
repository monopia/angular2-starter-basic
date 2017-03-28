import { Component, EventEmitter, Output, SimpleChange } from '@angular/core';
import { Letter } from './models/letter';
import { hanjaTags } from './data/tag';

@Component({
  moduleId: module.id,
  selector: 'tag-list',
  template: `
<button class="btn btn-default" *ngFor="let key of tagKeys" (click)="selectTag(key)">
  <span> {{ this.hanjaTags[key].desc }} </span>
</button>
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