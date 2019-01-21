import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserPage } from './user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  forma: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _auth: AuthProvider, private navCrtl: NavController) {
  }

  ngOnInit() {
    this.forma =  new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}")]),
      password : new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login(){
    this._auth.ingresar(this.forma.value.email, this.forma.value.password).subscribe(() => {
    },error => {
      console.log(error);
    })
  }

  irCuenta(){
    this.navCrtl.push(UserPage);
  }


 
}
