import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post! : Post;

  postImage : any;
  userImage : any;

  postImageLoaded: boolean = false;
  userImageLoaded: boolean = false;

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPostImage();
  }

  getPostImage(){
    this.postService.getImage(this.post.postImageId).subscribe(blob => {
     var urlCreator = window.URL;
     this.postImage = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
     this.postImageLoaded = true;
    })
   }

   getUserImage(){
    this.postService.getImage(this.post.userPhotoId).subscribe(blob => {
     var urlCreator = window.URL;
     this.userImage = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
     this.userImageLoaded = true;
    })
   }

}
