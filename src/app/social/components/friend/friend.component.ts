import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Friend } from '../../models/friend';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() user!: Friend;

  requestPending : boolean = false;
  friend: boolean = false;

  userDetails : User = new User;

  loading: boolean = true;

  userImage : any;

  userImageLoaded: boolean = false;

  constructor(private userService: UserService,
              private postService: PostService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    if(this.user.status === "Request Pending"){
      this.requestPending = true;
    } else if((this.user.status === "You are friend")){
      this.friend = true;
    }

    this.userService.findUserById(this.user.friendId).subscribe((data : User) =>{
      this.userDetails = data;
      this.loading = false;
      this.getUserImage(data.photoId);
    })

  }

  getUserImage(photoId : string){
      this.postService.getImage(photoId).subscribe(blob => {
       var urlCreator = window.URL;
       this.userImage = this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(blob));
       this.userImageLoaded = true;
      })
     }

}
