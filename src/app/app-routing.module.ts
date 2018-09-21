import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DEMO_ROUTES } from './router';

const routes: Routes = [
  ...DEMO_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
