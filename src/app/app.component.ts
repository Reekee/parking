import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AllFunctionProvider } from '../providers/all-function/all-function';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SetApiPage } from '../pages/set-api/set-api';
import { HttpClient } from '@angular/common/http';
import { LoadingPage } from '../pages/loading/loading';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = LoadingPage;
    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private http: HttpClient,
        private allfunc: AllFunctionProvider
    ) {
        platform.ready().then(async () => {
            statusBar.styleDefault();
            splashScreen.hide();
            let api = await this.allfunc.getStorage("api");
            if (api) this.allfunc.api = api;
            this.http.post(this.allfunc.api + "check-parking-api.php", JSON.stringify({})).subscribe(async (res: any) => {
                await this.allfunc.setStorage("api", this.allfunc.api);
                this.run();
            }, error => {
                this.rootPage = SetApiPage;
            });
        });
    }
    run() {
        this.allfunc.getStorage('user').then(user => {
            if (user) {
                this.allfunc.user = user;
                this.rootPage = TabsPage;
            } else {
                this.rootPage = LoginPage;
            }
        });
    }
}

