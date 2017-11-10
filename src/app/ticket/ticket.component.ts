import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


declare interface TicketData {
    headerRow: string[];
}

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

 private ticket:any = {};
 public single_record = [];
 public records:any = [];
  public appRequestTypes: Array<string> = [];
  public appNames=[]
  public selected_val=''
    private appName:string;
    private appNameValue:any = {};
    private _disabledV:string = '0';
    private appNameDisabled:boolean = false;
    public ticketData: TicketData;

    private _httpClient;
    private posts:Array<any> = [];

    constructor(http: Http) { this._httpClient = http; }

    ngOnInit() {
      //API call statement - Initial Application Names
      this._httpClient.get('http://10.79.8.122:8082/arp/index')
          .map(res => res.json())
          .subscribe(posts => {
            this.appNames = posts;
         });
         this.ticketData = {
          headerRow: [ 'Ticket Number', 'Application', 'Subject', 'Status', 'User', 'Updated']
        };
      }

      public request_types_api(selected_val){
        this._httpClient.get('http://10.79.8.122:8082/arp/getAppTickets/'+selected_val)
            .map(res => res.json())
            .subscribe(posts => {
              for (var i = 0; i < posts.length; i++ ) {
                this.single_record=[]
                this.single_record.push(posts[i].tic_num.toString());
                this.single_record.push(posts[i].app_name);
                this.single_record.push(posts[i].tic_header);
                this.single_record.push(posts[i].tic_status);
                this.single_record.push(posts[i].tic_user);
                this.single_record.push(posts[i].tic_last_updated);
                this.records.push(this.single_record)
            }
           });
      }

      public selectedAppName(value:any):void {
        //API call statement - Request Types
         this.records=[];
         this.selected_val=value.text.toString();
         this.request_types_api(this.selected_val); //console.log(this.apps.filter((a:Application) => a.name==value.text)[0].requestTypes);
         console.log(this.records)
       }

       public typedAppName(value:any):void {
       }

       public refreshAppName(value:any):void {
         this.appNameValue = value;
       }

       checkTicketInfo() {
         console.log(this.ticket);
       }
}
