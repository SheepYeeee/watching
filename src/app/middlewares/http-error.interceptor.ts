import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router, Route } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { Modal } from '../models/modal.model';
import { ModalService } from '../services/modal.service';

@Injectable()
export class HttpErrorInterceptor implements HttpErrorInterceptor {

  constructor(
    private router: Router,
    private modalService: ModalService) { }

  /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem(`${environment.keyOfToken}`)) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem(`${environment.keyOfToken}`)
        }
      });
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `\nError: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `\nError Code: ${error.status}\nMessage: ${error.error.message}`;

            // 判斷無權限
            if (error.status === 401) {
                this.router.navigate([`/login`]);
            } else {
                // 開啟 messageModal
                this.openMessageModal(error.error.message);
            }
        }

        return throwError(errorMessage);
      }) as any);
  }


  // /**
  //  * manage errors
  //  * @param err
  //  * @returns {any}
  //  */
  // private handleAuthError(err: HttpErrorResponse): Observable<any> {
  //   // handle your auth error or rethrow
  //   if (err.status === 401) {
  //     // navigate /delete cookies or whatever
  //     console.log('handled error ' + err.status);
  //     this.router.navigate([`/login`]);
  //     // tslint:disable-next-line:max-line-length
  //     // if you've caught
  //     // handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
  //     return of(err.message);
  //   }
  //   throw err;
  // }

  /**
   * 開啟 messageModal
   *
   * @param {string} message
   * @memberof HttpErrorInterceptor
   */
  openMessageModal(message: string) {
    /** modaleOptions */
    const modalOptions: Modal = {
        icon: 'icon',
        message: message
    }

    // 開啟 Modal
    this.modalService.open(modalOptions);
  }
}
