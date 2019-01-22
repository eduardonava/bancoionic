import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserPage } from './user/user';
import { AlertController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  forma: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _auth: AuthProvider, private navCrtl: NavController,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.forma =  new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}")]),
      password : new FormControl(null, [Validators.required, Validators.minLength(2)])
    });

  }

  login(){
    console.log("Entrando");
    this._auth.ingresar(this.forma.value.email, this.forma.value.password).subscribe(respuesta => {
      console.log(respuesta);
      // if (res["token"]) {
      //   console.log(res);
      //   // const jwtHelper: JwtHelper = new JwtHelper();
      //   // const decodedToken = jwtHelper.decodeToken(res["token"]);
      //   // console.log(decodedToken);
      // }
    },error => {
      let alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'LA CONTRASEÑA O EL USUARIO SON INCORRECTOS',
        buttons: ['ACEPTAR']
      });
      alert.present();

    })
  }

  irCuenta(){
    this.navCrtl.push(UserPage);
  }


 
}
