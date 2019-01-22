import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserPage } from './user/user';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  forma: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _auth: AuthProvider, private navCrtl: NavController,
              private alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.forma =  new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}")]),
      password : new FormControl(null, [Validators.required, Validators.minLength(2)])
    });

    console.log(this._auth.activo());
    if (this._auth.activo()) {
      console.log("ENTRANDO");
      this.navCrtl.push(HomePage);
    }

  }

  login(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'ESPERE UN MOMENTO ...'
    });
    loading.present();
    this._auth.ingresar(this.forma.value.email, this.forma.value.password).subscribe(respuesta => {
      if (this._auth.activo()) {
        this.navCrtl.push(HomePage);
        loading.dismiss();
      }
    },error => {
      let alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'LA CONTRASEÑA O EL USUARIO SON INCORRECTOS',
        buttons: ['ACEPTAR']
      });
      alert.present();
      loading.dismiss();
    })
  }

  irCuenta(){
    this.navCrtl.push(UserPage);
  }


 
}
