import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RhComponent} from './rh.component';

const routes: Routes = [
  {path: '', component: RhComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RhRoutingModule {

}
