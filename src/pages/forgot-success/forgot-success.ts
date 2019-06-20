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
    email: string = '';
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
        this.email = this.navParams.get('email');
    }
    ionViewDidLoad() {

    }
    again() {

    }
    back() {
        this.app.getRootNav().setRoot(LoginPage);
    }
}
