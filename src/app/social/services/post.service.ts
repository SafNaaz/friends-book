import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  public allPosts = new ReplaySubject<Post[]>(1);

  constructor(private http: HttpClient) {
    this.getAllPosts()
  }

  getPosts(){
    return this.allPosts.asObservable();
  }

  getImage(photoId: string) {
    return this.http.get(`${this.baseUrl}/files/` + photoId, {
      responseType: 'blob',
    });
  }

  getAllPosts() {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).subscribe(data=>{
      return this.allPosts.next(data)
    })
  }

  getPostsByUserId(id: string){
    return this.http.post<Post[]>(`${this.baseUrl}/posts/findpostbyuserid`,{id:id});
  }

  addPost(post: Post, operation: string) {
    if(operation === 'add'){
      return this.http.post(`${this.baseUrl}/posts/createpost`,post);
    }else{
      return this.http.put(`${this.baseUrl}/posts/${post.id}`,post);
    }
  }

}
