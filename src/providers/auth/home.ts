import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { URL_HOME } from './urls';
import "rxjs/add/operator/map";

@Injectable()
export class HomeProvider {
    constructor(public http: Http, private storage: Storage) {
        console.log('Hello AuthProvider Provider');
    }

    verCuentas(){
        let url = `${URL_HOME}/accounts`;
        console.log(url);
        return this.http.get(url)
          .map(res => {
            // let respuesta = res.json();
            console.log(res);
          });
    }
}