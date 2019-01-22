
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login';


@Component({
    selector: "page-user",
    templateUrl: "user.html"
})
export class UserPage implements OnInit{
    contenedor: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams,
            private _auth: AuthProvider, private navCrtl: NavController,  private alertCtrl: AlertController, 
             public loadingCtrl: LoadingController) {
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
            let loading = this.loadingCtrl.create({
                content: 'CUENTA CREADO CORRECTAMENTE'
            });
            loading.present();
            
            setTimeout(() => {
                loading.dismiss();
                this.navCrtl.push(LoginPage);
            }, 1000);

        }, error =>{
            let alert = this.alertCtrl.create({
                title: 'ERROR!',
                subTitle: error["message"],
                buttons: ['ACEPTAR']
            });
            alert.present();
        })
    }

    irCuenta(){
        this.navCrtl.push(LoginPage);
    }
}