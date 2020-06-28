import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisteredJobsRoutingModule} from './registered-jobs-routing.module';
import {RegisteredJobsComponent} from './registered-jobs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisteredJobsRoutingModule
  ],
  declarations: [
    RegisteredJobsComponent
  ],
  providers: []
})
export class RegisteredJobsModule {
}
