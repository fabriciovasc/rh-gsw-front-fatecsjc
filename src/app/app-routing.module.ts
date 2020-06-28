import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobCreationComponent} from './pages/job-creation/job-creation.component';
import {RegisteredJobsComponent} from './pages/registered-jobs/registered-jobs.component';

const routes: Routes = [
  {path: 'job-creation', component: JobCreationComponent},
  {path: 'registered-jobs', component: RegisteredJobsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
