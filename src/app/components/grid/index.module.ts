import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';

import { NsDemoGridBasicComponent } from './basic';
import { NsDemoGridZhComponent } from './zh.component';
import { NsDemoGridEnComponent } from './en.component';


@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      { path: 'en', component: NsDemoGridEnComponent },
      { path: 'zh', component: NsDemoGridZhComponent }
    ])
  ],
  declarations: [
		NsDemoGridBasicComponent,
		NsDemoGridZhComponent,
		NsDemoGridEnComponent,

  ],
  entryComponents: [

  ]
})
export class NsDemoGridModule {}