import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
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
        private app: App,
        public events: Events
    ) {
        this.events.subscribe('ProfilePage:reloadUser', () => {
            this.user = this.allfunc.user;
        });
    }
    ionViewDidEnter() {
        this.user = this.allfunc.user;
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
                this.allfunc.user = {};
                this.allfunc.removeStorage('user');
                this.app.getRootNav().setRoot(LoginPage);
            }
        })
    }
    showPass(password) {
        if (!password) return '';
        let len = password.length;
        let result = "";
        for (var i = 0; i < len; i++) {
            result += "*";
        }
        return result;
    }
}
