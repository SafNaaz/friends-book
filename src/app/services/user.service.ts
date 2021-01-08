import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../models/user/UserRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserValue : any;

  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  constructor(private http : HttpClient) { }

  register(user: UserRegistration) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  login(user: { email: any; password: any; }) {
    return this.http.post(`${this.baseUrl}/users/authenticate`, user);
  }

}
