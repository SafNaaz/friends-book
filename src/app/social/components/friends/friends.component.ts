import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Friend } from '../../models/friend';
import { FriendsService } from '../../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users : Friend[] = []
  currentUser : User = new User;

  loading: boolean = true;

  constructor(private friendService: FriendsService,
              private userService: UserService) { 
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.friendService.getAllUsers().subscribe((data : Friend[]) =>{
      this.loading = false;
      console.log(data)
      this.users = data.filter(user =>{
        //TODO show friends of current user alone
        // return user.status === "You are friend" && user.userId === this.currentUser._id
        return user.status === "You are friend"
      })
    })
  }

}
