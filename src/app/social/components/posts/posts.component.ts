import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/models/user/user';
// import { UserService } from 'src/app/services/user.service';
// import { Friend } from '../../models/friend';
import { Post } from '../../models/post';
// import { FriendsService } from '../../services/friends.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  loading: boolean = true;

  operation = "add"

  // friends : Friend[] = []

  // currentUser: User = new User;

  interval: any;
  constructor(
    private postService: PostService
  ) // private friendService: FriendsService,
  // private userService: UserService
  {}

  ngOnInit(): void {
    // this.currentUser = this.userService.currentUserValue;

    // this.friendService.getAllUsers().subscribe((data : Friend[]) =>{
    //   this.loading = false;
    //   console.log(data)
    //   this.friends = data.filter(user =>{
    //     return user.status === "You are friend" && user.userId === this.currentUser._id
    //   })
    // })

    this.refreshData();
    this.interval = setInterval(() => {
      this.loading = true;
      this.postService.getAllPosts()
    }, 300000);
  }

  refreshData() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      // post.forEach((data) => {
        //TODO show posts by user's friends only
        // this.friends.forEach(friend =>{
        // if(friend.friendId === data.userId){
        this.posts = posts;
        this.posts.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        this.loading = false;
        // }
        // })
      });

     
    // });
  }

  checkLatestPosts() {
    this.loading = true;
    this.postService.getAllPosts()
  }
}
