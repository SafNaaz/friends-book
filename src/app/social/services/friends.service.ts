import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Friend } from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<Friend[]>(`${this.baseUrl}/friends`);
  }
}
