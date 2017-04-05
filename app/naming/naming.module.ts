import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { SharedModule }       from '../shared/shared.module';

import { NamingComponent }     from './naming.component';
import { HangulListComponent } from './hangul-list.component';
import { TagListComponent }    from './tag-list.component';
import { HanjaListComponent }  from './hanja-list.component';
import { HanjaService }        from './hanja.service';
import { HangulService }       from './hangul.service';
import { TheoryService }       from './theory.service';
import { namingRouting }       from './naming.routing';

@NgModule({
  imports:      [ CommonModule, namingRouting, SharedModule ],
  declarations: [ NamingComponent, HangulListComponent, HanjaListComponent, TagListComponent ],
  providers:    [ HanjaService, HangulService, TheoryService ]
})
export class NamingModule { }