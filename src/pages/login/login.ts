import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ForgotPage } from '../forgot/forgot';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    auth: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
    }
    ionViewDidLoad() {

    }
    login() {
        this.allfunc.callApi(this.allfunc.api + "login.php", this.auth, true).then((res: any) => {
            if (res.status) {
                this.allfunc.user = res.user;
                this.allfunc.setStorage('user', res.user);
                this.navCtrl.setRoot(TabsPage);
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
    register() {
        this.app.getRootNav().push(RegisterPage);
    }
    forgot() {
        this.app.getRootNav().push(ForgotPage);
    }
}
