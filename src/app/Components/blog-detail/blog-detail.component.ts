import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit,OnDestroy {

  constructor(private http:HttpClientService) { }
  blog:any = false;
  ngOnInit() {
   this.blog = this.http.getData();
   console.log(this.blog);
  }
  ngOnDestroy(){
    this.blog = "";
  }

}
