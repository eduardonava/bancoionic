
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { AlertController } from 'ionic-angular';


@Component({
    selector: "page-user",
    templateUrl: "user.html"
})
export class UserPage implements OnInit{
    contenedor: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams,
            private _auth: AuthProvider, private navCrtl: NavController,  private alertCtrl: AlertController) {
    }

    ngOnInit(){
        this.contenedor = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}")]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            firstname: new FormControl(null),
            lastname: new FormControl(null)
        })
    }

    crearCuentas(){
        this._auth.crearUser(this.contenedor.value).subscribe(res=> {
        }, error =>{
            let alert = this.alertCtrl.create({
                title: 'ERROR!',
                subTitle: 'ERROR AL CREAR TU CUENTA',
                buttons: ['ACEPTAR']
            });
            alert.present();
        })
    }
}