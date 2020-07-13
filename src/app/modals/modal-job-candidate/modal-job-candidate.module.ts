import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalJobCandidateComponent} from './modal-job-candidate.component';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalJobCandidateComponent],
  entryComponents: [
    ModalJobCandidateComponent
  ]
})
export class ModalJobCandidateModule {
}
