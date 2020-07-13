import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisteredJobsComponent} from './registered-jobs.component';

const routes: Routes = [
  {path: '', component: RegisteredJobsComponent, canActivate: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredJobsRoutingModule {
}
