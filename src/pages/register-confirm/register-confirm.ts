import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
    selector: 'page-register-confirm',
    templateUrl: 'register-confirm.html',
})
export class RegisterConfirmPage {
    user: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider
    ) {
        this.user = this.navParams.get("user");
    }
    ionViewDidLoad() {

    }
    register() {
        this.allfunc.showConfirm('คุณแน่ใจต้องการลงทะเบียนใช่ไหม ?').then(rs => {
            if (rs) {
                this.allfunc.callApi(this.allfunc.api + "register-confirm.php", this.user, true).then((res: any) => {
                    if (res.status) {
                        this.allfunc.user = res.user;
                        this.allfunc.setStorage('user', res.user);
                        this.navCtrl.setRoot(TabsPage);
                    } else {
                        this.allfunc.showAlert(res.message);
                    }
                });
            }
        });
    }
}
