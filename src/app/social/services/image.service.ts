import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  baseUrl = 'https://nodejs-fb-app.herokuapp.com';

  public uploadImage(image: File) {
    const formData = new FormData();

    formData.append('picture', image);

    return this.http.post(`${this.baseUrl}/files/uploadfile`, formData);
  }
}
