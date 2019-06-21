import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ConditionPage } from '../condition/condition';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    tab1 = HomePage;
    tab2 = ConditionPage;
    tab3 = ProfilePage;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
    }
}
