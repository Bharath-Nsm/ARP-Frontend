import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

 private ticket:any = {};

//public items:Array<string> = ['Corp Applications - Encompass', 'Servicing - Remedy', 'Imaging Support', 'Servicing - iAssist'];

public apps:Array<Application> = [{ name:'Corp Applications - Encompass', requestTypes:['CD - Page 5', 'XML - Fatal Error', 'Econsent date missing']},
 {name:'Servicing - Remedy',requestTypes:['Force Lock', 'Eval Mod']}, {name:'Imaging Support',requestTypes:['Medical Documents']}, {name:'Servicing - iAssist',requestTypes:['none']}];
 
public appNames = this.apps.map((a:Application) => {return a.name;});
public appRequestTypes: Array<string> = [];

  private appName:string;
  private appNameValue:any = {};
  private _disabledV:string = '0';
  private appNameDisabled:boolean = false;

  private requestType:string;
  private requestTypeValue:any = {};  
  private requestTypeDisabled:boolean = true;

  private _httpClient;
  private posts:Array<any> = [];

  constructor(http: Http) { this._httpClient = http; }

  ngOnInit() {

    // TODO - Fetch
    // The below example is for your reference. Rewrite the logic for both "App Name" and "Request Type" 
    /*this._httpClient.get('https://jsonplaceholder.typicode.com/posts')
        .map(res => res.json())
        .subscribe(posts => {
          this.posts = posts;
          console.log(this.posts.length);
          });*/

    }

 public selectedAppName(value:any):void {
    console.log('Selected value is: ', value);
    if(value.text) {
      this.requestTypeDisabled = false;
      this.appRequestTypes = this.apps.filter((a:Application) => a.name==value.text)[0].requestTypes;
    } else {
      this.requestTypeDisabled = true;
    }
   //console.log(this.apps.filter((a:Application) => a.name==value.text)[0].requestTypes);
  }
 
  public removedAppName(value:any):void {
    console.log('Removed value is: ', value);
    this.appRequestTypes = [];
    this.requestTypeDisabled = true;
  }
 
  public typedAppName(value:any):void {
  }
 
  public refreshAppName(value:any):void {
    this.appNameValue = value;
  }   


  public selectedRequestType(value:any):void {
  }
 
  public removedRequestType(value:any):void {
  }
 
  public typedRequestType(value:any):void {
  }
 
  public refreshRequestType(value:any):void {
    this.requestTypeValue = value;
  }

  checkTicketInfo() {
    console.log(this.ticket);
  }

}

export class Application {
  public name:string;
  public requestTypes:Array<string> = [];
}