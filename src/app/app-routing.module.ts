import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RhComponent} from './pages/rh/rh.component';
import {JobCreationComponent} from './pages/rh/job-creation/job-creation.component';
import {RegisteredJobsComponent} from './pages/rh/registered-jobs/registered-jobs.component';
import {JobComponent} from './pages/job/job.component';
import {CandidateBaseComponent} from './pages/rh/candidate-base/candidate-base.component';

const routes: Routes = [
  {path: '', redirectTo: '/rh', pathMatch: 'full'},
  {
    path: 'rh', component: RhComponent,
    children: [
      {path: 'job-creation', component: JobCreationComponent},
      {path: 'registered-jobs', component: RegisteredJobsComponent},
      {path: 'candidate-base', component: CandidateBaseComponent}
    ]
  },
  {path: 'job/:id', component: JobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
