import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

 private ticket:any = {};

//public items:Array<string> = ['Corp Applications - Encompass', 'Servicing - Remedy', 'Imaging Support', 'Servicing - iAssist'];

// public apps:Array<Application> = [{ name:'Corp Applications - Encompass', requestTypes:['CD - Page 5', 'XML - Fatal Error', 'Econsent date missing']},
//  {name:'Servicing - Remedy',requestTypes:['Force Lock', 'Eval Mod']}, {name:'Imaging Support',requestTypes:['Medical Documents']}, {name:'Servicing - iAssist',requestTypes:['none']}];

//public appNames = this.apps.map((a:Application) => {return a.name;});
  public fieldnames:Array<string> = [];
 // [{ name:'Loan Number',type:'number',label:'Loan Number'},{name:'case id',type:'number',label:'Case id'},{name:'user name',type:'text',label:'Name'}];
public appNames=[]
public selected_val=''
public reqNames=[];
public reqid = [];
public reqtype:Array<RequestTypes> = [];
public params=[];

  private appName:string;
  private appNameValue:any = {};
  private _disabledV:string = '0';
  private appNameDisabled:boolean = false;
  private subTypeDisabled:boolean = true;

  private requestType:string;
  private requestTypeValue:any = {};
  private requestTypeDisabled:boolean = true;

  private _httpClient;
  private posts:Array<any> = [];

  //Urls
  private appNameListUrl:string = 'http://10.79.8.122:8082/arp/index';
  private requestTypeListUrl:string;
  private paramListUrl:string =  'http://10.79.8.122:8082/arp/extract/requestData/';
  public urlNew : string;

  constructor(http: Http) { this._httpClient = http; }

  ngOnInit() {
    //API call statement - Initial Application Names
    this._httpClient.get(this.appNameListUrl)
        .map(res => res.json())
        .subscribe(posts => {
          this.appNames = posts;
       });
    }

 public selectedAppName(value:any) {
   //API call statement - Request Types
    this.selected_val=value.text.toString();
    this.requestTypeListUrl = 'http://10.79.8.122:8082/arp/extract/requestType/'+this.selected_val;
    this._httpClient.get(this.requestTypeListUrl)
        .map(res => res.json())
        .subscribe(posts => {
          this.reqtype=posts;
          if(value.text) {
            this.requestTypeDisabled = false;
            this.reqtype = posts;
            this.reqNames = this.reqtype.map((a:RequestTypes) => {return a.req_name;})
            this.reqid = this.reqtype.map((a:RequestTypes)=>{return a.req_id;})

            // console.log("array",this.reqNames, this.reqid)

          } else {
            this.requestTypeDisabled = true;
          }
       });

   //console.log(this.apps.filter((a:Application) => a.name==value.text)[0].requestTypes);
  }
//temporary
  public getParamList(value:any) {
  var dict = {};
  var responselist = {};
  for(var i = 0; i < this.reqNames.length; i++){
    dict[this.reqNames[i]] = this.reqid[i];
  }
  this.urlNew = String(this.paramListUrl + this.selected_val + "/" + dict[value].toString());
  this.params = [];
          // responselist = posts['param_list'];
          this._httpClient.get(this.urlNew) .map(res => res.json())
      .subscribe(posts => {
         for (var i=0;i<posts[0].parm_list.length;i++){
           this.params.push(posts[0].parm_list[i]);
         }

       });
}


  public removedAppName(value:any):void {
    console.log('Removed value is: ', value);
    this.requestTypeDisabled = true;
  }

  public typedAppName(value:any):void {
  }

  public refreshAppName(value:any):void {
    this.appNameValue = value;
  }


  public selectedRequestType(value:any):void {
     this.getParamList(value.text.toString());
  }

  public removedRequestType(value:any):void {
    this.subTypeDisabled = true;
  }

  public typedRequestType(value:any):void {
    this.subTypeDisabled = false;
  }

  public refreshRequestType(value:any):void {
    this.requestTypeValue = value;
  }

  submitTicketInfo() {
    console.log(this.ticket);
    this._httpClient.get('http://10.79.8.86/cgi-bin/response.py?application="filenet"')
        .map((res:Response) => {
          console.log(res);
        });
       }
    }

    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    //
    // return this._httpClient.post(this.node_Url + 'api/letters/add_holiday', reportData, options)
    //   .map((res: Response) => {
    //     return res.status;
    //   });

export class RequestTypes {
  public req_id:number;
  public req_name:string;
}

// export class Application {
//   public name:string;
//   public requestTypes:Array<string> = [];
// }
