import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';
import { ParkingPage } from '../parking/parking';

@IonicPage()
@Component({
    selector: 'page-floor',
    templateUrl: 'floor.html',
})
export class FloorPage {
    loading = true;
    floor = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider,
        private app: App
    ) {
    }
    ionViewDidLoad() {
        this.load(true);
    }
    load(loading) {
        this.loading = true;
        this.allfunc.callApi(this.allfunc.api + "floor-get.php", {}, loading).then((res: any) => {
            this.loading = false;
            if (res.status) {
                this.floor = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
    open(item) {
        //this.navCtrl.push(ParkingPage, { floor: item });
        this.app.getRootNav().push(ParkingPage, { floor: item });
    }
}
