import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      { path: 'en', component: NsDemo{{component}}EnComponent },
      { path: 'zh', component: NsDemo{{component}}ZhComponent }
    ])
  ],
  declarations: [
{{declarations}}
  ],
  entryComponents: [
{{entryComponents}}
  ]
})
export class NsDemo{{component}}Module {}