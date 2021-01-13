import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user/user';
import { UserRegistration } from '../models/user/UserRegistration';
import { UserProfile } from '../setting/models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  constructor(private http: HttpClient) {
    const data: any = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(data));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user: UserRegistration) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  updateUser(user: UserProfile) {
    return this.http.put(`${this.baseUrl}/users/${user.id}`, user);
  }

  login(creds: { email: any; password: any }) {
    return this.http
      .post<User>(`${this.baseUrl}/users/authenticate`, creds)
      .pipe(
        map((user: User) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  findUserByEmail(email: string) {
    return this.http.post<User[]>(`${this.baseUrl}/users/finduserbyemail`, {
      email: email,
    });
  }

  findUserById(id: string) {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  forgotPassword(user: { email: any; dob: any }) {
    return this.findUserByEmail(user.email);
  }

  resetPassword(user: { password: string; id: string }) {
    return this.http.put<User[]>(`${this.baseUrl}/users/${user.id}`, {
      password: user.password,
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }

}
