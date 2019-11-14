import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  blog: any  = false;
  constructor(private route:ActivatedRoute,private http:HttpClientService,private router: Router) { }

  ngOnInit() {
    this.getBlogDetail();
  }
  getBlogDetail() {
    this.route.queryParams.subscribe(params => {
      this.http.getBlogDetail(params.id).subscribe((data: any) => {
        this.blog = data;
        this.blog.pr = 'true';
      });
    });
  }
  edit(){
    if(this.blog.category == "" || this.blog.topic =="" ||  this.blog.content ==""){
      alert("Fill All Fields");
    }else{
      this.http.editBlog(this.blog).subscribe(
        (resp)=>{
          alert(resp);
          this.router.navigate(['profile']);

        },
        (error)=>alert(error)
      )
    }
    
  }
}
