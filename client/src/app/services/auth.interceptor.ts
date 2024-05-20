import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );
    const token = authUser.token;
    console.log(req.url);

    // Define the login and sign-up endpoints
    const loginEndpoint = 'https://localhost:5001/api/account/login';
    const registerEndpoint = 'https://localhost:5001/api/account/register';

    // Bypass adding the Authorization header for login and sign-up endpoints
    if (req.url === loginEndpoint || req.url === registerEndpoint) {
      return next.handle(req);
    }

    if (token != '') {
      // console.log('req.url', req.url);
      const modifiedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      // console.log(modifiedRequest);
      return next.handle(modifiedRequest);
      // .pipe(
      //   tap((event) => {
      //     console.log(event);
      //     if (event.type === HttpEventType.Response) {
      //        console.log('Response arrived, body data: ');
      //        console.log(event.body);
      //     }
      //   })
      // );
    } else {
      return next.handle(req);
    }
  }
}
