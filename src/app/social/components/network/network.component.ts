import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Friend } from '../../models/friend';
import { FriendsService } from '../../services/friends.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  users : Friend[] = []
  currentUser : User = new User;

  loading: boolean = true;

  constructor(private friendService: FriendsService,
              private userService: UserService) { 
  }

  ngOnInit(): void {
    // console.log(this.userService)
    this.currentUser = this.userService.currentUserValue;
    this.friendService.getAllUsers().subscribe((data : Friend[]) =>{
      // for(let user of data){
      //   console.log('userId from system: '+user.userId)
      //   console.log('userId from current user: '+this.currentUser._id)
      //   if(user.userId === this.currentUser?._id){
      //     this.users.push(user);
      //   }
      // }
      this.loading = false;
      this.users = data
    })
  }

}
