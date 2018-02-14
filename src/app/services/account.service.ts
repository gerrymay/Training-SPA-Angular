import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { error } from 'protractor';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import {Itoken} from '../auth/itoken';

@Injectable()
export class AccountService {
   loginurl:string = environment.apiURL + "/token"; 
   private key = CryptoJS.enc.Utf8.parse('7061737323313233');
   private iv = CryptoJS.enc.Utf8.parse('7061737323313233');
  constructor(private _http:HttpClient) { }

  public doLogin(email:string, password:string):Observable<any> {
    //suscribe
    let body = new URLSearchParams();
    body.set("username",email);
    body.set("password",password);
    body.set("grant_type","password");
    body.set("client_id","web");

    let options = {
        headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this._http.post(this.loginurl, body.toString(), options)
    .do(data=>{
        var tokenString = JSON.stringify(data);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(tokenString), this.key,{keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
       // console.log(tokenString);
        localStorage.setItem("token", encrypted);
    })
    .catch(this.handleError);
  }

  handleError(errorData:HttpErrorResponse){
    return Observable.throw(errorData.error.error_description);
  }

  public getCurrentSession():Itoken{
    var tokenString = localStorage .getItem("token");
    if(tokenString == undefined) return null;
 
     var encryptedToken = tokenString;
     var decrypted = CryptoJS.AES.decrypt(encryptedToken, this.key, {keySize: 128 / 8,iv: this.iv,mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
     var token = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
     return token;

  }

 public getToken():string{
    var currentSession = this.getCurrentSession();
    if(currentSession != null)
        return currentSession.access_token;
    return null;
  }

  public doLogout(){
      localStorage.removeItem("token");
  }

}