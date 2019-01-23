import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/auth/home';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{
  cuentas:any = [];
  id:any;
  constructor(public navCtrl: NavController, public _auth: AuthProvider, public _home: HomeProvider, private storage: Storage) {

  }


  ngOnInit(){
    this._home.verCuentas().subscribe(() => {

    },error =>{

    })

    this._home.solicitarCuentas().subscribe(res => {
        console.log(res);
        this.cuentas = res["response"]["type_cards"];
        this.id = res["response"]["_id"];
    },error =>{

    })
  }

  
  verMisCuentas(tipo, name){
      this._home.misCuentas({"userId": this.id, "name": name, "type": tipo}).subscribe(res => {
        console.log(res);
      },error =>{

      })
  }
 

}
