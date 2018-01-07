import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  loggedIn = new BehaviorSubject(false); 
  
  constructor(private http: HttpService) {
    this.loggedIn.subscribe(()=>{});
    this.isLoggedIn()
    .subscribe((val)=>{
      this.loggedIn.next(val)
    });
  }

  login(username:string, password:string) {
    return this.getToken(username, password)
    .switchMap(this.storeToken)
    .do(() => {
      this.loggedIn.next(true);
    });
  }

  isLoggedIn() {
    return this.hasToken();
  }

  logout() {
    return this.removeToken();
  }

  private getToken(username: string, password: string) {
    return this.http.post('/api-token-auth/', {
      username,
      password
    });
  }

  private hasToken() {
    let token = localStorage.getItem('stocktoken');
    console.log('token is ', token);
    let val = token ? true : false;
    return of(val);
  }

  private storeToken(data: any) {
    localStorage.setItem('stocktoken', data.token);
    return of(data);
  }

  removeToken() {
    localStorage.removeItem('stocktoken');
    return of(true);
  }

}