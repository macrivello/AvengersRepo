import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FlowchartComponent} from '../components/flowchart/flowchart.component';
import {AuthGuard} from '../guards/auth.guard';
import {LoginComponent} from '../components/login/login.component';
const routes: Routes = [
  { path: '', redirectTo: '/flowchart', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'flowchart',  component: FlowchartComponent },
  { path: 'flowchart/:id',  component: FlowchartComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // TODO Or we can display an ErrorComponent since this is technically a 404
];

@NgModule({
  imports: [ RouterModule.forRoot(routes /*, {useHash: true}*/ )],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
