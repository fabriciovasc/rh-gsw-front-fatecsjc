import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalJobDetailsComponent} from './modal-job-details.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  declarations: [ModalJobDetailsComponent],
  entryComponents: [
    ModalJobDetailsComponent
  ]
})
export class ModalJobDetailsModule {
}
