import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalAddCreateJobDetailsComponent} from './modal-add-create-job-details.component';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalAddCreateJobDetailsComponent],
  entryComponents: [
    ModalAddCreateJobDetailsComponent
  ]
})
export class ModalAddCreateJobDetailsModule {
}
