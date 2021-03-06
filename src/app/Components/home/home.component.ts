import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';
import { ReversePipe } from 'src/app/reverse.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticateService,private router:Router,private httpClient: HttpClientService,private rev: ReversePipe) { }
  display: Boolean = false;
  blogs;
  privateBlogs;
  following;
  followingLength;
  empty: Boolean = true;
  testCount;
  query={
    criteria:"",
    query:""
  }
  sort = 'new';
  users: any = false;
  ngOnInit() {
    this.users = false;
    this.fetchBlogs();
   // this.fetchPrivateBlogs();
    this.fetchFollowing();
    this.display = this.auth.isUserLoggedIn();
    if(!this.display){
      this.router.navigate(['/login']);
    }
  }
  sortFunction(){
    if(this.sort == 'new'){
      this.ngOnInit();
    }
    else if(this.sort == 'old'){
      this.blogs = this.rev.transform(this.blogs);
      this.privateBlogs = this.rev.transform(this.privateBlogs);
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
  filterUser(user){
    if(user.username != sessionStorage.getItem('username'))
    return user;
  }
  search(){
    this.empty = true;
    if(this.query.criteria == 'user'){
      this.httpClient.userQuery(this.query.query).subscribe(
        resp=>{
          this.users = resp;
          this.users = this.users.filter(this.filterUser)
          //this.empty = false;

        },
        error=>{
          console.log(error);
        }
        
      )
    }
    if(this.query.criteria == 'blog'){
      this.httpClient.fetchPrivateBlogByQuery(this.query.query).subscribe(
        (resp)=>{
          this.privateBlogs = resp;
          this.httpClient.fetchPublicBlogByQuery(this.query.query).subscribe(
            (resp)=>{
              this.blogs = resp;
              if(this.privateBlogs.length != 0 || this.blogs.length != 0)
              this.empty = false;
            }
          )
        }
      )

    }
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
