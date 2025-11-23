import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
//cookie

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieServise: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    if (this.InterceptRequwest(request)) {
      const authRequest = request.clone({
        setHeaders: {
          'Authorizatoin': this.cookieServise.get('Authorizatoin')
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
  private InterceptRequwest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1 ? true : false;
  }
}
