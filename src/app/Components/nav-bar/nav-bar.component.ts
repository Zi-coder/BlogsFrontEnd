import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/Authenticate/authenticate.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
  }

}
