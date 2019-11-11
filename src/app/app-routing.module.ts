import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomeComponent } from './Components/home/home.component';
import { BlogDetailComponent } from './Components/blog-detail/blog-detail.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { CreateBlogComponent } from './Components/create-blog/create-blog.component';
import { GeneralBioComponent } from './Components/general-bio/general-bio.component';
const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'sign-up',
    component: SignUpComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'blog-detail',
    component: BlogDetailComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'edit-profile',
    component:EditProfileComponent
  },
  {
    path:'create',
    component:CreateBlogComponent
  },
  {
    path:'gen-bio',
    component:GeneralBioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
