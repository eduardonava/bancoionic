import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigsHttpRequests implements HttpInterceptor {

	constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	    const token = localStorage.getItem('token');
	    const JWT = `JWT ${token}`;
	    if(token) {
		    req = req.clone({
		      setHeaders: {
		        Authorization: JWT,
		        'Content-Type': 'application/json'
		      }
		    });
	    }else{
		    req = req.clone({
		      setHeaders: {
		        'Content-Type': 'application/json'
		      }
		    });	    	
	    }
	    return next.handle(req)
	    .do((ev: HttpEvent<any>) => {
	    	if(ev instanceof HttpResponse){
	    		// console.log('processing response', ev);
	    		// if (ev.status === 200) {//Actualizar token

	    		// }
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    	if (err instanceof HttpErrorResponse) {
	    		if (err.status === 401) {
	    			console.log("mandar al logout");
	    		}
	    	}
	    	return Observable.throw(err);
	    })
    }
}