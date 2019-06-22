import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';

@IonicPage()
@Component({
    selector: 'page-parking',
    templateUrl: 'parking.html',
})
export class ParkingPage {
    loading = true;
    floor: any = {};
    parking = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider
    ) {
        this.floor = this.navParams.get("floor");
        this.load(true);
    }
    ionViewDidLoad() {

    }
    load(loading) {
        this.loading = true;
        this.allfunc.callApi(this.allfunc.api + "parking-get.php", {
            floor_id: this.floor.floor_id
        }, loading).then((res: any) => {
            this.loading = false;
            if (res.status) {
                this.parking = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
}
