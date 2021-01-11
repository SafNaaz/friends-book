import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { NetworkComponent } from './components/network/network.component';
import { FriendsComponent } from './components/friends/friends.component';
import { UsersComponent } from './components/users/users.component';
import { SocialComponent } from './social/social.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PostsComponent, NetworkComponent, FriendsComponent, UsersComponent, SocialComponent],
  imports: [
    CommonModule,
    SocialRoutingModule,
    ReactiveFormsModule
  ]
})
export class SocialModule { }