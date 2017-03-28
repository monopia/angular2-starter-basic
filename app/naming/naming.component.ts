import { Component, OnInit } from '@angular/core';

import { Hanja } from './models/hanja';
import { Hangul } from './models/hangul';
import { Letter } from './models/letter';
import { HanjaService } from './hanja.service';
import { HangulService } from './hangul.service';

@Component({
  moduleId: module.id,
  selector: 'app-naming',
  template: `
  <h2 class="text-center">Your Name!</h2>

  <form class="form-inline">
    <div class="row text-center">
      <div *ngFor="let letter of letters; let i=index" class="form-group">
        <div class="col-sm-1">
          <div [hidden]="!letter.visible" (click)="letterToggle(i)">
            <span class="letter-hanja">{{ letter.hanja.key || (letter.surname ? "姓" : "名") }} </span>
            <span class="letter-hangul" *ngIf="letter.hangul.val">{{ letter.hangul.val }}</span>
            <span class="letter-hangul" *ngIf="!letter.hangul.val"><i class='fa fa-hand-o-up' aria-hidden='true'></i></span>
          </div>
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
              [hangul]="letter.hangul"
              [surname]="letter.surname"
              (returnHangul)="letter.hangul=$event">
            </hangul-list>
            <tag-list
              [hidden]="letter.searchOption != 1"
              (returnTag)="letter.tag=$event">
            </tag-list>
          </div>
          <p></p>
          <div class="col-sm-offset-2 col-sm-10">
            <hanja-list
              [hangul]="letter.hangul"
              [tag]="letter.tag"
              (returnHanja)="letter.hanja=$event">
            </hanja-list>
          </div>
        </div>

      </div>
    </div>

  </form>

  `,
  styles: [`
    .letter-hanja {
      font-size: 3em;
      background: #f3f3f3;
      border-radius: 4px;
      padding: 10px;
      text-align: center;
    }
    .letter-hangul {
      font-size: 2em;
      border: 1px;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
    }
  `],

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

  onSubmit() {
  }

}