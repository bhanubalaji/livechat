import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserpageComponent } from './userpage/userpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { AgentloginComponent } from './agentlogin/agentlogin.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserpageComponent,
    AgentdashboardComponent,
    AgentloginComponent,
    Child1Component,
    Child2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
