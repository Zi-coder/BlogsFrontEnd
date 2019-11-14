import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { BasicAuthInterceptorService } from './Services/BasicAuthInterceptor/basic-auth-interceptor.service';
import { ProfileComponent } from './Components/profile/profile.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BlogDetailComponent } from './Components/blog-detail/blog-detail.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { CreateBlogComponent } from './Components/create-blog/create-blog.component';
import { GeneralBioComponent } from './Components/general-bio/general-bio.component';
import { EditBlogComponent } from './Components/edit-blog/edit-blog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    BlogDetailComponent,
    EditProfileComponent,
    CreateBlogComponent,
    GeneralBioComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthInterceptorService, multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
