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
    floor = [];
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
        this.allfunc.callApi(this.allfunc.api + "floor-get.php", {}, true).then((res: any) => {
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
