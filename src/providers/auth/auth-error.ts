import { AlertController } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, mergeMap } from 'rxjs/operators';
 

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

	
    constructor(private storage: Storage, private alertCtrl: AlertController) { }
 
    // Intercepts all HTTP requests!
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	    const token = localStorage.getItem('token');
        const JWT = `${token}`;
        console.log(JWT);
	    if(token != null) {
		   const headers = new  HttpHeaders({
               "Accept": "application/json",
               "Content-type" : "application/json",
               "X-access-token" : JWT
           });
           req = req.clone({
               headers
           })
	    }else{
            const headers = new  HttpHeaders({
                "Accept": "application/json",
                "Content-type" : "application/json"
            });	
            req = req.clone({
                headers
            })
	    }
        
        return next.handle(req);
    }
}