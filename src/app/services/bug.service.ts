import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders} from'@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {AccountService} from './account.service';
import { Bug } from '../bugs/bug';

@Injectable()
export class BugService {

  private _urlBugs = environment.apiURL + "/api/bug"

  constructor(private _accountService:AccountService, private _http:HttpClient) { }

  public getBugs():Observable<any>
  {
    const httpOptions = {
      headers:new HttpHeaders({"Authorization":"bearer " + this._accountService.getToken()})
    };

    return this._http.get(this._urlBugs,httpOptions)
    .do(
      data=>{})
    .catch(this.errorHandler);
  }

  public getBug(id:number){
    const httpOptions = {
      headers:new HttpHeaders({"Authorization":"bearer " + this._accountService.getToken()})
    };

    return this._http.get(this._urlBugs + "/" + id,httpOptions)
    .do(
      data=>{})
    .catch(this.errorHandler);
  }

  public postBug(bug:Bug):Observable<any>{
    const httpOptions = {
      headers:new HttpHeaders({"Authorization":"bearer " + this._accountService.getToken()})
    };

    return this._http.post(this._urlBugs,bug ,httpOptions)
    .do(
      data=>{})
    .catch(this.errorHandler);

  }

  public putBug(param:any, bug:any):Observable<any>{
    const httpOptions = {
      headers:new HttpHeaders({"Authorization":"bearer " + this._accountService.getToken()})
    };

    return this._http.put(this._urlBugs+ "/" + param, bug ,httpOptions)
    .do(
      data=>{})
    .catch(this.errorHandler);

  }

  public errorHandler(error:HttpErrorResponse)
  {
    console.log(error);
    return Observable.throw(error);
  }
}