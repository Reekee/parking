import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    tab1 = HomePage;
    tab2 = ProfilePage;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
    }
}
