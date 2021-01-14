import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  postImage: any;
  // userImage : any;

  postImageLoaded: boolean = false;
  postHasNoImage: boolean = false;
  // userImageLoaded: boolean = false;

  currentUser: User = new User;

  postOfCurrentUser: boolean = false;

  operation: string = 'edit';
  editMode: boolean = false;
  deleteMode: boolean = false;

  loading: boolean = false;

  deleteSuccess : boolean = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getPostImage();
    // this. getUserImage();
    this.currentUser = this.userService.currentUserValue
    if(this.currentUser._id === this.post.userId){
      this.postOfCurrentUser= true;
    }
  }

  getPostImage() {
    if(!this.post.postImageId){
      this.postImageLoaded = true;
      this.postHasNoImage = true;
    }
    if (this.post.postImageId) {
      this.postService.getImage(this.post.postImageId).subscribe((blob) => {
        var urlCreator = window.URL;
        this.postImage = this.sanitizer.bypassSecurityTrustUrl(
          urlCreator.createObjectURL(blob)
        );
        this.postImageLoaded = true;
      });
    }
  }

  //  getUserImage(){
  //   this.postService.getImage(this.post.userPhotoId).subscribe(blob => {
  //    var urlCreator = window.URL;
  //    this.userImage = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
  //    this.userImageLoaded = true;
  //   })
  //  }

  onEdit(){
    this.editMode = true;
  }

  onCancel(){
    this.editMode = false;
  }

  onDelete(){
    this.loading = true;
    this.deleteMode= true;
    this.postService.delete(this.post.id).subscribe((data)=>{
      this.editMode = false;
      this.deleteMode= false;
      this.deleteSuccess= true;
      this.loading = false;
      this.postService.getAllPosts();
    })
    
  }
}
