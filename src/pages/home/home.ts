import { Component } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { FloorPage } from '../floor/floor';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistoryPage } from '../history/history';

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
        public platform: Platform,
        private barcodeScanner: BarcodeScanner
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
            this.barcodeScanner.scan().then(barcodeData => {
                this.doCheckin(1, barcodeData.text);
            }).catch(err => {
                this.allfunc.showAlert('Error เนื่องจากไม่สามารถสแกนได้');
            });
        } else {
            this.allfunc.showConfirm("คุณแน่ใจต้องการ Check In ใช่ไหม ?").then(rs => {
                if (rs) {
                    this.doCheckin(2, '');
                }
            });
        }
    }
    checkout() {
        if (this.platform.is('cordova')) {
            this.barcodeScanner.scan().then(barcodeData => {
                this.doCheckout(1, barcodeData.text);
            }).catch(err => {
                this.allfunc.showAlert('Error เนื่องจากไม่สามารถสแกนได้');
            });
        } else {
            this.allfunc.showConfirm("คุณแน่ใจต้องการ Check Out ใช่ไหม ?").then(rs => {
                if (rs) {
                    this.doCheckout(2, '');
                }
            });
        }
    }
    doCheckin(mode, code) {
        this.allfunc.callApi(this.allfunc.api + "checkin.php", {
            user_id: this.allfunc.user.user_id,
            mode: mode,
            code: code
        }, true).then((res: any) => {
            if (res.status) {
                this.data = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
    doCheckout(mode, code) {
        this.allfunc.callApi(this.allfunc.api + "checkout.php", {
            checkin_id: this.data.checkin.checkin_id,
            user_id: this.allfunc.user.user_id,
            mode: mode,
            code: code
        }, true).then((res: any) => {
            if (res.status) {
                this.data = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
    history() {
        this.app.getRootNav().push(HistoryPage);
    }
}
