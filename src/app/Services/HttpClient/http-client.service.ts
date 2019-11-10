import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  data;
  constructor(private httpClient: HttpClient) {}
  private baseUrl = "http://localhost:8080";
  //User
  register(user) {
    return this.httpClient.post(this.baseUrl + "/user/register", user);
  }
  fetchBlogs() {
    return this.httpClient.get(this.baseUrl +"/blog/publicBlogs");
  }
   currentUser(){
    return this.httpClient.get(this.baseUrl +"/user/current");
   }

  //dataTransfer
  sendData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  editUserDetails(user){
   return this.httpClient.post(this.baseUrl + "/user/editDetails",user);
  }

  //Blog Services
  createBlog(blog){
    return this.httpClient.post(this.baseUrl + "/blog/create",blog);
  }
}
