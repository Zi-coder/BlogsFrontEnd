import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-bio',
  templateUrl: './general-bio.component.html',
  styleUrls: ['./general-bio.component.scss']
})
export class GeneralBioComponent implements OnInit {
  user;
  blogs;
  constructor(private http:HttpClientService,private route:ActivatedRoute) { }

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
      
      },(error)=>console.log(error)
      
    )
  }
}
