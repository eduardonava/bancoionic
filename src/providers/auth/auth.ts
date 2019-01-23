import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './urls';
import "rxjs/add/operator/map";
import * as JWT from 'jwt-decode';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
  
  firstname:string = "";
  token: string = "";
  lastname: string = "";
  email: string = "";
  
  constructor(public http: HttpClient, private platform: Platform, private storge: Storage) {
    console.log('Hello AuthProvider Provider');
    this.cargarStorage();
  }

  activo(): boolean{
    if (this.token) {
      return true
    }else{
      return false;
    }
  }

  ingresar = (email: string, password) => {
    let data =  {
      "email": email,
      "password" : password 
    }
    let url = `${URL}/user/authenticate`;
    return this.http.post(url, data)
      .map(res => {
        let result =  res;
        if (result["token"]) {
          var decoded = JWT(result["token"]);
          this.token = result["token"];
          this.firstname = decoded.firstname;
          this.lastname = decoded.lastname;
          this.email = decoded.email;

          this.guardarStorage();
        }

      })
  }


  crearUser = (datos) =>{
    let url = `${URL}/user/create`;
    return this.http.post(url, datos);
  }

  cerrarSesion(){
    this.token = null;
    this.firstname = null;
    this.lastname = null;
    this.email = null;

    this.guardarStorage();
  }

  guardarStorage(){
    if (this.platform.is("cordova")) {
      this.storge.set('token', this.token);
      this.storge.set('firstname', this.firstname);
      this.storge.set('lastname', this.lastname);
      this.storge.set('email', this.email);
    }else{
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('firstname', this.firstname);
        localStorage.setItem('lastname', this.lastname);
        localStorage.setItem('email', this.email);
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
      }
      
    }
  }

  cargarStorage(){
    let promesa =  new Promise((resolve, reject) =>{
      if (this.platform.is("cordova")) {
        this.storge.ready();
        this.storge.get("token").then(token => {
          if (token) {
            this.token = token;
          }
        });

        this.storge.get("firstname").then(firstname => {
          if (firstname) {
            this.firstname = firstname;
          }
        });

        this.storge.get("lastname").then(lastname => {
          if (lastname) {
            this.lastname = lastname;
          }
          resolve();
        });
      }else{
        if (localStorage.getItem("token")) {
          this.token = localStorage.getItem("token");
          this.firstname = localStorage.getItem("firstname");
          this.lastname = localStorage.getItem("lastname");
          this.email = localStorage.getItem("email");
        }
        resolve()
      }
    });
    return promesa;
  }

}
