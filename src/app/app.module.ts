import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AllFunctionProvider } from '../providers/all-function/all-function';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { LoadingPage } from '../pages/loading/loading';
import { SetApiPage } from '../pages/set-api/set-api';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RegisterConfirmPage } from '../pages/register-confirm/register-confirm';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FloorPage } from '../pages/floor/floor';
import { ParkingPage } from '../pages/parking/parking';
import { PipesModule } from '../pipes/pipes.module';
import { HistoryPage } from '../pages/history/history';
import { EditPassPage } from '../pages/edit-pass/edit-pass';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ForgotPage } from '../pages/forgot/forgot';
import { ForgotSuccessPage } from '../pages/forgot-success/forgot-success';
import { ConditionPage } from '../pages/condition/condition';
import { PricePage } from '../pages/price/price';

@NgModule({
    declarations: [
        MyApp,
        LoadingPage,
        SetApiPage,
        LoginPage,
        RegisterPage,
        RegisterConfirmPage,
        TabsPage,
        HomePage,
        ProfilePage,
        FloorPage,
        ParkingPage,
        HistoryPage,
        EditPassPage,
        EditProfilePage,
        ForgotPage,
        ForgotSuccessPage,
        ConditionPage,
        PricePage
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
        LoadingPage,
        SetApiPage,
        LoginPage,
        RegisterPage,
        RegisterConfirmPage,
        TabsPage,
        HomePage,
        ProfilePage,
        FloorPage,
        ParkingPage,
        HistoryPage,
        EditPassPage,
        EditProfilePage,
        ForgotPage,
        ForgotSuccessPage,
        ConditionPage,
        PricePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AllFunctionProvider,
        BarcodeScanner
    ]
})
export class AppModule { }
