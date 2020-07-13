import {NgModule} from '@angular/core';
import {JobComponent} from './job.component';
import {JobRoutingModule} from './job-routing.module';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {ParamsService} from '../../api/service/params.service';
import {JobService} from '../../api/service/job.service';
import {ModalJobCandidateModule} from '../../modals/modal-job-candidate/modal-job-candidate.module';
import {CandidateService} from '../../api/service/candidate.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    CommonModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    JobRoutingModule,
    ModalJobCandidateModule
  ],
  providers: [ParamsService, JobService, CandidateService]
})
export class JobModule {
}
