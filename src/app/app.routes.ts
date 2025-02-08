import { Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { HomeComponent } from './home/home.component';
import { TechnologiesDetailsComponent } from './technologies-details/technologies-details.component';
import { CreateGroupComponent } from './blog/component/create-group/create-group.component';
import { GroupListComponent } from './blog/component/group-list/group-list.component';
import { GroupBlogListComponent } from './blog/component/group-blog-list/group-blog-list.component';

export const routes: Routes = [
    { path: 'author/:id', component: AuthorComponent },
    { path: 'technologies', component: TechnologiesDetailsComponent },
    { path: 'blogs', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {path: 'home', component: HomeComponent},
    {path: 'group', component: CreateGroupComponent},
    {path: 'list', component: GroupListComponent},
    { path: 'groups/:id/blogs', component: GroupBlogListComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];