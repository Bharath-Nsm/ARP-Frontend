import { Component, OnInit } from '@angular/core';

declare interface TicketData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

    public ticketData: TicketData;

  constructor() { }

  ngOnInit() {
      this.ticketData = {
          headerRow: [ 'ID', 'Subject', 'Application', 'Request Type', 'Date'],
          dataRows: [
              ['1012', 'Please eval mod case', 'Servicing Remedy', 'Eval', '2017-10-22'],
              ['2012', 'LSAMS Password reset for RETT344A', 'Servicing LSAMS', 'Password Reset', '2017-11-04'],
              ['43011', 'Update Settlement Agent info on CD P5', 'Encompass', 'NA', '2017-11-08'],
              ['1232', 'force lock 041110922', 'Servicing Remedy', 'Force Lock', '2017-10-30']
          ]
      };
  }

}
