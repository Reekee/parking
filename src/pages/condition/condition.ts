import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllFunctionProvider } from '../../providers/all-function/all-function';

@IonicPage()
@Component({
    selector: 'page-condition',
    templateUrl: 'condition.html',
})
export class ConditionPage {
    data: any = {};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private allfunc: AllFunctionProvider
    ) {
    }
    ionViewDidEnter() {
        this.load();
    }
    load() {
        let loading = (this.data.rate_id) ? false : true;
        this.allfunc.callApi(this.allfunc.api + "condition-get.php", {
        }, loading).then((res: any) => {
            if (res.status) {
                this.data = res.data;
            } else {
                this.allfunc.showAlert(res.message);
            }
        });
    }
}
