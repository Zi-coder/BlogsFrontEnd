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

  currentUser() {
    return this.httpClient.get(this.baseUrl + "/user/current");
  }

  //dataTransfer
  sendData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  editUserDetails(user) {
    return this.httpClient.post(this.baseUrl + "/user/editDetails", user);
  }

  //Blog Services
  createBlog(blog) {
    return this.httpClient.post(this.baseUrl + "/blog/create", blog);
  }
  fetchBlogs() {
    return this.httpClient.get(this.baseUrl + "/blog/publicBlogs");
  }
  fetchPrivateBlogs() {
    return this.httpClient.get(this.baseUrl + "/blog/privateBlogs");
  }

  getBlogDetail(id) {
    return this.httpClient.get(this.baseUrl + "/blog/details/" + id);
  }
  //BlogMEtaDATA

  getMetaData(id) {
    return this.httpClient.get(this.baseUrl + "/detail/metadata/" + id);
  }
  deleteMeta(id){
    return this.httpClient.delete(this.baseUrl+"/detail/delete/"+id);
  }

  manageMetaDetails(action, id, detail) {
    return this.httpClient.post(
      this.baseUrl + "/detail/create/" + action + "&" + id,
      detail
    );
  }
  //follow Services

  follow(id) {
    return this.httpClient.get(this.baseUrl + "/follow/followRequest/" + id);
  }
  unfollow(id) {
    return this.httpClient.delete(this.baseUrl + "/follow/unfollow/" + id);
  }
  fetchFollowing() {
    return this.httpClient.get(this.baseUrl + "/follow/following");
  }
}
