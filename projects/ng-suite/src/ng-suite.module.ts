import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [],
  declarations: [],
  exports: []
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
