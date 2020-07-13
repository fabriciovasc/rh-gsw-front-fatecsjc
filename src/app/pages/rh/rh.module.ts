import {NgModule} from '@angular/core';
import {RhComponent} from './rh.component';

import {RhRoutingModule} from './rh-routing.module';
import {RegisteredJobsModule} from './registered-jobs/registered-jobs.module';
import {JobCreationModule} from './job-creation/job-creation.module';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {CandidateBaseModule} from './candidate-base/candidate-base.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    RhComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    RhRoutingModule,
    RegisteredJobsModule,
    JobCreationModule,
    CandidateBaseModule
  ],
  providers: []
})
export class RhModule { }
