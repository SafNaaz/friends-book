import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  currentUser: User = new User;

  constructor(private userService: UserService) { 
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}
