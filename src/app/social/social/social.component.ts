import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Friend } from '../models/friend';
import { Post } from '../models/post';
import { FriendsService } from '../services/friends.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent implements OnInit {
  currentUser: User = new User();
  photoId: any;
  imageLoaded: boolean = false;

  connections: number = 0;
  connectionsLoaded: boolean = false;

  posts: number = 0;
  postLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private friendService: FriendsService,
    private sanitizer: DomSanitizer
  ) {
    this.userService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.getImage();
    this.getConnections();
    this.getPosts();
  }

  getImage() {
    this.postService.getImage(this.currentUser.photoId).subscribe((blob) => {
      var urlCreator = window.URL;
      this.photoId = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(blob)
      );
      this.imageLoaded = true;
    });
  }

  getConnections() {
    this.friendService.getAllUsers().subscribe((data: Friend[]) => {
      this.connectionsLoaded = true;
      this.connections = data.filter((user) => {
        return user.status === 'You are friend';
      }).length;
    });
  }

  getPosts() {
    this.postService.getPostsByUserId(this.currentUser._id).subscribe((data: Post[]) => {
      this.postLoaded = true;
      this.posts = data.length;
    });
  }
}
