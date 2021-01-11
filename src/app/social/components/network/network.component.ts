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
    this.currentUser = this.userService.currentUserValue;
    this.friendService.getAllUsers().subscribe((data : Friend[]) =>{
      this.users = data.filter(user =>{
        //TODO show request pending to only user requested ones
        //return user.status !== "You are friend" && user.userId === this.currentUser._id
        return user.status !== "You are friend"
      })
      this.loading = false;
    })
  }
}
