import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NsCodeBoxComponent } from './ns-codebox.component';
import { NgSuiteModule } from 'ng-suite';

@NgModule({
  imports     : [ CommonModule, NgSuiteModule ],
  declarations: [ NsCodeBoxComponent ],
  exports     : [ NsCodeBoxComponent ]
})

export class NsCodeBoxModule {
}

