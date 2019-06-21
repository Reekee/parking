import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';

@IonicPage()
@Component({
    selector: 'page-price',
    templateUrl: 'price.html',
})
export class PricePage {
    data: any = {};
    checkin_id: string = '';
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider
    ) {
        this.checkin_id = this.navParams.get('checkin_id');
    }
    ionViewDidLoad() {
        this.load();
    }
    load() {
        this.allfunc.callApi(this.allfunc.api + "checkin-get.php", {
            checkin_id: this.checkin_id
        }, true).then((res: any) => {
            if (res.status) {
                this.data = res.data;
            } else {
                this.allfunc.showAlert(res.message);
                this.navCtrl.pop();
            }
        });
    }
}
