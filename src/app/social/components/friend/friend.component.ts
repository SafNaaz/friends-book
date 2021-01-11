import { Component, Input, OnInit } from '@angular/core';
import { Friend } from '../../models/friend';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() user!: Friend;

  

  constructor() { }

  ngOnInit(): void {


  }

}
