import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-forgot-success',
    templateUrl: 'forgot-success.html',
})
export class ForgotSuccessPage {
    auth: any = {};
    sending = false;
    error = '';
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
        this.auth = this.navParams.get('auth');
    }
    ionViewDidLoad() {

    }
    send() {
        this.sending = true;
        this.error = '';
        this.allfunc.callApi(this.allfunc.api + "forgot.php", this.auth, true).then((res: any) => {
            this.sending = false;
            if (res.status) {

            } else {
                this.error = res.message;
                this.allfunc.showAlert(res.message);
            }
        });
    }
    back() {
        this.app.getRootNav().setRoot(LoginPage);
    }
}
