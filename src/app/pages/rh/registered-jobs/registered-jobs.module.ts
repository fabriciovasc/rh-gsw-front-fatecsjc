import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisteredJobsComponent} from './registered-jobs.component';
import {JobService} from '../../../api/service/job.service';
import {RegisteredJobsRoutingModule} from './registered-jobs-routing.module';
import {ModalJobDetailsModule} from '../../../modals/modal-job-details/modal-job-details.module';
import {ParamsService} from '../../../api/service/params.service';

@NgModule({
  imports: [
    CommonModule,
    RegisteredJobsRoutingModule,
    ModalJobDetailsModule
  ],
  declarations: [
    RegisteredJobsComponent
  ],
  providers: [
    JobService,
    ParamsService
  ]
})
export class RegisteredJobsModule {
}
