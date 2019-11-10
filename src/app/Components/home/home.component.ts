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
  display: Boolean;
  blogs;
  ngOnInit() {
    this.display = this.auth.isUserLoggedIn();
    if(!this.display){
      this.router.navigate(['/login']);
    }
    this.fetchBlogs();
  }
  sendData(data){
    this.httpClient.sendData(data);
    this.router.navigate(['blog-detail']);
  }
  fetchBlogs(){
    this.httpClient.fetchBlogs().subscribe(
      (resp) => this.blogs = resp,(error)=> console.log(error)
    )
  }
}
