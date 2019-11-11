import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user :any = false;
  blogs;
  constructor(private http: HttpClientService) { }
  
  ngOnInit() {
    this.http.currentUser().subscribe(
      (resp) => {this.user = resp;
        this.getBlogs();
      },(error)=>alert("Server Error")
    )
  }
  getBlogs(){
    this.http.fetchCurrentUserBlogs().subscribe(
      (resp)=>this.blogs = resp
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

}
