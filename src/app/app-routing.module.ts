import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpageComponent } from './userpage/userpage.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', component:UserpageComponent},
  {path:'agentdashboard', component:AgentdashboardComponent, canActivate: [AuthGuard] },
  {path:'agentlogin', component:AgentloginComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
