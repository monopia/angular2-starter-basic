import { Component, OnInit } from '@angular/core';

import { Hanja, HanjaService } from './hanja.service';
import { Hangul, HangulService } from './hangul.service';
import { Letter } from './letter.service';

@Component({
  moduleId: module.id,
  selector: 'app-naming',
  template: `
<h2 class="text-center">Your Name!</h2>

<form class="form-inline">
  <div class="row text-center">
    <div *ngFor="let letter of letters; let i=index" class="form-group">
      <div class="col-sm-1">
        <h1 [hidden]="!letter.visible" (click)="letterToggle(i)">
          <span class="label label-default">{{ letter.hanja.key || (letter.surname ? "姓" : "名") }}</span>
        </h1>
      </div>
    </div>
  </div>
</form>

<form>
  <div class="row">
    <div class="col-sm-offset-4 col-sm-2">
      <div class="checkbox">
        <label>
          <input type="checkbox" name="surname2Control" [(ngModel)]="surname2.visible"> 성(姓) 두자
        </label>
      </div>
    </div>
    <div class="col-sm-2">
      <div class="checkbox">
        <label>
          <input type="checkbox" name="name3Control" [(ngModel)]="name3.visible"> 이름 세자
        </label>
      </div>
    </div>
  </div>
</form>

<p></p>

<form class="form-horizontal">

  <div *ngFor='let letter of letters; let i = index'>
    <div [hidden]="!letter.visible || !toggles[i]">
      <div class="form-group">
        <label class="col-sm-2 control-label">{{ letter.label }} </label>
        <div class="col-sm-6">
          <label class="radio-inline" *ngFor="let option of searchOptions; let j = index">
            <input type="radio" name="searchOption" value="{{j}}"
              [(ngModel)]="letter.searchOption"> {{ option.label }}
          </label>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10" style="margin-bottom: 10px;">
          <hangul-list
            [hidden]="letter.searchOption != 0"
            [letter]="letter.hangul.val"
            [surname]="letter.surname"
            (returnLetter)="letter.hangul.val=$event">
          </hangul-list>
          <tag-list
            [hidden]="letter.searchOption != 1"
            (returnTag)="letter.tag=$event">
          </tag-list>
        </div>
        <p></p>
        <div class="col-sm-offset-2 col-sm-10">
          <hanja-list
            [letter]="letter.hangul.val"
            (returnHanja)="letter.hanja=$event">
          </hanja-list>
        </div>
      </div>
    </div>
  </div>

</form>

<div *ngIf="msg" class="msg">{{msg}}</div>

<form *ngIf="contacts" (ngSubmit)="onSubmit()" #contactForm="ngForm">
  <h3 highlight>{{ contact.name }}</h3>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" required
      [(ngModel)]="contact.name"
        name="name"  #name="ngModel" >
    <div [hidden]="name.valid" class="alert alert-danger">
      Name is required
    </div>
  </div>
  <br>
  <button type="submit" class="btn btn-default" [disabled]="!contactForm.form.valid">Save</button>
  <button type="button" class="btn" (click)="next()" [disabled]="!contactForm.form.valid">Next Contact</button>
  <button type="button" class="btn" (click)="newContact()">New Contact</button>
</form>
  `
})

export class NamingComponent implements OnInit {

  searchOptions = [
    { label: "목록에서 찾기", maxlength: 0 },
    // { label: "음으로 찾기", maxlength: 1 },
    // { label: "뜻으로 찾기", maxlength: 10 },
    { label: "태그로 찾기", maxlength: 0 }
  ];

  // hanjaMaster: Object;

  surname1: Letter = new Letter("성1(姓)", this.hangulService.getEmptyHangul(), this.hanjaService.getEmptyHanja(), 0, true, true, null);
  surname2: Letter = new Letter("성2(姓)", this.hangulService.getEmptyHangul(), this.hanjaService.getEmptyHanja(), 0, true, false, null);
  name1: Letter = new Letter("이름1", this.hangulService.getEmptyHangul(), this.hanjaService.getEmptyHanja(), 0, false, true, null);
  name2: Letter = new Letter("이름2", this.hangulService.getEmptyHangul(), this.hanjaService.getEmptyHanja(), 0, false, true, null);
  name3: Letter = new Letter("이름3", this.hangulService.getEmptyHangul(), this.hanjaService.getEmptyHanja(), 0, false, false, null);

  letters: Letter[] = [this.surname1, this.surname2, this.name1, this.name2, this.name3];
  toggles: boolean[] = [false,false,false,false,false];
 
  constructor(private hanjaService: HanjaService, private hangulService: HangulService) { }

  ngOnInit() {
    this.hanjaService.init();
    this.hangulService.init();
    // this.hanjaService.getHanjaMaster().then(object => {
    //   this.hanjaMaster = object;
    // });
  }

  letterToggle(i) {
    this.toggles.forEach((val, index) => {
      this.toggles[index] = (i == index);
    });
  }

  searchHanja(letter: Letter, index) {
    letter.searchOption = index;
    if (index === 0) {
      
    }
  }

  onSubmit() {
  }

}