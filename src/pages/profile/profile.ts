import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { LoginPage } from '../login/login';
import { EditPassPage } from '../edit-pass/edit-pass';
import { EditProfilePage } from '../edit-profile/edit-profile';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    user: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
        this.allfunc.getStorage('user').then(user => {
            this.user = user;
        });
    }
    ionViewDidLoad() {

    }
    editPass() {
        this.app.getRootNav().push(EditPassPage);
    }
    editProfile() {
        this.app.getRootNav().push(EditProfilePage);
    }
    logout() {
        this.allfunc.showConfirm('คุณแน่ใจต้องการออกจากระบบใช่ไหม ?').then(rs => {
            if (rs) {
                this.allfunc.removeStorage('user');
                this.app.getRootNav().setRoot(LoginPage);
            }
        })
    }
}
