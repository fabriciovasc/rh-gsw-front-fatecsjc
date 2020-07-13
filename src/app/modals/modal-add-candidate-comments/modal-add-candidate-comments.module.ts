import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalAddCandidateCommentsComponent} from './modal-add-candidate-comments.component';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalAddCandidateCommentsComponent],
  entryComponents: [
    ModalAddCandidateCommentsComponent
  ]
})
export class ModalAddCandidateCommentsModule {
}
