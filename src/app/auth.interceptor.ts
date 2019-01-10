import {Injectable, NgModule, Injector} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpResponse, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private route: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const dupReq = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + localStorage.getItem('free_dom_kz_key')) });
      return next.handle(dupReq).pipe(tap(( event: HttpEvent<any> ) => {
        if ( event instanceof HttpResponse ) {
          // console.log(event);
        }
      }, (err: any ) => {
        let errorMsg;
        if (err.status == 401) {
          localStorage.removeItem('free_dom_kz_key');
          localStorage.removeItem('free_dom_kz_cabinet');
          localStorage.removeItem('free_dom_kz_role');
          this.route.navigate(['./login']);
        }
        errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
        return Observable.throw(errorMsg);
      }));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errorMsg;
    if (err.status == 401) {
      localStorage.removeItem('free_dom_kz_key');
      localStorage.removeItem('free_dom_kz_cabinet');
      localStorage.removeItem('free_dom_kz_role');
      this.route.navigate(['./login']);
    }
    errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
    return Observable.throw(errorMsg);
  }
}
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
