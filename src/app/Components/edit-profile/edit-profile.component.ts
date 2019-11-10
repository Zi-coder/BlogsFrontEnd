import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "src/app/Services/HttpClient/http-client.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  user: any = false;
  p = ["", ""];
  username = "";
  password = "";
  constructor(private http: HttpClientService, private router: Router) {}

  ngOnInit() {
    this.http.currentUser().subscribe(
      resp => {
        this.user = resp;
        this.username = this.user.username;
        this.p[0] = this.user.password;
        this.p[1] = this.user.password;
      }
      //(error) => console.log(error)
    );
  }
  register() {
    if (this.p[0] != this.p[1]) {
      alert("Password MisMatch");
    } else {
      this.password = this.p[1];
    }
    if (
      this.user.username != this.username ||
      this.password != this.user.password
    ) {
      //logout
      this.user.password = this.password;

      this.http.editUserDetails(this.user).subscribe(
        resp => {
          console.log(resp);
          this.router.navigate(["login"]);
        },
        error => console.error(error)
      );
    } else {
      //profile

      this.http.editUserDetails(this.user).subscribe(
        resp => {
          console.log(resp);
          this.router.navigate(["profile"]);
        },
        error => console.error(error)
      );
    }

    // this.http.editUserDetails(this.user).subscribe(
    //   (resp)=>console.log(resp),(error)=>console.error(error)
    // );
    //  this.router.navigate(['profile']);
  }
}
