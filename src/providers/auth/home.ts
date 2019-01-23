import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { URL_HOME } from './urls';
import "rxjs/add/operator/map";

@Injectable()
export class HomeProvider {
    constructor(public http: HttpClient, private storage: Storage) {
        console.log('Hello AuthProvider Provider');
    }

    verCuentas(){
        let url = `${URL_HOME}/accounts`;
        return this.http.get(url)
          .map(res => {
            // let respuesta = res.json();
            console.log(res);
          });
    }

    solicitarCuentas(){
        let url = `${URL_HOME}/catalogs/cards`;
        return this.http.get(url)
            .map(res => {
                // let respuesta = res.json();
                return res;
            });
    }

    misCuentas(data){
        let url = `${URL_HOME}/accounts`;
        return this.http.post(url, data)
          .map(res => {
            return res;
          });
    }
}