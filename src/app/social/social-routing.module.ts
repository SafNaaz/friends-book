import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './components/friends/friends.component';
import { NetworkComponent } from './components/network/network.component';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './helpers/routeguards/admin.guard';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  {
    path: '',
    component: SocialComponent,
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'network', component: NetworkComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'users', component: UsersComponent , canActivate: [AdminGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialRoutingModule {}
