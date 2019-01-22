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

  constructor(public navCtrl: NavController, public _auth: AuthProvider, public _home: HomeProvider, private storage: Storage) {
  
  }

  ngOnInit(){
    this._home.verCuentas().subscribe(() => {

    },error =>{

    })
  }

}
