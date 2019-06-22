import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { timeout } from 'rxjs/operators/timeout';

@Injectable()
export class AllFunctionProvider {
    public api = "http://192.168.130.30:81/parking/";
    public user: any = {};
    constructor(
        private http: HttpClient,
        private storage: Storage,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {

    }
    callApi(url, data = {}, isloading = true, showAlert = true) {
        let loading: any;
        if (isloading == true) {
            loading = this.loadingCtrl.create({
                content: 'กำลังประมวลผล...'
            });
            loading.present();
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                this.http.post(url, JSON.stringify(data))
                    .pipe(timeout(2000))
                    .subscribe((res: any) => {
                        if (isloading == true) { loading.dismiss(); }
                        resolve(res);
                    }, error => {
                        if (isloading == true) { loading.dismiss(); }
                        if (showAlert) this.showAlert("Error เนื่องจากไม่สามารถติดต่อเครื่องแม่ข่ายได้");
                    });
            }, 0);


        });
    }
    showAlert(message) {
        let msg: any = message;
        if (typeof message === 'object') msg = JSON.stringify(message);
        if (typeof message === 'string') msg = message;
        return new Promise(resolve => {
            const alert = this.alertCtrl.create({
                title: 'แจ้งข้อความ',
                subTitle: msg,
                buttons: [
                    {
                        text: 'ตกลง',
                        handler: () => {
                            resolve(true);
                        }
                    },
                ]
            });
            alert.present();
        });
    }
    showConfirm(message) {
        return new Promise(resolve => {
            let alert = this.alertCtrl.create({
                title: 'คำยืนยัน ?',
                message: message,
                buttons: [
                    {
                        text: 'ยกเลิก',
                        role: 'cancel',
                        handler: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: 'ตกลง',
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present();
        });
    }
    setStorage(key, value) {
        return this.storage.set(key, value);
    }
    getStorage(key) {
        return this.storage.get(key);
    }
    removeStorage(key, ) {
        return this.storage.remove(key);
    }
}
