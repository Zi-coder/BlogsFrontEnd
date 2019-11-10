import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BasicAuthInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    if(sessionStorage.getItem("Token")){
      req = req.clone({
        setHeaders:{
          Authorization: sessionStorage.getItem("Token")
        }
      })
    }
    return next.handle(req);
    
  }
  
}