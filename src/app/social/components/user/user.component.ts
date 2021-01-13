import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user/user';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user!: User;

  userImage : any;

  userImageLoaded: boolean = false;

  userActive: boolean = true;

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userActive = this.user.isActive;
    this.getUserImage(this.user.photoId);
  }

  getUserImage(photoId : string){
    this.postService.getImage(photoId).subscribe(blob => {
     var urlCreator = window.URL;
     this.userImage = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
     this.userImageLoaded = true;
    })
   }

}
