import { NgModule, ModuleWithProviders } from '@angular/core';

import { NsGridModule } from './grid';

export * from './grid';

@NgModule({
  exports: [
    NsGridModule
  ]
})
export class NgSuiteModule { 
  /**
   * @deprecated Use `NgZorroAntdModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgSuiteModule
    };
  }
}
