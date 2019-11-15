import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';
import { Router } from '@angular/router';
import { ReversePipe } from 'src/app/reverse.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user :any = false;
  blogs;
  followers :any = false;
  cFollower :any =  0;
  cFollowing :any = 0;
  sort = 'new';
  constructor(private http: HttpClientService,private route:Router,private rev: ReversePipe) { }
  
  ngOnInit() {
    this.main();
    
  }

  main(){
    this.http.currentUser().subscribe(
      (resp) => {this.user = resp;
        this.getBlogs();
      },(error)=>alert("Server Error")
    )
  }
  sortFunction(){
    if(this.sort == 'new'){
      this.ngOnInit();
    }
    else if(this.sort == 'old'){
      this.blogs = this.rev.transform(this.blogs);
    }

  }

  getBlogs(){
    this.http.fetchCurrentUserBlogs().subscribe(
      (resp)=>{
        this.blogs = resp;
        this.getFollowers();
      }
    )
  }
  deleteBlog(id){
    this.http.deleteBlog(id).subscribe(
      (resp)=>{
        alert(resp);
        this.ngOnInit();
      },(error)=>console.log(error)
      
    )
  }
  editBlog( id ){
    this.route.navigate(['edit-blog'],{
      queryParams:{
        id:id
      }
    })
  }
  getFollowers(){
    this.http.fetchFollowers().subscribe(
      (resp)=>{
        this.followers = resp;
        if(this.followers.length == 0)
        this.followers = false;
        this.countFollower(this.user.id)
      }
    )
  }
  genBio(id){
    this.route.navigate(['gen-bio'],{
      queryParams:{
        id : id
      }
    })
  }
  removeFollower(id){
    this.http.removeFollower(id).subscribe(
      (resp)=>{alert(resp);
      
      this.ngOnInit()},
      (error)=>alert(error)
    )
  }
  countFollower(id){
    return this.http.countFollowers(id).subscribe(
      (resp)=>{
        this.cFollower = resp;
        this.countFollowing(this.user.id);
      }
    )
  }
  countFollowing(id){
    return this.http.countFollowing(id).subscribe(
      (resp)=>{
        this.cFollowing = resp;
      }
    )
  }
}
