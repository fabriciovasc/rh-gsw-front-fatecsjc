import {NgModule} from '@angular/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalAddJobDetailsComponent} from './modal-add-job-details.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalAddJobDetailsComponent],
  entryComponents: [
    ModalAddJobDetailsComponent
  ]
})
export class ModalAddJobDetailsModule {
}
