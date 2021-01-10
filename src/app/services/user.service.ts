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

  findUserByEmail(email: string){
    return this.http.post(`${this.baseUrl}/users/finduserbyemail`, {email:email});
  }

  forgotPassword(user: { email: any; dob: any; }) {
    this.findUserByEmail(user.email).subscribe((data : any) =>{
      console.log(data)
    })


    return this.http.put(`${this.baseUrl}/users/`, user);
  }

}
