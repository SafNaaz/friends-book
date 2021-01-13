import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[] = []

  loading : boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(data =>{
      this.users = data
      this.loading = false;
    });
  }

}
