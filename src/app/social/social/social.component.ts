import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  currentUser: User = new User;
  photoId : any;

  constructor(private userService: UserService,
              private postService: PostService,
              private sanitizer: DomSanitizer) { 
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getImage()
  }

  getImage(){
   this.postService.getUserImage(this.currentUser.photoId).subscribe(blob => {
    var urlCreator = window.URL;
    this.photoId = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
   })
  }

}
