import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CandidateBaseComponent} from './candidate-base.component';

const routes: Routes = [
  {path: '', component: CandidateBaseComponent, canActivate: []}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateBaseRoutingModule {
}
