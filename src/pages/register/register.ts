import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { TabsPage } from '../tabs/tabs';

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
        private allfunc: AllFunctionProvider
    ) {
    }
    ionViewDidLoad() {

    }
    register() {
        this.allfunc.showConfirm('คุณแน่ใจต้องการลงทะเบียนใช่ไหม ?').then(rs => {
            if (rs) {
                this.allfunc.callApi(this.allfunc.api + "register.php", this.user, true).then((res: any) => {
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
