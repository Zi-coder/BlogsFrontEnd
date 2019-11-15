import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  constructor(private HttpClient: HttpClient, private router: Router) {}

  authenticate(username, password) {
    const headers = new HttpHeaders({
      Authorization: "Basic " + btoa(username + ":" + password)
    });
    return this.HttpClient.get("http://localhost:8080/user/auth ", {
      headers
    }).pipe(
      map(userData => {
        sessionStorage.setItem(
          "Token",
          "Basic " + btoa(username + ":" + password)
        );
        sessionStorage.setItem("username", username);
      })
    );
  }
  isUserLoggedIn() {
    if (sessionStorage.getItem("Token") != null) return true;
    else return false;
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }
  changePassword(user){
 
    return this.HttpClient.post("http://localhost:8080/user/change ",user);
  }
}
