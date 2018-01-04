import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) {
    
  }

  login(username:string, password:string) {
    return this.getToken(username, password)
    .switchMap(this.storeToken);
  }

  isLoggedIn() {
    return this.hasToken();
  }

  logout() {

  }

  private getToken(username: string, password: string) {
    return this.http.post('/api-token-auth/', {
      username,
      password
    });
  }

  hasToken() {
    return of(new Error('Not logged in'));
  }

  private storeToken(data: any) {
    localStorage.setItem('stocktoken', data.token);
    return of(data);
  }

  removeToken() {

  }

}