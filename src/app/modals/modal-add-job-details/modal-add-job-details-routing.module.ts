import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModalAddJobDetailsComponent} from './modal-add-job-details.component';

const routes: Routes = [
  {path: '', component: ModalAddJobDetailsComponent, canActivate: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalAddJobDetailsRoutingModule {
}
