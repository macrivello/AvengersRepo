import {Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {FlowchartComponent} from '../components/flowchart/flowchart.component';
import {LoginComponent} from '../components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/flowchart', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'flowchart', component: FlowchartComponent, canActivate: [AuthGuard]   },
  { path: 'flowchart/:id',  component: FlowchartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', canActivate: [AuthGuard] } // TODO Or we can display an ErrorComponent since this is technically a 404
];
