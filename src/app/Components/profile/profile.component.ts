import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/Services/HttpClient/http-client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user :any = false;
  constructor(private http: HttpClientService) { }
  
  ngOnInit() {
    this.http.currentUser().subscribe(
      (resp) => this.user = resp,(error)=>alert("Server Error")
    )
  }

}
