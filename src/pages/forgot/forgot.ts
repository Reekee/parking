import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { ForgotSuccessPage } from '../forgot-success/forgot-success';

@IonicPage()
@Component({
    selector: 'page-forgot',
    templateUrl: 'forgot.html',
})
export class ForgotPage {
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
    submit() {
        this.app.getRootNav().setRoot(ForgotSuccessPage, { email: this.auth.email });
        // this.allfunc.callApi(this.allfunc.api + "forgot.php", this.auth, true).then((res: any) => {
        //     if (res.status) {
        //         this.app.getRootNav().push(ForgotSuccessPage);
        //     } else {
        //         this.allfunc.showAlert(res.message);
        //     }
        // });
    }
}
