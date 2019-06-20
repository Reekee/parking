import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';

@IonicPage()
@Component({
    selector: 'page-history',
    templateUrl: 'history.html',
})
export class HistoryPage {
    loading = true;
    data = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
    }
    ionViewDidLoad() {
        this.load();
    }
    load() {
        this.loading = true;
        this.allfunc.callApi(this.allfunc.api + "checkin-get.php", {
            user_id: this.allfunc.user.user_id
        }, true).then((res: any) => {
            this.loading = false;
            if (res.status) {
                this.data = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
    open(item) {
        //this.app.getRootNav().push(ParkingPage, { floor: item });
    }
}
