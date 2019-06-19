import { Component } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { LoginPage } from '../login/login';
import { FloorPage } from '../floor/floor';
import * as moment from 'moment';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    data: any = {};
    constructor(
        public navCtrl: NavController,
        private allfunc: AllFunctionProvider,
        private app: App,
        public platform: Platform
    ) {
        this.load();
    }
    load() {
        this.allfunc.callApi(this.allfunc.api + "home-get.php", {
            user_id: this.allfunc.user.user_id
        }, true).then((res: any) => {
            if (res.status) {
                this.data = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
    check() {
        this.app.getRootNav().push(FloorPage);
    }
    checkin() {
        if (this.platform.is('cordova')) {

        } else {
            this.doCheckin();
        }
    }
    doCheckin() {
        this.allfunc.showConfirm("คุณแน่ใจต้องการ Check In ใช่ไหม ?").then(rs => {
            if (rs) {
                this.allfunc.callApi(this.allfunc.api + "checkin.php", {
                    user_id: this.allfunc.user.user_id
                }, true).then((res: any) => {
                    if (res.status) {
                        this.data = res.data;
                    } else {
                        this.allfunc.showAlert(res.message);
                    }
                });
            }
        });
    }
    checkout() {
        this.allfunc.showConfirm("คุณแน่ใจต้องการ Check Out ใช่ไหม ?").then(rs => {
            if (rs) {
                this.allfunc.callApi(this.allfunc.api + "checkout.php", {
                    user_id: this.allfunc.user.user_id
                }, true).then((res: any) => {
                    if (res.status) {
                        this.data = res.data;
                    } else {
                        this.allfunc.showAlert(res.message);
                    }
                });
            }
        });
    }
}
