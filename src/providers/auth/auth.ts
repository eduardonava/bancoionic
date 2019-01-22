import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL } from './urls';
import "rxjs/add/operator/map";

@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  ingresar = (email: string, password) => {
    let data =  {
      "email": email,
      "password" : password 
    }
    let url = `${URL}/user/authenticate`;
    return this.http.post(url, data)
      .map(res => {
        console.log(res);
        let result =  res.json();
      })
  }


  crearUser = (datos) =>{
    let url = `${URL}/user/create`;
    return this.http.post(url, datos)
      .map(res => {
        let result =  res.json();
      })
  }

}
