import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AllFunctionProvider } from '../providers/all-function/all-function';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SetApiPage } from '../pages/set-api/set-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingPage } from '../pages/loading/loading';
import { timeout } from 'rxjs/operators/timeout';

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
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.checkApi();
        });
    }
    async checkApi() {
        let api = await this.allfunc.getStorage("api");
        if (api) this.allfunc.api = api;
        this.http.post(this.allfunc.api + "check-parking-api.php", JSON.stringify({
        })).pipe(timeout(2000)).subscribe(async (res: any) => {
            if (res.status) {
                await this.allfunc.setStorage("api", this.allfunc.api);
                this.run();
            } else {
                this.rootPage = SetApiPage;
                this.allfunc.showAlert("Error เนื่องจากไม่สามารถติดต่อเครื่องแม่ข่ายได้ <br><br>โปรดระบุที่ตั้ง Api Service");
            }
        }, error => {
            this.rootPage = SetApiPage;
            this.allfunc.showAlert("Error เนื่องจากไม่สามารถติดต่อเครื่องแม่ข่ายได้ <br><br>โปรดระบุที่ตั้ง Api Service");
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

