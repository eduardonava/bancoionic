import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { UserPage } from '../pages/login/user/user';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigsHttpRequests } from '../providers/auth/auth-error';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,  {
      scrollAssist: false, 
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    LoginPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AuthProvider,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ConfigsHttpRequests,
      multi: true
    }
  ]
})
export class AppModule {}
