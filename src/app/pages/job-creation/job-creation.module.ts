import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JobCreationRoutingModule} from './job-creation-routing.module';
import {JobCreationComponent} from './job-creation.component';
import {JobService} from '../../api/service/job.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobCreationRoutingModule
  ],
  declarations: [
    JobCreationComponent
  ],
  providers: []
})
export class JobCreationModule {
}
