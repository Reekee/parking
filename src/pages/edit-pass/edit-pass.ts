import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-edit-pass',
    templateUrl: 'edit-pass.html',
})
export class EditPassPage {
    user: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private app: App,
        private allfunc: AllFunctionProvider,
        public events: Events
    ) {
    }
    ionViewDidLoad() {
        this.user.user_id = this.allfunc.user.user_id;
    }
    edit() {
        this.allfunc.showConfirm('คุณแน่ใจต้องการแก้ไขรหัสผ่านของคุณใช่ไหม ?').then(rs => {
            if (rs) {
                this.allfunc.callApi(this.allfunc.api + "edit-pass.php", this.user, true).then((res: any) => {
                    if (res.status) {
                        this.allfunc.user = res.user;
                        this.allfunc.setStorage('user', res.user);
                        this.allfunc.showAlert('แก้ไขรหัสผ่านสำเร็จ').then(rs => {
                            this.navCtrl.pop();
                            this.events.publish('ProfilePage:reloadUser');
                        });
                    } else {
                        this.allfunc.showAlert(res.message);
                    }
                });
            }
        });
    }
}
