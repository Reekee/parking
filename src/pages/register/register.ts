import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { RegisterConfirmPage } from '../register-confirm/register-confirm';

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    user: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
    }
    ionViewDidLoad() {

    }
    next() {
        this.allfunc.callApi(this.allfunc.api + "register.php", this.user, true).then((res: any) => {
            if (res.status) {
                this.app.getRootNav().push(RegisterConfirmPage, { user: JSON.parse(JSON.stringify(res.user)) });
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
}
