import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ToastrModule} from 'ngx-toastr';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {MomentModule} from 'ngx-moment';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {ModalAddJobDetailsModule} from './modals/modal-add-job-details/modal-add-job-details.module';
import {JobCreationModule} from './pages/job-creation/job-creation.module';
import {JobService} from './api/service/job.service';
import {RegisteredJobsModule} from './pages/registered-jobs/registered-jobs.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    MomentModule.forRoot(),
    LoadingBarHttpClientModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
