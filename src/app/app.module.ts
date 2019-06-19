import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AllFunctionProvider } from '../providers/all-function/all-function';

import { MyApp } from './app.component';
import { SetApiPage } from '../pages/set-api/set-api';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FloorPage } from '../pages/floor/floor';
import { ParkingPage } from '../pages/parking/parking';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        MyApp,
        SetApiPage,
        LoginPage,
        RegisterPage,
        TabsPage,
        HomePage,
        ProfilePage,
        FloorPage,
        ParkingPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SetApiPage,
        LoginPage,
        RegisterPage,
        TabsPage,
        HomePage,
        ProfilePage,
        FloorPage,
        ParkingPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AllFunctionProvider
    ]
})
export class AppModule { }
