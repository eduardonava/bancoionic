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
    let data =  new URLSearchParams()
    data.append("email", email);
    data.append("password", password);
    let url = `${URL}/user/authenticate`;

    return this.http.post(url, data)
      .map(res => {
        let result =  res.json();
        console.log(result);
      })
  }


  crearUser = (datos) =>{
    let { email, firstname, lastname, password } = datos;
    let data =  new URLSearchParams()
    data.append("email", email);
    data.append("password", password);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    let url = `${URL}/user/create`;
    return this.http.post(url, data)
      .map(res => {
        let result =  res.json();
        console.log(result);
      })
  }

}
