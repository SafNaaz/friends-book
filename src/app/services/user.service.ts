import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../models/user/UserRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  constructor(private http : HttpClient) { }

  login(user: UserRegistration) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

}
