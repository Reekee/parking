import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
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
        this.user = JSON.parse(JSON.stringify(this.allfunc.user));
        this.load(true);
    }
    load(loading) {
        this.allfunc.callApi(this.allfunc.api + "login.php", this.user, loading).then((res: any) => {
            if (res.status) {
                this.user = JSON.parse(JSON.stringify(res.user));
                this.allfunc.user = JSON.parse(JSON.stringify(res.user));
                this.allfunc.setStorage('user', res.user);
            } else {
                this.allfunc.user = {};
                this.allfunc.removeStorage('user');
                this.app.getRootNav().setRoot(LoginPage);
            }
        });
    }
    edit() {
        this.allfunc.showConfirm('คุณแน่ใจต้องการแก้ไขโปรไฟล์ของคุณใช่ไหม ?').then(rs => {
            if (rs) {
                this.allfunc.callApi(this.allfunc.api + "edit-profile.php", this.user, true).then((res: any) => {
                    if (res.status) {
                        this.user = res.user;
                        this.allfunc.user = res.user;
                        this.allfunc.setStorage('user', res.user);
                        this.allfunc.showAlert('แก้ไขโปรไฟล์สำเร็จ').then(rs => {
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
