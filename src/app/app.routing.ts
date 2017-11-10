import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { LoginComponent } from './login/login.component';
import {ChatComponent} from './chat/chat.component';

import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes =[
    { path: 'request',      component: HomeComponent },
    { path: 'ticket',          component: TicketComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'chat',       component: ChatComponent},
    { path: '',          redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
