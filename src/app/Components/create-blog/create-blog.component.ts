import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  blog = {
    // pr:"false",
    topic : "",
    content: "",
    pr: "false",
    category:""
  };
  constructor(private httpService:HttpClientService,private router:Router) { }

  ngOnInit() {
  }
  create(){
    this.httpService.createBlog(this.blog).subscribe(
      (resp)=>{
        console.log(resp);
        this.router.navigate(['/home']);
      },(error)=>console.log(error)
    )
  }
}
