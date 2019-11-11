import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "src/app/Services/HttpClient/http-client.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.scss"]
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private http: HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  blog: any;
  followCreator: Boolean;
  metaData;
  likes = 0;
  dislikes = 0;
  liked: Boolean = false;
  disliked: Boolean = false;
  responsed: Boolean = false;
  blogDetail = {
    liked: 0,
    disliked: 0,
    comment: null
  };
  blogId;
  blogDetailId;
  ngOnInit() {
    this.getBlogDetail();
    //if (this.metaData) this.countLikesAndDislikes();
  }
  getBlogDetail() {
    this.route.queryParams.subscribe(params => {
      this.http.getBlogDetail(params.id).subscribe((data: any) => {
        this.blog = data;
        this.blogId = params.id;
        this.getMetaData(params.id);
        this.followCreator = params.follow;
      });
    });
  }
  follow(id) {
    this.http.follow(id).subscribe(resp => {
      alert(resp);
      this.router.navigate(["home"]);
    });
  }
  unfollow(id) {
    this.http.unfollow(id).subscribe(resp => {
      alert(resp);
      this.router.navigate(["home"]);
    });
  }
  getMetaData(id) {
    this.http.getMetaData(id).subscribe(
      resp => {
        this.metaData = resp;
        this.countLikesAndDislikes();
      },
      error => {
        console.log(error);
      }
    );
  }
  countLikesAndDislikes() {
    let currentUser = sessionStorage.getItem("username");
    this.likes = 0;
    this.dislikes = 0;
    for (let i = 0; i < this.metaData.length; i++) {
      if (this.metaData[i].reactor.username == currentUser) {
        this.blogDetail = this.metaData[i];
        this.blogDetailId = this.metaData[i].id;

        this.responsed = true;

        if (this.metaData[i].liked > 0) this.liked = true;
        if (this.metaData[i].disliked > 0) this.disliked = true;
      }
      if (this.metaData[i].liked > 0) {
        this.likes++;
      }
      if (this.metaData[i].disliked > 0) {
        this.dislikes++;
      }
    }
  }
  likedClicked() {
    this.liked = true;
    this.disliked = false;
    this.blogDetail.liked = 1;
    this.blogDetail.disliked = 0;
    if (this.responsed) {
      this.http
        .manageMetaDetails(1, this.blogDetailId, this.blogDetail)
        .subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
          },
          error => console.log(error)
        );
    } else {
      this.http.manageMetaDetails(0, this.blogId, this.blogDetail).subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }
  dislikeClicked() {
    this.liked = false;
    this.disliked = true;
    this.blogDetail.liked = 0;
    this.blogDetail.disliked = 1;
    if (this.responsed) {
      this.http
        .manageMetaDetails(1, this.blogDetailId, this.blogDetail)
        .subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
          },
          error => console.log(error)
        );
    } else {
      this.http.manageMetaDetails(0, this.blogId, this.blogDetail).subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }
  commentClicked() {
    if (this.responsed) {
      this.http
        .manageMetaDetails(1, this.blogDetailId, this.blogDetail)
        .subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
          },
          error => console.log(error)
        );
    } else {
      this.http.manageMetaDetails(0, this.blogId, this.blogDetail).subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }
  deleteResponse(){
    this.liked = false;
    this.disliked = false;
    this.http.deleteMeta(this.blogDetailId).subscribe(
      (resp)=>{
        alert("Response Deleted");
        this.ngOnInit();
      },(error)=>console.error(error)
      
    )
  }
}
