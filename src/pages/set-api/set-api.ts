import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { AllFunctionProvider } from '../../providers/all-function/all-function';

@IonicPage()
@Component({
    selector: 'page-set-api',
    templateUrl: 'set-api.html',
})
export class SetApiPage {
    protocol: string = "";
    server: string = "";
    name: string = "";
    isConnect: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private http: HttpClient,
        private allfunc: AllFunctionProvider,
        private loadingCtrl: LoadingController
    ) {
        let arr = this.allfunc.api.split('/');
        this.protocol = arr[0];
        this.server = arr[2];
        this.name = "";
        for (let i = 3; i < arr.length; i++) {
            this.name += "/" + arr[i];
        }
    }
    check() {
        let loading = this.loadingCtrl.create({
            content: 'กำลังประมวลผล...'
        });
        loading.present();
        this.isConnect = false;
        let api = this.protocol + "//" + this.server + this.name;
        this.http.post(api + "check-parking-api.php", JSON.stringify({})).subscribe((res: any) => {
            loading.dismiss();
            if (res.status) {
                this.allfunc.showAlert("ติดต่อได้").then(rs => {
                    this.isConnect = true;
                });
            } else {
                this.allfunc.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
            }
        }, error => {
            loading.dismiss();
            this.allfunc.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
        });
    }
    edit() {
        this.isConnect = false;
    }
    submit() {
        let api = this.protocol + "//" + this.server + this.name;
        this.allfunc.setStorage("api", api);
        this.navCtrl.setRoot(MyApp);
    }
}
