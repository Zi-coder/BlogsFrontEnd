import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticateService,private router:Router,private httpClient: HttpClientService) { }
  display: Boolean = false;
  blogs;
  privateBlogs;
  following;
  followingLength;
  empty: Boolean = true;
  testCount;
  ngOnInit() {
    this.fetchBlogs();
   // this.fetchPrivateBlogs();
    this.fetchFollowing();
    this.display = this.auth.isUserLoggedIn();
    if(!this.display){
      this.router.navigate(['/login']);
    }
  }
  filter(category){
    this.empty = true;
    this.httpClient.fetchPrivateByCategory(category).subscribe(
      (resp)=>{this.privateBlogs = resp;
        this.httpClient.fetchPublicByCategory(category).subscribe(
          (resp)=>{
            this.blogs = resp;
            if(this.privateBlogs.length != 0 || this.blogs.length != 0)
            this.empty = false;
          }
        )
      }
    )
    
  }
  fetchBlogs(){
    this.empty = true;
    this.httpClient.fetchBlogs().subscribe(
      (resp) => {this.blogs = resp;
      this.fetchPrivateBlogs();
      },(error)=> console.log(error)
    )
  }
  fetchPrivateBlogs(){
    this.httpClient.fetchPrivateBlogs().subscribe(
      (resp)=>{
        this.privateBlogs = resp;
        if(this.privateBlogs.length != 0 || this.blogs.length != 0)
            this.empty = false;
      }
      ,
      (error) => console.log(error)
      
    )
  }
  fetchFollowing(){
    this.httpClient.fetchFollowing().subscribe(
      (resp)=>{
        this.following = resp;
        this.followingLength = this.following.length;
      },
      (error)=>console.error(error)
    )
  }
  checkFollow(id){
    if(this.following){
      for(let i =0; i < this.following.length ;i++){
        if(id == this.following[i].following.id)
        {
          
          return true;
        }
      }
      return false;
    }
    
  }
  follow(id){
    this.httpClient.follow(id).subscribe(
      (resp)=>{
        alert(resp);
        this.ngOnInit();
      }
    )
  }
  unfollow(id){
    this.httpClient.unfollow(id).subscribe(
      (resp)=>{
        alert(resp);
        this.ngOnInit();
      }
    )
  }
  goToDetails(id,follow) {
    this.router.navigate(['/blog-detail'], {
      queryParams: {
        id: id,
        follow: follow 
      }
    });
  }
  userProfile(id){
    this.router.navigate(['/gen-bio'],{
      queryParams:{
        id:id
      } 
    });
  }
}
