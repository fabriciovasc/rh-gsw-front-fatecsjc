import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JobCreationRoutingModule} from './job-creation-routing.module';
import {JobCreationComponent} from './job-creation.component';
import {JobService} from '../../../api/service/job.service';
import {ModalAddCreateJobDetailsModule} from '../../../modals/modal-add-create-job-details/modal-add-create-job-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobCreationRoutingModule,
    ModalAddCreateJobDetailsModule,
  ],
  declarations: [
    JobCreationComponent
  ],
  providers: [JobService]
})
export class JobCreationModule {
}
