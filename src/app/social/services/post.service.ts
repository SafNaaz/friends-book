import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  constructor(private http : HttpClient,
              private sanitizer: DomSanitizer) { }

  getUserImage(photoId: string){
  return this.http.get(`${this.baseUrl}/files/`+photoId, {responseType: 'blob'})
}
}
