import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general-bio',
  templateUrl: './general-bio.component.html',
  styleUrls: ['./general-bio.component.scss']
})
export class GeneralBioComponent implements OnInit {
  user;
  blogs;
  following;
  followingLength;
  cFollower: any =  0;
  cFollowing: any = 0;
  constructor(private http:HttpClientService,private route:ActivatedRoute,private router: Router,private httpClient: HttpClientService) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(){
    this.route.queryParams.subscribe(
      (params)=>{
        this.http.getGeneralBio(params.id).subscribe(
          (response)=>{
            this.user = response;
            this.getPublicBlogs(params.id);
          },(error)=>{
            console.log(error);
          }
        )
      }
    )
  }
  getPublicBlogs(id){
    this.http.fetchPublicBlogsByCreator(id).subscribe(
      (resp)=>{
        this.blogs = resp;
        this.countFollower(id);
        this.fetchFollowing();
      
      },(error)=>console.log(error)
      
    )
  }
  countFollower(id){
    return this.http.countFollowers(id).subscribe(
      (resp)=>{
        this.cFollower = resp;
        this.countFollowing(id);
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
  
      
      
      for(let i =0; i < this.followingLength ;i++){
        if(id == this.following[i].following.id)
        {
          
          return true;
        }
      }
      return false;
    }
    
  }
  goToDetails(id,follow) {
    this.router.navigate(['/blog-detail'], {
      queryParams: {
        id: id,
        follow: follow 
      }
    });
  }
}
