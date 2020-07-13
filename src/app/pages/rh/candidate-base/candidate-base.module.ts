import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CandidateBaseComponent} from './candidate-base.component';
import {JobService} from '../../../api/service/job.service';
import {CandidateBaseRoutingModule} from './candidate-base-routing.module';
import {ModalAddCandidateCommentsModule} from '../../../modals/modal-add-candidate-comments/modal-add-candidate-comments.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateBaseRoutingModule,
    ModalAddCandidateCommentsModule
  ],
  declarations: [
    CandidateBaseComponent
  ],
  providers: [
    JobService
  ]
})
export class CandidateBaseModule {
}
