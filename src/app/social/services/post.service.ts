import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  constructor(private http: HttpClient) {}

  getUserImage(photoId: string) {
    return this.http.get(`${this.baseUrl}/files/` + photoId, {
      responseType: 'blob',
    });
  }

  getAllPosts() {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }
}
