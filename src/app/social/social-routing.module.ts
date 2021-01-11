import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './components/friends/friends.component';
import { NetworkComponent } from './components/network/network.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  {
    path: '',
    component: SocialComponent,
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'network', component: NetworkComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialRoutingModule {}
