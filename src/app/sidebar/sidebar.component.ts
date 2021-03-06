import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'request', title: 'Request',  icon: 'pe-7s-graph', class: '' },
    { path: 'ticket', title: 'Tickets',  icon:'pe-7s-note2', class: '' },
    { path: 'chat' , title: 'Enquire' , icon: 'pe-7s-chat' , class: '' }
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
